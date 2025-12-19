import { useLanguage } from '../contexts/LanguageContext'

export default function Projects() {
  const { t } = useLanguage()

  const projects = [
    {
      title: t('projects.placeholder.title') + ' 1',
      description: t('projects.placeholder.desc'),
    },
    {
      title: t('projects.placeholder.title') + ' 2',
      description: t('projects.placeholder.desc'),
    },
    {
      title: t('projects.placeholder.title') + ' 3',
      description: t('projects.placeholder.desc'),
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-text">
        {t('projects.title')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-surface border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <h2 className="text-xl font-semibold mb-3 text-text">
              {project.title}
            </h2>
            <p className="text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

