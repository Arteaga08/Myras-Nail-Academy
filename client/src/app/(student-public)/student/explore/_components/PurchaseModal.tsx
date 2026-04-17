'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { studentApiFetch } from '@/lib/studentApi'
import { formatCurrency } from '@/lib/formatters'
import type { Course } from '@/hooks/useExploreCourses'
import { XIcon as X } from '@phosphor-icons/react/ssr'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

interface PurchaseModalProps {
  course: Course
  onClose: () => void
  onSuccess: () => void
}

function CheckoutForm({ amount, onClose, onSuccess }: { amount: number; onClose: () => void; onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsSubmitting(true)
    setErrorMsg(null)

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (error) {
      setErrorMsg(error.message ?? 'Error al procesar el pago.')
      setIsSubmitting(false)
      return
    }

    showToast('¡Pago exitoso! Ya puedes acceder a tu curso.', 'success')
    onSuccess()
    onClose()
    router.push('/student/my-courses')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMsg && (
        <p className="rounded-lg bg-error-100 px-3 py-2 text-sm text-error-600">{errorMsg}</p>
      )}
      <div className="flex gap-3">
        <Button type="button" variant="secondary" fullWidth onClick={onClose} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
          Pagar {formatCurrency(amount / 100)}
        </Button>
      </div>
    </form>
  )
}

export function PurchaseModal({ course, onClose, onSuccess }: PurchaseModalProps) {
  const { showToast } = useToast()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [isCreating, setIsCreating] = useState(false)

  const initPayment = async () => {
    setIsCreating(true)
    try {
      const res = await studentApiFetch<{ data: { clientSecret: string; amount: number } }>(
        '/api/orders',
        { method: 'POST', body: JSON.stringify({ courseId: course._id }) }
      )
      setClientSecret(res.data.clientSecret)
      setPaymentAmount(res.data.amount)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'No se pudo iniciar el pago.'
      showToast(message, 'error')
      onClose()
    } finally {
      setIsCreating(false)
    }
  }

  // Auto-init when modal mounts
  if (!clientSecret && !isCreating) {
    initPayment()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-neutral-900">{course.title}</h2>
            <p className="text-sm text-neutral-500">
              {formatCurrency(course.effectivePrice ?? course.price)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        {isCreating || !clientSecret ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
          </div>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm amount={paymentAmount} onClose={onClose} onSuccess={onSuccess} />
          </Elements>
        )}
      </div>
    </div>
  )
}
