// FloatingAssets — SVGs decorativos con motion suave para las páginas de auth
// pointer-events-none para no interferir con el formulario
// Contenedor limitado a max-w-[900px] para mantener assets cerca de la card en desktop

export function FloatingAssets() {
  return (
    <div
      className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-225 -translate-x-1/2 overflow-visible"
      aria-hidden="true"
    >
      {/* Flor grande — arriba izquierda */}
      <svg
        className="float-asset absolute -top-4 -left-4 opacity-70"
        style={{ animation: 'floatA 6s ease-in-out infinite', animationDelay: '0s' }}
        width="88"
        height="88"
        viewBox="0 0 88 88"
        fill="none"
      >
        <ellipse cx="44" cy="22" rx="12" ry="20" fill="#FFA8C2" />
        <ellipse cx="66" cy="33" rx="12" ry="20" fill="#FFA8C2" transform="rotate(72 66 33)" />
        <ellipse cx="57" cy="60" rx="12" ry="20" fill="#FFA8C2" transform="rotate(144 57 60)" />
        <ellipse cx="31" cy="60" rx="12" ry="20" fill="#FFA8C2" transform="rotate(216 31 60)" />
        <ellipse cx="22" cy="33" rx="12" ry="20" fill="#FFA8C2" transform="rotate(288 22 33)" />
        <circle cx="44" cy="44" r="10" fill="#F06292" />
      </svg>

      {/* Frasco de esmalte — arriba derecha */}
      <svg
        className="float-asset absolute top-10 right-8 opacity-80"
        style={{ animation: 'floatB 5s ease-in-out infinite', animationDelay: '0.8s' }}
        width="36"
        height="56"
        viewBox="0 0 36 56"
        fill="none"
      >
        <rect x="12" y="0" width="12" height="8" rx="3" fill="#D9BFA6" />
        <rect x="14" y="6" width="8" height="4" rx="1" fill="#B8946F" />
        <rect x="4" y="10" width="28" height="42" rx="6" fill="#EC407A" />
        <rect x="8" y="14" width="6" height="20" rx="3" fill="#FFB8D1" opacity="0.5" />
        <ellipse cx="18" cy="52" rx="14" ry="4" fill="#AD1457" opacity="0.35" />
      </svg>

      {/* Destello / sparkle — centro derecha */}
      <svg
        className="float-asset absolute top-1/3 right-6 opacity-85"
        style={{ animation: 'shimmerAnim 4s ease-in-out infinite', animationDelay: '1.2s' }}
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <line x1="14" y1="2" x2="14" y2="26" stroke="#8B7EC8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="2" y1="14" x2="26" y2="14" stroke="#8B7EC8" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="5" y1="5" x2="23" y2="23" stroke="#8B7EC8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="23" y1="5" x2="5" y2="23" stroke="#8B7EC8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="14" r="3" fill="#7060BC" />
      </svg>

      {/* Flor pequeña — abajo izquierda */}
      <svg
        className="float-asset absolute bottom-16 left-8 opacity-75"
        style={{ animation: 'floatB 7s ease-in-out infinite', animationDelay: '0.4s' }}
        width="52"
        height="52"
        viewBox="0 0 52 52"
        fill="none"
      >
        <ellipse cx="26" cy="13" rx="8" ry="13" fill="#FFB8D1" stroke="#FF7AA3" strokeWidth="1" />
        <ellipse cx="39" cy="20" rx="8" ry="13" fill="#FFB8D1" stroke="#FF7AA3" strokeWidth="1" transform="rotate(72 39 20)" />
        <ellipse cx="34" cy="37" rx="8" ry="13" fill="#FFB8D1" stroke="#FF7AA3" strokeWidth="1" transform="rotate(144 34 37)" />
        <ellipse cx="18" cy="37" rx="8" ry="13" fill="#FFB8D1" stroke="#FF7AA3" strokeWidth="1" transform="rotate(216 18 37)" />
        <ellipse cx="13" cy="20" rx="8" ry="13" fill="#FFB8D1" stroke="#FF7AA3" strokeWidth="1" transform="rotate(288 13 20)" />
        <circle cx="26" cy="26" r="7" fill="#F06292" />
      </svg>

      {/* Frasco esmalte variante — centro izquierda */}
      <svg
        className="float-asset absolute top-1/2 -left-2 opacity-60"
        style={{ animation: 'floatA 8s ease-in-out infinite', animationDelay: '2s' }}
        width="30"
        height="46"
        viewBox="0 0 30 46"
        fill="none"
      >
        <rect x="10" y="0" width="10" height="6" rx="2.5" fill="#EEDFD0" />
        <rect x="11" y="5" width="8" height="3" rx="1" fill="#B8946F" />
        <rect x="2" y="8" width="26" height="34" rx="6" fill="#9A0E47" />
        <rect x="5" y="11" width="5" height="16" rx="2.5" fill="#C2185B" opacity="0.5" />
        <ellipse cx="15" cy="42" rx="13" ry="3" fill="#6B0A32" opacity="0.3" />
      </svg>

      {/* Sparkle mediano — abajo derecha (coral accent) */}
      <svg
        className="float-asset absolute bottom-24 right-12 opacity-80"
        style={{ animation: 'shimmerAnim 5s ease-in-out infinite', animationDelay: '1.8s' }}
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <line x1="11" y1="1" x2="11" y2="21" stroke="#FF8A65" strokeWidth="2" strokeLinecap="round" />
        <line x1="1" y1="11" x2="21" y2="11" stroke="#FF8A65" strokeWidth="2" strokeLinecap="round" />
        <line x1="3.5" y1="3.5" x2="18.5" y2="18.5" stroke="#FFAB91" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18.5" y1="3.5" x2="3.5" y2="18.5" stroke="#FFAB91" strokeWidth="1.5" strokeLinecap="round" />
      </svg>

      {/* Círculo decorativo 1 — arriba centro */}
      <svg
        className="float-asset absolute top-8 left-1/3 opacity-55"
        style={{ animation: 'floatB 9s ease-in-out infinite', animationDelay: '3s' }}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <circle cx="7" cy="7" r="7" fill="#FF8A65" />
      </svg>

      {/* Círculo decorativo 2 — abajo centro */}
      <svg
        className="float-asset absolute bottom-10 right-1/3 opacity-55"
        style={{ animation: 'floatA 6.5s ease-in-out infinite', animationDelay: '1s' }}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <circle cx="9" cy="9" r="9" fill="#F06292" />
      </svg>

      {/* Flor mini — centro superior derecho (lavender accent) */}
      <svg
        className="float-asset absolute top-20 right-1/4 opacity-65"
        style={{ animation: 'floatA 7.5s ease-in-out infinite', animationDelay: '2.5s' }}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <ellipse cx="16" cy="7" rx="5" ry="8" fill="#C9B6E8" />
        <ellipse cx="25" cy="12" rx="5" ry="8" fill="#C9B6E8" transform="rotate(72 25 12)" />
        <ellipse cx="21" cy="25" rx="5" ry="8" fill="#C9B6E8" transform="rotate(144 21 25)" />
        <ellipse cx="11" cy="25" rx="5" ry="8" fill="#C9B6E8" transform="rotate(216 11 25)" />
        <ellipse cx="7" cy="12" rx="5" ry="8" fill="#C9B6E8" transform="rotate(288 7 12)" />
        <circle cx="16" cy="16" r="5" fill="#9575CD" />
      </svg>
    </div>
  )
}
