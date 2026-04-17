'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { apiFetch } from '@/lib/api'
import { toSlug } from '@/lib/formatters'
import type { Category } from '@/hooks/useCategories'

const schema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  slug: z.string().min(2, 'Mínimo 2 caracteres'),
  description: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface CategoryModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  category?: Category | null
}

export function CategoryModal({ open, onClose, onSaved, category }: CategoryModalProps) {
  const isEdit = !!category
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const nameValue = watch('name')

  useEffect(() => {
    if (category) {
      reset({ name: category.name, slug: category.slug, description: category.description ?? '' })
    } else {
      reset({ name: '', slug: '', description: '' })
    }
  }, [category, reset])

  useEffect(() => {
    if (!isEdit && nameValue) {
      setValue('slug', toSlug(nameValue), { shouldValidate: false })
    }
  }, [nameValue, isEdit, setValue])

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      if (isEdit) {
        await apiFetch(`/api/admin/categories/${category._id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        })
      } else {
        await apiFetch('/api/admin/categories', {
          method: 'POST',
          body: JSON.stringify(data),
        })
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      const e = err as Error
      setServerError(e.message ?? 'Error al guardar')
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={isEdit ? 'Editar categoría' : 'Nueva categoría'} size="sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {serverError && (
          <div className="rounded-lg bg-error-100 px-4 py-3 text-sm text-error-600" role="alert">
            {serverError}
          </div>
        )}
        <Input label="Nombre" required error={errors.name?.message} {...register('name')} />
        <Input
          label="Slug"
          required
          helperText="Se genera automáticamente"
          error={errors.slug?.message}
          {...register('slug')}
        />
        <Textarea label="Descripción" rows={3} {...register('description')} />
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancelar</Button>
          <Button type="submit" size="sm" loading={isSubmitting}>
            {isEdit ? 'Guardar cambios' : 'Crear categoría'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
