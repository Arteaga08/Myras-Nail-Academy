'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { apiFetch } from '@/lib/api'
import { toSlug } from '@/lib/formatters'
import { useCategories } from '@/hooks/useCategories'
import type { Course } from '@/hooks/useCourses'
import { useState } from 'react'

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  slug: z.string().min(3, 'Mínimo 3 caracteres'),
  shortDescription: z.string().min(10, 'Mínimo 10 caracteres'),
  description: z.string().min(20, 'Mínimo 20 caracteres'),
  price: z.coerce.number().min(0, 'El precio debe ser mayor o igual a 0'),
  salePrice: z.coerce.number().min(0).optional(),
  thumbnail: z.string().url('Debe ser una URL válida').or(z.string().length(0)).optional(),
  previewVideoUrl: z.string().url('Debe ser una URL válida').or(z.string().length(0)).optional(),
  category: z.string().min(1, 'Selecciona una categoría'),
  isFeatured: z.boolean().optional(),
})

type FormData = z.infer<typeof schema>

interface CourseFormProps {
  mode: 'create' | 'edit'
  initialData?: Course
  courseId?: string
}

export function CourseForm({ mode, initialData, courseId }: CourseFormProps) {
  const router = useRouter()
  const { categories } = useCategories()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: initialData
      ? {
          title: initialData.title,
          slug: initialData.slug,
          shortDescription: initialData.shortDescription,
          description: initialData.description,
          price: initialData.price,
          salePrice: initialData.salePrice ?? undefined,
          thumbnail: initialData.thumbnail ?? '',
          previewVideoUrl: initialData.previewVideoUrl ?? '',
          category: typeof initialData.category === 'object' ? initialData.category._id : initialData.category,
          isFeatured: initialData.isFeatured,
        }
      : { isFeatured: false },
  })

  const titleValue = watch('title')

  // Auto-generar slug en modo crear
  useEffect(() => {
    if (mode === 'create' && titleValue) {
      setValue('slug', toSlug(titleValue), { shouldValidate: false })
    }
  }, [titleValue, mode, setValue])

  const categoryOptions = categories.map((c) => ({ value: c._id, label: c.name }))

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      if (mode === 'create') {
        await apiFetch('/api/admin/courses', {
          method: 'POST',
          body: JSON.stringify(data),
        })
      } else {
        await apiFetch(`/api/admin/courses/${courseId}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        })
      }
      router.push('/courses')
      router.refresh()
    } catch (err: unknown) {
      const e = err as Error
      setServerError(e.message ?? 'Error al guardar el curso')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {serverError && (
        <div className="rounded-lg border border-error-500/20 bg-error-100 px-4 py-3 text-sm text-error-600" role="alert">
          {serverError}
        </div>
      )}

      <Card>
        <h2 className="font-display mb-5 text-base font-semibold text-neutral-900">
          Información general
        </h2>
        <div className="space-y-4">
          <Input label="Título" required error={errors.title?.message} {...register('title')} />
          <Input
            label="Slug (URL)"
            required
            helperText="Se genera automáticamente desde el título"
            error={errors.slug?.message}
            {...register('slug')}
          />
          <Input
            label="Descripción corta"
            required
            error={errors.shortDescription?.message}
            {...register('shortDescription')}
          />
          <Textarea
            label="Descripción completa"
            required
            rows={5}
            error={errors.description?.message}
            {...register('description')}
          />
        </div>
      </Card>

      <Card>
        <h2 className="font-display mb-5 text-base font-semibold text-neutral-900">
          Precio y categoría
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Precio (MXN)"
            type="number"
            required
            min="0"
            step="0.01"
            error={errors.price?.message}
            {...register('price')}
          />
          <Input
            label="Precio en oferta (MXN)"
            type="number"
            min="0"
            step="0.01"
            helperText="Opcional — deja vacío si no hay oferta"
            error={errors.salePrice?.message}
            {...register('salePrice')}
          />
          <Select
            label="Categoría"
            required
            options={categoryOptions}
            placeholder="Selecciona una categoría"
            error={errors.category?.message}
            {...register('category')}
          />
          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isFeatured"
              className="h-4 w-4 rounded border-neutral-300 text-rose-500 focus:ring-rose-500"
              {...register('isFeatured')}
            />
            <label htmlFor="isFeatured" className="text-sm text-neutral-700">
              Marcar como curso destacado
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-display mb-5 text-base font-semibold text-neutral-900">
          Multimedia
        </h2>
        <div className="space-y-4">
          <Input
            label="URL del thumbnail"
            type="url"
            placeholder="https://..."
            error={errors.thumbnail?.message}
            {...register('thumbnail')}
          />
          <Input
            label="URL del video de preview"
            type="url"
            placeholder="https://..."
            error={errors.previewVideoUrl?.message}
            {...register('previewVideoUrl')}
          />
        </div>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/courses')}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {mode === 'create' ? 'Crear curso' : 'Guardar cambios'}
        </Button>
      </div>
    </form>
  )
}
