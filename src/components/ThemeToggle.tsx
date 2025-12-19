import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md border border-border bg-surface hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 text-sm font-medium"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  )
}

