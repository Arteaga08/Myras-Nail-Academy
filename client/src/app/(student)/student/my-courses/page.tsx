'use client'

import Link from 'next/link'
import { useStudentAuth } from '@/hooks/useStudentAuth'
import { useMyEnrollments } from '@/hooks/useMyEnrollments'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { EmptyState } from '@/components/ui/EmptyState'
import { Button } from '@/components/ui/Button'
import { BookOpenIcon as BookOpen } from '@phosphor-icons/react/ssr'
import { WelcomeHero } from './_components/WelcomeHero'
import { StudentStatsRow } from './_components/StudentStatsRow'
import { CoursesGrid } from './_components/CoursesGrid'

export default function MyCoursesPage() {
  const { studentName } = useStudentAuth()
  const { enrollments, isLoading, error, totalEnrolled, totalCompleted, averageProgress } =
    useMyEnrollments()

  const firstName = studentName?.split(' ')[0] ?? 'Estudiante'

  if (isLoading) return <FullPageSpinner />

  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-neutral-500">
        No se pudieron cargar tus cursos. Intenta de nuevo más tarde.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <WelcomeHero firstName={firstName} />

      <StudentStatsRow
        total={totalEnrolled}
        completed={totalCompleted}
        average={averageProgress}
      />

      <hr className="border-rose-100" />

      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-neutral-900">Mis Cursos</h2>

        {enrollments.length === 0 ? (
          <EmptyState
            icon={<BookOpen size={28} />}
            title="Aún no tienes cursos"
            description="Explora el catálogo y encuentra el curso perfecto para ti."
            action={
              <Link href="/student/explore">
                <Button variant="primary">Explorar cursos</Button>
              </Link>
            }
          />
        ) : (
          <CoursesGrid enrollments={enrollments} />
        )}
      </section>
    </div>
  )
}
