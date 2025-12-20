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
    id: 'comp250',
    code: 'COMP 250',
    title: 'Introduction to Computer Science',
    description: 'Core programming concepts, data structures, algorithms, and computational reasoning.',
    tier: 'foundational',
  },
  {
    id: 'ecse202',
    code: 'ECSE 202',
    title: 'Introduction to Software Development',
    description: 'Structured and object-oriented software development practices and tools.',
    tier: 'foundational',
  },
  {
    id: 'ecse205',
    code: 'ECSE 205',
    title: 'Probability and Statistics for Engineers',
    description: 'Probability models, random variables, statistical inference, and engineering applications.',
    tier: 'foundational',
  },
  {
    id: 'ecse200',
    code: 'ECSE 200',
    title: 'Electric Circuits 1',
    description: 'Fundamental analysis of electrical circuits using laws, network theorems, and basic dynamic elements.',
    tier: 'foundational',
  },
  {
    id: 'ecse206',
    code: 'ECSE 206',
    title: 'Introduction to Signals and Systems',
    description: 'Core concepts of continuous and discrete signals, linear systems, and transform-based analysis.',
    tier: 'foundational',
  },
  {
    id: 'ecse210',
    code: 'ECSE 210',
    title: 'Electric Circuits 2',
    description: 'Advanced circuit analysis including AC steady state, Laplace methods, and LTI system behavior.',
    tier: 'foundational',
  },
  {
    id: 'ecse222',
    code: 'ECSE 222',
    title: 'Digital Logic',
    description: 'Fundamentals of digital systems including combinational and sequential circuit design.',
    tier: 'foundational',
  },

  // Intermediate
  {
    id: 'comp251',
    code: 'COMP 251',
    title: 'Algorithms and Data Structures',
    description: 'Design and analysis of algorithms including graph methods, dynamic programming, and data structures.',
    tier: 'intermediate',
  },
  {
    id: 'ecse308',
    code: 'ECSE 308',
    title: 'Communication Systems and Networks',
    description: 'Fundamentals of communication systems, networking principles, and signal transmission.',
    tier: 'intermediate',
  },
  {
    id: 'ecse310',
    code: 'ECSE 310',
    title: 'Thermodynamics of Computing',
    description: 'Thermodynamic principles applied to computation, information, and electronic systems.',
    tier: 'intermediate',
  },
  {
    id: 'ecse324',
    code: 'ECSE 324',
    title: 'Computer Organization',
    description: 'Computer architecture fundamentals including instruction sets, memory, and processor design.',
    tier: 'intermediate',
  },
  {
    id: 'ecse325',
    code: 'ECSE 325',
    title: 'Digital Systems',
    description: 'Design and implementation of digital systems with modeling, synthesis, and verification.',
    tier: 'intermediate',
  },
  {
    id: 'ecse331',
    code: 'ECSE 331',
    title: 'Electronics',
    description: 'Electronic circuit design using diodes, transistors, amplifiers, and simulation tools.',
    tier: 'intermediate',
  },
  {
    id: 'ecse353',
    code: 'ECSE 353',
    title: 'Electromagnetic Fields and Waves',
    description: 'Electromagnetic theory, wave propagation, and engineering applications.',
    tier: 'intermediate',
  },
  {
    id: 'ecse343',
    code: 'ECSE 343',
    title: 'Numerical Methods in Engineering',
    description: 'Numerical techniques for solving equations, optimization, and data-driven engineering problems.',
    tier: 'intermediate',
  },

  // Advanced / recent capstone
  {
    id: 'ecse425',
    code: 'ECSE 425',
    title: 'Computer Architecture',
    description: 'Advanced processor architecture including pipelining, parallelism, caching, and memory systems.',
    tier: 'advanced',
  },
  {
    id: 'ecse427',
    code: 'ECSE 427',
    title: 'Operating Systems',
    description: 'Core operating system concepts including processes, memory management, concurrency, and file systems.',
    tier: 'advanced',
  },
  {
    id: 'ecse444',
    code: 'ECSE 444',
    title: 'Microprocessors',
    description: 'Design and programming of microprocessor-based systems and real-time embedded hardware.',
    tier: 'advanced',
  },
  {
    id: 'ecse415',
    code: 'ECSE 415',
    title: 'Introduction to Computer Vision',
    description: 'Image analysis and computer vision techniques for recognition, segmentation, and motion.',
    tier: 'advanced',
  },
  {
    id: 'comp551',
    code: 'COMP 551',
    title: 'Applied Machine Learning',
    description: 'Machine learning methods for real-world data including classification, clustering, and model deployment.',
    tier: 'advanced',
  },
  {
    id: 'comp579',
    code: 'COMP 579',
    title: 'Reinforcement Learning',
    description: 'Decision-making algorithms based on Markov processes, learning, and control.',
    tier: 'advanced',
  },
]

export const courseLinks: CourseLink[] = [
  // Foundational -> Intermediate
  { source: 'ecse202', target: 'comp250' },
  { source: 'comp250', target: 'comp251' },
  { source: 'ecse200', target: 'ecse206' },
  { source: 'ecse200', target: 'ecse210' },
  { source: 'ecse202', target: 'ecse222' },
  { source: 'ecse205', target: 'ecse308' },
  { source: 'ecse206', target: 'ecse308' },
  { source: 'ecse200', target: 'ecse310' },
  { source: 'ecse205', target: 'ecse310' },
  { source: 'ecse222', target: 'ecse310' },
  { source: 'ecse200', target: 'ecse324' },
  { source: 'ecse222', target: 'ecse324' },
  { source: 'ecse324', target: 'ecse325' },
  { source: 'ecse210', target: 'ecse331' },
  { source: 'ecse210', target: 'ecse353' },
  { source: 'math262', target: 'ecse353' },
  { source: 'math263', target: 'ecse353' },
  { source: 'ecse205', target: 'ecse343' },
  { source: 'comp250', target: 'ecse343' },
  { source: 'math263', target: 'ecse343' },

  // Intermediate -> Advanced (recent largest course)
  { source: 'ecse324', target: 'ecse425' },
  { source: 'ecse324', target: 'ecse427' },
  { source: 'ecse324', target: 'ecse444' },
  { source: 'ecse206', target: 'ecse415' },
  { source: 'ecse205', target: 'ecse415' },
  { source: 'ecse205', target: 'comp551' },
  { source: 'comp551', target: 'comp579' },
]

