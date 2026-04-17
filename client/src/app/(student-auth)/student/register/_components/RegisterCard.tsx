'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FloatingAssets } from '@/components/student/FloatingAssets'
import { RegisterForm } from './RegisterForm'

export function RegisterCard() {
  const searchParams = useSearchParams()
  const buyParam = searchParams.get('buy')
  const loginHref = buyParam ? `/student/login?buy=${buyParam}` : '/student/login'

  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-12">
      <FloatingAssets />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500 shadow-lg">
            <span className="font-display text-2xl font-bold text-white">M</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">
            Myra&apos;s Nail Academy
          </h1>
          <p className="mt-2 text-sm text-neutral-500">Crea tu cuenta</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-rose-100 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="font-display mb-1 text-xl font-semibold text-neutral-900">
            Únete a la academia
          </h2>
          <p className="mb-6 text-sm text-neutral-500">
            Comienza tu camino en el arte de las uñas
          </p>
          <RegisterForm />
        </div>

        <p className="mt-6 text-center text-sm text-neutral-500">
          ¿Ya tienes cuenta?{' '}
          <Link
            href={loginHref}
            className="font-medium text-rose-500 transition-colors hover:text-rose-600"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
