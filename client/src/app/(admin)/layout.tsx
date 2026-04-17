'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { AdminShell } from '@/components/layout/AdminShell'
import { FullPageSpinner } from '@/components/ui/Spinner'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { token, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace('/login')
    }
  }, [token, isLoading, router])

  if (isLoading) return <FullPageSpinner />
  if (!token) return null

  return <AdminShell>{children}</AdminShell>
}
