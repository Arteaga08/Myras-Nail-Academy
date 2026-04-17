'use client'

import { useState } from 'react'
import { Table, THead, TBody, TR, TH } from '@/components/ui/Table'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { UsersIcon as Users } from '@phosphor-icons/react/ssr'
import { useUsers } from '@/hooks/useUsers'
import { UserRow } from './UserRow'

export function UsersTable() {
  const [page, setPage] = useState(1)
  const { users, pagination, isLoading, error } = useUsers(page)

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar los estudiantes.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
      <Table>
        <THead>
          <TR>
            <TH>Estudiante</TH>
            <TH>Registro</TH>
            <TH>Detalles</TH>
          </TR>
        </THead>
        <TBody>
          {users.length === 0 ? (
            <TR>
              <td colSpan={3}>
                <EmptyState
                  title="Sin estudiantes"
                  description="Aún no hay estudiantes registrados."
                  icon={<Users size={28} />}
                />
              </td>
            </TR>
          ) : (
            users.map((user) => <UserRow key={user._id} user={user} />)
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
