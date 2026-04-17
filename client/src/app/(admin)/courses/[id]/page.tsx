'use client'

import { use } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useCourse } from '@/hooks/useCourses'
import { CourseForm } from './_components/CourseForm'

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { course, isLoading, error } = useCourse(id)

  if (isLoading) return <FullPageSpinner />

  if (error || !course) {
    return (
      <div className="rounded-xl border border-error-500/20 bg-error-100 p-6 text-sm text-error-600">
        Error al cargar el curso.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Editar curso"
        breadcrumb={[
          { label: 'Cursos', href: '/courses' },
          { label: course.title },
        ]}
      />
      <div className="max-w-3xl">
        <CourseForm initialData={course} courseId={id} />
      </div>
    </div>
  )
}
