interface WelcomeHeroProps {
  firstName: string
}

export function WelcomeHero({ firstName }: WelcomeHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-rose-500 to-rose-400 px-8 py-7 shadow-lg">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -right-2 top-10 h-20 w-20 rounded-full bg-white/10" />

      <h1 className="font-display text-3xl font-bold text-white">
        Hola, {firstName}! 👋
      </h1>
      <p className="mt-1.5 text-base text-rose-100">
        Continúa aprendiendo y transforma tu pasión en arte.
      </p>
    </div>
  )
}
