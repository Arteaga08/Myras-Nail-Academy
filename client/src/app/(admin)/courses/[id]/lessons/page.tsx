'use client'

import { use } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { useCourse } from '@/hooks/useCourses'
import { LessonsTable } from './_components/LessonsTable'

export default function LessonsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { course, isLoading } = useCourse(id)

  if (isLoading || !course) return <FullPageSpinner />

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lecciones"
        breadcrumb={[
          { label: 'Cursos', href: '/courses' },
          { label: course.title, href: `/courses/${id}` },
          { label: 'Lecciones' },
        ]}
      />
      <LessonsTable courseId={id} courseTitle={course.title} />
    </div>
  )
}
