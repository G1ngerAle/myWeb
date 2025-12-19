export type CourseTier = 'foundational' | 'intermediate' | 'advanced'

export interface CourseNode {
  id: string
  code: string
  title: string
  description: string
  tier: CourseTier
}

export interface CourseLink {
  source: string
  target: string
}

// Simple placeholder prerequisite chain:
// foundational (small) -> intermediate (medium) -> advanced/recent (large)
export const courseNodes: CourseNode[] = [
  // Foundational
  {
    id: 'math101',
    code: 'MATH 101',
    title: 'Foundations of Calculus',
    description: 'Limits, derivatives, and the fundamentals of single-variable calculus.',
    tier: 'foundational',
  },
  {
    id: 'cs101',
    code: 'CS 101',
    title: 'Introduction to Programming',
    description: 'Basic programming concepts and problem solving in a modern language.',
    tier: 'foundational',
  },
  {
    id: 'phys101',
    code: 'PHYS 101',
    title: 'Classical Mechanics',
    description: 'Newtonian mechanics and mathematical modeling of physical systems.',
    tier: 'foundational',
  },
  {
    id: 'stat101',
    code: 'STAT 101',
    title: 'Introduction to Probability',
    description: 'Basic probability theory and discrete random variables.',
    tier: 'foundational',
  },

  // Intermediate
  {
    id: 'cs201',
    code: 'CS 201',
    title: 'Data Structures',
    description: 'Abstract data types, complexity, and classical data structures.',
    tier: 'intermediate',
  },
  {
    id: 'math201',
    code: 'MATH 201',
    title: 'Linear Algebra',
    description: 'Vector spaces, matrices, and linear transformations.',
    tier: 'intermediate',
  },
  {
    id: 'stat201',
    code: 'STAT 201',
    title: 'Statistical Inference',
    description: 'Estimation, confidence intervals, and hypothesis testing.',
    tier: 'intermediate',
  },
  {
    id: 'ml201',
    code: 'ML 201',
    title: 'Introduction to Machine Learning',
    description: 'Core supervised and unsupervised learning methods.',
    tier: 'intermediate',
  },

  // Advanced / recent capstone
  {
    id: 'ml401',
    code: 'ML 401',
    title: 'Advanced Topics in Machine Learning',
    description:
      'Recent, research-oriented course integrating concepts from probability, linear algebra, and core ML.',
    tier: 'advanced',
  },
]

export const courseLinks: CourseLink[] = [
  // Foundational -> Intermediate
  { source: 'math101', target: 'math201' },
  { source: 'cs101', target: 'cs201' },
  { source: 'stat101', target: 'stat201' },
  { source: 'math101', target: 'ml201' },
  { source: 'cs101', target: 'ml201' },
  { source: 'phys101', target: 'ml201' },

  // Intermediate -> Advanced (recent largest course)
  { source: 'math201', target: 'ml401' },
  { source: 'stat201', target: 'ml401' },
  { source: 'ml201', target: 'ml401' },
  { source: 'cs201', target: 'ml401' },
]


