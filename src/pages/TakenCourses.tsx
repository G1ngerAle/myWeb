import { useEffect, useRef, useState } from 'react'
import CourseGraph from '../components/CourseGraph'
import { useLanguage } from '../contexts/LanguageContext'
import type { CourseNode } from '../data/courses'

export default function TakenCourses() {
  const { t } = useLanguage()
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null)
  const expandedRef = useRef<string | null>(expandedCourseId)
  const expandTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    expandedRef.current = expandedCourseId
    return () => {
      if (expandTimeoutRef.current !== null) {
        window.clearTimeout(expandTimeoutRef.current)
        expandTimeoutRef.current = null
      }
    }
  }, [expandedCourseId])

  const handleNodeClick = (course: CourseNode) => {
    const current = expandedRef.current

    // No node expanded -> expand clicked node
    if (!current) {
      setExpandedCourseId(course.id)
      return
    }

    // Same node clicked again -> collapse it
    if (current === course.id) {
      setExpandedCourseId(null)
      return
    }

    // Different node clicked while one is expanded:
    // 1) collapse current
    // 2) after a short delay, expand the new node to preserve
    //    the visual ordering (shrink first, then grow).
    setExpandedCourseId(null)

    if (expandTimeoutRef.current !== null) {
      window.clearTimeout(expandTimeoutRef.current)
      expandTimeoutRef.current = null
    }

    expandTimeoutRef.current = window.setTimeout(() => {
      setExpandedCourseId(course.id)
    }, 220)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-10">
        <h1 className="text-4xl font-bold mb-3 text-text">
          {t('courses.title')}
        </h1>
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl">
          {t('courses.graph.subtitle')}
        </p>
      </header>

      <CourseGraph
        selectedCourseId={expandedCourseId}
        onNodeClick={handleNodeClick}
      />
    </div>
  )
}



