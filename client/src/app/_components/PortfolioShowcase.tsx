"use client";

import { useRef } from "react";
import {
  SparkleIcon as Sparkle,
  CaretLeftIcon as CaretLeft,
  CaretRightIcon as CaretRight,
  DiamondIcon as Diamond,
} from "@phosphor-icons/react/ssr";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Nivelación Perfecta" },
  { id: 2, title: "Corte con Tijera" },
  { id: 3, title: "Diseño Editorial" },
  { id: 4, title: "Estructura Almond" },
  { id: 5, title: "Esmaltado Bajo Cutícula" },
  { id: 6, title: "Acabado Espejo" },
];

export function PortfolioShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 1.5 : clientWidth / 1.5;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section
      id="portfolio"
      // 1. Quitamos el "group" de aquí para que no detecte el mouse desde el título
      className="relative overflow-hidden border-y border-rose-100 bg-white py-20 lg:py-28"
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* HEADER DE LA SECCIÓN */}
      <div className="mx-auto mb-12 flex max-w-6xl flex-col items-center px-6 text-center">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">
          El estándar de la <span className="text-rose-500">perfección.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] text-neutral-500 sm:text-lg">
          Desliza para ver los resultados reales que lograrás aplicando nuestra
          metodología. Trabajos limpios, duraderos y de alta gama.
        </p>
      </div>

      {/* CONTENEDOR DEL CARRUSEL */}
      {/* 2. Ponemos el "group" SOLO en el área de las fotos */}
      <div className="group relative mx-auto w-full max-w-400 py-4">
        {/* BOTÓN IZQUIERDA */}
        {/* 3. Añadimos hidden md:flex (no flechas en celular) y quitamos focus:opacity-100 */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-rose-400 text-white opacity-0 shadow-lg shadow-neutral-900/10 outline-none transition-all duration-300 hover:scale-110 hover:bg-rose-500 active:scale-95 active:bg-rose-600 focus-visible:scale-105 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 group-hover:opacity-100 disabled:pointer-events-none disabled:scale-100 disabled:bg-rose-200 disabled:text-white/60 lg:left-8"
          aria-label="Anterior imagen"
        >
          <CaretLeft size={28} weight="bold" />
        </button>

        {/* TRACK DE IMÁGENES */}
        <div
          ref={scrollRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 py-4 sm:gap-6 sm:px-12 lg:gap-8 lg:px-[10vw]"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group/card relative aspect-4/5 w-[75vw] shrink-0 snap-center overflow-hidden rounded-4xl bg-rose-100 shadow-md sm:w-[320px] lg:w-90"
            >
              <div className="flex h-full w-full flex-col items-center justify-center bg-rose-100 text-rose-300 transition-transform duration-700 group-hover/card:scale-105">
                <Diamond
                  size={48}
                  weight="duotone"
                  className="mb-2 opacity-50"
                />
                <span className="font-display text-lg font-bold opacity-80">
                  Foto de Uñas
                </span>
              </div>

              {/* Overlay elegante */}
              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-neutral-900/80 via-neutral-900/20 to-transparent p-6 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover/card:opacity-100">
                <p className="translate-y-0 font-display text-xl font-bold text-white transition-transform duration-300 sm:translate-y-4 sm:group-hover/card:translate-y-0">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* BOTÓN DERECHA */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-20 hidden md:flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-rose-400 text-white opacity-0 shadow-lg shadow-neutral-900/10 outline-none transition-all duration-300 hover:scale-110 hover:bg-rose-500 active:scale-95 active:bg-rose-600 focus-visible:scale-105 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-2 group-hover:opacity-100 disabled:pointer-events-none disabled:scale-100 disabled:bg-rose-200 disabled:text-white/60 lg:right-8"
          aria-label="Siguiente imagen"
        >
          <CaretRight size={28} weight="bold" />
        </button>
      </div>
    </section>
  );
}

export default PortfolioShowcase;
