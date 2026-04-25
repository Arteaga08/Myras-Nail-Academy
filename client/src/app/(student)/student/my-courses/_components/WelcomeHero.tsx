import { NailSparkle, NailAccent } from '@/components/ui/DecorativeAssets'

interface WelcomeHeroProps {
  firstName: string
}

export function WelcomeHero({ firstName }: WelcomeHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-rose-500 to-rose-400 px-6 py-8 shadow-lg sm:px-12 sm:py-10">
      {/* Orbes ambientales */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      {/* Composición decorativa ambiental (solo en desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute right-10 top-6 opacity-40">
          <NailAccent size={70} className="**:fill-white!" />
        </div>
        <div className="absolute bottom-0 right-28 opacity-60">
          <NailSparkle size={120} className="**:fill-white! **:opacity-30!" />
        </div>
        <div className="absolute right-48 top-8 opacity-50">
          <NailSparkle size={40} className="**:fill-white! **:opacity-40!" />
        </div>
      </div>

      <div className="relative z-10">
        <h1 className="flex items-center gap-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span>Hola, {firstName}!</span>
          <NailAccent size={36} className="shrink-0" />
        </h1>
        <p className="mt-1.5 text-base text-rose-100">
          Continúa aprendiendo y transforma tu pasión en arte.
        </p>
      </div>
    </div>
  )
}
