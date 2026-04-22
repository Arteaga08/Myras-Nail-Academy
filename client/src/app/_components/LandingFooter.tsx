"use client";

import Link from "next/link";
import {
  InstagramLogo,
  TiktokLogo,
  FacebookLogo,
  PaperPlaneRight,
  SparkleIcon as Sparkle,
} from "@phosphor-icons/react/ssr";

export function LandingFooter() {
  return (
    <footer
      id="landing-footer"
      className="bg-rose-500 pt-20 pb-10 text-rose-50"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP SECTION: Links & Newsletter */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Columna 1: Logo y Descripción */}
          <div className="lg:col-span-3">
            <Link
              href="/"
              className="inline-block rounded font-display text-2xl font-extrabold text-white outline-none transition-opacity duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
            >
              {/* Cambiamos el text-rose-500 a text-rose-800 para que contraste sobre el bg-rose-400 */}
              Myra's <span className="text-rose-800">Academy.</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-rose-100">
              Transformando la industria de la manicura con educación de calidad
              boutique, técnica rusa impecable y diseño editorial.
            </p>
          </div>

          {/* Columnas 2, 3 y 4: Links de Navegación */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-5">
            {/* Links: Cursos */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-lg font-bold text-white">
                Cursos
              </h4>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Manicura Rusa
              </Link>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Nivelación Perfecta
              </Link>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Diseño 3D
              </Link>
            </div>

            {/* Links: Academia */}
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-lg font-bold text-white">
                Academia
              </h4>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Conoce a Myra
              </Link>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Portafolio
              </Link>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Testimonios
              </Link>
            </div>

            {/* Links: Soporte */}
            <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
              <h4 className="font-display text-lg font-bold text-white">
                Soporte
              </h4>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Contacto
              </Link>
              <Link
                href="#"
                className="rounded text-sm text-rose-100 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
              >
                Mi Cuenta
              </Link>
            </div>
          </div>

          {/* Columna 5: Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="flex items-center gap-2 font-display text-lg font-bold text-white">
              <Sparkle size={20} className="text-rose-200" weight="fill" />
              Únete a la lista VIP
            </h4>
            <p className="mt-4 text-sm text-rose-100">
              Recibe tips exclusivos de manicura, tutoriales gratuitos y acceso
              anticipado a nuestros nuevos cursos.
            </p>

            {/* Input del Newsletter - Ajustado para fondo claro */}
            <form className="mt-6 flex items-center rounded-full bg-rose-500/40 p-1 ring-1 ring-white/30 transition-shadow focus-within:ring-white">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-rose-200 focus:outline-hidden"
                required
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-rose-500 outline-none transition-all duration-200 hover:scale-105 hover:bg-rose-50 hover:text-rose-600 active:scale-95 active:bg-rose-100 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500 disabled:pointer-events-none disabled:bg-rose-200 disabled:text-rose-400"
                aria-label="Suscribirse"
              >
                <PaperPlaneRight size={18} weight="fill" />
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM SECTION: Legal, Socials & Credits */}
        {/* Usamos border-white/20 para una línea sutil */}
        <div className="mt-16 border-t border-white/20 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs tracking-wider text-rose-200 sm:justify-start">
              <Link href="#" className="rounded outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500">
                POLÍTICA DE PRIVACIDAD
              </Link>
              <span className="hidden opacity-50 sm:inline">|</span>
              <Link href="#" className="rounded outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500">
                TÉRMINOS DE SERVICIO
              </Link>
            </div>

            {/* Redes Sociales - Botones translúcidos */}
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="rounded-full bg-rose-500/40 p-2.5 text-white outline-none transition-all duration-200 hover:scale-110 hover:bg-white hover:text-rose-500 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} weight="fill" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-rose-500/40 p-2.5 text-white outline-none transition-all duration-200 hover:scale-110 hover:bg-white hover:text-rose-500 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
                aria-label="Facebook"
              >
                <FacebookLogo size={20} weight="fill" />
              </Link>
              <Link
                href="#"
                className="rounded-full bg-rose-500/40 p-2.5 text-white outline-none transition-all duration-200 hover:scale-110 hover:bg-white hover:text-rose-500 active:scale-95 focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-rose-500"
                aria-label="TikTok"
              >
                <TiktokLogo size={20} weight="fill" />
              </Link>
            </div>
          </div>

          {/* Copyright & Créditos Vidix Studio */}
          <div className="mt-8 flex flex-col items-center justify-between gap-2 text-xs text-rose-200 sm:flex-row">
            <p>
              © {new Date().getFullYear()} Myra's Nail Academy. Todos los
              derechos reservados.
            </p>
            <p className="font-medium uppercase tracking-widest text-rose-100">
              Site by <span className="font-bold text-white">Vidix Studio</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
