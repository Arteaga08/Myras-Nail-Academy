import { EnrollmentCard } from './EnrollmentCard'
import type { Enrollment } from '@/hooks/useMyEnrollments'

interface CoursesGridProps {
  enrollments: Enrollment[]
}

export function CoursesGrid({ enrollments }: CoursesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {enrollments.map((enrollment) => (
        <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
      ))}
    </div>
  )
}
