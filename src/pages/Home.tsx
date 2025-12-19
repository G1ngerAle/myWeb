import { useLanguage } from '../contexts/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-5xl font-bold mb-4 text-text">
          {t('home.name')}
        </h1>
        <p className="text-2xl text-text-secondary mb-8">
          {t('home.tagline')}
        </p>
        <p className="text-lg leading-relaxed text-text-secondary max-w-3xl">
          {t('home.intro')}
        </p>
      </section>
    </div>
  )
}

