"use client";

import {
  XIcon as X,
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react/ssr";
import type { NavLink } from "./landing.types";

type LandingMobileDrawerProps = {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
};

export function LandingMobileDrawer({
  open,
  onClose,
  links,
}: LandingMobileDrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop con Fade In */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel con Slide In desde la derecha. Fondo bg-rose-500 principal. */}
      {/* Aumentamos el padding total (p-10) para dar más lujo */}
      <aside className="absolute right-0 top-0 flex h-full w-4/5 max-w-sm flex-col overflow-hidden bg-rose-500 p-10 shadow-2xl animate-in slide-in-from-right-full duration-300 sm:w-96">
        {/* --- CAPAS DECORATIVAS DE FONDO (Estándar Vidix) --- */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* 1. Cluster de Destellos Dorados (Detrás del header, Turn 2 style, opacity-30) */}
          <div className="absolute -right-10 top-0 scale-75 opacity-30 transition-transform lg:scale-100">
            <svg width="150" height="150" viewBox="0 0 100 100" fill="none">
              <line
                x1="14"
                y1="2"
                x2="14"
                y2="26"
                stroke="#E6C068"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="2"
                y1="14"
                x2="26"
                y2="14"
                stroke="#E6C068"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="14" cy="14" r="3" fill="#C9A24C" />

              <line
                x1="50"
                y1="20"
                x2="50"
                y2="44"
                stroke="#E6C068"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform="rotate(15 50 32)"
              />
              <line
                x1="38"
                y1="32"
                x2="62"
                y2="32"
                stroke="#E6C068"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform="rotate(15 50 32)"
              />
              <circle
                cx="50"
                cy="32"
                r="3.5"
                fill="#C9A24C"
                transform="rotate(15 50 32)"
              />

              <line
                x1="86"
                y1="2"
                x2="86"
                y2="26"
                stroke="#E6C068"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="74"
                y1="14"
                x2="98"
                y2="14"
                stroke="#E6C068"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="86" cy="14" r="3" fill="#C9A24C" />
            </svg>
          </div>

          {/* 2. El Destello Grande Original (Bottom-left, opacity-20) */}
          <div className="absolute -bottom-10 -left-10 text-white opacity-20 transition-transform lg:scale-110">
            <Sparkle size={150} weight="thin" />
          </div>

          {/* 3. NUEVO: Outline de Pétalos Lila (Detrás de redes/acción, Turn 2 stroke style, opacity-20) */}
        </div>

        {/* --- CONTENIDO DEL MENÚ --- */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Header del Menú (Logo + Cerrar) */}
          <div className="flex items-center justify-between border-b border-rose-400/50 pb-6">
            <span className="font-display text-lg font-bold text-white">
              Myra's Academy.
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600/50 text-white transition-colors duration-200 hover:bg-rose-600 focus:outline-hidden"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          {/* Enlaces de Navegación (Tipografía grande estilo editorial, text-base-large text-2xl) */}
          <nav className="mt-10 flex flex-col gap-6">
            <p className="text-xs font-bold uppercase tracking-widest text-rose-200">
              Menú Principal
            </p>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="font-display text-2xl font-medium text-white transition-colors duration-200 hover:text-rose-200 active:scale-95"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Spacer para empujar lo demás hacia abajo */}
          <div className="mt-auto pt-10"></div>

          {/* NUEVO: Bloque de Redes Sociales (CENTERED) y decorado por el outline de flor en el fondo */}
          {/* mb-10 y gap-5 para separar y items-center */}
          <div className="mb-10 flex flex-col items-center gap-5">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-rose-200">
              Síguenos
            </p>
            {/* justify-center y gap-5 */}
            <div className="flex gap-5 justify-center">
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600/50 text-white transition-all hover:scale-110 hover:bg-rose-600"
              >
                <InstagramLogo size={24} weight="fill" />
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600/50 text-white transition-all hover:scale-110 hover:bg-rose-600"
              >
                <TiktokLogo size={24} weight="fill" />
              </a>
              <a
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-600/50 text-white transition-all hover:scale-110 hover:bg-rose-600"
              >
                <FacebookLogo size={24} weight="fill" />
              </a>
            </div>
          </div>

          {/* Botones de Acción (Registro — Solamente el principal) */}
          <div className="flex flex-col gap-4">
            <a
              href="/student/register"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-[15px] font-bold text-rose-600 transition-all duration-200 hover:bg-rose-50 active:scale-95 shadow-lg shadow-rose-900/10"
            >
              Inscríbete Ahora
            </a>
            {/* Login Button Eliminado */}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default LandingMobileDrawer;
