'use client'

import { useForm } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'
import { z } from 'zod'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { studentApiFetch } from '@/lib/studentApi'
import { useStudentAuth } from '@/hooks/useStudentAuth'

const schema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

type FormData = z.infer<typeof schema>

interface LoginResponse {
  status: string
  data: {
    _id: string
    firstName: string
    lastName: string
    email: string
    token: string
  }
}

export function StudentLoginForm() {
  const { login } = useStudentAuth()
  const toast = useToast()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return') ?? undefined

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>()

  async function onSubmit(data: FormData) {
    try {
      const res = await studentApiFetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
        skipAuth: true,
      })
      const { _id, firstName, lastName, email, token } = res.data
      login(token, `${firstName} ${lastName}`, email, _id, returnUrl)
    } catch (err: unknown) {
      const error = err as Error & { status?: number }
      if (error.status === 401) {
        setError('password', { type: 'server', message: error.message ?? 'Email o contraseña incorrectos' })
      } else {
        toast(error.message ?? 'Error al iniciar sesión. Intenta de nuevo.', 'error')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="tu@email.com"
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
        className="mt-2"
      >
        Ingresar
      </Button>
    </form>
  )
}
