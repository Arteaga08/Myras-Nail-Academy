import useSWR from 'swr'
import { studentSwrFetcher } from '@/lib/studentApi'

export interface LessonResource {
  name: string
  url: string
}

export interface Lesson {
  _id: string
  title: string
  order: number
  duration: number
  isFree: boolean
  videoUrl?: string
  description?: string
  materials?: string[]
  resources?: LessonResource[]
  courseId?: string
}

interface EnrollmentCheckData {
  hasAccess: boolean
  enrollment: {
    completedLessons: string[]
    progressPercent: number
    completedAt: string | null
  } | null
}

export function useCourseLessons(courseId: string) {
  const {
    data: lessonsRes,
    error: lessonsError,
    isLoading: lessonsLoading,
  } = useSWR<{ status: string; data: Lesson[] }>(
    `/api/courses/${courseId}/lessons`,
    studentSwrFetcher
  )

  const {
    data: enrollmentRes,
    error: enrollmentError,
    isLoading: enrollmentLoading,
    mutate: mutateEnrollment,
  } = useSWR<{ status: string; data: EnrollmentCheckData }>(
    `/api/enrollments/check/${courseId}`,
    studentSwrFetcher
  )

  const lessons = lessonsRes?.data ?? []
  const hasAccess = enrollmentRes?.data?.hasAccess ?? false
  const completedLessons = enrollmentRes?.data?.enrollment?.completedLessons ?? []
  const progressPercent = enrollmentRes?.data?.enrollment?.progressPercent ?? 0
  const completedAt = enrollmentRes?.data?.enrollment?.completedAt ?? null

  return {
    lessons,
    hasAccess,
    completedLessons,
    progressPercent,
    completedAt,
    isLoading: lessonsLoading || enrollmentLoading,
    error: lessonsError || enrollmentError,
    mutateEnrollment,
  }
}
