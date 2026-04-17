'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import {
  SquaresFourIcon as SquaresFour,
  UsersIcon as Users,
  ShoppingBagIcon as ShoppingBag,
  BookOpenIcon as BookOpen,
  TagIcon as Tag,
  ScrollIcon as Scroll,
  SignOutIcon as SignOut,
  StarIcon as Star,
} from '@phosphor-icons/react/ssr'
import { NavLink } from './NavLink'
import { useAuth } from '@/hooks/useAuth'

const NAV_ICON_SIZE = 20

const navItems = [
  { href: '/dashboard',  label: 'Dashboard',   icon: <SquaresFour size={NAV_ICON_SIZE} /> },
  { href: '/courses',    label: 'Cursos',       icon: <BookOpen size={NAV_ICON_SIZE} /> },
  { href: '/users',      label: 'Estudiantes',  icon: <Users size={NAV_ICON_SIZE} /> },
  { href: '/orders',     label: 'Órdenes',      icon: <ShoppingBag size={NAV_ICON_SIZE} /> },
  { href: '/reviews',    label: 'Reviews',      icon: <Star size={NAV_ICON_SIZE} /> },
  { href: '/categories', label: 'Categorías',   icon: <Tag size={NAV_ICON_SIZE} /> },
  { href: '/audit',      label: 'Auditoría',    icon: <Scroll size={NAV_ICON_SIZE} /> },
]

interface SidebarProps {
  isMobileOpen: boolean
  onClose: () => void
}

export function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const { adminName, logout } = useAuth()
  const pathname = usePathname()

  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  useEffect(() => {
    if (!isMobileOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isMobileOpen, onClose])

  useEffect(() => {
    if (!isMobileOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [isMobileOpen])

  return (
    <>
      <div
        className={[
          'fixed inset-0 z-30 bg-black/50 transition-opacity duration-200 motion-safe:ease-out md:hidden',
          isMobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col border-r border-neutral-200 bg-white',
          'transform transition-transform duration-200 motion-safe:ease-out',
          'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
          'md:static md:z-auto md:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
        aria-label="Navegación lateral"
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 shadow-xs">
            <span className="font-display text-base font-bold text-white">M</span>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-neutral-900 leading-tight">
              Myra&apos;s Nail Academy
            </p>
            <p className="text-xs text-neutral-400">Admin</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Navegación principal">
          <ul className="flex flex-col gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  onNavigate={onClose}
                />
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-neutral-200 p-4">
          <div className="mb-3 px-1">
            <p className="text-xs font-medium text-neutral-700 truncate">{adminName}</p>
            <p className="text-xs text-neutral-400">Administrador</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-500 transition-colors duration-150 hover:bg-error-100 hover:text-error-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 focus-visible:ring-offset-2"
          >
            <SignOut size={20} aria-hidden="true" />
            <span className="leading-none">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}
