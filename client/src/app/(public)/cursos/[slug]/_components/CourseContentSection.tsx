"use client";

import { useState, useEffect, useRef } from "react";
import {
  PlayCircleIcon as PlayCircle,
  LockSimpleIcon as LockSimple,
  ArrowRightIcon as ArrowRight,
  ClockIcon as Clock,
  BookOpenIcon as BookOpen,
  GraduationCapIcon as GraduationCap,
} from "@phosphor-icons/react/ssr";
import { formatCurrency, formatDuration } from "@/lib/formatters";
import type { CourseWithLessons } from "@/hooks/useCourseBySlug";
import { useStudentAuth } from "@/hooks/useStudentAuth";
import { useRouter } from "next/navigation";

interface CourseContentProps {
  course: CourseWithLessons;
}

export function CourseContentSection({ course }: CourseContentProps) {
  const lessons = course.lessons ?? [];
  const { token } = useStudentAuth();
  const router = useRouter();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  function handleBuyClick() {
    if (!token) {
      router.push(`/student/register?return=/cursos/${course.slug}`);
      return;
    }
    // Lógica para abrir el modal
  }

  return (
    // LA SOLUCIÓN ESTÁ AQUÍ: 'overflow-x-clip' evita el scroll horizontal sin romper el 'sticky'.
    <section className="relative overflow-x-clip bg-linear-to-b from-nude-50/50 to-rose-50/30 px-4 py-16 sm:px-6 lg:py-24">
      <div ref={sentinelRef} className="absolute top-0 h-px w-full" aria-hidden />
      <div className="mx-auto max-w-350">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* =========================================
              COLUMNA IZQUIERDA: Tarjetas Masivas
              ========================================= */}
          <div className="flex flex-col gap-8 lg:col-span-8">
            {/* TARJETA 1: Descripción */}
            {course.description && (
              // PADDINGS MEJORADOS: p-6 en móvil, p-12 en tablet, p-16 en desktop
              <div className="relative rounded-4xl bg-white p-6 shadow-xl shadow-rose-900/5 ring-1 ring-rose-100/50 sm:rounded-[2.5rem] sm:p-12 lg:rounded-[3.5rem] lg:p-16">
                {/* Decoraciones Animadas */}
                <div className="pointer-events-none absolute -right-4 -top-4 z-0 scale-50 opacity-20 sm:-right-6 sm:-top-6 sm:scale-75 lg:-right-4 lg:-top-4 lg:scale-100 lg:opacity-30">
                  <svg
                    style={{ animation: "floatA 6s ease-in-out infinite" }}
                    width="88"
                    height="88"
                    viewBox="0 0 88 88"
                    fill="none"
                  >
                    <ellipse cx="44" cy="22" rx="12" ry="20" fill="#FFA8C2" />
                    <ellipse
                      cx="66"
                      cy="33"
                      rx="12"
                      ry="20"
                      fill="#FFA8C2"
                      transform="rotate(72 66 33)"
                    />
                    <ellipse
                      cx="57"
                      cy="60"
                      rx="12"
                      ry="20"
                      fill="#FFA8C2"
                      transform="rotate(144 57 60)"
                    />
                    <ellipse
                      cx="31"
                      cy="60"
                      rx="12"
                      ry="20"
                      fill="#FFA8C2"
                      transform="rotate(216 31 60)"
                    />
                    <ellipse
                      cx="22"
                      cy="33"
                      rx="12"
                      ry="20"
                      fill="#FFA8C2"
                      transform="rotate(288 22 33)"
                    />
                    <circle cx="44" cy="44" r="10" fill="#F06292" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute -bottom-2 -left-2 z-0 scale-50 opacity-20 sm:-bottom-4 sm:-left-4 sm:scale-75 lg:bottom-4 lg:left-4 lg:scale-90 lg:opacity-30">
                  <svg
                    style={{
                      animation: "floatB 7s ease-in-out infinite",
                      animationDelay: "1s",
                    }}
                    width="45"
                    height="69"
                    viewBox="0 0 30 46"
                    fill="none"
                  >
                    <rect
                      x="10"
                      y="0"
                      width="10"
                      height="6"
                      rx="2.5"
                      fill="#EEDFD0"
                    />
                    <rect
                      x="11"
                      y="5"
                      width="8"
                      height="3"
                      rx="1"
                      fill="#B8946F"
                    />
                    <rect
                      x="2"
                      y="8"
                      width="26"
                      height="34"
                      rx="6"
                      fill="#9A0E47"
                    />
                    <rect
                      x="5"
                      y="11"
                      width="5"
                      height="16"
                      rx="2.5"
                      fill="#C2185B"
                      opacity="0.5"
                    />
                    <ellipse
                      cx="15"
                      cy="42"
                      rx="13"
                      ry="3"
                      fill="#6B0A32"
                      opacity="0.3"
                    />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-rose-500 sm:text-sm">
                      Introducción
                    </span>
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl lg:text-5xl">
                      Descubre el curso
                    </h2>
                  </div>

                  <div className="prose prose-base sm:prose-lg prose-stone max-w-3xl leading-relaxed text-stone-600 whitespace-pre-line">
                    {course.shortDescription && (
                      <p className="text-lg font-medium text-rose-900/80 sm:text-xl">
                        {course.shortDescription}
                      </p>
                    )}
                    {course.description}
                  </div>
                </div>
              </div>
            )}

            {/* TARJETA 2: Temario */}
            {lessons.length > 0 && (
              <div className="relative rounded-4xl bg-white p-6 shadow-xl shadow-rose-900/5 ring-1 ring-rose-100/50 sm:rounded-[2.5rem] sm:p-12 lg:rounded-[3.5rem] lg:p-16">
                {/* Decoraciones Animadas */}
                <div className="pointer-events-none absolute -left-2 top-[30%] z-0 scale-50 opacity-30 sm:left-0 sm:scale-75 lg:-left-6 lg:scale-100 lg:opacity-40">
                  <svg
                    style={{
                      animation: "shimmerAnim 5s ease-in-out infinite",
                      animationDelay: "2s",
                    }}
                    width="40"
                    height="40"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <line
                      x1="14"
                      y1="2"
                      x2="14"
                      y2="26"
                      stroke="#E6C068"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="2"
                      y1="14"
                      x2="26"
                      y2="14"
                      stroke="#E6C068"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="5"
                      y1="5"
                      x2="23"
                      y2="23"
                      stroke="#E6C068"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <line
                      x1="23"
                      y1="5"
                      x2="5"
                      y2="23"
                      stroke="#E6C068"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="14" cy="14" r="3" fill="#C9A24C" />
                  </svg>
                </div>
                <div className="pointer-events-none absolute -bottom-4 -right-4 z-0 scale-50 opacity-30 sm:-bottom-6 sm:-right-6 sm:scale-[0.60] lg:bottom-0 lg:right-0 lg:scale-75 lg:opacity-40">
                  <svg
                    style={{
                      animation: "floatA 6.5s ease-in-out infinite",
                      animationDelay: "1.5s",
                    }}
                    width="60"
                    height="60"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <ellipse cx="16" cy="7" rx="5" ry="8" fill="#C9B6E8" />
                    <ellipse
                      cx="25"
                      cy="12"
                      rx="5"
                      ry="8"
                      fill="#C9B6E8"
                      transform="rotate(72 25 12)"
                    />
                    <ellipse
                      cx="21"
                      cy="25"
                      rx="5"
                      ry="8"
                      fill="#C9B6E8"
                      transform="rotate(144 21 25)"
                    />
                    <ellipse
                      cx="11"
                      cy="25"
                      rx="5"
                      ry="8"
                      fill="#C9B6E8"
                      transform="rotate(216 11 25)"
                    />
                    <ellipse
                      cx="7"
                      cy="12"
                      rx="5"
                      ry="8"
                      fill="#C9B6E8"
                      transform="rotate(288 7 12)"
                    />
                    <circle cx="16" cy="16" r="5" fill="#9575CD" />
                  </svg>
                </div>

                <div className="relative z-10 flex flex-col gap-8 sm:gap-10">
                  <div className="flex flex-col gap-2">
                    <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-rose-500 sm:text-sm">
                      Programa
                    </span>
                    <h2 className="font-display text-3xl font-extrabold tracking-tight text-rose-950 sm:text-4xl lg:text-5xl">
                      Temario
                    </h2>
                  </div>

                  <div className="flex flex-col">
                    {lessons.map((lesson, idx) => (
                      <div
                        key={lesson._id}
                        className={`group flex items-center gap-4 py-5 sm:gap-6 sm:py-6 transition-colors ${
                          idx < lessons.length - 1
                            ? "border-b border-rose-50/80"
                            : ""
                        }`}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                          {lesson.isFree ? (
                            <PlayCircle
                              size={20}
                              weight="fill"
                              className="sm:h-6 sm:w-6"
                            />
                          ) : (
                            <LockSimple
                              size={20}
                              weight="duotone"
                              className="text-rose-200 sm:h-6 sm:w-6"
                            />
                          )}
                        </div>

                        <span className="flex-1 font-display text-base font-semibold text-rose-950 sm:text-lg">
                          {lesson.title}
                        </span>

                        <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
                          {lesson.isFree && (
                            <span className="rounded-full bg-lavender-100 px-2 py-0.5 text-[10px] font-bold text-lavender-600 sm:px-3 sm:py-1 sm:text-xs">
                              GRATIS
                            </span>
                          )}
                          {lesson.duration > 0 && (
                            <span className="font-mono text-xs font-medium text-stone-400 sm:text-sm">
                              {formatDuration(lesson.duration)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================================
              COLUMNA DERECHA: Logística Sticky
              ========================================= */}
          <div className="lg:col-span-4 lg:self-stretch">
            <div className="sticky top-32 flex flex-col gap-6">
              {/* CÁPSULA 1: Precio y CTA */}
              <div className="flex flex-col gap-6 rounded-4xl bg-rose-500 p-6 shadow-2xl shadow-rose-600/20 ring-1 ring-rose-400 sm:gap-8 sm:rounded-[2.5rem] sm:p-8 lg:rounded-[3rem] lg:p-10">
                <div className="flex flex-col gap-2">
                  <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] text-rose-200 sm:text-[11px]">
                    Inscripción Abierta
                  </span>

                  <div className="mt-1 flex flex-col sm:mt-2">
                    {course.isOnSale && (
                      <span className="text-xs font-medium text-rose-200/70 line-through sm:text-sm">
                        {formatCurrency(course.price)}
                      </span>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        {formatCurrency(course.effectivePrice ?? course.price)}
                      </span>
                      <span className="text-sm font-bold text-rose-200 sm:text-base">
                        MXN
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleBuyClick}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-white text-sm font-bold text-rose-600 shadow-xl shadow-rose-900/20 transition-all hover:-translate-y-1 hover:bg-rose-50 sm:h-16 sm:text-base"
                >
                  Inscríbete Ahora
                  <ArrowRight
                    weight="bold"
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* CÁPSULA 2: Información Técnica */}
              <div className="flex flex-col gap-5 rounded-4xl bg-white p-6 shadow-xl shadow-rose-900/5 ring-1 ring-rose-100/50 sm:gap-6 sm:rounded-[2.5rem] sm:p-8 lg:rounded-[3rem] lg:p-10">
                <div className="flex flex-col gap-1 border-b border-rose-50 pb-4 sm:pb-5">
                  <div className="flex items-center gap-2 text-rose-400">
                    <BookOpen
                      size={18}
                      weight="duotone"
                      className="sm:h-5 sm:w-5"
                    />
                    <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] sm:text-[11px]">
                      Lecciones
                    </span>
                  </div>
                  <span className="font-display text-base font-semibold text-rose-950 sm:text-lg">
                    {course.totalLessons} videos bajo demanda
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-b border-rose-50 pb-4 sm:pb-5">
                  <div className="flex items-center gap-2 text-rose-400">
                    <Clock
                      size={18}
                      weight="duotone"
                      className="sm:h-5 sm:w-5"
                    />
                    <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] sm:text-[11px]">
                      Duración
                    </span>
                  </div>
                  <span className="font-display text-base font-semibold text-rose-950 sm:text-lg">
                    {formatDuration(course.totalDuration)} de contenido
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-rose-400">
                    <GraduationCap
                      size={18}
                      weight="duotone"
                      className="sm:h-5 sm:w-5"
                    />
                    <span className="font-display text-[10px] font-bold uppercase tracking-[0.2em] sm:text-[11px]">
                      Nivel
                    </span>
                  </div>
                  <span className="font-display text-base font-semibold text-rose-950 sm:text-lg">
                    Todos los niveles
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BAR */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 border-t border-rose-100 bg-white px-6 py-4 shadow-2xl shadow-rose-900/10 lg:hidden">
          <div className="flex flex-col">
            {course.isOnSale && (
              <span className="text-xs font-medium text-stone-400 line-through">
                {formatCurrency(course.price)}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="font-display text-2xl font-extrabold text-rose-950">
                {formatCurrency(course.effectivePrice ?? course.price)}
              </span>
              <span className="text-xs font-bold text-stone-400">MXN</span>
            </div>
          </div>
          <button
            onClick={handleBuyClick}
            className="group flex h-12 items-center justify-center gap-2 rounded-full bg-rose-500 px-6 text-sm font-bold text-white shadow-lg shadow-rose-500/30 transition-all hover:bg-rose-600"
          >
            Inscríbete
            <ArrowRight
              weight="bold"
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      )}
    </section>
  );
}
