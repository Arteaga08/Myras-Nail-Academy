import { PageHeader } from '@/components/ui/PageHeader'
import { CourseForm } from './_components/CourseForm'

export default function NewCoursePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuevo curso"
        breadcrumb={[{ label: 'Cursos', href: '/courses' }, { label: 'Nuevo curso' }]}
      />
      <div className="max-w-3xl">
        <CourseForm mode="create" />
      </div>
    </div>
  )
}
