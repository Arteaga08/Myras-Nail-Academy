import { FloatingAssets } from '@/components/student/FloatingAssets'
import { LoginForm } from './LoginForm'

export function LoginCard() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center px-4 py-12">
      <FloatingAssets />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500 shadow-lg">
            <span className="font-display text-2xl font-bold text-white">M</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">
            Myra&apos;s Nail Academy
          </h1>
          <p className="mt-2 text-sm text-neutral-500">Panel Administrativo</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-rose-100 bg-white/90 p-8 shadow-lg backdrop-blur-sm">
          <h2 className="font-display mb-1 text-xl font-semibold text-neutral-900">
            Iniciar sesión
          </h2>
          <p className="mb-6 text-sm text-neutral-500">Solo personal autorizado</p>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          Solo personal autorizado tiene acceso a este panel.
        </p>
      </div>
    </div>
  )
}
