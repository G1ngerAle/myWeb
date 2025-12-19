import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Language = 'en' | 'fr'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.courses': 'Taken Courses',
    'nav.projects': 'Projects',
    'nav.research': 'Research Experiences',
    'nav.contact': 'Contact',
    'home.name': 'Your Name',
    'home.tagline': 'Academic Researcher & Scholar',
    'home.intro': 'Welcome to my academic website. I am passionate about research and education, with a focus on advancing knowledge in my field. This site showcases my academic journey, projects, and research experiences.',
    'courses.title': 'Taken Courses',
    'courses.core': 'Core Courses',
    'courses.electives': 'Electives',
    'courses.placeholder': 'Course Name',
    'projects.title': 'Projects',
    'projects.placeholder.title': 'Project Title',
    'projects.placeholder.desc': 'A brief description of the project, its objectives, and key outcomes.',
    'research.title': 'Research Experiences',
    'research.placeholder.institution': 'Institution Name',
    'research.placeholder.role': 'Research Role',
    'research.placeholder.desc': 'Description of research activities and contributions.',
    'contact.title': 'Contact',
    'contact.email': 'Email',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.courses': 'Cours Suivis',
    'nav.projects': 'Projets',
    'nav.research': 'Expériences de Recherche',
    'nav.contact': 'Contact',
    'home.name': 'Votre Nom',
    'home.tagline': 'Chercheur Académique & Universitaire',
    'home.intro': 'Bienvenue sur mon site web académique. Je suis passionné par la recherche et l\'éducation, avec un focus sur l\'avancement des connaissances dans mon domaine. Ce site présente mon parcours académique, mes projets et mes expériences de recherche.',
    'courses.title': 'Cours Suivis',
    'courses.core': 'Cours de Base',
    'courses.electives': 'Cours au Choix',
    'courses.placeholder': 'Nom du Cours',
    'projects.title': 'Projets',
    'projects.placeholder.title': 'Titre du Projet',
    'projects.placeholder.desc': 'Une brève description du projet, ses objectifs et résultats clés.',
    'research.title': 'Expériences de Recherche',
    'research.placeholder.institution': 'Nom de l\'Institution',
    'research.placeholder.role': 'Rôle de Recherche',
    'research.placeholder.desc': 'Description des activités de recherche et contributions.',
    'contact.title': 'Contact',
    'contact.email': 'Courriel',
    'contact.linkedin': 'LinkedIn',
    'contact.github': 'GitHub',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language')
    return (saved as Language) || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

