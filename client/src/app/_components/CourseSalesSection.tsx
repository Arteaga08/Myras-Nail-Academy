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
        <div className="mx-auto flex max-w-7xl items-center justify-center">
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
        <div className="relative overflow-hidden rounded-[3rem] bg-white p-8 shadow-2xl shadow-rose-500/15 ring-1 ring-lavender-200/60 sm:p-14 lg:p-20">
          {/* Efectos de Glow de fondo */}
          <div className="absolute -left-32 -top-32 h-125 w-125 rounded-full bg-rose-50/80 opacity-60 blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 h-150 w-150 rounded-full bg-rose-100/30 opacity-40 blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
            {/* COLUMNA IZQUIERDA: VISUAL */}
            <div className="flex items-center justify-center">
              <div className="relative flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96 lg:h-112 lg:w-full max-w-md">
                {/* 1. Sombra base / Glow */}
                <div className="absolute h-[80%] w-[80%] rounded-full bg-rose-200/40 opacity-80 shadow-2xl blur-[60px]"></div>
                <div className="absolute inset-0 z-10 flex items-center justify-center opacity-90 transition-transform duration-700 hover:scale-105">
                  <svg
                    viewBox="0 0 200 200"
                    className="h-full w-full animate-spin text-rose-200 drop-shadow-md [animation-duration:40s]"
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

                {/* 2. LA IMAGEN CENTRAL */}
                <div className="relative z-20 flex h-56 w-56 flex-col items-center justify-center overflow-hidden rounded-full border-8 border-white bg-rose-50 text-rose-300 shadow-xl transition-transform duration-700 hover:rotate-3 sm:h-72 sm:w-72 lg:h-80 lg:w-80 lg:border-12">
                  <HandHeart size={56} weight="thin" />
                  <span className="mt-3 font-display text-xs font-bold uppercase tracking-widest sm:text-sm">
                    Imagen Central
                  </span>
                </div>

                {/* 3. ASSETS ORBITANDO */}
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
                    <circle cx="14" cy="14" r="3" fill="#7060BC" />
                  </svg>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: Copy Dinámico */}
            <div className="flex flex-col text-center lg:text-left">
              <h1 className="font-display text-[2.5rem] font-extrabold leading-[1.15] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                Especialización <br className="hidden lg:block" />
                en <br className="hidden lg:block" />
                <span className="text-rose-500">Manicura Rusa.</span>
              </h1>

              {course.shortDescription && (
                <p className="mt-6 text-[15px] leading-relaxed text-neutral-600 sm:mt-8 sm:text-lg sm:leading-loose">
                  {course.shortDescription}
                </p>
              )}

              {/* MÓDULO DE PRECIO REDISEÑADO (Vertical y Premium) */}
              <div className="mt-10 flex flex-col items-center gap-6 rounded-3xl bg-linear-to-br from-white to-rose-50/50 p-8 shadow-xl shadow-rose-900/5 ring-1 ring-rose-100/50 sm:mt-12 sm:items-start lg:p-10">
                {/* Etiqueta de valor para romper la monotonía */}
                <div className="rounded-full bg-rose-100/80 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-600 ring-1 ring-rose-200">
                  Pago Único • Acceso de por vida
                </div>

                <div className="flex flex-col items-center sm:items-start">
                  {course.isOnSale && (
                    <span className="mb-1 text-sm font-medium text-stone-400 line-through">
                      Precio regular: {formatCurrency(course.price)}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-extrabold tracking-tight text-neutral-900 lg:text-7xl">
                      {formatCurrency(effectivePrice)}
                    </span>
                    <span className="font-display text-lg font-bold text-rose-400 lg:text-2xl">
                      MXN
                    </span>
                  </div>
                </div>

                <Link
                  href={`/cursos/${course.slug}`}
                  // Botón ahora tiene 'w-full' asegurado, texto más grande y respira perfectamente
                  className="group mt-2 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-rose-500 px-8 text-sm font-bold tracking-wide text-white shadow-lg shadow-rose-500/25 outline-none transition-all duration-200 hover:-translate-y-1 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/30 active:translate-y-0 active:scale-[0.98] active:bg-rose-700 lg:h-16 lg:text-base"
                >
                  INICIAR MI TRANSFORMACIÓN
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
