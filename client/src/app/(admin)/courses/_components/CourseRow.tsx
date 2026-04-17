import Link from "next/link";
import { PencilSimpleIcon as PencilSimple } from "@phosphor-icons/react/ssr";
import { TR, TD } from "@/components/ui/Table";
import { formatCurrency } from "@/lib/formatters";
import type { Course } from "@/hooks/useCourses";
import { PublishToggle } from "./PublishToggle";

interface CourseRowProps {
  course: Course;
  onMutate: () => void;
}

export function CourseRow({ course, onMutate }: CourseRowProps) {
  return (
    <TR>
      <TD>
        <div className="flex items-center gap-3">
          {course.thumbnail && (
            <img
              src={course.thumbnail}
              alt=""
              className="h-10 w-10 shrink-0 rounded-lg object-cover"
            />
          )}
          <div>
            <p className="font-medium text-neutral-900">{course.title}</p>
            <p className="text-xs text-neutral-400">
              {course.totalLessons} lección
              {course.totalLessons !== 1 ? "es" : ""}
            </p>
          </div>
        </div>
      </TD>
      <TD className="hidden text-neutral-600 text-sm md:table-cell">
        {course.category?.name ?? "—"}
      </TD>
      <TD className="font-medium tabular-nums">
        {formatCurrency(course.effectivePrice)}
      </TD>
      <TD>
        <PublishToggle
          courseId={course._id}
          isPublished={course.isPublished}
          onToggle={onMutate}
        />
      </TD>

      {/* Columna Lecciones: Forzamos alineación a la izquierda */}
      <TD className="hidden text-left md:table-cell">
        <div className="flex justify-start">
          <Link
            href={`/courses/${course._id}/lessons`}
            className="inline-flex items-center rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-100"
          >
            Lecciones
          </Link>
        </div>
      </TD>

      {/* Columna Editar: Forzamos alineación a la izquierda con compensación óptica */}
      <TD className="text-left">
        <div className="flex justify-start">
          <Link
            href={`/courses/${course._id}`}
            // El -ml-1.5 compensa el p-1.5 para que el icono se alinee exactamente con el encabezado
            className="inline-flex items-center gap-1.5 rounded-md p-1.5 -ml-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
          >
            <PencilSimple size={16} />
            <span className="text-xs font-medium">Editar</span>
          </Link>
        </div>
      </TD>
    </TR>
  );
}
