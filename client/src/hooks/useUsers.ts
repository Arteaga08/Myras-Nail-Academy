import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

export interface AdminUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  profilePicture: string | null
  bio: string | null
  createdAt: string
  updatedAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export function useUsers(page = 1, limit = 20) {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: AdminUser[]
    pagination: Pagination
  }>(`/api/admin/users?page=${page}&limit=${limit}`, swrFetcher)

  return {
    users: data?.data ?? [],
    pagination: data?.pagination ?? null,
    isLoading,
    error,
    mutate,
  }
}
