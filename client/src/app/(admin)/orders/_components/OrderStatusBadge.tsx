import { Badge } from '@/components/ui/Badge'
import type { OrderStatus } from '@/hooks/useOrders'

const statusConfig: Record<OrderStatus, { label: string; color: 'success' | 'warning' | 'error' | 'neutral' }> = {
  paid:      { label: 'Pagado',     color: 'success' },
  pending:   { label: 'Pendiente',  color: 'warning' },
  failed:    { label: 'Fallido',    color: 'error' },
  refunded:  { label: 'Reembolso',  color: 'neutral' },
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = statusConfig[status] ?? { label: status, color: 'neutral' as const }
  return <Badge color={config.color}>{config.label}</Badge>
}
