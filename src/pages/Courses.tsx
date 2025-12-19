import { useLanguage } from '../contexts/LanguageContext'

export default function Courses() {
  const { t } = useLanguage()

  const coreCourses = [
    t('courses.placeholder') + ' 1',
    t('courses.placeholder') + ' 2',
    t('courses.placeholder') + ' 3',
  ]

  const electives = [
    t('courses.placeholder') + ' 4',
    t('courses.placeholder') + ' 5',
    t('courses.placeholder') + ' 6',
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-12 text-text">
        {t('courses.title')}
      </h1>

      <div className="space-y-12">
        {/* Core Courses */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-text">
            {t('courses.core')}
          </h2>
          <ul className="space-y-3">
            {coreCourses.map((course, index) => (
              <li
                key={index}
                className="text-lg text-text-secondary pl-4 border-l-2 border-primary"
              >
                {course}
              </li>
            ))}
          </ul>
        </section>

        {/* Electives */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-text">
            {t('courses.electives')}
          </h2>
          <ul className="space-y-3">
            {electives.map((course, index) => (
              <li
                key={index}
                className="text-lg text-text-secondary pl-4 border-l-2 border-primary"
              >
                {course}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}

