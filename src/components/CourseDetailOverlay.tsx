import { motion } from 'framer-motion'
import type { CourseNode } from '../data/courses'

interface CourseDetailOverlayProps {
  course: CourseNode
  onClose: () => void
}

// Using Framer Motion with a shared layoutId between the node and this overlay
// gives us a smooth, shared-element style transition without manual keyframe math.
export default function CourseDetailOverlay({ course, onClose }: CourseDetailOverlayProps) {
  return (
    <motion.div
      layoutId={`course-${course.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="relative max-w-2xl w-full bg-surface text-text rounded-2xl shadow-2xl border border-border p-6 sm:p-8"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.9 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-border text-text-secondary hover:text-text hover:bg-background transition-colors"
          aria-label="Close course details"
        >
          ×
        </button>

        <div className="mb-4 text-sm text-text-secondary uppercase tracking-wide">
          {course.code}
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">{course.title}</h2>
        <p className="text-base sm:text-lg leading-relaxed text-text-secondary">
          {course.description}
        </p>

        <div className="mt-6 text-sm text-text-secondary">
          <p>
            Tier:{' '}
            <span className="font-medium capitalize">
              {course.tier === 'advanced' ? 'Advanced / Recent' : course.tier}
            </span>
          </p>
          <p className="mt-2">
            This is a placeholder description demonstrating how course details will appear in the
            overlay while preserving the graph state in the background.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}


