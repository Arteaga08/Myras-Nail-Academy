'use client'

import { Table, THead, TBody, TR, TH } from '@/components/ui/Table'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { BookOpenIcon as BookOpen } from '@phosphor-icons/react/ssr'
import { useCourses } from '@/hooks/useCourses'
import { CourseRow } from './CourseRow'

export function CoursesTable() {
  const { courses, isLoading, error, mutate } = useCourses()

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar los cursos.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
      <Table>
        <THead>
          <TR>
            <TH>Curso</TH>
            <TH className="hidden md:table-cell">Categoría</TH>
            <TH>Precio</TH>
            <TH>Publicado</TH>
            <TH className="hidden md:table-cell">Lecciones</TH>
            <TH>Editar</TH>
          </TR>
        </THead>
        <TBody>
          {courses.length === 0 ? (
            <TR>
              <td colSpan={6}>
                <EmptyState
                  title="Sin cursos"
                  description="Crea el primer curso para la academia."
                  icon={<BookOpen size={28} />}
                />
              </td>
            </TR>
          ) : (
            courses.map((course) => (
              <CourseRow key={course._id} course={course} onMutate={mutate} />
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}
