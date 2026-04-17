import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

interface UserEnrollment {
  _id: string
  userId: string
  courseId: { _id: string; title: string; thumbnail: string }
  enrolledAt: string
  completedAt: string | null
}

interface UserDetail {
  user: {
    _id: string
    firstName: string
    lastName: string
    email: string
    profilePicture: string | null
    bio: string | null
    createdAt: string
    updatedAt: string
  }
  enrollments: UserEnrollment[]
}

export function useUser(id: string) {
  const { data, error, isLoading } = useSWR<{ status: string; data: UserDetail }>(
    id ? `/api/admin/users/${id}` : null,
    swrFetcher
  )

  return {
    detail: data?.data ?? null,
    isLoading,
    error,
  }
}
