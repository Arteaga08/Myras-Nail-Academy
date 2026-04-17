import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

export interface Review {
  _id: string
  rating: number
  comment: string | null
  userId: { _id: string; firstName: string; lastName: string; email: string }
  courseId: { _id: string; title: string }
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function useReviews(page = 1, limit = 20) {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: Review[]
    pagination: Pagination
  }>(`/api/admin/reviews?page=${page}&limit=${limit}`, swrFetcher)

  return {
    reviews: data?.data ?? [],
    pagination: data?.pagination ?? null,
    isLoading,
    error,
    mutate,
  }
}
