import useSWR from 'swr'
import { studentSwrFetcher } from '@/lib/studentApi'
import type { Course } from '@/hooks/useExploreCourses'

export interface PublicLesson {
  _id: string
  title: string
  order: number
  duration: number
  isFree: boolean
}

export interface CourseWithLessons extends Course {
  lessons: PublicLesson[]
}

export function useCourseBySlug(slug: string | null) {
  const { data, error, isLoading } = useSWR<{
    status: string
    data: CourseWithLessons
  }>(slug ? `/api/courses/slug/${slug}` : null, studentSwrFetcher)

  return { course: data?.data ?? null, isLoading, error }
}
