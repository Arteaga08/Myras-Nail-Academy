import { PageHeader } from '@/components/ui/PageHeader'
import { AuditTable } from './_components/AuditTable'

export default function AuditPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Auditoría"
        description="Registro de acciones realizadas por administradores"
      />
      <AuditTable />
    </div>
  )
}
