"use client";

import Link from "next/link";
import {
  ArrowRightIcon as ArrowRight,
  HandHeartIcon as HandHeart,
} from "@phosphor-icons/react/ssr";
import { useFeaturedCourse } from "@/hooks/useFeaturedCourse";
import { formatCurrency } from "@/lib/formatters";

export function CourseSalesSection() {
  const { course, isLoading } = useFeaturedCourse();

  if (isLoading) {
    return (
      <section id="course-sales" className="bg-rose-100 px-6 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl flex items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-rose-500 border-t-transparent" />
        </div>
      </section>
    );
  }

  if (!course) return null;

  const effectivePrice = course.isOnSale ? course.salePrice : course.price;

  return (
    <section id="course-sales" className="bg-rose-100 px-6 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* LA GRAN TARJETA DE VENTA */}
        <div className="relative overflow-hidden rounded-[3rem] bg-white p-8 shadow-2xl shadow-rose-500/15 ring-1 ring-gold-400/40 sm:p-14 lg:p-20">
          {/* Efectos de Glow de fondo */}
          <div className="absolute -left-32 -top-32 h-125 w-125 rounded-full bg-rose-50/80 opacity-60 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 h-150 w-150 rounded-full bg-rose-100/30 opacity-40 blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            {/* COLUMNA IZQUIERDA: VISUAL */}
            <div className="flex items-center justify-center">
              {/* Contenedor relativo principal */}
              <div className="relative flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96 lg:h-112.5 lg:w-112.5">
                {/* 1. Sombra base / Glow */}
                <div className="absolute h-[80%] w-[80%] rounded-full bg-rose-200/40 shadow-2xl opacity-80 blur-[60px]"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-90 transition-transform duration-700 hover:scale-105">
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full text-rose-200 drop-shadow-md animate-spin [animation-duration:40s]"
                    fill="currentColor"
                  >
                    <g transform="translate(100, 100)">
                      <ellipse
                        cx="0"
                        cy="-40"
                        rx="35"
                        ry="55"
                        transform="rotate(0)"
                      />
                      <ellipse
                        cx="0"
                        cy="-40"
                        rx="35"
                        ry="55"
                        transform="rotate(60)"
                      />
                      <ellipse
                        cx="0"
                        cy="-40"
                        rx="35"
                        ry="55"
                        transform="rotate(120)"
                      />
                      <ellipse
                        cx="0"
                        cy="-40"
                        rx="35"
                        ry="55"
                        transform="rotate(180)"
                      />
                      <ellipse
                        cx="0"
                        cy="-40"
                        rx="35"
                        ry="55"
                        transform="rotate(240)"
                      />
                      <ellipse
                        cx="0"
                        cy="-40"
                        rx="35"
                        ry="55"
                        transform="rotate(300)"
                      />
                    </g>
                  </svg>
                </div>

                {/* 2. LA IMAGEN CENTRAL (Por encima de la silueta SVG) */}
                <div className="relative z-20 flex h-56 w-56 flex-col items-center justify-center overflow-hidden rounded-full border-8 border-white bg-rose-50 text-rose-300 shadow-xl transition-transform duration-700 hover:rotate-3 sm:h-72 sm:w-72 lg:h-80 lg:w-80 lg:border-12">
                  <HandHeart size={56} weight="thin" />
                  <span className="mt-3 font-display text-xs font-bold tracking-widest uppercase sm:text-sm">
                    Imagen Central
                  </span>
                </div>

                {/* 3. ASSETS ORBITANDO (Decoraciones periféricas) */}
                <div className="absolute right-0 top-4 z-30 scale-75 transition-transform duration-500 hover:rotate-12 sm:-right-4 lg:scale-90">
                  <svg width="40" height="60" viewBox="0 0 36 56" fill="none">
                    <rect
                      x="12"
                      y="0"
                      width="12"
                      height="8"
                      rx="3"
                      fill="#D9BFA6"
                    />
                    <rect
                      x="4"
                      y="10"
                      width="28"
                      height="42"
                      rx="6"
                      fill="#EC407A"
                    />
                    <rect
                      x="8"
                      y="14"
                      width="6"
                      height="20"
                      rx="3"
                      fill="#FFB8D1"
                      opacity="0.5"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-4 right-4 z-30 scale-90 transition-transform duration-500 hover:rotate-45 sm:-bottom-2 sm:-right-2">
                  <svg width="45" height="45" viewBox="0 0 32 32" fill="none">
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

                <div className="absolute left-4 top-12 z-30 transition-transform duration-500 hover:scale-110 sm:-left-4 lg:scale-125">
                  <svg width="35" height="35" viewBox="0 0 28 28" fill="none">
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
                    <circle cx="14" cy="14" r="3" fill="#C9A24C" />
                  </svg>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Copy Dinámico */}
            <div className="flex flex-col text-center lg:text-left">
              {/* Título ajustado para no romperse torpemente en móvil */}
              <Link href={`/cursos/${course.slug}`}>
                <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-tight text-neutral-900 transition-colors hover:text-rose-600 sm:text-5xl lg:text-6xl">
                  {course.title}
                </h1>
              </Link>

              {course.shortDescription && (
                <p className="mt-6 text-[15px] leading-relaxed text-neutral-600 sm:mt-8 sm:text-lg sm:leading-loose">
                  {course.shortDescription}
                </p>
              )}

              {/* Módulo de Precio */}
              <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-3xl bg-rose-50/50 p-6 ring-1 ring-rose-100 sm:mt-12 sm:flex-row sm:gap-8 sm:p-8 lg:p-10">
                <div className="flex flex-col items-center sm:items-start">
                  {course.isOnSale && (
                    <span className="text-sm font-semibold text-rose-400 line-through">
                      {formatCurrency(course.price)}
                    </span>
                  )}
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="font-display text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                      {formatCurrency(effectivePrice)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/cursos/${course.slug}`}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-full bg-rose-500 px-8 text-[15px] font-bold text-white shadow-lg shadow-rose-500/25 outline-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 active:translate-y-0 active:scale-[0.98] active:bg-rose-700 sm:w-auto sm:px-10 lg:h-16 lg:text-base"
                >
                  INSCRÍBETE AHORA
                  <ArrowRight
                    weight="bold"
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseSalesSection;
