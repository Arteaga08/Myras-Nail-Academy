'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { swrFetcher } from '@/lib/api'
import { Table, THead, TBody, TR, TH, TD } from '@/components/ui/Table'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { FullPageSpinner } from '@/components/ui/Spinner'
import { PlusIcon as Plus, PencilSimpleIcon as PencilSimple } from '@phosphor-icons/react/ssr'
import { LessonFormModal } from './LessonFormModal'
import { DeleteLessonButton } from './DeleteLessonButton'
import { useToast } from '@/components/ui/Toast'

interface Lesson {
  _id: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
  publishedAt: string | null
}

interface LessonsTableProps {
  courseId: string
  courseTitle: string
}

export function LessonsTable({ courseId, courseTitle }: LessonsTableProps) {
  const { data, isLoading, mutate } = useSWR<{ status: string; data: Lesson[] }>(
    `/api/courses/${courseId}/lessons`,
    swrFetcher
  )
  const toast = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)

  const lessons = (data?.data ?? []).sort((a, b) => a.order - b.order)

  function openCreate() {
    setEditingLesson(null)
    setModalOpen(true)
  }

  function openEdit(lesson: Lesson) {
    setEditingLesson(lesson)
    setModalOpen(true)
  }

  if (isLoading) return <FullPageSpinner />

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-neutral-900">
          Lecciones de {courseTitle}
        </h2>
        <Button size="sm" onClick={openCreate}>
          <Plus size={16} />
          Nueva lección
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
        <Table>
          <THead>
            <TR>
              <TH className="w-12">#</TH>
              <TH>Título</TH>
              <TH>Duración</TH>
              <TH>Publicada</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            {lessons.length === 0 ? (
              <TR>
                <td colSpan={5}>
                  <EmptyState
                    title="Sin lecciones"
                    description="Agrega la primera lección a este curso."
                  />
                </td>
              </TR>
            ) : (
              lessons.map((lesson) => (
                <TR key={lesson._id}>
                  <TD className="text-neutral-400 font-mono text-xs">{lesson.order}</TD>
                  <TD className="font-medium text-neutral-900">{lesson.title}</TD>
                  <TD className="text-neutral-500 text-xs">
                    {lesson.duration ? `${lesson.duration} min` : '—'}
                  </TD>
                  <TD className="text-neutral-500 text-xs">
                    {lesson.publishedAt ? new Date(lesson.publishedAt).toLocaleDateString('es-MX') : '—'}
                  </TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(lesson)}
                        className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
                        aria-label={`Editar lección ${lesson.title}`}
                      >
                        <PencilSimple size={16} />
                      </button>
                      <DeleteLessonButton
                        courseId={courseId}
                        lessonId={lesson._id}
                        lessonTitle={lesson.title}
                        onDeleted={() => { mutate(); toast('Lección eliminada') }}
                      />
                    </div>
                  </TD>
                </TR>
              ))
            )}
          </TBody>
        </Table>
      </div>

      <LessonFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={() => {
          mutate()
          toast(editingLesson ? 'Lección actualizada' : 'Lección creada')
        }}
        courseId={courseId}
        lesson={editingLesson}
      />
    </div>
  )
}
