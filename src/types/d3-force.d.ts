declare module 'd3-force' {
  export interface SimulationNodeDatum {
    x?: number
    y?: number
    fx?: number | null
    fy?: number | null
    vx?: number
    vy?: number
  }

  export interface SimulationLinkDatum<T extends SimulationNodeDatum> {
    source: T | number
    target: T | number
    index?: number
  }

  export interface Force<T extends SimulationNodeDatum, L extends SimulationLinkDatum<T> = SimulationLinkDatum<T>> {
    (alpha: number): void
    initialize?(nodes: T[], random: () => number): void
  }

  export interface Simulation<T extends SimulationNodeDatum = SimulationNodeDatum> {
    nodes(): T[]
    nodes(nodes: T[]): this
    alpha(): number
    alpha(alpha: number): this
    alphaTarget(): number
    alphaTarget(target: number): this
    alphaDecay(): number
    alphaDecay(decay: number): this
    velocityDecay(): number
    velocityDecay(decay: number): this
    force(name: string, force: Force<T> | null): this
    force(name: string): Force<T> | undefined
    restart(): this
    stop(): this
    tick(iterations?: number): this
    on(typenames: string, listener: ((this: this, event: any) => void) | null): this
  }

  export function forceSimulation<T extends SimulationNodeDatum>(nodes?: T[]): Simulation<T>

  export interface ForceLink<T extends SimulationNodeDatum, L extends SimulationLinkDatum<T> = SimulationLinkDatum<T>> extends Force<T, L> {
    id(): (d: T, i: number, nodes: T[]) => string | number
    id(id: (d: T, i: number, nodes: T[]) => string | number): this
    distance(): (d: L, i: number, links: L[]) => number
    distance(distance: number | ((d: L, i: number, links: L[]) => number)): this
    strength(): (d: L, i: number, links: L[]) => number
    strength(strength: number | ((d: L, i: number, links: L[]) => number)): this
    links(): L[] | undefined
    links(links: L[] | undefined): this
  }

  export function forceLink<T extends SimulationNodeDatum, L extends SimulationLinkDatum<T> = SimulationLinkDatum<T>>(links?: L[]): ForceLink<T, L>

  export interface ForceManyBody<T extends SimulationNodeDatum = SimulationNodeDatum> extends Force<T> {
    strength(): (d: T, i: number, nodes: T[]) => number
    strength(strength: number | ((d: T, i: number, nodes: T[]) => number)): this
    theta(): number
    theta(theta: number): this
    distanceMin(): number
    distanceMin(distance: number): this
    distanceMax(): number
    distanceMax(distance: number): this
  }

  export function forceManyBody<T extends SimulationNodeDatum = SimulationNodeDatum>(): ForceManyBody<T>

  export interface ForceCenter<T extends SimulationNodeDatum = SimulationNodeDatum> extends Force<T> {
    x(): number
    x(x: number): this
    y(): number
    y(y: number): this
    strength(): number
    strength(strength: number): this
  }

  export function forceCenter<T extends SimulationNodeDatum = SimulationNodeDatum>(x?: number, y?: number): ForceCenter<T>

  export interface ForceCollide<T extends SimulationNodeDatum = SimulationNodeDatum> extends Force<T> {
    radius(): (d: T, i: number, nodes: T[]) => number
    radius(radius: number | ((d: T, i: number, nodes: T[]) => number)): this
    strength(): number
    strength(strength: number): this
    iterations(): number
    iterations(iterations: number): this
  }

  export function forceCollide<T extends SimulationNodeDatum = SimulationNodeDatum>(radius?: number | ((d: T, i: number, nodes: T[]) => number)): ForceCollide<T>
}

