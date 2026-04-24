"use client";

import {
  ArrowRightIcon as ArrowRight,
  FlowerIcon as Flower,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react/ssr";

export function CourseSalesCtaSection() {
  return (
    // 1. Full Bleed Wrapper (Ancho completo y overflow-hidden para las decoraciones)
    // relative min-h-[500px] w-full flex items-center justify-center text-center overflow-hidden
    <section
      id="course-sales-cta"
      className="relative min-h-125 w-full flex items-center justify-center text-center overflow-hidden"
    >
      {/* --- CAPA DE LA IMAGEN DE FONDO --- */}
      {/* Aquí reemplazarás la URL por la imagen real de la academia, manicura de lujo o modelo.
          Debe ser object-cover para que no se estire indeseadamente.
      */}
      <div className="absolute inset-0 z-0">
        {/* Placeholder Div mientras pones la imagen real */}
        <div className="flex h-full w-full items-center justify-center bg-rose-100 text-rose-300/50">
          <Sparkle size={100} weight="thin" />
        </div>

        {/* CÓDIGO REAL PARA LA IMAGEN (Reemplazar la URL y descomentar)
        <img 
          src="/images/cta-background-nails-myra.jpg" // Reemplaza por tu imagen
          alt="Manicura Rusa de lujo en Myra's Academy" 
          className="absolute inset-0 h-full w-full object-cover"
        />
        */}
      </div>

      {/* --- CAPA DE OVERLAY (El truco Vidix para legibilidad) --- */}
      {/* Usamos bg-rose-950/85 para que sea oscuro, sofisticado y permita ver la imagen pero destaque el texto blanco. */}
      <div className="absolute inset-0 z-10 bg-rose-950/85"></div>

      {/* --- CAPA DE DECORACIONES BOUTIQUE (Profundidad y Textura) --- */}
      <div className="pointer-events-none absolute inset-0 z-20">
        {/* Glow Profundo 1 (Glows established style) */}
        <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-rose-600 blur-[100px] opacity-20"></div>
        {/* Glow Profundo 2 */}
        <div className="absolute -bottom-20 -right-20 h-125 w-125 rounded-full bg-rose-300 blur-[120px] opacity-10"></div>

        {/* NUEVO: Flores Mini Orbitando (Using established orbiting assets logic) */}
        {/* Flor 1 (Arriba-Derecha) */}
        <div className="absolute right-[5%] top-[10%] scale-75 opacity-40 lg:right-[8%] lg:top-[15%] lg:scale-100">
          <Flower size={35} weight="thin" className="text-white" />
        </div>
        {/* Flor 2 (Abajo-Izquierda) */}
        <div className="absolute -left-2 bottom-[15%] rotate-45 scale-75 opacity-30 lg:left-[5%] lg:bottom-[10%] lg:scale-100">
          <Flower size={40} weight="thin" className="text-rose-200" />
        </div>
      </div>

      {/* --- CAPA DE CONTENIDO (Texto y Botón CENTRADOS) --- */}
      {/* relative z-30 max-w-4xl px-6 py-20 lg:py-28 */}
      <div className="relative z-30 mx-auto max-w-4xl px-6 py-20 lg:py-28 text-white">
        {/* Tagline Sofisticado (Established font-display hierarchy) */}
        <p className="font-display text-sm font-bold uppercase tracking-[0.2em] text-lavender-200">
          Tu momento es ahora.
        </p>

        {/* Título Grande Inspirador (established h1/h2 hierarchy) */}
        {/* text-5xl sm:text-6xl y destacamos "Carrera" en Rose principal */}
        <h2 className="mt-4 font-display text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl">
          Eleva tu <span className="text-rose-500">Carrera</span> en Manicura.
        </h2>

        {/* Body Text Directo (established max-w) */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-100 sm:text-xl">
          Únete a cientos de alumnas que ya transformaron sus salones y
          aumentaron sus ingresos. Tu viaje hacia la perfección empieza aquí.
        </p>

        {/* CTA Potente (Established primary luxury button style) */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="#course-sales"
            className="group flex h-16 items-center gap-2.5 rounded-full bg-white px-10 text-lg font-bold text-rose-600 shadow-xl transition-all hover:scale-105 hover:bg-rose-50 active:scale-95"
          >
            INICIAR MI TRANSFORMACIÓN
            <ArrowRight
              weight="bold"
              size={22}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export default CourseSalesCtaSection;
