import useSWR from 'swr'
import { studentSwrFetcher } from '@/lib/studentApi'
import type { Course } from '@/hooks/useExploreCourses'

export function useFeaturedCourse() {
  const { data, error, isLoading } = useSWR<{
    status: string
    data: Course[]
  }>('/api/courses?featured=true', studentSwrFetcher)

  return {
    course: data?.data?.[0] ?? null,
    isLoading,
    error,
  }
}
