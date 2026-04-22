"use client";

import { useState } from "react";
import {
  ListIcon as List,
  UserCircleIcon as UserCircle,
} from "@phosphor-icons/react/ssr";
import { LandingMobileDrawer } from "./LandingMobileDrawer";
import type { NavLink } from "./landing.types";

const NAV_LINKS: NavLink[] = [
  { label: "Cursos", href: "#course-sales" },
  { label: "Sobre Myra", href: "#about-instructor" },
];

export function LandingNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    /* CORRECCIÓN: Cambiamos 'sticky' por 'fixed w-full left-0 right-0' 
       Esto lo saca del flujo del documento y hace que el Hero suba hasta el tope de la pantalla. */
    <div className="fixed left-0 right-0 top-4 z-50 w-full px-4 sm:px-6 lg:px-8">
      {/* El header se mantiene exactamente igual */}
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full bg-rose-500 px-6 shadow-xl shadow-rose-500/30 lg:h-18 lg:px-10">
        {/* Logo */}
        <span className="font-display text-lg font-bold tracking-wide text-white sm:text-xl lg:text-2xl">
          Myra's Nail Academy
        </span>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="cursor-pointer rounded-full px-2 py-1 text-base font-semibold text-white/80 outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-6 md:flex">
          {/* CTA outlined */}
          <a
            href="/student/register"
            className="cursor-pointer rounded-full border border-white/80 bg-white/0 px-6 py-2.5 text-[15px] font-bold text-white outline-none transition-all duration-200 hover:scale-105 hover:border-white hover:bg-white/15 active:scale-95 active:bg-white/25 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500 disabled:pointer-events-none disabled:scale-100 disabled:opacity-50"
          >
            Inscríbete Ahora
          </a>

          {/* Login */}
          <a
            href="/student/login"
            className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-[15px] font-semibold text-white/80 outline-none transition-colors duration-200 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
          >
            <UserCircle size={24} weight="regular" />
            Iniciar Sesión
          </a>
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-4 sm:gap-5 md:hidden">
          {/* Icono de Login Móvil */}
          <a
            href="/student/login"
            aria-label="Iniciar Sesión"
            className="cursor-pointer rounded-full p-1 text-white/80 outline-none transition-colors duration-200 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
          >
            <UserCircle size={28} weight="regular" />
          </a>

          {/* Menú Hamburguesa */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Abrir menú"
            className="cursor-pointer rounded-full p-1 text-white/80 outline-none transition-colors duration-200 hover:text-white active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
          >
            <List size={28} weight="bold" />
          </button>
        </div>
      </header>

      <LandingMobileDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        links={NAV_LINKS}
      />
    </div>
  );
}

export default LandingNavbar;
