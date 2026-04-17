'use client'

import { useState } from 'react'
import { Table, THead, TBody, TR, TH } from '@/components/ui/Table'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { ShoppingBagIcon as ShoppingBag } from '@phosphor-icons/react/ssr'
import { useOrders } from '@/hooks/useOrders'
import { OrderRow } from './OrderRow'

export function OrdersTable() {
  const [page, setPage] = useState(1)
  const { orders, pagination, isLoading, error, mutate } = useOrders(page)

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar las órdenes.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
      <Table>
        <THead>
          <TR>
            <TH>Estudiante</TH>
            <TH className="hidden md:table-cell">Curso</TH>
            <TH>Monto</TH>
            <TH>Estado</TH>
            <TH className="hidden md:table-cell">Fecha</TH>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {orders.length === 0 ? (
            <TR>
              <td colSpan={6}>
                <EmptyState
                  title="Sin órdenes"
                  description="No hay órdenes registradas."
                  icon={<ShoppingBag size={28} />}
                />
              </td>
            </TR>
          ) : (
            orders.map((order) => (
              <OrderRow key={order._id} order={order} onReconciled={() => mutate()} />
            ))
          )}
        </TBody>
      </Table>

      {pagination && (
        <Pagination
          page={page}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  )
}
