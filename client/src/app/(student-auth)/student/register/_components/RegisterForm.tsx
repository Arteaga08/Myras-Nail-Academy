'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { studentApiFetch } from '@/lib/studentApi'
import { useStudentAuth } from '@/hooks/useStudentAuth'

const schema = z
  .object({
    firstName: z.string().min(2, 'Mínimo 2 caracteres'),
    lastName: z.string().min(2, 'Mínimo 2 caracteres'),
    email: z.string().email('Ingresa un email válido'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Debe incluir una mayúscula')
      .regex(/[a-z]/, 'Debe incluir una minúscula')
      .regex(/[0-9]/, 'Debe incluir un número'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type FormData = z.infer<typeof schema>

interface RegisterResponse {
  status: string
  data: {
    _id: string
    firstName: string
    lastName: string
    email: string
    token: string
  }
}

export function RegisterForm() {
  const { login } = useStudentAuth()
  const toast = useToast()
  const searchParams = useSearchParams()
  const buyParam = searchParams.get('buy')
  const redirectAfterRegister = buyParam
    ? `/student/explore?buy=${buyParam}`
    : '/student/explore'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    try {
      const res = await studentApiFetch<RegisterResponse>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
        skipAuth: true,
      })
      const { _id, firstName, lastName, email, token } = res.data
      login(token, `${firstName} ${lastName}`, email, _id, redirectAfterRegister)
    } catch (err: unknown) {
      const error = err as Error
      toast(error.message ?? 'Error al crear la cuenta. Intenta de nuevo.', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input
          label="Nombre"
          type="text"
          autoComplete="given-name"
          placeholder="Ana"
          required
          error={errors.firstName?.message}
          {...register('firstName')}
        />
        <Input
          label="Apellido"
          type="text"
          autoComplete="family-name"
          placeholder="García"
          required
          error={errors.lastName?.message}
          {...register('lastName')}
        />
      </div>

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
        autoComplete="new-password"
        placeholder="Mínimo 8 caracteres"
        required
        helperText="Mínimo 8 caracteres con mayúscula, minúscula y número"
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        label="Confirmar contraseña"
        showPasswordToggle
        autoComplete="new-password"
        placeholder="Repite tu contraseña"
        required
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={isSubmitting}
        className="mt-2"
      >
        Crear cuenta
      </Button>
    </form>
  )
}
