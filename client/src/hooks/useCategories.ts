import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

export interface Category {
  _id: string
  name: string
  slug: string
  description: string
  createdAt: string
  updatedAt: string
}

export function useCategories() {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: Category[]
  }>('/api/categories', swrFetcher)

  return {
    categories: data?.data ?? [],
    isLoading,
    error,
    mutate,
  }
}
