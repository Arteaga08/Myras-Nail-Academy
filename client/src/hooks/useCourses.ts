import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'

export interface Course {
  _id: string
  title: string
  slug: string
  shortDescription: string
  description: string
  price: number
  isOnSale: boolean
  salePrice: number | null
  effectivePrice: number
  thumbnail: string
  previewVideoUrl: string
  category: { _id: string; name: string }
  isPublished: boolean
  isFeatured: boolean
  totalDuration: number
  totalLessons: number
  averageRating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export function useCourses() {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: Course[]
  }>('/api/courses?limit=100', swrFetcher)

  return {
    courses: data?.data ?? [],
    isLoading,
    error,
    mutate,
  }
}

export function useCourse(id: string) {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: Course
  }>(id ? `/api/courses/${id}` : null, swrFetcher)

  return { course: data?.data ?? null, isLoading, error, mutate }
}
