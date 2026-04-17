'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/api'

interface PublishToggleProps {
  courseId: string
  isPublished: boolean
  onToggle: () => void
}

export function PublishToggle({ courseId, isPublished, onToggle }: PublishToggleProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleToggle() {
    setLoading(true)
    setError(null)
    try {
      await apiFetch(`/api/admin/courses/${courseId}`, {
        method: 'PATCH',
        body: JSON.stringify({ isPublished: !isPublished }),
      })
      onToggle()
    } catch {
      setError('Error al actualizar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
    <button
      type="button"
      role="switch"
      aria-checked={isPublished}
      aria-label={isPublished ? 'Publicado — click para despublicar' : 'No publicado — click para publicar'}
      disabled={loading}
      onClick={handleToggle}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        isPublished ? 'bg-rose-500' : 'bg-neutral-300',
      ].join(' ')}
    >
      <span
        className={[
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200',
          isPublished ? 'translate-x-4' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
    {error && <span className="text-xs text-error-500">{error}</span>}
    </div>
  )
}
