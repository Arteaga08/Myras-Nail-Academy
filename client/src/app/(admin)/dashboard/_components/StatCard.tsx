interface StatCardProps {
  label: string
  value: string
  icon: React.ReactNode
  variant?: 'brand' | 'default'
}

export function StatCard({ label, value, icon, variant = 'default' }: StatCardProps) {
  const isBrand = variant === 'brand'

  return (
    <div
      className={[
        'flex items-start justify-between rounded-xl border p-6',
        isBrand
          ? 'border-rose-100 bg-rose-50 shadow-xs'
          : 'border-neutral-200 bg-white shadow-sm',
      ].join(' ')}
    >
      <div>
        <p className={['text-sm font-medium', isBrand ? 'text-rose-600' : 'text-neutral-500'].join(' ')}>
          {label}
        </p>
        <p className="font-display mt-2 text-3xl font-bold tabular-nums text-neutral-900">
          {value}
        </p>
      </div>
      <div
        className={[
          'flex h-11 w-11 items-center justify-center rounded-xl',
          isBrand ? 'bg-rose-500/10 text-rose-500' : 'bg-neutral-100 text-neutral-400',
        ].join(' ')}
        aria-hidden="true"
      >
        {icon}
      </div>
    </div>
  )
}
