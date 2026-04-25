"use client";

import { ArrowLeftIcon as ArrowLeft } from "@phosphor-icons/react/ssr";
import type { CourseWithLessons } from "@/hooks/useCourseBySlug";
import Link from "next/link";

interface CourseHeroProps {
  course: CourseWithLessons;
}

export function CourseHero({ course }: CourseHeroProps) {
  return (
    <>
      <section className="relative flex min-h-[65vh] w-full items-center overflow-hidden bg-neutral-950 px-6 py-32 lg:px-16 xl:px-24">
        {/* 1. IMAGEN Y DEGRADADO (Fondo) */}
        <div className="absolute inset-0 z-0">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="absolute right-0 top-0 h-full w-full object-cover opacity-50 sm:w-3/4 lg:w-2/3"
            />
          ) : (
            <div className="absolute -right-40 -top-40 h-200 w-200 rounded-full bg-rose-900/20 blur-[120px]"></div>
          )}
          <div className="absolute inset-0 bg-linear-to-r from-neutral-950 via-neutral-950/90 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-transparent to-transparent"></div>
        </div>

        {/* 2. ASSETS FLOTANTES DE LA MARCA (Sobre el degradado, para que brillen) */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Flor grande */}
          <div className="absolute -left-6 top-24 scale-[0.60] opacity-40 transition-transform sm:top-[8%] sm:scale-75 sm:opacity-50 lg:left-[2%] lg:top-[8%] lg:scale-100 lg:opacity-60">
            <svg
              style={{
                animation: "floatA 6s ease-in-out infinite",
                animationDelay: "0s",
              }}
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

          {/* Destello mediano (Dorado resalta hermoso en negro) */}
          <div className="absolute right-6 top-[22%] scale-[0.65] opacity-70 transition-transform sm:left-[2%] sm:right-auto sm:top-[45%] sm:scale-75 sm:opacity-80 lg:left-[45%] lg:top-[35%] lg:scale-100 lg:opacity-100">
            <svg
              style={{
                animation: "shimmerAnim 4s ease-in-out infinite",
                animationDelay: "1.2s",
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
                stroke="#8B7EC8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="2"
                y1="14"
                x2="26"
                y2="14"
                stroke="#8B7EC8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <line
                x1="5"
                y1="5"
                x2="23"
                y2="23"
                stroke="#8B7EC8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="23"
                y1="5"
                x2="5"
                y2="23"
                stroke="#8B7EC8"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="14" cy="14" r="3" fill="#7060BC" />
            </svg>
          </div>

          {/* Frasco de esmalte Derecho */}
          <div className="absolute -right-2 top-[38%] scale-[0.60] opacity-50 transition-transform sm:top-[25%] sm:scale-[0.60] sm:opacity-60 md:scale-75 lg:right-[5%] lg:top-[15%] lg:scale-100 lg:opacity-70">
            <svg
              style={{
                animation: "floatB 5s ease-in-out infinite",
                animationDelay: "0.8s",
              }}
              width="50"
              height="78"
              viewBox="0 0 36 56"
              fill="none"
            >
              <rect x="12" y="0" width="12" height="8" rx="3" fill="#D9BFA6" />
              <rect x="14" y="6" width="8" height="4" rx="1" fill="#B8946F" />
              <rect x="4" y="10" width="28" height="42" rx="6" fill="#EC407A" />
              <rect
                x="8"
                y="14"
                width="6"
                height="20"
                rx="3"
                fill="#FFB8D1"
                opacity="0.5"
              />
              <ellipse
                cx="18"
                cy="52"
                rx="14"
                ry="4"
                fill="#AD1457"
                opacity="0.35"
              />
            </svg>
          </div>

          {/* Frasco esmalte variante (Abajo Izquierda) */}
          <div className="absolute bottom-16 -left-2 scale-[0.60] opacity-50 transition-transform sm:bottom-[10%] sm:left-[5%] sm:scale-[0.65] sm:opacity-60 lg:bottom-[20%] lg:left-[42%] lg:scale-100 lg:opacity-70">
            <svg
              style={{
                animation: "floatA 8s ease-in-out infinite",
                animationDelay: "2s",
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
              <rect x="11" y="5" width="8" height="3" rx="1" fill="#B8946F" />
              <rect x="2" y="8" width="26" height="34" rx="6" fill="#9A0E47" />
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

          {/* Flor mini (Abajo Derecha) */}
          <div className="absolute bottom-12 right-0 scale-[0.65] opacity-50 transition-transform sm:bottom-[5%] sm:right-[2%] sm:scale-75 sm:opacity-60 lg:bottom-[15%] lg:right-[10%] lg:scale-100 lg:opacity-70">
            <svg
              style={{
                animation: "floatB 7.5s ease-in-out infinite",
                animationDelay: "2.5s",
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
        </div>

        {/* 3. CONTENIDO PRINCIPAL (Texto) */}
        <div className="relative z-10 flex w-full max-w-4xl flex-col gap-6">
          <Link
            href="/student/explore"
            className="group flex w-max items-center gap-2 text-sm font-bold uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft
              weight="bold"
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            {course.category?.name ?? "Catálogo"}
          </Link>

          <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-[5rem]">
            {course.title}
          </h1>
        </div>
      </section>

    </>
  );
}
