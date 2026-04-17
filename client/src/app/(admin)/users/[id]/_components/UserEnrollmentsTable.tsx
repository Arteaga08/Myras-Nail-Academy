import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table'
import { Badge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/EmptyState'
import { formatDate } from '@/lib/formatters'
import { BookOpenIcon as BookOpen } from '@phosphor-icons/react/ssr'

interface Enrollment {
  _id: string
  courseId: { _id: string; title: string; thumbnail: string }
  enrolledAt: string
  completedAt: string | null
}

export function UserEnrollmentsTable({ enrollments }: { enrollments: Enrollment[] }) {
  return (
    <div>
      <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
        Cursos inscritos ({enrollments.length})
      </h2>

      <Table>
        <THead>
          <TR>
            <TH>Curso</TH>
            <TH>Inscripción</TH>
            <TH>Estado</TH>
          </TR>
        </THead>
        <TBody>
          {enrollments.length === 0 ? (
            <TR>
              <td colSpan={3}>
                <EmptyState
                  title="Sin inscripciones"
                  description="Este estudiante no se ha inscrito a ningún curso."
                  icon={<BookOpen size={28} />}
                />
              </td>
            </TR>
          ) : (
            enrollments.map((e) => (
              <TR key={e._id}>
                <TD>
                  <div className="flex items-center gap-3">
                    {e.courseId.thumbnail && (
                      <img
                        src={e.courseId.thumbnail}
                        alt=""
                        className="h-10 w-10 rounded-lg object-cover"
                      />
                    )}
                    <span className="font-medium text-neutral-900">{e.courseId.title}</span>
                  </div>
                </TD>
                <TD className="text-xs text-neutral-500">{formatDate(e.enrolledAt)}</TD>
                <TD>
                  {e.completedAt ? (
                    <Badge color="success">Completado</Badge>
                  ) : (
                    <Badge color="info">En progreso</Badge>
                  )}
                </TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}
