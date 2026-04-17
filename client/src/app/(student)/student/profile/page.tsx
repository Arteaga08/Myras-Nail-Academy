'use client'

import { useStudentProfile } from '@/hooks/useStudentProfile'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { Card } from '@/components/ui/Card'
import { AvatarSection } from './_components/AvatarSection'
import { ProfileForm } from './_components/ProfileForm'
import { ChangePasswordForm } from './_components/ChangePasswordForm'

export default function ProfilePage() {
  const { profile, isLoading, mutate } = useStudentProfile()

  if (isLoading) return <FullPageSpinner />

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-neutral-500">
        No se pudo cargar tu perfil.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-neutral-900">Mi Perfil</h1>
        <p className="mt-2 text-base text-neutral-500">
          Administra tu información personal y preferencias.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Avatar column */}
        <Card variant="default">
          <AvatarSection profile={profile} onSuccess={() => mutate()} />
        </Card>

        {/* Forms column */}
        <div className="space-y-6 lg:col-span-2">
          <Card variant="default">
            <h2 className="mb-4 font-display text-lg font-semibold text-neutral-900">
              Información Personal
            </h2>
            <ProfileForm profile={profile} onSuccess={() => mutate()} />
          </Card>

          <Card variant="default">
            <h2 className="mb-4 font-display text-lg font-semibold text-neutral-900">
              Cambiar Contraseña
            </h2>
            <ChangePasswordForm />
          </Card>
        </div>
      </div>
    </div>
  )
}
