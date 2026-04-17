import { ExploreCourseCard } from './ExploreCourseCard'
import type { Course } from '@/hooks/useExploreCourses'

interface CourseCatalogGridProps {
  courses: Course[]
  enrolledIds: Set<string>
  onEnrollSuccess: () => void
}

export function CourseCatalogGrid({ courses, enrolledIds, onEnrollSuccess }: CourseCatalogGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <ExploreCourseCard
          key={course._id}
          course={course}
          isEnrolled={enrolledIds.has(course._id)}
          onEnrollSuccess={onEnrollSuccess}
        />
      ))}
    </div>
  )
}
