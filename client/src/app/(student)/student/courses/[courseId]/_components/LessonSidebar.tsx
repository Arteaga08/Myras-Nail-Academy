"use client";

import {
  XIcon as X,
  PlayCircleIcon as PlayCircle,
} from "@phosphor-icons/react/ssr";
import { NailSparkle, CompletionBadge } from "@/components/ui/DecorativeAssets";
import { formatDuration } from "@/lib/formatDuration";
import type { Lesson } from "@/hooks/useCourseLessons";

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  completedLessons: string[];
  progressPercent: number;
  onSelectLesson: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export function LessonSidebar({
  lessons,
  currentLessonId,
  completedLessons,
  progressPercent,
  onSelectLesson,
  open,
  onClose,
}: LessonSidebarProps) {
  const content = (
    <div className="flex h-full flex-col bg-neutral-50/50">
      {/* HEADER: Más espacio, título más grande y jerarquía clara */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 px-5 py-5 bg-white">
        {/* Aquí agregamos el flex y la flor alineada al título */}
        <h2 className="flex items-center gap-2 font-display text-lg sm:text-xl font-bold tracking-tight text-neutral-900">
          Ver Clases
          <NailSparkle size={20} className="shrink-0" />
        </h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 lg:hidden"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>
      </div>

      {/* PROGRESS: Ligero ajuste de espaciado y fondo blanco puro para destacar */}
      <div className="border-b border-neutral-200/80 px-5 py-4 bg-white shadow-sm z-10">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-500">
            Progreso del Curso
          </span>
          <span
            className={`text-xs font-bold ${
              progressPercent === 100 ? "text-success-600" : "text-rose-600"
            }`}
          >
            {progressPercent}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              progressPercent === 100 ? "bg-success-500" : "bg-rose-500"
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* LESSON LIST: Transformado a un sistema de "Tarjetas" (Cards) con separación */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        {lessons.map((lesson) => {
          const isActive = lesson._id === currentLessonId;
          const isCompleted = completedLessons.includes(lesson._id);

          return (
            <button
              key={lesson._id}
              onClick={() => onSelectLesson(lesson._id)}
              className={`flex w-full items-center gap-3.5 rounded-xl p-3 text-left transition-all duration-200 ${
                isActive
                  ? "bg-white shadow-sm ring-1 ring-rose-200 scale-[1.01]" // Efecto 3D sutil para la activa
                  : "bg-transparent hover:bg-white hover:shadow-sm border border-transparent hover:border-neutral-200/60" // Hover elegante para inactivas
              }`}
            >
              {/* STATUS ICON: Tamaños ligeramente ajustados para alinear perfecto */}
              <div className="shrink-0 flex items-center justify-center w-6 h-6">
                {isCompleted ? (
                  <CompletionBadge size={22} />
                ) : isActive ? (
                  <PlayCircle
                    size={24}
                    weight="fill"
                    className="text-rose-500"
                  />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-xs font-bold text-neutral-500">
                    {lesson.order}
                  </span>
                )}
              </div>

              {/* INFO: Tipografía mejorada, texto más legible */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm leading-snug line-clamp-2 transition-colors ${
                    isActive
                      ? "font-bold text-rose-700"
                      : "font-medium text-neutral-700"
                  }`}
                >
                  {lesson.title}
                </p>
                {lesson.duration > 0 && (
                  <p
                    className={`mt-0.5 text-xs ${isActive ? "text-rose-500/80 font-medium" : "text-neutral-400"}`}
                  >
                    {formatDuration(lesson.duration)}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden w-80 shrink-0 border-l border-neutral-200 bg-neutral-50/30 lg:block">
        {content}
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
