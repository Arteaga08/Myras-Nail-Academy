'use client'

import Link from 'next/link'
import {
  BookOpenIcon as BookOpen,
  CalendarBlankIcon as CalendarBlank,
  CertificateIcon as Certificate,
} from '@phosphor-icons/react/ssr'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/formatters'
import { useCertificateDownload } from '@/hooks/useCertificateDownload'
import { CompletionBadge } from '@/components/ui/DecorativeAssets'
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
      <Link href={`/cursos/${courseId.slug}`} className="block">
        {courseId.thumbnail ? (
          <img
            src={courseId.thumbnail}
            alt={courseId.title}
            className="h-44 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center bg-linear-to-br from-rose-100 to-nude-100">
            <BookOpen size={40} className="text-rose-400" />
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Link href={`/cursos/${courseId.slug}`}>
          <h3 className="font-display text-sm font-semibold leading-snug text-neutral-900 line-clamp-2 hover:text-rose-600 transition-colors">
            {courseId.title}
          </h3>
        </Link>

        {/* Progress bar toward certificate */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs text-neutral-400">Progreso al certificado</span>
            <span className={['text-xs font-semibold', isCompleted ? 'text-lavender-400' : 'text-rose-500'].join(' ')}>
              {progressPercent}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-rose-100">
            <div
              className={[
                'h-full rounded-full transition-all duration-500',
                isCompleted
                  ? 'bg-linear-to-r from-lavender-400 to-lavender-500'
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
          <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-success-200 bg-success-50 px-3 py-1 text-xs font-medium text-success-700">
            <CompletionBadge size={16} />
            <span>Completado</span>
          </div>
        ) : (
          <Link href={`/student/courses/${courseId._id}`}>
            <Button variant="primary" size="sm">
              Continuar →
            </Button>
          </Link>
        )}

        {/* Certificate section — only when completed */}
        {isCompleted && (
          <div className="mt-1 flex items-center justify-between gap-3 rounded-xl border border-lavender-200/60 bg-linear-to-r from-nude-50 to-nude-100 p-3">
            <div className="flex items-center gap-2">
              <Certificate size={20} weight="fill" className="shrink-0 text-lavender-400" />
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
