'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { apiFetch } from '@/lib/api'

interface ReconcileButtonProps {
  paymentId: string
  onSuccess: () => void
}

export function ReconcileButton({ paymentId, onSuccess }: ReconcileButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleReconcile() {
    setLoading(true)
    setError(null)
    try {
      await apiFetch(`/api/admin/orders/${paymentId}/reconcile`, { method: 'POST' })
      setOpen(false)
      onSuccess()
    } catch (err: unknown) {
      const e = err as Error
      setError(e.message ?? 'Error al reconciliar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Reconciliar
      </Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Reconciliar orden"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-neutral-600">
            ¿Confirmas la reconciliación manual de este pago? Esto generará una inscripción si no existe.
          </p>

          {error && (
            <p className="text-sm text-error-600" role="alert">{error}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button size="sm" loading={loading} onClick={handleReconcile}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
