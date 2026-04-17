'use client'

import { useState } from 'react'
import { StarIcon as Star } from '@phosphor-icons/react/ssr'
import { Table, THead, TBody, TR, TH } from '@/components/ui/Table'
import { Pagination } from '@/components/ui/Pagination'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useReviews } from '@/hooks/useReviews'
import { ReviewRow } from './ReviewRow'

export function ReviewsTable() {
  const [page, setPage] = useState(1)
  const { reviews, pagination, isLoading, error, mutate } = useReviews(page)

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar las reviews.
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
            <TH>Calificación</TH>
            <TH className="hidden lg:table-cell">Comentario</TH>
            <TH className="hidden md:table-cell">Fecha</TH>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {reviews.length === 0 ? (
            <TR>
              <td colSpan={6}>
                <EmptyState
                  title="Sin reviews"
                  description="Aún no hay reseñas de estudiantes."
                  icon={<Star size={28} />}
                />
              </td>
            </TR>
          ) : (
            reviews.map((review) => (
              <ReviewRow
                key={review._id}
                review={review}
                onDeleted={() => mutate()}
              />
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
