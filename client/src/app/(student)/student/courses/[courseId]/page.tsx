'use client'

import { use, useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCourseLessons } from '@/hooks/useCourseLessons'
import { useMyEnrollments } from '@/hooks/useMyEnrollments'
import { studentApiFetch } from '@/lib/studentApi'
import { useToast } from '@/components/ui/Toast'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { CoursePlayerTopBar } from './_components/CoursePlayerTopBar'
import { LessonContent } from './_components/LessonContent'
import { LessonSidebar } from './_components/LessonSidebar'

export default function CoursePlayerPage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const toast = useToast()

  const {
    lessons,
    hasAccess,
    completedLessons,
    progressPercent,
    isLoading,
    error,
    mutateEnrollment,
  } = useCourseLessons(courseId)

  const { mutate: refreshEnrollments } = useMyEnrollments()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [marking, setMarking] = useState(false)

  // Determine current lesson from URL param or first uncompleted
  const lessonParam = searchParams.get('lesson')

  const currentLesson = lessonParam
    ? lessons.find((l) => l._id === lessonParam) ?? lessons[0]
    : lessons.find((l) => !completedLessons.includes(l._id)) ?? lessons[0]

  const currentIndex = currentLesson
    ? lessons.findIndex((l) => l._id === currentLesson._id)
    : 0
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex < lessons.length - 1

  // Get course title from first lesson's context or fallback
  const [courseTitle, setCourseTitle] = useState('')
  useEffect(() => {
    if (lessons.length > 0 && !courseTitle) {
      // Fetch course title from enrollments data
      refreshEnrollments().then((res) => {
        const enrollment = res?.data?.find(
          (e) => e.courseId._id === courseId
        )
        if (enrollment) setCourseTitle(enrollment.courseId.title)
      })
    }
  }, [lessons, courseId, courseTitle, refreshEnrollments])

  // Navigate to a specific lesson
  const goToLesson = useCallback(
    (lessonId: string) => {
      router.push(`/student/courses/${courseId}?lesson=${lessonId}`, { scroll: false })
      setSidebarOpen(false)
    },
    [router, courseId]
  )

  const goNext = useCallback(() => {
    if (hasNext) goToLesson(lessons[currentIndex + 1]._id)
  }, [hasNext, currentIndex, lessons, goToLesson])

  const goPrev = useCallback(() => {
    if (hasPrev) goToLesson(lessons[currentIndex - 1]._id)
  }, [hasPrev, currentIndex, lessons, goToLesson])

  // Mark lesson as watched
  const handleLessonComplete = useCallback(async () => {
    if (!currentLesson || marking) return
    if (completedLessons.includes(currentLesson._id)) return

    setMarking(true)
    try {
      await studentApiFetch(
        `/api/courses/${courseId}/lessons/${currentLesson._id}/watched`,
        { method: 'POST' }
      )
      await mutateEnrollment()
      refreshEnrollments()
      toast('¡Clase completada!', 'success')
    } catch {
      toast('No se pudo marcar la clase como completada.', 'error')
    } finally {
      setMarking(false)
    }
  }, [currentLesson, marking, completedLessons, courseId, mutateEnrollment, refreshEnrollments, toast])

  // Loading state
  if (isLoading) return <FullPageSpinner />

  // Access denied
  if (!isLoading && !hasAccess) {
    router.replace('/student/explore')
    return <FullPageSpinner />
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-neutral-500">
        No se pudo cargar el curso. Intenta de nuevo más tarde.
      </div>
    )
  }

  // No lessons
  if (lessons.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-neutral-500">
        Este curso aún no tiene clases disponibles.
      </div>
    )
  }

  if (!currentLesson) return <FullPageSpinner />

  const isWatched = completedLessons.includes(currentLesson._id)

  return (
    <div className="-m-4 flex flex-col md:-m-6 lg:-m-8" style={{ height: 'calc(100vh - 4rem)' }}>
      {/* Top bar */}
      <CoursePlayerTopBar
        currentLesson={currentLesson}
        totalLessons={lessons.length}
        courseTitle={courseTitle}
        onPrev={goPrev}
        onNext={goNext}
        hasPrev={hasPrev}
        hasNext={hasNext}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      {/* Main content + sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lesson content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-4xl">
            <LessonContent
              lesson={currentLesson}
              isWatched={isWatched}
              onVideoEnded={handleLessonComplete}
            />
          </div>
        </div>

        {/* Sidebar */}
        <LessonSidebar
          lessons={lessons}
          currentLessonId={currentLesson._id}
          completedLessons={completedLessons}
          progressPercent={progressPercent}
          onSelectLesson={goToLesson}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>
    </div>
  )
}
