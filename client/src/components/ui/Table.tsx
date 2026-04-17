/** Tabla responsiva con scroll horizontal en mobile */
export function Table({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white shadow-sm">
      <table className={['w-full text-sm', className].filter(Boolean).join(' ')}>
        {children}
      </table>
    </div>
  )
}

export function THead({ children }: { children: React.ReactNode }) {
  return (
    <thead className="border-b border-neutral-200 bg-neutral-50">
      {children}
    </thead>
  )
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody className="divide-y divide-neutral-100">{children}</tbody>
}

export function TR({
  children,
  clickable = false,
  onClick,
}: {
  children: React.ReactNode
  clickable?: boolean
  onClick?: () => void
}) {
  return (
    <tr
      onClick={onClick}
      className={[
        'transition-colors duration-100',
        clickable ? 'cursor-pointer hover:bg-nude-50' : 'hover:bg-neutral-50/50',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </tr>
  )
}

export function TH({
  children,
  className = '',
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <th
      scope="col"
      className={[
        'px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </th>
  )
}

export function TD({
  children,
  className = '',
  colSpan,
}: {
  children?: React.ReactNode
  className?: string
  colSpan?: number
}) {
  return (
    <td
      colSpan={colSpan}
      className={['px-4 py-3 text-neutral-900', className].filter(Boolean).join(' ')}
    >
      {children}
    </td>
  )
}
