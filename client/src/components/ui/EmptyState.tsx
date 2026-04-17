import { TrayIcon as Tray } from '@phosphor-icons/react/ssr'

interface EmptyStateProps {
  title?: string
  description?: string
  action?: React.ReactNode
  icon?: React.ReactNode
}

export function EmptyState({
  title = 'Sin resultados',
  description = 'No hay datos para mostrar.',
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
        {icon ?? <Tray size={28} />}
      </div>
      <div>
        <p className="font-display text-base font-semibold text-neutral-700">{title}</p>
        <p className="mt-1 text-sm text-neutral-400">{description}</p>
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
