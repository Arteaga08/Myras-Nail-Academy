import { LoginForm } from './LoginForm'

export function LoginCard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-nude-50 px-4">
      <div className="w-full max-w-md">
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
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-md">
          <h2 className="font-display mb-6 text-xl font-semibold text-neutral-900">
            Iniciar sesión
          </h2>
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          Solo personal autorizado tiene acceso a este panel.
        </p>
      </div>
    </div>
  )
}
