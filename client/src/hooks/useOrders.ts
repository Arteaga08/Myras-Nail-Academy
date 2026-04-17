import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export interface Order {
  _id: string
  stripeIntentId: string
  amount: number
  currency: string
  status: OrderStatus
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

export function useOrders(page = 1, limit = 20) {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: Order[]
    pagination: Pagination
  }>(`/api/admin/orders?page=${page}&limit=${limit}`, swrFetcher)

  return {
    orders: data?.data ?? [],
    pagination: data?.pagination ?? null,
    isLoading,
    error,
    mutate,
  }
}
