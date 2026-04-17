'use client'

import { CaretLeftIcon as CaretLeft, CaretRightIcon as CaretRight } from '@phosphor-icons/react/ssr'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = buildPageRange(page, totalPages)

  return (
    <nav
      className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3"
      aria-label="Paginación"
    >
      <p className="text-sm text-neutral-500">
        Página <span className="font-medium text-neutral-900">{page}</span> de{' '}
        <span className="font-medium text-neutral-900">{totalPages}</span>
      </p>

      <div className="flex items-center gap-1">
        <PaginationBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
        >
          <CaretLeft size={16} />
        </PaginationBtn>

        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="px-2 text-neutral-400">
              …
            </span>
          ) : (
            <PaginationBtn
              key={p}
              onClick={() => onPageChange(p as number)}
              active={p === page}
            >
              {p}
            </PaginationBtn>
          )
        )}

        <PaginationBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Página siguiente"
        >
          <CaretRight size={16} />
        </PaginationBtn>
      </div>
    </nav>
  )
}

function PaginationBtn({
  children,
  onClick,
  disabled = false,
  active = false,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  active?: boolean
  'aria-label'?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={[
        'inline-flex h-8 min-w-[2rem] items-center justify-center rounded-lg px-2 text-sm font-medium transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info-500',
        'disabled:pointer-events-none disabled:opacity-40',
        active
          ? 'bg-rose-500 text-white'
          : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </button>
  )
}

function buildPageRange(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | '…')[] = [1]
  if (current > 3) pages.push('…')
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i)
  }
  if (current < total - 2) pages.push('…')
  pages.push(total)
  return pages
}
