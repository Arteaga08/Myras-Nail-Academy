import { PageHeader } from '@/components/ui/PageHeader'
import { UsersTable } from './_components/UsersTable'

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Estudiantes"
        description="Lista de todos los estudiantes registrados"
      />
      <UsersTable />
    </div>
  )
}
