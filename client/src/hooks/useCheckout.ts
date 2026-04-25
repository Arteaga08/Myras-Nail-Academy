'use client'

import { useEffect, useState } from 'react'
import { studentApiFetch } from '@/lib/studentApi'
import type { Course } from '@/hooks/useExploreCourses'

export type CheckoutStep = 'payment' | 'success'

export interface UseCheckoutReturn {
  course: Course | null
  clientSecret: string | null
  paymentId: string | null
  paymentAmount: number
  isLoading: boolean
  error: string | null
  step: CheckoutStep
  setStep: (step: CheckoutStep) => void
}

export function useCheckout(courseId: string): UseCheckoutReturn {
  const [course, setCourse] = useState<Course | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentId, setPaymentId] = useState<string | null>(null)
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState<CheckoutStep>('payment')

  useEffect(() => {
    if (!courseId) return

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('mna_student_token')
      if (!token) {
        window.location.href = `/student/login?return=/checkout/${courseId}`
        return
      }
    }

    let cancelled = false

    ;(async () => {
      try {
        const courseRes = await studentApiFetch<{ status: string; data: Course }>(
          `/api/courses/${courseId}`,
          { skipAuth: true }
        )
        if (cancelled) return
        setCourse(courseRes.data)

        const orderRes = await studentApiFetch<{
          data: { clientSecret: string; amount: number; paymentId: string }
        }>('/api/orders', {
          method: 'POST',
          body: JSON.stringify({ courseId }),
        })
        if (cancelled) return
        setClientSecret(orderRes.data.clientSecret)
        setPaymentId(orderRes.data.paymentId)
        setPaymentAmount(orderRes.data.amount)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : 'Error al iniciar el pago.')
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [courseId])

  return { course, clientSecret, paymentId, paymentAmount, isLoading, error, step, setStep }
}
