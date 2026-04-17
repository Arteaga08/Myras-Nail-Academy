'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { studentApiFetch } from '@/lib/studentApi'
import type { StudentProfile } from '@/hooks/useStudentProfile'

const schema = z.object({
  firstName: z.string().min(1, 'El nombre es requerido'),
  lastName: z.string().min(1, 'El apellido es requerido'),
  bio: z.string().max(500, 'Máximo 500 caracteres').optional(),
})

type FormValues = z.infer<typeof schema>

interface ProfileFormProps {
  profile: StudentProfile
  onSuccess: () => void
}

export function ProfileForm({ profile, onSuccess }: ProfileFormProps) {
  const { showToast } = useToast()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: profile.firstName, lastName: profile.lastName, bio: profile.bio ?? '' },
  })

  useEffect(() => {
    reset({ firstName: profile.firstName, lastName: profile.lastName, bio: profile.bio ?? '' })
  }, [profile, reset])

  const onSubmit = async (values: FormValues) => {
    try {
      await studentApiFetch('/api/auth/me', {
        method: 'PUT',
        body: JSON.stringify(values),
      })
      showToast('Perfil actualizado correctamente.', 'success')
      onSuccess()
    } catch {
      showToast('No se pudo actualizar el perfil.', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral-700">Nombre</label>
          <input
            {...register('firstName')}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
          {errors.firstName && <p className="text-xs text-error-600">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-neutral-700">Apellido</label>
          <input
            {...register('lastName')}
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          />
          {errors.lastName && <p className="text-xs text-error-600">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-700">Email</label>
        <input
          value={profile.email}
          disabled
          className="w-full rounded-lg border border-neutral-100 bg-neutral-50 px-3 py-2 text-sm text-neutral-400 cursor-not-allowed"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-700">Bio</label>
        <textarea
          {...register('bio')}
          rows={3}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 resize-none"
          placeholder="Cuéntanos un poco sobre ti..."
        />
        {errors.bio && <p className="text-xs text-error-600">{errors.bio.message}</p>}
      </div>

      <Button type="submit" variant="primary" loading={isSubmitting}>
        Guardar cambios
      </Button>
    </form>
  )
}
