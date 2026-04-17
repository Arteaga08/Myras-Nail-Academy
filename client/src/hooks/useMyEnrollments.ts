import useSWR from 'swr'
import { studentSwrFetcher } from '@/lib/studentApi'

export interface EnrolledCourse {
  _id: string
  title: string
  slug: string
  thumbnail: string
  totalLessons: number
  averageRating: number
}

export interface Enrollment {
  _id: string
  courseId: EnrolledCourse
  completedLessons: string[]
  progressPercent: number
  completedAt: string | null
  enrolledAt: string
  accessGranted: boolean
}

export function useMyEnrollments() {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: Enrollment[]
  }>('/api/enrollments/mine', studentSwrFetcher)

  const enrollments = data?.data ?? []

  const totalEnrolled = enrollments.length
  const totalCompleted = enrollments.filter((e) => e.progressPercent === 100).length
  const averageProgress =
    enrollments.length > 0
      ? Math.round(
          enrollments.reduce((sum, e) => sum + e.progressPercent, 0) / enrollments.length
        )
      : 0

  return {
    enrollments,
    isLoading,
    error,
    mutate,
    totalEnrolled,
    totalCompleted,
    averageProgress,
  }
}
