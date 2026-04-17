'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircleIcon as CheckCircle, XCircleIcon as XCircle, XIcon as X } from '@phosphor-icons/react/ssr'

// ─── Types ────────────────────────────────────────────────────────────────────

type ToastVariant = 'success' | 'error'

interface ToastItem {
  id: number
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  let nextId = 0

  const toast = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = ++nextId
    setToasts((prev) => [...prev, { id, message, variant }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id))

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={[
              'flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg text-sm font-medium',
              'animate-in slide-in-from-right-4 fade-in duration-200',
              t.variant === 'success'
                ? 'bg-white border border-success-200 text-success-700'
                : 'bg-white border border-error-200 text-error-700',
            ].join(' ')}
          >
            {t.variant === 'success' ? (
              <CheckCircle size={18} weight="fill" className="shrink-0 text-success-500" />
            ) : (
              <XCircle size={18} weight="fill" className="shrink-0 text-error-500" />
            )}
            <span>{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="ml-1 shrink-0 text-neutral-400 hover:text-neutral-600 focus:outline-none"
              aria-label="Cerrar"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx.toast
}
