import { PageHeader } from '@/components/ui/PageHeader'
import { OrdersTable } from './_components/OrdersTable'

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Órdenes"
        description="Historial de pagos y transacciones"
      />
      <OrdersTable />
    </div>
  )
}
