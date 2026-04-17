'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { apiFetch } from '@/lib/api'
import { TrashIcon as Trash } from '@phosphor-icons/react/ssr'

interface DeleteLessonButtonProps {
  courseId: string
  lessonId: string
  lessonTitle: string
  onDeleted: () => void
}

export function DeleteLessonButton({
  courseId,
  lessonId,
  lessonTitle,
  onDeleted,
}: DeleteLessonButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setLoading(true)
    setError(null)
    try {
      await apiFetch(`/api/admin/courses/${courseId}/lessons/${lessonId}`, {
        method: 'DELETE',
      })
      setOpen(false)
      onDeleted()
    } catch (err: unknown) {
      const e = err as Error
      setError(e.message ?? 'Error al eliminar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded p-1 text-neutral-400 hover:bg-error-100 hover:text-error-600 transition-colors"
        aria-label={`Eliminar lección ${lessonTitle}`}
      >
        <Trash size={16} />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Eliminar lección" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            ¿Seguro que deseas eliminar{' '}
            <span className="font-medium text-neutral-900">"{lessonTitle}"</span>?
            Esta acción no se puede deshacer.
          </p>
          {error && <p className="text-sm text-error-600" role="alert">{error}</p>}
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button variant="destructive" size="sm" loading={loading} onClick={handleDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
