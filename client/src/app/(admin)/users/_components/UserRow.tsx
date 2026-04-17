import Link from 'next/link'
import { TR, TD } from '@/components/ui/Table'
import { getInitials, formatDate } from '@/lib/formatters'
import type { AdminUser } from '@/hooks/useUsers'

export function UserRow({ user }: { user: AdminUser }) {
  return (
    <TR clickable>
      <TD>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-600">
            {getInitials(user.firstName, user.lastName)}
          </div>
          <div>
            <p className="font-medium text-neutral-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-neutral-400">{user.email}</p>
          </div>
        </div>
      </TD>
      <TD className="text-xs text-neutral-500">{formatDate(user.createdAt)}</TD>
      <TD>
        <Link
          href={`/users/${user._id}`}
          className="inline-flex items-center rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-100"
        >
          Detalles
        </Link>
      </TD>
    </TR>
  )
}
