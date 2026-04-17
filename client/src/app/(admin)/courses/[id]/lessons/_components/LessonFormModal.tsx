'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { apiFetch } from '@/lib/api'

const schema = z.object({
  title: z.string().min(3, 'Mínimo 3 caracteres'),
  description: z.string().optional(),
  videoUrl: z.string().url('URL válida').or(z.string().length(0)).optional(),
  duration: z.coerce.number().min(0).optional(),
  order: z.coerce.number().min(1),
})

type FormData = z.infer<typeof schema>

interface Lesson {
  _id: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
}

interface LessonFormModalProps {
  open: boolean
  onClose: () => void
  onSaved: () => void
  courseId: string
  lesson?: Lesson | null
}

export function LessonFormModal({
  open,
  onClose,
  onSaved,
  courseId,
  lesson,
}: LessonFormModalProps) {
  const isEdit = !!lesson
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  useEffect(() => {
    if (lesson) {
      reset({
        title: lesson.title,
        description: lesson.description ?? '',
        videoUrl: lesson.videoUrl ?? '',
        duration: lesson.duration ?? 0,
        order: lesson.order,
      })
    } else {
      reset({ order: 1 })
    }
  }, [lesson, reset])

  async function onSubmit(data: FormData) {
    setServerError(null)
    try {
      if (isEdit) {
        await apiFetch(`/api/admin/courses/${courseId}/lessons/${lesson._id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        })
      } else {
        await apiFetch(`/api/admin/courses/${courseId}/lessons`, {
          method: 'POST',
          body: JSON.stringify(data),
        })
      }
      onSaved()
      onClose()
    } catch (err: unknown) {
      const e = err as Error
      setServerError(e.message ?? 'Error al guardar la lección')
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Editar lección' : 'Nueva lección'}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {serverError && (
          <div className="rounded-lg bg-error-100 px-4 py-3 text-sm text-error-600" role="alert">
            {serverError}
          </div>
        )}

        <Input label="Título" required error={errors.title?.message} {...register('title')} />
        <Textarea label="Descripción" rows={3} {...register('description')} />
        <Input
          label="URL del video"
          type="url"
          placeholder="https://..."
          error={errors.videoUrl?.message}
          {...register('videoUrl')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Duración (min)"
            type="number"
            min="0"
            error={errors.duration?.message}
            {...register('duration')}
          />
          <Input
            label="Orden"
            type="number"
            min="1"
            required
            error={errors.order?.message}
            {...register('order')}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" size="sm" loading={isSubmitting}>
            {isEdit ? 'Guardar cambios' : 'Crear lección'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
