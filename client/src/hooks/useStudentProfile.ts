import useSWR from 'swr'
import { studentSwrFetcher } from '@/lib/studentApi'

export interface StudentProfile {
  _id: string
  firstName: string
  lastName: string
  email: string
  bio: string
  profilePicture: string
}

export function useStudentProfile() {
  const { data, error, isLoading, mutate } = useSWR<{
    status: string
    data: StudentProfile
  }>('/api/auth/me', studentSwrFetcher)

  return {
    profile: data?.data ?? null,
    isLoading,
    error,
    mutate,
  }
}
