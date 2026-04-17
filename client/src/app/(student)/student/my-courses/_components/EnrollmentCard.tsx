'use client'

import {
  BookOpenIcon as BookOpen,
  CalendarBlankIcon as CalendarBlank,
  CertificateIcon as Certificate,
} from '@phosphor-icons/react/ssr'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/formatters'
import { useCertificateDownload } from '@/hooks/useCertificateDownload'
import type { Enrollment } from '@/hooks/useMyEnrollments'

interface EnrollmentCardProps {
  enrollment: Enrollment
}

export function EnrollmentCard({ enrollment }: EnrollmentCardProps) {
  const { courseId, progressPercent, enrolledAt, completedAt, _id } = enrollment
  const isCompleted = progressPercent === 100

  const { downloadCertificate, downloading } = useCertificateDownload()

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-nude-200 bg-nude-50 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Thumbnail */}
      {courseId.thumbnail ? (
        <img
          src={courseId.thumbnail}
          alt={courseId.title}
          className="h-44 w-full object-cover"
        />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-linear-to-br from-rose-100 to-nude-100">
          <BookOpen size={40} className="text-rose-400" />
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-sm font-semibold leading-snug text-neutral-900 line-clamp-2">
          {courseId.title}
        </h3>

        {/* Progress bar toward certificate */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Progreso al certificado</span>
            <span className={['text-xs font-semibold', isCompleted ? 'text-gold-500' : 'text-rose-500'].join(' ')}>
              {progressPercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-rose-100">
            <div
              className={[
                'h-full rounded-full transition-all duration-500',
                isCompleted
                  ? 'bg-linear-to-r from-gold-400 to-gold-500'
                  : 'bg-linear-to-r from-rose-400 to-rose-500',
              ].join(' ')}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Date */}
        <p className="flex items-center gap-1.5 text-xs text-neutral-400">
          <CalendarBlank size={13} />
          {isCompleted && completedAt
            ? `Completado el ${formatDate(completedAt)}`
            : `Inscrita el ${formatDate(enrolledAt)}`}
        </p>

        {/* Action */}
        {isCompleted ? (
          <Badge color="success" className="self-start">Completado ✓</Badge>
        ) : (
          <Button variant="primary" size="sm" disabled>
            Continuar →
          </Button>
        )}

        {/* Certificate section — only when completed */}
        {isCompleted && (
          <div className="mt-1 flex items-center justify-between gap-3 rounded-xl border border-gold-400/40 bg-linear-to-r from-nude-50 to-nude-100 p-3">
            <div className="flex items-center gap-2">
              <Certificate size={20} weight="fill" className="shrink-0 text-gold-500" />
              <div>
                <p className="text-xs font-semibold text-neutral-800">¡Certificado disponible!</p>
                {completedAt && (
                  <p className="text-xs text-neutral-400">
                    {formatDate(completedAt)}
                  </p>
                )}
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              loading={downloading}
              onClick={() => downloadCertificate(_id, courseId.title)}
            >
              Descargar PDF
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
