type BadgeColor = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'rose'

interface BadgeProps {
  color?: BadgeColor
  children: React.ReactNode
  className?: string
}

const colors: Record<BadgeColor, string> = {
  success: 'bg-success-100 text-success-700 border-success-600/20',
  warning: 'bg-warning-100 text-warning-700 border-warning-600/20',
  error:   'bg-error-100 text-error-600 border-error-500/20',
  info:    'bg-info-100 text-info-700 border-info-500/20',
  neutral: 'bg-neutral-100 text-neutral-600 border-neutral-300',
  rose:    'bg-rose-100 text-rose-600 border-rose-300',
}

export function Badge({
  color = 'neutral',
  children,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        colors[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}
