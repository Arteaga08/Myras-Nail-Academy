"use client";

import { useState } from "react";
import {
  FileArrowDownIcon as FileArrowDown,
  BookOpenIcon as BookOpen,
  ListBulletsIcon as ListBullets,
} from "@phosphor-icons/react/ssr";
import {
  NailAccent,
  NailSparkle,
  CompletionBadge,
} from "@/components/ui/DecorativeAssets";
import { VideoPlayer } from "./VideoPlayer";
import type { Lesson } from "@/hooks/useCourseLessons";

interface LessonContentProps {
  lesson: Lesson;
  isWatched: boolean;
  onVideoEnded: () => void;
}

export function LessonContent({
  lesson,
  isWatched,
  onVideoEnded,
}: LessonContentProps) {
  const [activeTab, setActiveTab] = useState<
    "resumen" | "materiales-necesarios" | "materiales"
  >("resumen");

  return (
    <div className="space-y-6">
      {/* Video */}
      {lesson.videoUrl && (
        <div className="overflow-hidden rounded-2xl bg-neutral-950 shadow-sm">
          <VideoPlayer
            videoUrl={lesson.videoUrl}
            lessonId={lesson._id}
            onEnded={onVideoEnded}
          />
        </div>
      )}

      {/* Caja Principal Blanca */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        {/* HEADER: Ahora con estructura, acento visual y borde inferior */}
        <div className="mb-8 flex flex-col items-start gap-4 border-b border-neutral-100 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {/* Acento Visual Vidix (Barra vertical rosada) */}
            <div className="hidden h-8 w-1.5 shrink-0 rounded-full bg-rose-500 sm:block"></div>

            {/* Título: Más grande, con tracking ajustado para verse más premium */}
            <h1 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              {lesson.title}
              <NailAccent size={32} className="shrink-0" />
            </h1>
          </div>

          {isWatched && (
            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success-200 bg-success-50 px-3 py-1.5 text-sm font-medium text-success-700 shadow-sm">
              <CompletionBadge size={18} />
              <span>Clase Completada</span>
            </div>
          )}
        </div>

        {/* TABS (Botones discretos con inline-flex en lugar de estirarse) */}
        <div className="mb-8 inline-flex rounded-xl bg-neutral-50 p-1.5 ring-1 ring-inset ring-neutral-200/50">
          <button
            onClick={() => setActiveTab("resumen")}
            className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all ${
              activeTab === "resumen"
                ? "bg-white text-rose-600 shadow-sm ring-1 ring-neutral-200/50"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            }`}
          >
            <BookOpen
              size={18}
              weight={activeTab === "resumen" ? "bold" : "regular"}
            />
            Resumen
          </button>

          {/* Solo se muestra si hay materiales necesarios */}
          {lesson.materials && lesson.materials.length > 0 && (
            <button
              onClick={() => setActiveTab("materiales-necesarios")}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                activeTab === "materiales-necesarios"
                  ? "bg-white text-rose-600 shadow-sm ring-1 ring-neutral-200/50"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              }`}
            >
              <ListBullets
                size={18}
                weight={
                  activeTab === "materiales-necesarios" ? "bold" : "regular"
                }
              />
              Materiales
            </button>
          )}

          {/* Solo se muestra si hay recursos descargables */}
          {lesson.resources && lesson.resources.length > 0 && (
            <button
              onClick={() => setActiveTab("materiales")}
              className={`flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition-all ${
                activeTab === "materiales"
                  ? "bg-white text-rose-600 shadow-sm ring-1 ring-neutral-200/50"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
              }`}
            >
              <FileArrowDown
                size={18}
                weight={activeTab === "materiales" ? "bold" : "regular"}
              />
              Recursos
              <span
                className={`ml-1 flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  activeTab === "materiales"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-neutral-200 text-neutral-600"
                }`}
              >
                {lesson.resources.length}
              </span>
            </button>
          )}
        </div>

        {/* Contenido Dinámico */}
        <div className="min-h-37.5">
          {/* VISTA 1: RESUMEN */}
          {activeTab === "resumen" && (
            <div className="animate-in fade-in duration-300 space-y-6">
              {lesson.description ? (
                <div className="space-y-4">
                  {lesson.description
                    .split(/\n+/)
                    .filter((p) => p.trim())
                    .map((paragraph, i) => (
                      <div key={i} className="flex gap-3">
                        <NailSparkle size={18} className="mt-0.5 shrink-0" />
                        <p className="text-base leading-relaxed text-neutral-600">
                          {paragraph}
                        </p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="mt-4 text-sm italic text-neutral-400">
                  Esta lección no incluye resumen en texto.
                </p>
              )}
            </div>
          )}

          {/* VISTA 2: MATERIALES NECESARIOS */}
          {activeTab === "materiales-necesarios" && lesson.materials && (
            <div className="animate-in fade-in duration-300">
              <div className="rounded-xl border border-rose-100 bg-rose-50/50 p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-rose-600">
                  Materiales Necesarios
                </h3>
                <ul className="space-y-3">
                  {lesson.materials.map((material, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-neutral-700"
                    >
                      <NailSparkle size={18} className="shrink-0" />
                      {material}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* VISTA 3: RECURSOS DESCARGABLES */}
          {activeTab === "materiales" && lesson.resources && (
            <div className="animate-in fade-in duration-300 space-y-3">
              {lesson.resources.map((resource, i) => (
                <a
                  key={i}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-neutral-200 p-4 transition-all hover:border-rose-300 hover:bg-rose-50 hover:shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-rose-600 transition-colors group-hover:bg-rose-200">
                      <FileArrowDown size={20} weight="duotone" />
                    </div>
                    <span className="font-medium text-neutral-700 transition-colors group-hover:text-rose-700">
                      {resource.name}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-rose-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Descargar
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
