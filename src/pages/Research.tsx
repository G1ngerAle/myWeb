import { useLanguage } from '../contexts/LanguageContext'

export default function Research() {
  const { t } = useLanguage()

  const experiences = [
    {
      institution: t('research.placeholder.institution') + ' 1',
      role: t('research.placeholder.role') + ' 1',
      description: t('research.placeholder.desc'),
    },
    {
      institution: t('research.placeholder.institution') + ' 2',
      role: t('research.placeholder.role') + ' 2',
      description: t('research.placeholder.desc'),
    },
    {
      institution: t('research.placeholder.institution') + ' 3',
      role: t('research.placeholder.role') + ' 3',
      description: t('research.placeholder.desc'),
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-text">
        {t('research.title')}
      </h1>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="border-l-4 border-primary pl-6 pb-8 last:pb-0"
          >
            <h2 className="text-2xl font-semibold mb-2 text-text">
              {exp.institution}
            </h2>
            <p className="text-lg text-primary mb-3">{exp.role}</p>
            <p className="text-text-secondary leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

