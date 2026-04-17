'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useExploreCourses } from '@/hooks/useExploreCourses'
import { useMyEnrollments } from '@/hooks/useMyEnrollments'
import { useStudentAuth } from '@/hooks/useStudentAuth'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { MagnifyingGlassIcon as MagnifyingGlass } from '@phosphor-icons/react/ssr'
import { CourseCatalogGrid } from './_components/CourseCatalogGrid'
import { PurchaseModal } from './_components/PurchaseModal'
import type { Course } from '@/hooks/useExploreCourses'

export default function ExplorePage() {
  const { token } = useStudentAuth()
  const { courses, enrolledIds, isLoading, error } = useExploreCourses()
  const { mutate: refreshEnrollments } = useMyEnrollments()
  const searchParams = useSearchParams()
  const router = useRouter()
  const buyIntent = searchParams.get('buy')

  const [autoOpenCourse, setAutoOpenCourse] = useState<Course | null>(null)

  // Auto-open purchase modal when coming back from login/register with ?buy=courseId
  useEffect(() => {
    if (!buyIntent || !token || isLoading || courses.length === 0) return

    const course = courses.find((c) => c._id === buyIntent)
    if (course && !enrolledIds.has(course._id)) {
      setAutoOpenCourse(course)
      // Remove the param from URL without reloading
      router.replace('/student/explore', { scroll: false })
    }
  }, [buyIntent, token, isLoading, courses, enrolledIds, router])

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-neutral-500">
        No se pudieron cargar los cursos. Intenta de nuevo más tarde.
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-neutral-900">Explorar Cursos</h1>
          <p className="mt-2 text-base text-neutral-500">
            Descubre y agrega nuevos cursos a tu aprendizaje.
          </p>
        </div>

        {courses.length === 0 ? (
          <EmptyState
            icon={<MagnifyingGlass size={28} />}
            title="No hay cursos disponibles"
            description="Próximamente habrá nuevos cursos para ti."
          />
        ) : (
          <CourseCatalogGrid
            courses={courses}
            enrolledIds={enrolledIds}
            onEnrollSuccess={() => refreshEnrollments()}
          />
        )}
      </div>

      {/* Auto-opened modal from post-register buy intent */}
      {autoOpenCourse && (
        <PurchaseModal
          course={autoOpenCourse}
          onClose={() => setAutoOpenCourse(null)}
          onSuccess={() => {
            refreshEnrollments()
            setAutoOpenCourse(null)
          }}
        />
      )}
    </>
  )
}
