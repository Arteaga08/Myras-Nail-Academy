import { CircleNotchIcon as CircleNotch } from '@phosphor-icons/react/ssr'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const pixelSizes: Record<NonNullable<SpinnerProps['size']>, number> = {
  sm: 16,
  md: 24,
  lg: 32,
}

export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <CircleNotch
      size={pixelSizes[size]}
      className={['animate-spin text-rose-500', className].filter(Boolean).join(' ')}
      aria-label="Cargando"
    />
  )
}

export function FullPageSpinner() {
  return (
    <div className="flex h-full min-h-[200px] items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}
