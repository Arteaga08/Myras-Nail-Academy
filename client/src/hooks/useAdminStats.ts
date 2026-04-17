import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

interface AdminStats {
  totalRevenue: number
  totalOrders: number
  totalStudents: number
  totalCourses: number
  completedCourses: number
  recentEnrollments: {
    _id: string
    userId: { _id: string; firstName: string; lastName: string; email: string }
    courseId: { _id: string; title: string }
    enrolledAt: string
  }[]
  courseBreakdown: {
    _id: string
    title: string
    enrollmentCount: number
  }[]
}

export function useAdminStats() {
  const { data, error, isLoading } = useSWR<{ status: string; data: AdminStats }>(
    '/api/admin/stats',
    swrFetcher
  )

  return {
    stats: data?.data ?? null,
    isLoading,
    error,
  }
}
