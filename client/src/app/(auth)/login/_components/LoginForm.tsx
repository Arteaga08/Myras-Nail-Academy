'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { LockoutAlert } from './LockoutAlert'
import { apiFetch } from '@/lib/api'
import { useAuth } from '@/hooks/useAuth'

const schema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type FormData = z.infer<typeof schema>

interface LoginResponse {
  status: string
  data: {
    _id: string
    name: string
    email: string
    token: string
  }
}

export function LoginForm() {
  const { login } = useAuth()
  const toast = useToast()
  const [lockoutSeconds, setLockoutSeconds] = useState<number | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    setLockoutSeconds(null)

    try {
      const res = await apiFetch<LoginResponse>('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        skipAuth: true,
      })
      login(res.data.token, res.data.name, res.data.email)
    } catch (err: unknown) {
      const error = err as Error & { status?: number; body?: { message?: string; retryAfter?: number } }

      if (error.status === 429) {
        const retryAfter = error.body?.retryAfter ?? 900
        setLockoutSeconds(retryAfter)
        return
      }

      if (error.status === 401) {
        setError('password', { type: 'server', message: error.message ?? 'Email o contraseña incorrectos' })
        return
      }

      toast(error.message ?? 'Error al iniciar sesión. Intenta de nuevo.', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {lockoutSeconds !== null && (
        <LockoutAlert retryAfterSeconds={lockoutSeconds} />
      )}

      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="admin@myrasnailacademy.com"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Contraseña"
        showPasswordToggle
        autoComplete="current-password"
        placeholder="Tu contraseña"
        required
        error={errors.password?.message}
        {...register('password')}
      />

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isSubmitting}
        disabled={lockoutSeconds !== null && lockoutSeconds > 0}
        className="mt-2"
      >
        Iniciar sesión
      </Button>
    </form>
  )
}
