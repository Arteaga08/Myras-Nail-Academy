import useSWR from 'swr'
import { studentSwrFetcher } from '@/lib/studentApi'
import { useStudentAuth } from '@/hooks/useStudentAuth'
import type { Enrollment } from '@/hooks/useMyEnrollments'

export interface Course {
  _id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  price: number
  isOnSale: boolean
  salePrice: number
  thumbnail: string
  category: { _id: string; name: string } | null
  totalLessons: number
  totalDuration: number
  averageRating: number
  reviewCount: number
  effectivePrice: number
}

export function useExploreCourses() {
  const { token } = useStudentAuth()

  const { data: coursesData, error: coursesError, isLoading: coursesLoading } = useSWR<{
    status: string
    data: Course[]
  }>('/api/courses', studentSwrFetcher)

  // Only fetch enrollments when authenticated — avoids a 401 redirect for guests
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useSWR<{
    status: string
    data: Enrollment[]
  }>(token ? '/api/enrollments/mine' : null, studentSwrFetcher)

  const courses = coursesData?.data ?? []
  const enrolledIds = new Set(
    (enrollmentsData?.data ?? []).map((e) => e.courseId._id)
  )

  return {
    courses,
    enrolledIds,
    isLoading: coursesLoading || (token ? enrollmentsLoading : false),
    error: coursesError,
  }
}
