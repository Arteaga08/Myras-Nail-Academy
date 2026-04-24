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
  return (
    // Wrapper: Controla la visibilidad general. El delay-700 al cerrar permite que termine la animación antes de desaparecer.
    <div
      className={`fixed inset-0 z-50 md:hidden ${
        open ? "visible" : "invisible delay-700"
      }`}
    >
      {/* Backdrop: Animación suave de opacidad */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-md transition-opacity duration-700 ease-out ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden
      />

      {/* Panel: Slide in ultra fluido desde la derecha */}
      <aside
        className={`absolute right-0 top-0 flex h-full w-4/5 max-w-sm flex-col overflow-hidden bg-rose-500 p-8 shadow-2xl transition-transform duration-700 ease-out sm:w-96 sm:p-10 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* --- CAPAS DECORATIVAS DE FONDO --- */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Destellos Dorados: Entran flotando desde arriba */}
          <div
            className={`absolute -right-10 top-0 transition-all duration-1000 ease-out lg:scale-100 ${
              open
                ? "translate-y-0 scale-75 opacity-30"
                : "-translate-y-8 scale-50 opacity-0"
            }`}
            style={{ transitionDelay: open ? "300ms" : "0ms" }}
          >
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

          {/* Destello Grande: Entra flotando desde abajo */}
          <div
            className={`absolute -bottom-10 -left-10 text-white transition-all duration-1000 ease-out lg:scale-110 ${
              open ? "translate-y-0 opacity-20" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: open ? "400ms" : "0ms" }}
          >
            <Sparkle size={150} weight="thin" />
          </div>
        </div>

        {/* --- CONTENIDO DEL MENÚ --- */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Header del Menú: Entra cayendo suavemente */}
          <div
            className={`flex items-center justify-between border-b border-rose-400/50 pb-6 transition-all duration-700 ease-out ${
              open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "100ms" : "0ms" }}
          >
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

          {/* Enlaces de Navegación: Efecto Cascada desde la derecha */}
          <nav className="mt-10 flex flex-col gap-6">
            <p
              className={`text-xs font-bold uppercase tracking-widest text-rose-200 transition-all duration-700 ease-out ${
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? "200ms" : "0ms" }}
            >
              Menú Principal
            </p>
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`font-display text-2xl font-medium text-white transition-all duration-700 ease-out hover:text-rose-200 active:scale-95 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? `${300 + index * 100}ms` : "0ms",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-10"></div>

          {/* Bloque de Redes Sociales: Aparecen escalando (zoom-in) */}
          <div
            className={`mb-10 flex flex-col items-center gap-5 transition-all duration-700 ease-out ${
              open
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-8 scale-95 opacity-0"
            }`}
            style={{ transitionDelay: open ? "500ms" : "0ms" }}
          >
            <p className="text-center text-xs font-bold uppercase tracking-widest text-rose-200">
              Síguenos
            </p>
            <div className="flex justify-center gap-5">
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

          {/* Botones de Acción: Flotan hacia arriba */}
          <div
            className={`flex flex-col gap-4 transition-all duration-700 ease-out ${
              open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: open ? "600ms" : "0ms" }}
          >
            <a
              href="/student/register"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-[15px] font-bold text-rose-600 shadow-lg transition-all duration-200 hover:bg-rose-50 active:scale-95"
            >
              Inscríbete Ahora
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default LandingMobileDrawer;
