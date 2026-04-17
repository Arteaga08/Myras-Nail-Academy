import { formatDate, getInitials } from '@/lib/formatters'
import { EnvelopeIcon as Envelope, CalendarIcon as Calendar } from '@phosphor-icons/react/ssr'

interface User {
  _id: string
  firstName: string
  lastName: string
  email: string
  bio: string | null
  createdAt: string
}

export function UserProfileCard({ user }: { user: User }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-xl font-bold text-rose-600 font-display">
          {getInitials(user.firstName, user.lastName)}
        </div>
        <div className="flex-1">
          <h2 className="font-display text-xl font-semibold text-neutral-900">
            {user.firstName} {user.lastName}
          </h2>

          <div className="mt-2 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 text-sm text-neutral-500">
              <Envelope size={16} className="text-neutral-400" />
              {user.email}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-neutral-500">
              <Calendar size={16} className="text-neutral-400" />
              Registrado el {formatDate(user.createdAt)}
            </span>
          </div>

          {user.bio && (
            <p className="mt-3 text-sm text-neutral-600">{user.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}
