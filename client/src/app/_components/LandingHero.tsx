"use client";

import Link from "next/link";
import { ArrowRightIcon as ArrowRight } from "@phosphor-icons/react/ssr";

type LandingHeroProps = {
  imageUrl?: string;
};

export function LandingHero({ imageUrl }: LandingHeroProps = {}) {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-rose-200 via-rose-100 to-nude-100 pt-28 pb-4 sm:pt-32 sm:pb-8 lg:min-h-[85vh] lg:pt-40 lg:pb-28">
      {/* GLOW suave central para dar profundidad */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-60 blur-[80px] lg:h-200 lg:w-200 lg:opacity-50 lg:blur-[100px]"></div>

      {/* ASSETS FLOTANTES GLOBALES */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* 1. Flor grande — ¡RESCATADA! Bajamos a top-24 y la asomamos por la izquierda en móvil */}
        <div className="absolute -left-6 top-24 scale-[0.60] opacity-70 transition-transform sm:top-[8%] sm:scale-75 sm:opacity-60 lg:left-[2%] lg:top-[8%] lg:scale-100 lg:opacity-90">
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

        {/* 2. Destello mediano — ¡RESCATADO! Lo subimos para que acompañe al título a la derecha */}
        <div className="absolute right-6 top-[22%] scale-[0.65] opacity-80 transition-transform sm:left-[2%] sm:right-auto sm:top-[45%] sm:scale-75 sm:opacity-70 lg:left-[45%] lg:top-[35%] lg:scale-100 lg:opacity-80">
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

        {/* 3. Frasco de esmalte Derecho — Un poco más visible y opaco */}
        <div className="absolute -right-2 top-[38%] scale-[0.60] opacity-75 transition-transform sm:top-[25%] sm:scale-[0.60] sm:opacity-50 md:scale-75 lg:right-[5%] lg:top-[15%] lg:scale-100 lg:opacity-100">
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

        {/* 4. Frasco esmalte variante (Abajo Izquierda) */}
        <div className="absolute bottom-16 -left-2 scale-[0.60] opacity-80 transition-transform sm:bottom-[10%] sm:left-[5%] sm:scale-[0.65] sm:opacity-80 lg:bottom-[20%] lg:left-[42%] lg:scale-100 lg:opacity-90">
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
            <rect x="10" y="0" width="10" height="6" rx="2.5" fill="#EEDFD0" />
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

        {/* 5. Flor mini (Abajo Derecha) */}
        <div className="absolute bottom-12 right-0 scale-[0.65] opacity-80 transition-transform sm:bottom-[5%] sm:right-[2%] sm:scale-75 sm:opacity-75 lg:bottom-[15%] lg:right-[10%] lg:scale-100 lg:opacity-85">
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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12">
          {/* COLUMNA IZQUIERDA: Copy */}
          <div className="flex flex-col items-start text-left">
            <h1 className="font-display text-[56px] font-extrabold leading-[0.95] tracking-[-0.02em] text-neutral-900 sm:text-6xl lg:text-7xl xl:text-[88px]">
              Domina la Técnica, <br />
              <span className="text-rose-500">Eleva tu Arte.</span>
            </h1>

            <p className="mt-4 max-w-70 text-[15px] leading-relaxed text-neutral-500/80 sm:mt-5 sm:max-w-lg sm:text-lg sm:text-neutral-600 lg:max-w-none">
              <span className="sm:hidden">
                Cursos de manicura con calidad boutique. Transforma tu técnica y
                conviértete en autoridad.
              </span>
              <span className="hidden sm:inline">
                Cursos de manicura rusa y diseño con calidad boutique. Aprende
                paso a paso, transforma la experiencia de tus clientas y
                conviértete en una autoridad del sector.
              </span>
            </p>

            <div className="mt-6 flex w-full flex-col items-start justify-start gap-4 sm:mt-8 sm:flex-row">
              <Link
                href="/cursos#course-sales"
                className="group flex h-14 w-full max-w-65 items-center justify-center gap-2 rounded-full bg-rose-500 px-8 text-[15px] font-bold text-white shadow-lg outline-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-rose-600 hover:shadow-xl active:translate-y-0 active:scale-[0.98] active:bg-rose-700 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-100 disabled:pointer-events-none disabled:bg-rose-300 disabled:text-white/80 disabled:shadow-none sm:w-auto sm:max-w-none sm:text-base"
              >
                VER LOS CURSOS
                <ArrowRight
                  weight="bold"
                  size={18}
                  className="transition-transform group-hover:translate-x-1 sm:size={20}"
                />
              </Link>
            </div>
          </div>

          {/* COLUMNA DERECHA: Visual */}
          <div className="relative -mx-6 mt-6 flex justify-center sm:mx-0 sm:mt-0 sm:h-112.5 sm:items-center lg:h-162.5">
            <div className="relative z-20 aspect-4/3 w-full overflow-hidden bg-rose-200 sm:aspect-4/5 sm:w-64 sm:rotate-3 sm:rounded-4xl sm:border-8 sm:border-white sm:shadow-2xl sm:transition-transform sm:hover:rotate-0 lg:w-80 lg:border-10">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Curso de manicura"
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <div className="relative flex h-full w-full items-center justify-center bg-linear-to-br from-rose-100 via-rose-50 to-rose-200">
                  <span className="font-display text-[180px] font-bold leading-none text-rose-300/40 sm:text-[180px]">
                    M
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
