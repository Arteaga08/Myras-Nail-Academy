"use client";

import Link from "next/link";
import {
  CaretLeftIcon as CaretLeft,
  ArrowLeftIcon as ArrowLeft,
  ArrowRightIcon as ArrowRight,
  ListIcon as List,
} from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/Button";
import type { Lesson } from "@/hooks/useCourseLessons";

interface CoursePlayerTopBarProps {
  currentLesson: Lesson;
  totalLessons: number;
  courseTitle: string;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onToggleSidebar?: () => void;
}

export function CoursePlayerTopBar({
  currentLesson,
  totalLessons,
  courseTitle,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onToggleSidebar,
}: CoursePlayerTopBarProps) {
  return (
    // Fondo Rose 500 con borde sutil más oscuro (rose-600)
    <div className="flex h-16 shrink-0 items-center justify-between border-b border-rose-600 bg-rose-500 px-4 sm:px-6">
      {/* SECCIÓN IZQUIERDA: Navegación y Contexto */}
      <div className="flex items-center gap-4 overflow-hidden">
        {/* Botón circular de regreso: Borde semitransparente blanco */}
        <Link
          href="/student/my-courses"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
          aria-label="Volver a mis cursos"
        >
          <CaretLeft size={20} />
        </Link>

        {/* Arquitectura de 2 líneas (Textos en blanco y blanco translúcido) */}
        <div className="flex min-w-0 flex-col justify-center">
          <p className="truncate text-xs font-medium text-white/80">
            Clase {currentLesson.order} de {totalLessons}
            <span className="mx-2 text-white/40">•</span>
            {courseTitle}
          </p>
          <p className="truncate text-sm sm:text-base font-bold text-white mt-0.5">
            {currentLesson.title || "Introducción y materiales necesarios"}
          </p>
        </div>
      </div>

      {/* SECCIÓN DERECHA: Botones de Acción Explícitos */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Mostrar lista de clases"
          >
            <List size={20} />
          </button>
        )}
        {/* Botón Anterior */}
        <Button
          onClick={onPrev}
          disabled={!hasPrev}
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex border-white/20 text-white hover:bg-white/20 hover:text-white active:bg-white/30"
        >
          <ArrowLeft size={16} />
          Clase anterior
        </Button>

        {/* Botón Siguiente */}
        <Button
          onClick={onNext}
          disabled={!hasNext}
          variant="secondary"
          size="sm"
          className="bg-white hover:bg-rose-50 active:bg-rose-100"
        >
          Siguiente clase
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
