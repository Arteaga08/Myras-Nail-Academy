'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  label: string
  icon: React.ReactNode
  onNavigate?: () => void
}

export function NavLink({ href, label, icon, onNavigate }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href || pathname.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? 'page' : undefined}
      className={[
        'flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2',
        isActive
          ? 'border-l-2 border-rose-500 bg-rose-50 text-rose-600'
          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900',
      ].join(' ')}
    >
      <span
        className={[
          'flex shrink-0 items-center justify-center',
          isActive ? 'text-rose-500' : 'text-neutral-400',
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="leading-none">{label}</span>
    </Link>
  )
}
