'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStudentAuth } from '@/hooks/useStudentAuth'
import { StudentShell } from '@/components/layout/StudentShell'
import { FullPageSpinner } from '@/components/ui/Spinner'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useStudentAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/student/login')
    }
  }, [token, isLoading, router])

  if (isLoading) return <FullPageSpinner />
  if (!token) return null

  return <StudentShell>{children}</StudentShell>
}
