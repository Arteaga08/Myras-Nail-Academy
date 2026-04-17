'use client'

import { use } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon as ArrowLeft } from '@phosphor-icons/react/ssr'
import { PageHeader } from '@/components/ui/PageHeader'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useUser } from '@/hooks/useUser'
import { UserProfileCard } from './_components/UserProfileCard'
import { UserEnrollmentsTable } from './_components/UserEnrollmentsTable'

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { detail, isLoading, error } = useUser(id)

  if (isLoading) return <FullPageSpinner />

  if (error || !detail) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar el estudiante.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/users"
          className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-700"
        >
          <ArrowLeft size={16} />
          Estudiantes
        </Link>
      </div>

      <PageHeader
        title={`${detail.user.firstName} ${detail.user.lastName}`}
        breadcrumb={[
          { label: 'Estudiantes', href: '/users' },
          { label: `${detail.user.firstName} ${detail.user.lastName}` },
        ]}
      />

      <UserProfileCard user={detail.user} />
      <UserEnrollmentsTable enrollments={detail.enrollments} />
    </div>
  )
}
