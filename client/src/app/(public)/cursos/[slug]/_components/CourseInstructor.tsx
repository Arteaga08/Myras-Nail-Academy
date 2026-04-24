"use client";

import {
  SparkleIcon as Sparkle,
  FileTextIcon as FileText,
  UserIcon as User,
} from "@phosphor-icons/react/ssr";

export function CourseInstructor() {
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl shadow-rose-900/5 ring-1 ring-rose-100/50 sm:p-12 lg:rounded-[3.5rem] lg:p-16">
      {/* 1. ASSET REUBICADO: Chispa en la esquina superior izquierda (No tapa el texto) */}
      <div className="pointer-events-none absolute -left-2 -top-2 z-0 opacity-30 sm:left-2 sm:top-2 lg:left-4 lg:top-4">
        <Sparkle
          size={32}
          weight="fill"
          className="text-lavender-400 sm:size-48 lg:size-64"
          style={{ animation: "shimmerAnim 4s ease-in-out infinite" }}
        />
      </div>

      {/* 2. ASSET NUEVO: Frasco de esmalte (Cerca del botón) */}
      <div className="pointer-events-none absolute bottom-12 left-10 z-0 hidden opacity-20 lg:block">
        <svg
          style={{ animation: "floatB 5s ease-in-out infinite" }}
          width="40"
          height="62"
          viewBox="0 0 36 56"
          fill="none"
        >
          <rect x="12" y="0" width="12" height="8" rx="3" fill="#D9BFA6" />
          <rect x="4" y="10" width="28" height="42" rx="6" fill="#EC407A" />
        </svg>
      </div>

      {/* 3. ASSET NUEVO: Flor mini (Esquina inferior derecha) */}
      <div className="pointer-events-none absolute -bottom-4 -right-4 z-0 opacity-20 lg:bottom-8 lg:right-8 lg:opacity-30">
        <svg
          style={{ animation: "floatA 7s ease-in-out infinite" }}
          width="80"
          height="80"
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
          <ellipse cx="44" cy="44" r="10" fill="#F06292" />
        </svg>
      </div>

      {/* 4. ASSET NUEVO: Destello sutil (Cerca del nombre) */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 z-0 opacity-15">
        <Sparkle size={20} weight="fill" className="text-lavender-300" />
      </div>

      <div className="relative z-10 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          {/* Label con respiro */}
          <span className="font-display ml-1 text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
            Experta
          </span>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-rose-950 sm:text-5xl">
            Tu Instructora
          </h2>
        </div>

        <div className="flex flex-col-reverse items-center gap-12 sm:flex-row sm:items-start lg:grid lg:grid-cols-12 lg:gap-20">
          {/* COLUMNA IZQUIERDA: Texto Editorial */}
          <div className="flex flex-col gap-6 text-center sm:text-left lg:col-span-7">
            <div className="flex flex-col gap-1">
              <h3 className="font-display text-3xl font-bold text-rose-950 lg:text-4xl">
                Myra
              </h3>
              <p className="text-sm font-bold uppercase tracking-widest text-rose-500">
                Master Nail Artist
              </p>
            </div>

            <p className="line-clamp-4 max-w-xl text-lg leading-relaxed text-stone-600 sm:line-clamp-none lg:text-xl">
              Profesional con años de experiencia en el mundo de las uñas. Su
              pasión por la técnica y el detalle la llevaron a crear Myra&apos;s
              Nail Academy, donde comparte sus conocimientos para formar
              artistas de alto nivel.
              <br className="hidden sm:block" />
              <br className="hidden sm:block" />
              <span className="text-rose-900/80 font-medium">
                Ha capacitado a cientos de alumnas que hoy ejercen con éxito,
                enfocándose en la perfección estructural de cada diseño.
              </span>
            </p>

            {/* CTA Curriculum */}
            <div className="mt-4 flex justify-center sm:justify-start">
              <button className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-rose-500 px-10 text-[15px] font-bold text-white shadow-lg shadow-rose-500/25 transition-all duration-200 hover:-translate-y-1 hover:bg-rose-600 active:scale-[0.98] sm:w-auto sm:text-base">
                <FileText size={22} weight="bold" />
                VER CURRICULUM
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA: Imagen Imponente */}
          <div className="relative flex shrink-0 items-center justify-center lg:col-span-5">
            {/* Flor Giratoria de Fondo */}
            <div className="absolute h-64 w-64 animate-[spin_30s_linear_infinite] opacity-20 sm:h-80 sm:w-80 lg:h-128 lg:w-lg">
              <svg viewBox="0 0 88 88" fill="none" className="h-full w-full">
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
              </svg>
            </div>

            {/* Marco de Imagen / Placeholder */}
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-rose-50 text-rose-200 shadow-2xl shadow-rose-900/10 ring-8 ring-white sm:h-56 sm:w-56 lg:h-80 lg:w-80">
              <User size={90} weight="thin" className="sm:size-32 lg:size-44" />

              <div className="absolute bottom-2 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-lavender-400 text-white shadow-lg ring-4 ring-white lg:bottom-6 lg:right-6 lg:h-20 lg:w-20">
                <Sparkle size={24} weight="fill" className="lg:size-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
