'use client'

import { forwardRef } from 'react'
import { CircleNotchIcon as CircleNotch } from '@phosphor-icons/react/ssr'

type Variant = 'primary' | 'secondary' | 'destructive' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-sans font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'

const variants: Record<Variant, string> = {
  primary:
    'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 shadow-xs',
  secondary:
    'border border-rose-300 text-rose-600 bg-white hover:bg-rose-50 active:bg-rose-100',
  destructive:
    'bg-error-500 text-white hover:bg-error-600 active:bg-error-600 shadow-xs',
  ghost:
    'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base',
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
