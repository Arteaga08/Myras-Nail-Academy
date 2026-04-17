import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table'
import { formatDate } from '@/lib/formatters'

interface Enrollment {
  _id: string
  userId: { _id: string; firstName: string; lastName: string; email: string }
  courseId: { _id: string; title: string }
  enrolledAt: string
}

interface RecentEnrollmentsTableProps {
  enrollments: Enrollment[]
}

export function RecentEnrollmentsTable({ enrollments }: RecentEnrollmentsTableProps) {
  return (
    <div>
      <h2 className="font-display mb-4 text-lg font-semibold text-neutral-900">
        Inscripciones recientes
      </h2>

      <Table>
        <THead>
          <TR>
            <TH>Estudiante</TH>
            <TH>Curso</TH>
            <TH>Fecha</TH>
          </TR>
        </THead>
        <TBody>
          {enrollments.length === 0 ? (
            <TR>
              <TD className="py-8 text-center text-neutral-400" colSpan={3}>
                Sin inscripciones recientes
              </TD>
            </TR>
          ) : (
            enrollments.map((e) => (
              <TR key={e._id}>
                <TD>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {e.userId.firstName} {e.userId.lastName}
                    </p>
                    <p className="text-xs text-neutral-400">{e.userId.email}</p>
                  </div>
                </TD>
                <TD className="text-neutral-700">{e.courseId.title}</TD>
                <TD className="text-neutral-500 text-xs">{formatDate(e.enrolledAt)}</TD>
              </TR>
            ))
          )}
        </TBody>
      </Table>
    </div>
  )
}
