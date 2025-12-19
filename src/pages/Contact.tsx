import { useLanguage } from '../contexts/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-text">
        {t('contact.title')}
      </h1>

      <div className="space-y-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-text">
            {t('contact.email')}
          </h2>
          <a
            href="mailto:your.email@example.com"
            className="text-primary hover:underline"
          >
            your.email@example.com
          </a>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-text">
            {t('contact.linkedin')}
          </h2>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            linkedin.com/in/yourprofile
          </a>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2 text-text">
            {t('contact.github')}
          </h2>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            github.com/yourusername
          </a>
        </div>
      </div>
    </div>
  )
}

