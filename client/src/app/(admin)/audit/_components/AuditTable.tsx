'use client'

import { useState } from 'react'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { ScrollIcon as Scroll } from '@phosphor-icons/react/ssr'
import { formatDateTime, truncate } from '@/lib/formatters'
import { useAuditLogs } from '@/hooks/useAuditLogs'
import { AuditActionBadge } from './AuditActionBadge'

export function AuditTable() {
  const [page, setPage] = useState(1)
  const { logs, pagination, isLoading, error } = useAuditLogs(page, 50)

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar los registros de auditoría.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
      <Table>
        <THead>
          <TR>
            <TH>Admin</TH>
            <TH>Acción</TH>
            <TH className="hidden md:table-cell">Módulo</TH>
            <TH className="hidden md:table-cell">Recurso</TH>
            <TH>Fecha</TH>
          </TR>
        </THead>
        <TBody>
          {logs.length === 0 ? (
            <TR>
              <td colSpan={5}>
                <EmptyState
                  title="Sin registros"
                  description="No hay actividad de administración registrada."
                  icon={<Scroll size={28} />}
                />
              </td>
            </TR>
          ) : (
            logs.map((log) => (
              <TR key={log._id}>
                <TD>
                  <p className="font-medium text-neutral-900 text-sm">{log.adminId.name}</p>
                  <p className="text-xs text-neutral-400">{log.adminId.email}</p>
                </TD>
                <TD>
                  <AuditActionBadge action={log.action} />
                </TD>
                <TD className="hidden md:table-cell">
                  <span className="inline-block rounded bg-neutral-100 px-2 py-0.5 font-mono text-xs text-neutral-600">
                    {log.module}
                  </span>
                </TD>
                <TD className="hidden font-mono text-xs text-neutral-400 md:table-cell">
                  {log.targetId ? truncate(log.targetId, 18) : '—'}
                </TD>
                <TD className="text-xs text-neutral-500">{formatDateTime(log.createdAt)}</TD>
              </TR>
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
