import Link from 'next/link'
import { CheckCircleIcon as CheckCircle } from '@phosphor-icons/react/ssr'
import { Button } from '@/components/ui/Button'
import type { Course } from '@/hooks/useExploreCourses'

interface CheckoutSuccessProps {
  course: Course
}

export function CheckoutSuccess({ course }: CheckoutSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-100">
        <CheckCircle size={48} weight="fill" className="text-success-600" />
      </div>

      <h1 className="mb-2 font-display text-2xl font-bold text-neutral-900">
        ¡Inscripción Completada!
      </h1>
      <p className="mb-1 text-neutral-600">
        Ya tienes acceso a{' '}
        <span className="font-semibold text-neutral-800">{course.title}</span>
      </p>
      <p className="mb-8 text-sm text-neutral-400">
        Recibirás un correo de confirmación en breve.
      </p>

      <Link href="/student/my-courses">
        <Button variant="primary" size="lg">
          Ir a mis cursos
        </Button>
      </Link>
    </div>
  )
}
