import { PageHeader } from '@/components/ui/PageHeader'
import { ReviewsTable } from './_components/ReviewsTable'

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        description="Reseñas de estudiantes sobre los cursos"
      />
      <ReviewsTable />
    </div>
  )
}
