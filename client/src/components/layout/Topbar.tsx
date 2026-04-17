'use client'

import { ListIcon } from '@phosphor-icons/react/ssr'
import { useAuth } from '@/hooks/useAuth'

interface TopbarProps {
  onToggleNav: () => void
}

export function Topbar({ onToggleNav }: TopbarProps) {
  const { adminName } = useAuth()

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 md:px-6">
      <button
        type="button"
        onClick={onToggleNav}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-neutral-600 transition-colors duration-150 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 md:hidden"
        aria-label="Abrir menú de navegación"
      >
        <ListIcon size={24} aria-hidden="true" />
      </button>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-600"
          aria-hidden="true"
        >
          {adminName?.charAt(0).toUpperCase() ?? 'A'}
        </div>
        <span className="text-sm font-medium text-neutral-700 hidden sm:block">
          {adminName}
        </span>
      </div>
    </header>
  )
}
