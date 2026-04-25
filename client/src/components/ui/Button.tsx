'use client'

import { forwardRef } from 'react'
import { CircleNotchIcon as CircleNotch } from '@phosphor-icons/react/ssr'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'nude' | 'danger' | 'destructive'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer'

const variants: Record<Variant, string> = {
  primary:
    'bg-rose-500 text-white hover:bg-rose-700 active:bg-rose-700',
  secondary:
    'border border-rose-500 text-rose-500 bg-transparent hover:bg-rose-50 active:bg-rose-100',
  accent:
    'bg-lavender-400 text-white hover:bg-lavender-500 active:bg-lavender-600',
  ghost:
    'border border-neutral-300 text-neutral-500 bg-transparent hover:bg-neutral-100 active:bg-neutral-200',
  nude:
    'bg-nude-200 text-nude-500 hover:bg-nude-300 active:bg-nude-300',
  danger:
    'bg-error-500 text-white hover:bg-error-600 active:bg-error-600',
  destructive:
    'bg-error-500 text-white hover:bg-error-600 active:bg-error-600',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          base,
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading && <CircleNotch size={16} className="animate-spin" />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
