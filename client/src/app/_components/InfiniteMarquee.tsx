"use client";

import type { MarqueeDirection, MarqueeItem } from "./landing.types";

type InfiniteMarqueeProps = {
  items: MarqueeItem[];
  speed?: number;
  direction?: MarqueeDirection;
  className?: string;
};

// Componente auxiliar para renderizar nuestros propios assets del Hero
const VidixAsset = ({ index }: { index: number }) => {
  // Alternamos entre el destello y la flor dependiendo de la posición
  const isEven = index % 2 === 0;

  if (isEven) {
    // 🌟 Sparkle Dorado del Hero
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 28 28"
        fill="none"
        className="opacity-90"
        aria-hidden="true"
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
    );
  }

  // 🌸 Flor Lila del Hero
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      className="opacity-90"
      aria-hidden="true"
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
  );
};

export function InfiniteMarquee({
  items,
  speed = 10, // ⏳ Velocidad reducida drásticamente (40s es ideal para la lectura)
  direction = "left",
  className,
}: InfiniteMarqueeProps) {
  // Duplicamos la lista varias veces para asegurarnos de que llene
  // pantallas ultrawide sin que se rompa la ilusión óptica del infinito
  const multipliedItems = [...items, ...items, ...items, ...items];

  return (
    <>
      {/* Inyectamos la animación CSS de forma local para no tocar el tailwind.config */}
      <style>{`
        @keyframes scroll-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-marquee {
          animation: scroll-marquee linear infinite;
        }
      `}</style>

      <section
        className={`relative flex items-center overflow-hidden py-4 ${
          className ?? "border-y border-rose-100 bg-rose-200"
        }`}
        aria-label="Carrusel decorativo"
      >
        {/* Contenedor que se mueve */}
        <div
          className="flex w-max animate-scroll-marquee items-center"
          style={{
            animationDuration: `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
          }}
        >
          {/* Track duplicado para el loop perfecto */}
          {[1, 2].map((trackId) => (
            <div
              key={trackId}
              className="flex shrink-0 items-center justify-around"
            >
              {multipliedItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}-${trackId}`}
                  className="flex items-center"
                >
                  {/* El Texto Premium */}
                  <span className="mx-6 font-display text-sm font-bold uppercase tracking-[0.2em] text-rose-700 sm:mx-10 sm:text-base">
                    {item.content}
                  </span>

                  {/* El Separador Decorativo usando nuestros Assets */}
                  <VidixAsset index={index} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default InfiniteMarquee;
