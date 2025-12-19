import { useLanguage } from '../contexts/LanguageContext'

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-md border border-border bg-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 text-sm font-medium"
      aria-label="Toggle language"
    >
      {language === 'en' ? 'FR' : 'EN'}
    </button>
  )
}

