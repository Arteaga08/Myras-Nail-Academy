import Link from 'next/link'
import { PageHeader } from '@/components/ui/PageHeader'
import { Button } from '@/components/ui/Button'
import { PlusIcon as Plus } from '@phosphor-icons/react/ssr'
import { CoursesTable } from './_components/CoursesTable'

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Cursos"
        description="Gestión de cursos de la academia"
        action={
          <Link href="/courses/new">
            <Button size="sm">
              <Plus size={16} />
              Nuevo curso
            </Button>
          </Link>
        }
      />
      <CoursesTable />
    </div>
  )
}
