'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { studentApiFetch } from '@/lib/studentApi'

const schema = z
  .object({
    currentPassword: z.string().min(1, 'Ingresa tu contraseña actual'),
    newPassword: z.string().min(8, 'Mínimo 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirma tu nueva contraseña'),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type FormValues = z.infer<typeof schema>

export function ChangePasswordForm() {
  const showToast = useToast()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: FormValues) => {
    try {
      await studentApiFetch('/api/auth/me/password', {
        method: 'PUT',
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      })
      showToast('Contraseña actualizada correctamente.', 'success')
      reset()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo cambiar la contraseña.'
      showToast(message, 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-700">Contraseña actual</label>
        <input
          type="password"
          {...register('currentPassword')}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
        {errors.currentPassword && <p className="text-xs text-error-600">{errors.currentPassword.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-700">Nueva contraseña</label>
        <input
          type="password"
          {...register('newPassword')}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
        {errors.newPassword && <p className="text-xs text-error-600">{errors.newPassword.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-700">Confirmar contraseña</label>
        <input
          type="password"
          {...register('confirmPassword')}
          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
        />
        {errors.confirmPassword && <p className="text-xs text-error-600">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" variant="secondary" loading={isSubmitting}>
        Cambiar contraseña
      </Button>
    </form>
  )
}
