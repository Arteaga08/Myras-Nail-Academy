'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutIcon as SignOut } from '@phosphor-icons/react/ssr'
import { useStudentAuth } from '@/hooks/useStudentAuth'
import { useStudentProfile } from '@/hooks/useStudentProfile'
import { Button } from '@/components/ui/Button'

const GUEST_LINKS = [
  { href: '/student/explore', label: 'Explorar Cursos' },
]

const AUTH_LINKS = [
  { href: '/student/explore', label: 'Explorar' },
  { href: '/student/my-courses', label: 'Mis Cursos' },
  { href: '/student/profile', label: 'Perfil' },
]

export function StudentTopbar() {
  const { token, studentName, logout } = useStudentAuth()
  const { profile } = useStudentProfile()
  const pathname = usePathname()

  const navLinks = token ? AUTH_LINKS : GUEST_LINKS
  const initial = studentName?.charAt(0).toUpperCase() ?? 'E'

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 md:px-6">
      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-sm font-bold text-white">
          M
        </div>
        <span className="hidden font-display text-base font-semibold text-neutral-900 sm:block">
          Myra&apos;s Nail Academy
        </span>
      </div>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)
          return (
            <Link
              key={href}
              href={href}
              className={[
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2',
                isActive
                  ? 'bg-rose-50 text-rose-600 font-semibold'
                  : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900',
              ].join(' ')}
              aria-current={isActive ? 'page' : undefined}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Right: auth state */}
      {token ? (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {profile?.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt={studentName ?? 'Avatar'}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-600">
                {initial}
              </div>
            )}
            <span className="hidden text-sm font-medium text-neutral-700 sm:block">
              {studentName}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
            <SignOut size={16} />
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/student/login"
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/student/register"
            className="rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-rose-600"
          >
            Registrarse
          </Link>
        </div>
      )}
    </header>
  )
}
