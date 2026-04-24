"use client";

import {
  SparkleIcon as Sparkle,
  FlowerIcon as Flower,
} from "@phosphor-icons/react/ssr";
import { FlowerFrame6Petals } from "@/components/ui/DecorativeAssets";

export default function AboutPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-white pt-24">
      {/* --- ASSETS FLOTANTES EXTRA --- */}

      {/* Destello Top Izquierda */}
      <div className="pointer-events-none absolute left-6 top-24 z-0 opacity-40 lg:left-12 lg:top-32">
        <Sparkle
          size={48}
          weight="fill"
          className="text-lavender-400"
          style={{ animation: "shimmerAnim 4s infinite" }}
        />
      </div>

      {/* Frasco de Esmalte */}
      <div className="pointer-events-none absolute bottom-40 left-[10%] z-0 opacity-30 lg:bottom-20 lg:left-[5%] lg:scale-125">
        <svg
          style={{ animation: "floatB 6s infinite" }}
          width="40"
          height="60"
          viewBox="0 0 36 56"
          fill="none"
        >
          <rect
            x="12"
            y="0"
            width="12"
            height="8"
            rx="3"
            className="fill-nude-300"
          />
          <rect
            x="4"
            y="10"
            width="28"
            height="42"
            rx="6"
            className="fill-rose-500"
          />
        </svg>
      </div>

      {/* Flor Mini Lila Flotante */}
      <div className="pointer-events-none absolute right-[5%] top-40 z-0 opacity-40 lg:right-[15%] lg:top-20">
        <svg
          style={{ animation: "floatA 7s infinite" }}
          width="50"
          height="50"
          viewBox="0 0 32 32"
          fill="none"
        >
          <ellipse cx="16" cy="7" rx="5" ry="8" className="fill-rose-200" />
          <ellipse
            cx="25"
            cy="12"
            rx="5"
            ry="8"
            className="fill-rose-200"
            transform="rotate(72 25 12)"
          />
          <ellipse
            cx="21"
            cy="25"
            rx="5"
            ry="8"
            className="fill-rose-200"
            transform="rotate(144 21 25)"
          />
          <ellipse
            cx="11"
            cy="25"
            rx="5"
            ry="8"
            className="fill-rose-200"
            transform="rotate(216 11 25)"
          />
          <ellipse
            cx="7"
            cy="12"
            rx="5"
            ry="8"
            className="fill-rose-200"
            transform="rotate(288 7 12)"
          />
          <circle cx="16" cy="16" r="5" className="fill-rose-400" />
        </svg>
      </div>

      {/* Otro destello dorado abajo a la derecha */}
      <div className="pointer-events-none absolute bottom-32 right-10 z-0 opacity-30 lg:bottom-40 lg:right-20">
        <Sparkle
          size={32}
          weight="fill"
          className="text-lavender-300"
          style={{ animation: "shimmerAnim 5s infinite" }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-350 px-6 py-12 lg:py-24">
        {/* TÍTULO PRINCIPAL EDITORIAL */}
        <div className="mb-12 text-center lg:mb-16 lg:text-left">
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            Conoce a <span className="text-rose-500">Myra</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24">
          {/* COLUMNA IZQUIERDA: Textos estructurados */}
          <div className="order-2 flex flex-col gap-12 lg:order-1 lg:col-span-7">
            {/* Bloque 1 */}
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold text-neutral-900 lg:text-4xl">
                Su Legado <span className="italic text-rose-500">Natural</span>
              </h2>
              <p className="text-lg leading-relaxed text-stone-600">
                Profesional con años de experiencia en el mundo de las uñas. Su
                pasión por la técnica y el detalle la llevaron a crear{" "}
                <span className="font-bold text-rose-950">
                  Myra's Nail Academy
                </span>
                , donde comparte sus conocimientos para formar artistas de alto
                nivel.
              </p>
            </div>

            {/* Bloque 2: Valores con ícono de flor y UX corregida */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <div className="flex flex-col gap-4">
                <h2 className="font-display text-3xl font-bold text-neutral-900 lg:text-4xl">
                  Nuestros <span className="italic text-rose-500">Valores</span>
                </h2>
                <p className="text-lg leading-relaxed text-stone-600">
                  A lo largo de su carrera, Myra ha entendido la importancia de:
                </p>
              </div>

              {/* LISTA CORREGIDA: Eliminado max-w-sm y mx-auto para que se alinee con el texto superior en escritorio */}
              <ul className="flex flex-col items-center gap-4 text-lg font-medium text-rose-900/80 lg:items-start">
                <li className="flex items-start gap-3 text-left">
                  <Flower
                    size={26}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-rose-400"
                  />
                  <span>Arquitectura y estructura perfecta.</span>
                </li>
                <li className="flex items-start gap-3 text-left">
                  <Flower
                    size={26}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-rose-400"
                  />
                  <span>Salud y cuidado de la uña natural.</span>
                </li>
                <li className="flex items-start gap-3 text-left">
                  <Flower
                    size={26}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-rose-400"
                  />
                  <span>Educación continua y excelencia.</span>
                </li>
              </ul>
            </div>

            {/* Bloque 3: Estándar */}
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h2 className="font-display text-3xl font-bold text-neutral-900 lg:text-4xl">
                Un Estándar{" "}
                <span className="italic text-rose-500">Superior</span>
              </h2>
              <p className="text-lg leading-relaxed text-stone-600">
                Ha capacitado a cientos de alumnas que hoy ejercen con éxito,
                enfocándose no solo en la belleza, sino en la{" "}
                <span className="font-semibold text-rose-900/80">
                  perfección estructural
                </span>{" "}
                de cada diseño. Su objetivo es elevar la industria en todo
                México.
              </p>
            </div>
          </div>

          {/* COLUMNA DERECHA: Marco Flor 6 Pétalos + Foto */}
          <div className="relative order-1 flex items-center justify-center lg:order-2 lg:col-span-5 lg:-translate-y-12">
            <FlowerFrame6Petals
              size={480}
              className="opacity-90"
              photoContent={
                <span className="px-6 text-center font-display text-xl font-bold text-rose-300">
                  Foto de Myra sin fondo
                </span>
              }
            />
          </div>
        </div>
      </section>
    </main>
  );
}
