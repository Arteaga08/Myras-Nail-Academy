type CardVariant = 'default' | 'soft' | 'brand'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
}

const variants: Record<CardVariant, string> = {
  default: 'bg-white border border-neutral-200 shadow-sm',
  soft: 'bg-nude-50 border border-nude-200',
  brand: 'bg-rose-50 border border-rose-100',
}

export function Card({
  variant = 'default',
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={['rounded-2xl p-6', variants[variant], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
