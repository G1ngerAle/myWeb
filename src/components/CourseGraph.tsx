import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3-force'
import { motion } from 'framer-motion'
import { courseNodes, courseLinks, type CourseNode, type CourseLink } from '../data/courses'

interface CourseGraphProps {
  onNodeClick: (course: CourseNode) => void
  selectedCourseId?: string | null
}

interface SimulationNode extends CourseNode, d3.SimulationNodeDatum {}
interface SimulationLink extends d3.SimulationLinkDatum<SimulationNode> {
  source: SimulationNode
  target: SimulationNode
}

interface GraphState {
  nodes: SimulationNode[]
  links: SimulationLink[]
}

interface ViewTransform {
  x: number
  y: number
  k: number
}

// This component uses d3-force directly instead of a higher-level graph library
// to keep the simulation in a stable ref and update node positions efficiently
// without causing janky re-renders.
export default function CourseGraph({ onNodeClick, selectedCourseId }: CourseGraphProps) {
  const [graph, setGraph] = useState<GraphState | null>(null)
  const [, setTick] = useState(0) // used only to trigger React renders on simulation ticks
  const simulationRef = useRef<d3.Simulation<SimulationNode, SimulationLink> | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const expandedIdRef = useRef<string | null>(selectedCourseId ?? null)

  // Zoom / pan transform
  const [transform, setTransform] = useState<ViewTransform>({ x: 0, y: 0, k: 1 })
  const isPanningRef = useRef(false)
  const panStartRef = useRef<{ x: number; y: number } | null>(null)

  // Node dragging
  const draggedNodeRef = useRef<SimulationNode | null>(null)

  // Click vs drag tracking
  const pointerDownInfoRef = useRef<{
    node: SimulationNode
    x: number
    y: number
    time: number
  } | null>(null)

  const [isDraggingNode, setIsDraggingNode] = useState(false)

  // Pre-measured label-based radii so text always fits within circles
  const labelRadiusByIdRef = useRef<Map<string, number> | null>(null)

  const { width, height } = useMemo(
    () => ({
      width: 960,
      height: 540,
    }),
    [],
  )

  // Initialize graph data, measure labels, and start simulation once
  useEffect(() => {
    const nodes: SimulationNode[] = courseNodes.map((n) => ({ ...n }))
    const nodeById = new Map<string, SimulationNode>(nodes.map((n) => [n.id, n]))

    const links: SimulationLink[] = courseLinks
      .map((l: CourseLink) => {
        const source = nodeById.get(l.source)
        const target = nodeById.get(l.target)
        if (!source || !target) return null
        return { source, target }
      })
      .filter((l): l is SimulationLink => l !== null)

    setGraph({ nodes, links })

    // Measure label widths using an offscreen canvas so each collapsed node
    // is large enough to contain its text label plus padding.
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.font = '10px system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        const map = new Map<string, number>()

        nodes.forEach((node) => {
          const metrics = ctx.measureText(node.code)
          const width = metrics.width
          const fontSize = 10
          const padding = 6
          const radiusFromWidth = width / 2 + padding
          const radiusFromHeight = fontSize / 2 + padding
          const labelRadius = Math.max(radiusFromWidth, radiusFromHeight)
          map.set(node.id, labelRadius)
        })

        labelRadiusByIdRef.current = map
      }
    }

    const simulation = d3
      .forceSimulation<SimulationNode>(nodes)
      .force(
        'link',
        d3
          .forceLink<SimulationNode, SimulationLink>(links)
          .id((d) => d.id)
          .distance(120)
          .strength(0.5),
      )
      .force('charge', d3.forceManyBody().strength(-120))
      .force('center', d3.forceCenter(0, 0))
      .force(
        'collision',
        d3
          .forceCollide<SimulationNode>()
          .radius((d) => effectiveRadius(d, expandedIdRef.current) + 8),
      )
      .alphaDecay(0.02)

    simulation.on('tick', () => {
      // Request a light React render on simulation tick without copying arrays
      setTick((t) => t + 1)
    })

    simulationRef.current = simulation

    return () => {
      simulation.stop()
      simulationRef.current = null
    }
  }, [])

  // Base radius per tier, before accounting for label size
  const tierBaseRadius = (node: CourseNode): number => {
    if (node.tier === 'advanced') return 30
    if (node.tier === 'intermediate') return 22
    return 14
  }

  // Collapsed radius: ensure label text is fully inside the circle with padding
  const collapsedRadius = (node: CourseNode): number => {
    const base = tierBaseRadius(node)
    const labelRadius = labelRadiusByIdRef.current?.get(node.id) ?? base
    return Math.max(base, labelRadius)
  }

  // Effective radius given current expansion state
  const effectiveRadius = (node: CourseNode, expandedId: string | null = null): number => {
    const isExpanded = expandedId != null && node.id === expandedId
    const radius = collapsedRadius(node)
    return isExpanded ? radius * 2.8 : radius
  }

  // When selectedCourseId changes, update the collision radius and gently reheat the simulation
  useEffect(() => {
    expandedIdRef.current = selectedCourseId ?? null
    const simulation = simulationRef.current
    if (!simulation) return

    const collide = d3
      .forceCollide<SimulationNode>()
      .radius((d) => effectiveRadius(d, expandedIdRef.current) + 8)
      .strength(1)

    simulation.force('collision', collide)
    simulation.alpha(0.9).restart()
  }, [selectedCourseId])

  const handleWheel: React.WheelEventHandler<SVGSVGElement> = (event) => {
    event.preventDefault()
    const { deltaY } = event
    const scaleFactor = 1.05
    const direction = deltaY > 0 ? 1 : -1

    const newK = direction > 0 ? transform.k / scaleFactor : transform.k * scaleFactor
    const clampedK = Math.min(Math.max(newK, 0.5), 2.5)

    setTransform((prev) => ({
      ...prev,
      k: clampedK,
    }))
  }

  const handleBackgroundMouseDown: React.MouseEventHandler<SVGSVGElement> = (event) => {
    // Ignore if click started on a node (handled separately)
    if ((event.target as SVGElement).closest('[data-node="true"]')) return
    isPanningRef.current = true
    panStartRef.current = { x: event.clientX - transform.x, y: event.clientY - transform.y }
  }

  const handleMouseMove: React.MouseEventHandler<SVGSVGElement> = (event) => {
    // Panning
    if (isPanningRef.current && panStartRef.current) {
      setTransform((prev) => ({
        ...prev,
        x: event.clientX - panStartRef.current!.x,
        y: event.clientY - panStartRef.current!.y,
      }))
    }

    // Dragging node
    if (draggedNodeRef.current) {
      const svg = svgRef.current
      if (!svg) return

      const point = svg.createSVGPoint()
      point.x = event.clientX
      point.y = event.clientY
      const ctm = svg.getScreenCTM()
      if (!ctm) return
      const cursor = point.matrixTransform(ctm.inverse())

      // Adjust for current transform
      const x = (cursor.x - transform.x) / transform.k
      const y = (cursor.y - transform.y) / transform.k

      draggedNodeRef.current.fx = x
      draggedNodeRef.current.fy = y
      simulationRef.current?.alphaTarget(0.2).restart()
    }
  }

  const handleMouseUp: React.MouseEventHandler<SVGSVGElement> = (event) => {
    const now = performance.now()

    // Determine if this interaction should be treated as a click rather than a drag
    if (draggedNodeRef.current && pointerDownInfoRef.current) {
      const info = pointerDownInfoRef.current
      const dx = event.clientX - info.x
      const dy = event.clientY - info.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const duration = now - info.time

      const MAX_DISTANCE = 5 // px
      const MAX_DURATION = 230 // ms

      if (distance <= MAX_DISTANCE && duration <= MAX_DURATION) {
        onNodeClick(info.node)
      }
    }

    isPanningRef.current = false
    panStartRef.current = null

    if (draggedNodeRef.current) {
      draggedNodeRef.current.fx = undefined
      draggedNodeRef.current.fy = undefined
      simulationRef.current?.alphaTarget(0)
      draggedNodeRef.current = null
    }

    pointerDownInfoRef.current = null
    setIsDraggingNode(false)
  }

  const handleNodeMouseDown = (node: SimulationNode) => (event: React.MouseEvent) => {
    event.stopPropagation()
    draggedNodeRef.current = node
    node.fx = node.x
    node.fy = node.y
    simulationRef.current?.alphaTarget(0.2).restart()
    pointerDownInfoRef.current = {
      node,
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    }
    setIsDraggingNode(true)
  }

  if (!graph) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-text-secondary text-sm">
        Loading graph…
      </div>
    )
  }

  return (
    <div className="relative h-[65vh] sm:h-[70vh] lg:h-[72vh] bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ cursor: isDraggingNode ? 'grabbing' : 'default' }}
        viewBox={[-width / 2, -height / 2, width, height].join(' ')}
        onWheel={handleWheel}
        onMouseDown={handleBackgroundMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g transform={`translate(${transform.x},${transform.y}) scale(${transform.k})`}>
          <defs>
            <marker
              id="arrowhead"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(148, 163, 184, 0.9)" />
            </marker>
          </defs>

          {/* Links with directional arrows (prerequisite -> dependent) */}
          {graph.links.map((link, index) => {
            const isDimmed =
              selectedCourseId &&
              link.source.id !== selectedCourseId &&
              link.target.id !== selectedCourseId

            const sx = link.source.x ?? 0
            const sy = link.source.y ?? 0
            const tx = link.target.x ?? 0
            const ty = link.target.y ?? 0

            const dx = tx - sx
            const dy = ty - sy
            const len = Math.sqrt(dx * dx + dy * dy) || 1
            const ux = dx / len
            const uy = dy / len

            const sourceRadius = effectiveRadius(link.source, selectedCourseId ?? null)
            const targetRadius = effectiveRadius(link.target, selectedCourseId ?? null)

            const x1 = sx + ux * sourceRadius
            const y1 = sy + uy * sourceRadius
            const x2 = tx - ux * targetRadius
            const y2 = ty - uy * targetRadius

            return (
              <line
                key={index}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(148, 163, 184, 0.8)"
                strokeWidth={1}
                opacity={isDimmed ? 0.35 : 0.9}
                markerEnd="url(#arrowhead)"
              />
            )
          })}

          {/* Nodes */}
          {graph.nodes.map((node) => {
            const radius = effectiveRadius(node, selectedCourseId ?? null)
            const isSelected = node.id === selectedCourseId
            const isDimmed = Boolean(selectedCourseId && !isSelected)

            return (
              <g
                key={node.id}
                transform={`translate(${node.x ?? 0},${node.y ?? 0})`}
                data-node="true"
                onMouseDown={handleNodeMouseDown(node)}
              >
                <defs>
                  <clipPath id={`clip-${node.id}`}>
                    <circle r={radius} cx={0} cy={0} />
                  </clipPath>
                </defs>

                <motion.circle
                  r={radius}
                  fill={node.tier === 'advanced' ? 'var(--color-primary)' : 'var(--color-surface)'}
                  stroke={isSelected ? 'var(--color-primary)' : 'var(--color-border)'}
                  strokeWidth={isSelected ? 3 : 2}
                  style={{
                    cursor: 'pointer',
                    filter: isSelected
                      ? 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.55))'
                      : 'drop-shadow(0 0 4px rgba(148, 163, 184, 0.4))',
                  }}
                  whileHover={{
                    scale: isSelected ? 1 : 1.06,
                  }}
                  transition={{ type: 'tween', duration: 0.25 }}
                  opacity={isDimmed ? 0.55 : 1}
                />

                {/* Compact label when not selected */}
                <text
                  textAnchor="middle"
                  dy={4}
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: 10,
                    fill: 'var(--color-text)',
                    opacity: isSelected ? 0 : 1,
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {node.code}
                </text>

                {/* Expanded details inside the circle when selected */}
                {isSelected && (
                  <g clipPath={`url(#clip-${node.id})`}>
                    <foreignObject
                      x={-radius * 0.8}
                      y={-radius * 0.8}
                      width={radius * 1.6}
                      height={radius * 1.6}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          padding: '8px',
                          color: 'var(--color-text)',
                          textAlign: 'center',
                          fontSize: '10px',
                          lineHeight: 1.4,
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: '11px',
                            marginBottom: 4,
                          }}
                        >
                          {node.code}
                        </div>
                        <div
                          style={{
                            fontWeight: 500,
                            fontSize: '10px',
                            marginBottom: 4,
                          }}
                        >
                          {node.title}
                        </div>
                        <div>{node.description}</div>
                      </div>
                    </foreignObject>
                  </g>
                )}
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}


