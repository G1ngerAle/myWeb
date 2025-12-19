import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import { useLanguage } from '../contexts/LanguageContext'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const location = useLocation()
  const { t } = useLanguage()

  const navItems = [
    { path: '/', key: 'nav.home' },
    { path: '/courses', key: 'nav.courses' },
    { path: '/projects', key: 'nav.projects' },
    { path: '/research', key: 'nav.research' },
    { path: '/contact', key: 'nav.contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <span className="text-text hover:text-primary transition-colors duration-200">
                    {t(item.key)}
                  </span>
                  {/* Hover underline animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300 ease-out"></span>
                  {/* Active page indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}

