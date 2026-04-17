'use client'

import { useEffect, useState } from 'react'
import { WarningIcon as Warning } from '@phosphor-icons/react/ssr'

interface LockoutAlertProps {
  retryAfterSeconds: number
}

export function LockoutAlert({ retryAfterSeconds }: LockoutAlertProps) {
  const [remaining, setRemaining] = useState(retryAfterSeconds)

  useEffect(() => {
    setRemaining(retryAfterSeconds)
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [retryAfterSeconds])

  const minutes = Math.floor(remaining / 60)
  const seconds = remaining % 60

  return (
    <div className="flex items-start gap-3 rounded-lg border border-error-500/20 bg-error-100 p-4">
      <Warning size={20} className="mt-0.5 shrink-0 text-error-600" />
      <div>
        <p className="text-sm font-medium text-error-600">Cuenta bloqueada temporalmente</p>
        {remaining > 0 ? (
          <p className="mt-0.5 text-xs text-error-500">
            Intenta de nuevo en{' '}
            <span className="font-semibold tabular-nums">
              {minutes > 0 ? `${minutes}:${String(seconds).padStart(2, '0')} min` : `${seconds}s`}
            </span>
          </p>
        ) : (
          <p className="mt-0.5 text-xs text-error-500">Ya puedes intentarlo de nuevo.</p>
        )}
      </div>
    </div>
  )
}
