"use client";

import Link from "next/link";
import {
  SparkleIcon as Sparkle,
  StarIcon as Star,
  GraduationCapIcon as GraduationCap,
  MedalIcon as Medal,
  UsersIcon as Users,
  ArrowRightIcon as ArrowRight, // 🌸 Agregamos el icono de flecha
} from "@phosphor-icons/react/ssr";

export function AboutInstructorSection() {
  return (
    <section
      id="about-instructor"
      className="relative overflow-hidden bg-rose-400 px-6 py-12 sm:py-16 lg:py-28"
    >
      {/* --- ASSETS FLOTANTES GLOBALES --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* 1. Sparkle Dorado */}
        <div className="absolute right-[2%] top-[5%] scale-75 opacity-70 transition-transform lg:right-[8%] lg:top-[10%] lg:scale-100 lg:opacity-80">
          <svg
            style={{
              animation: "shimmerAnim 5s ease-in-out infinite",
              animationDelay: "0s",
            }}
            width="35"
            height="35"
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
            <circle cx="14" cy="14" r="3" fill="#7060BC" />
          </svg>
        </div>

        {/* 2. Flor Lila Mini */}
        <div className="absolute -left-4 bottom-[10%] scale-75 opacity-60 transition-transform sm:left-[2%] lg:bottom-[15%] lg:left-[5%] lg:scale-100 lg:opacity-80">
          <svg
            style={{
              animation: "floatB 7s ease-in-out infinite",
              animationDelay: "1s",
            }}
            width="45"
            height="45"
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

        {/* 3. Esmalte */}
        <div className="absolute -right-6 top-[60%] scale-50 opacity-40 transition-transform sm:right-[0%] lg:right-[4%] lg:top-[50%] lg:scale-75 lg:opacity-60">
          <svg
            style={{
              animation: "floatA 6s ease-in-out infinite",
              animationDelay: "2s",
            }}
            width="40"
            height="60"
            viewBox="0 0 36 56"
            fill="none"
          >
            <rect x="12" y="0" width="12" height="8" rx="3" fill="#D9BFA6" />
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
          </svg>
        </div>

        {/* 4. Sparkle Pequeño */}
        <div className="absolute left-[40%] top-[15%] scale-50 opacity-60 lg:left-[45%] lg:top-[12%] lg:scale-75 lg:opacity-70">
          <svg
            style={{
              animation: "shimmerAnim 4s ease-in-out infinite",
              animationDelay: "1.5s",
            }}
            width="24"
            height="24"
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
            <circle cx="14" cy="14" r="3" fill="#7060BC" />
          </svg>
        </div>
      </div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20">
          {/* COLUMNA IZQUIERDA: FOTO DE LA MAESTRA */}
          <div className="relative mx-auto w-full max-w-xs pb-8 sm:max-w-sm sm:pb-10 lg:mx-0 lg:max-w-none lg:pb-0">
            {/* SVG Decorativo: Estrella flotante original */}
            <div className="absolute -left-4 -top-4 z-20 animate-pulse text-rose-600 sm:-left-6 sm:-top-6 lg:-left-10 lg:-top-10">
              <Star size={36} weight="fill" className="sm:w-12 sm:h-12" />
            </div>

            {/* Contenedor de la Imagen */}
            <div className="relative aspect-3/4 w-full overflow-hidden rounded-3xl bg-rose-100 ring-4 ring-rose-300/60 ring-offset-4 ring-offset-rose-400 sm:aspect-4/5 sm:rounded-[3rem]">
              <div className="absolute inset-0 flex items-center justify-center opacity-60">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 500"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="scale-125 stroke-rose-300"
                >
                  <path
                    d="M-50 150 C 50 50, 150 250, 250 150 C 350 50, 450 250, 550 150"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M-50 250 C 50 150, 150 350, 250 250 C 350 150, 450 350, 550 250"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Placeholder para la foto */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-10 text-rose-400">
                <div className="mb-4 h-48 w-32 rounded-t-full bg-rose-200/50 backdrop-blur-md border border-white/30"></div>
                <span className="font-display text-lg font-bold">
                  Foto de Myra sin fondo
                </span>
              </div>
            </div>

            {/* Bloque flotante de "Calificación" */}
            <div className="absolute -bottom-4 right-2 z-20 flex items-center gap-2 rounded-2xl bg-white p-3 shadow-xl sm:-bottom-6 sm:-right-4 sm:gap-3 sm:p-4 lg:-right-12">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                <GraduationCap size={24} weight="fill" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Master Educator
                </p>
                <p className="font-display text-lg font-bold text-neutral-900">
                  Certificada
                </p>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: COPY & STATS */}
          <div className="text-center lg:text-left">
            <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-rose-900 sm:text-5xl lg:text-6xl">
              Hola, soy <span className="text-nude-500">Myra.</span>
            </h2>

            {/* SUBTÍTULO / PÁRRAFO DINÁMICO */}
            <div className="mt-6 text-[15px] leading-relaxed text-rose-900/80 sm:text-lg">
              {/* Versión Móvil: Resumen directo y potente */}
              <p className="sm:hidden">
                Mi misión es enseñarte los secretos que me llevaron a construir
                una academia exitosa y dominar la técnica rusa perfecta.
              </p>

              {/* Versión Desktop: Historia completa */}
              <div className="hidden space-y-4 sm:block">
                <p>
                  Llevo más de media década dedicándome a perfeccionar el arte
                  de la manicura rusa. Mi misión es enseñarte los secretos que
                  me llevaron de trabajar en casa a construir un salón de lujo y
                  una academia exitosa.
                </p>
                <p>
                  No solo aprenderás a pintar uñas; aprenderás la arquitectura
                  perfecta, el manejo impecable del torno y cómo elevar el valor
                  de tu trabajo para atraer a las mejores clientas.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-rose-300 pt-8 sm:grid-cols-3 lg:mt-10 lg:pt-10">
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 text-lavender-400">
                  <Star size={28} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-bold text-rose-900">
                  +5 Años
                </h3>
                <p className="text-xs font-medium text-rose-800">
                  De Experiencia
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 text-rose-700">
                  <Users size={28} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-bold text-rose-900">
                  +1,000
                </h3>
                <p className="text-xs font-medium text-rose-800">
                  Alumnas Exitosas
                </p>
              </div>

              <div className="col-span-2 flex flex-col items-center sm:col-span-1 lg:items-start">
                <div className="mb-2 text-rose-700">
                  <Medal size={28} weight="duotone" />
                </div>
                <h3 className="font-display text-2xl font-bold text-rose-900">
                  Top 1%
                </h3>
                <p className="text-xs font-medium text-rose-800">
                  Técnica Rusa
                </p>
              </div>
            </div>

            {/* NUEVO: BOTÓN DE CTA (Estilo Secundario Elegante) */}
            <div className="mt-8 flex flex-col items-center sm:flex-row lg:justify-start">
              <Link
                href="/about"
                className="group flex h-12 w-full max-w-70 items-center justify-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-6 text-sm font-bold text-rose-700 outline-none transition-all duration-200 hover:border-rose-400 hover:bg-rose-100 hover:text-rose-800 active:border-rose-500 active:bg-rose-200 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-400 disabled:pointer-events-none disabled:border-rose-200 disabled:text-rose-300 sm:w-auto sm:max-w-none"
              >
                CONOCE MÁS SOBRE MYRA
                <ArrowRight
                  weight="bold"
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutInstructorSection;
