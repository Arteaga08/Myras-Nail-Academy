'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StarIcon as Star, BookOpenIcon as BookOpen } from '@phosphor-icons/react/ssr'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/formatters'
import { useStudentAuth } from '@/hooks/useStudentAuth'
import type { Course } from '@/hooks/useExploreCourses'
import { PurchaseModal } from './PurchaseModal'

interface ExploreCourseCardProps {
  course: Course
  isEnrolled: boolean
  onEnrollSuccess: () => void
}

export function ExploreCourseCard({ course, isEnrolled, onEnrollSuccess }: ExploreCourseCardProps) {
  const { token } = useStudentAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const effectivePrice = course.isOnSale ? course.salePrice : course.price

  function handleBuyClick() {
    if (!token) {
      router.push(`/student/login?buy=${course._id}`)
      return
    }
    setShowModal(true)
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        {/* Thumbnail */}
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-44 w-full object-cover"
          />
        ) : (
          <div className="flex h-44 w-full items-center justify-center bg-rose-50">
            <BookOpen size={40} className="text-rose-300" />
          </div>
        )}

        {/* Body */}
        <div className="flex flex-col gap-3 p-4">
          {/* Category */}
          {course.category && (
            <Badge color="rose" className="self-start">{course.category.name}</Badge>
          )}

          {/* Title */}
          <h3 className="font-display text-sm font-semibold leading-snug text-neutral-900 line-clamp-2">
            {course.title}
          </h3>

          {/* Description */}
          {course.shortDescription && (
            <p className="text-xs text-neutral-500 line-clamp-2">{course.shortDescription}</p>
          )}

          {/* Rating */}
          {course.reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <Star size={14} weight="fill" className="text-gold-500" />
              <span className="text-xs font-semibold text-neutral-700">{course.averageRating.toFixed(1)}</span>
              <span className="text-xs text-neutral-400">({course.reviewCount} reseñas)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-neutral-900">
              {formatCurrency(effectivePrice)}
            </span>
            {course.isOnSale && (
              <span className="text-sm text-neutral-400 line-through">
                {formatCurrency(course.price)}
              </span>
            )}
          </div>

          {/* Action */}
          {isEnrolled ? (
            <div className="flex items-center gap-2">
              <Badge color="success">Ya inscrita ✓</Badge>
              <Link href={`/student/courses/${course._id}`}>
                <Button variant="ghost" size="sm">Ir al curso</Button>
              </Link>
            </div>
          ) : (
            <Button variant="primary" size="sm" onClick={handleBuyClick}>
              Comprar
            </Button>
          )}
        </div>
      </div>

      {showModal && (
        <PurchaseModal
          course={course}
          onClose={() => setShowModal(false)}
          onSuccess={onEnrollSuccess}
        />
      )}
    </>
  )
}
