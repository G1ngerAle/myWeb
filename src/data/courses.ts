export type CourseTier = 'foundational' | 'intermediate' | 'advanced'

export interface CourseNode {
  id: string
  code: string
  title: string
  title_fr: string
  description: string
  description_fr: string
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
    title_fr: 'Introduction à l\'informatique',
    description: 'Core programming concepts, data structures, algorithms, and computational reasoning.',
    description_fr: 'Concepts fondamentaux de programmation, structures de données, algorithmes et raisonnement computationnel.',
    tier: 'foundational',
  },
  {
    id: 'ecse202',
    code: 'ECSE 202',
    title: 'Introduction to Software Development',
    title_fr: 'Introduction au développement logiciel',
    description: 'Structured and object-oriented software development practices and tools.',
    description_fr: 'Pratiques et outils de développement logiciel structuré et orienté objet.',
    tier: 'foundational',
  },
  {
    id: 'ecse205',
    code: 'ECSE 205',
    title: 'Probability and Statistics for Engineers',
    title_fr: 'Probabilités et statistiques pour ingénieurs',
    description: 'Probability models, random variables, statistical inference, and engineering applications.',
    description_fr: 'Modèles probabilistes, variables aléatoires, inférence statistique et applications en ingénierie.',
    tier: 'foundational',
  },
  {
    id: 'ecse200',
    code: 'ECSE 200',
    title: 'Electric Circuits 1',
    title_fr: 'Circuits électriques 1',
    description: 'Fundamental analysis of electrical circuits using laws, network theorems, and basic dynamic elements.',
    description_fr: 'Analyse fondamentale des circuits électriques utilisant les lois, théorèmes de réseau et éléments dynamiques de base.',
    tier: 'foundational',
  },
  {
    id: 'ecse206',
    code: 'ECSE 206',
    title: 'Introduction to Signals and Systems',
    title_fr: 'Introduction aux signaux et systèmes',
    description: 'Core concepts of continuous and discrete signals, linear systems, and transform-based analysis.',
    description_fr: 'Concepts fondamentaux des signaux continus et discrets, systèmes linéaires et analyse basée sur les transformées.',
    tier: 'foundational',
  },
  {
    id: 'ecse210',
    code: 'ECSE 210',
    title: 'Electric Circuits 2',
    title_fr: 'Circuits électriques 2',
    description: 'Advanced circuit analysis including AC steady state, Laplace methods, and LTI system behavior.',
    description_fr: 'Analyse avancée des circuits incluant l\'état stationnaire AC, méthodes de Laplace et comportement des systèmes LTI.',
    tier: 'foundational',
  },
  {
    id: 'ecse222',
    code: 'ECSE 222',
    title: 'Digital Logic',
    title_fr: 'Logique numérique',
    description: 'Fundamentals of digital systems including combinational and sequential circuit design.',
    description_fr: 'Fondements des systèmes numériques incluant la conception de circuits combinatoires et séquentiels.',
    tier: 'foundational',
  },

  // Intermediate
  {
    id: 'comp251',
    code: 'COMP 251',
    title: 'Algorithms and Data Structures',
    title_fr: 'Algorithmes et structures de données',
    description: 'Design and analysis of algorithms including graph methods, dynamic programming, and data structures.',
    description_fr: 'Conception et analyse d\'algorithmes incluant les méthodes de graphes, programmation dynamique et structures de données.',
    tier: 'intermediate',
  },
  {
    id: 'ecse308',
    code: 'ECSE 308',
    title: 'Communication Systems and Networks',
    title_fr: 'Systèmes de communication et réseaux',
    description: 'Fundamentals of communication systems, networking principles, and signal transmission.',
    description_fr: 'Fondements des systèmes de communication, principes de réseautage et transmission de signaux.',
    tier: 'intermediate',
  },
  {
    id: 'ecse310',
    code: 'ECSE 310',
    title: 'Thermodynamics of Computing',
    title_fr: 'Thermodynamique du calcul',
    description: 'Thermodynamic principles applied to computation, information, and electronic systems.',
    description_fr: 'Principes thermodynamiques appliqués au calcul, à l\'information et aux systèmes électroniques.',
    tier: 'intermediate',
  },
  {
    id: 'ecse324',
    code: 'ECSE 324',
    title: 'Computer Organization',
    title_fr: 'Organisation des ordinateurs',
    description: 'Computer architecture fundamentals including instruction sets, memory, and processor design.',
    description_fr: 'Fondements de l\'architecture des ordinateurs incluant les jeux d\'instructions, la mémoire et la conception de processeurs.',
    tier: 'intermediate',
  },
  {
    id: 'ecse325',
    code: 'ECSE 325',
    title: 'Digital Systems',
    title_fr: 'Systèmes numériques',
    description: 'Design and implementation of digital systems with modeling, synthesis, and verification.',
    description_fr: 'Conception et implémentation de systèmes numériques avec modélisation, synthèse et vérification.',
    tier: 'intermediate',
  },
  {
    id: 'ecse331',
    code: 'ECSE 331',
    title: 'Electronics',
    title_fr: 'Électronique',
    description: 'Electronic circuit design using diodes, transistors, amplifiers, and simulation tools.',
    description_fr: 'Conception de circuits électroniques utilisant diodes, transistors, amplificateurs et outils de simulation.',
    tier: 'intermediate',
  },
  {
    id: 'ecse353',
    code: 'ECSE 353',
    title: 'Electromagnetic Fields and Waves',
    title_fr: 'Champs et ondes électromagnétiques',
    description: 'Electromagnetic theory, wave propagation, and engineering applications.',
    description_fr: 'Théorie électromagnétique, propagation des ondes et applications en ingénierie.',
    tier: 'intermediate',
  },
  {
    id: 'ecse343',
    code: 'ECSE 343',
    title: 'Numerical Methods in Engineering',
    title_fr: 'Méthodes numériques en ingénierie',
    description: 'Numerical techniques for solving equations, optimization, and data-driven engineering problems.',
    description_fr: 'Techniques numériques pour résoudre des équations, optimisation et problèmes d\'ingénierie basés sur les données.',
    tier: 'intermediate',
  },

  // Advanced / recent capstone
  {
    id: 'ecse425',
    code: 'ECSE 425',
    title: 'Computer Architecture',
    title_fr: 'Architecture des ordinateurs',
    description: 'Advanced processor architecture including pipelining, parallelism, caching, and memory systems.',
    description_fr: 'Architecture avancée des processeurs incluant le pipeline, parallélisme, mise en cache et systèmes mémoire.',
    tier: 'advanced',
  },
  {
    id: 'ecse427',
    code: 'ECSE 427',
    title: 'Operating Systems',
    title_fr: 'Systèmes d\'exploitation',
    description: 'Core operating system concepts including processes, memory management, concurrency, and file systems.',
    description_fr: 'Concepts fondamentaux des systèmes d\'exploitation incluant processus, gestion de la mémoire, concurrence et systèmes de fichiers.',
    tier: 'advanced',
  },
  {
    id: 'ecse444',
    code: 'ECSE 444',
    title: 'Microprocessors',
    title_fr: 'Microprocesseurs',
    description: 'Design and programming of microprocessor-based systems and real-time embedded hardware.',
    description_fr: 'Conception et programmation de systèmes basés sur microprocesseurs et matériel embarqué en temps réel.',
    tier: 'advanced',
  },
  {
    id: 'ecse415',
    code: 'ECSE 415',
    title: 'Introduction to Computer Vision',
    title_fr: 'Introduction à la vision par ordinateur',
    description: 'Image analysis and computer vision techniques for recognition, segmentation, and motion.',
    description_fr: 'Analyse d\'images et techniques de vision par ordinateur pour la reconnaissance, segmentation et mouvement.',
    tier: 'advanced',
  },
  {
    id: 'comp551',
    code: 'COMP 551',
    title: 'Applied Machine Learning',
    title_fr: 'Apprentissage automatique appliqué',
    description: 'Machine learning methods for real-world data including classification, clustering, and model deployment.',
    description_fr: 'Méthodes d\'apprentissage automatique pour données réelles incluant classification, clustering et déploiement de modèles.',
    tier: 'advanced',
  },
  {
    id: 'comp579',
    code: 'COMP 579',
    title: 'Reinforcement Learning',
    title_fr: 'Apprentissage par renforcement',
    description: 'Decision-making algorithms based on Markov processes, learning, and control.',
    description_fr: 'Algorithmes de prise de décision basés sur les processus de Markov, apprentissage et contrôle.',
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

