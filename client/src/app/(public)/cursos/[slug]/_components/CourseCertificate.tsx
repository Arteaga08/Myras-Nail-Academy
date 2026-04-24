"use client";

import {
  CertificateIcon as Certificate,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react/ssr";

export function CourseCertificate() {
  return (
    // CAMBIO: Ahora es un div con estilo de tarjeta masiva para el grid
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-xl ring-1 ring-rose-100/50 sm:p-12 lg:rounded-[3.5rem] lg:p-16">
      {/* Asset de Estrella de fondo (Como en tu captura) */}
      <div className="pointer-events-none absolute -right-10 -bottom-10 opacity-10 lg:-right-16 lg:-bottom-16">
        <Sparkle size={300} weight="fill" className="text-nude-200" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
        {/* Icono del Certificado */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-4xl bg-rose-50 text-rose-500 shadow-inner sm:h-32 sm:w-32">
          <Certificate size={56} weight="duotone" />
        </div>

        <div className="flex flex-1 flex-col gap-4 text-center sm:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <h2 className="font-display text-3xl font-extrabold text-rose-950 sm:text-4xl">
              Tu Certificado
            </h2>
            <span className="rounded-full bg-rose-50 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-500 ring-1 ring-rose-100">
              Próximamente
            </span>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-stone-600">
            Al completar satisfactoriamente todas las lecciones de este curso,
            obtendrás un certificado digital que acredita tu formación
            profesional en{" "}
            <span className="font-bold text-rose-900/80">
              Myra&apos;s Nail Academy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
