import { TR, TD } from '@/components/ui/Table'
import { formatCurrency, formatDate } from '@/lib/formatters'
import type { Order } from '@/hooks/useOrders'
import { OrderStatusBadge } from './OrderStatusBadge'
import { ReconcileButton } from './ReconcileButton'

interface OrderRowProps {
  order: Order
  onReconciled: () => void
}

export function OrderRow({ order, onReconciled }: OrderRowProps) {
  const canReconcile = order.status === 'pending' || order.status === 'failed'

  return (
    <TR>
      <TD>
        <div>
          <p className="font-medium text-neutral-900">
            {order.userId.firstName} {order.userId.lastName}
          </p>
          <p className="text-xs text-neutral-400">{order.userId.email}</p>
        </div>
      </TD>
      <TD className="hidden text-neutral-700 md:table-cell">{order.courseId.title}</TD>
      <TD className="font-medium tabular-nums">{formatCurrency(order.amount / 100)}</TD>
      <TD><OrderStatusBadge status={order.status} /></TD>
      <TD className="hidden text-xs text-neutral-500 md:table-cell">{formatDate(order.createdAt)}</TD>
      <TD>
        {canReconcile && (
          <ReconcileButton paymentId={order._id} onSuccess={onReconciled} />
        )}
      </TD>
    </TR>
  )
}
