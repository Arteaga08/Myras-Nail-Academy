'use client'

import { useState } from 'react'
import { TrashIcon as Trash } from '@phosphor-icons/react/ssr'
import { apiFetch } from '@/lib/api'

interface DeleteReviewButtonProps {
  reviewId: string
  onDeleted: () => void
}

export function DeleteReviewButton({ reviewId, onDeleted }: DeleteReviewButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleDelete() {
    if (!window.confirm('¿Eliminar esta review? Esta acción no se puede deshacer.')) return

    setIsLoading(true)
    try {
      await apiFetch(`/api/admin/reviews/${reviewId}`, { method: 'DELETE' })
      onDeleted()
    } catch {
      alert('Error al eliminar la review. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isLoading}
      aria-label="Eliminar review"
      className="flex items-center justify-center rounded-lg p-2 text-neutral-400 transition-colors duration-150 hover:bg-error-100 hover:text-error-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error-500 disabled:opacity-50"
    >
      <Trash size={16} aria-hidden="true" />
    </button>
  )
}
