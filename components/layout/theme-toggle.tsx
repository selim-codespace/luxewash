'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useMounted } from '@/hooks/use-mounted'
 
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-full bg-graphite flex items-center justify-center opacity-50 cursor-default">
        <Sun size={18} className="text-text-secondary" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full border border-white/5 bg-obsidian flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/50 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  )
}
