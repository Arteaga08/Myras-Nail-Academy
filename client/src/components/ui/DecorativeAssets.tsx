/**
 * Decorative SVG assets for Myra's Nail Academy.
 * Brand-aligned inline SVGs with subtle CSS animations.
 */

interface AssetProps {
  size?: number
  className?: string
}

/* ──────────────────────────────────────────────
   NailSparkle – Elegant sparkle for headings
   (used in LessonSidebar "Ver Clases" title)
   ────────────────────────────────────────────── */
export function NailSparkle({ size = 22, className = '' }: AssetProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`motion-safe:animate-[sparkle-pulse_2.4s_ease-in-out_infinite] ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes sparkle-pulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
          50% { transform: scale(1.1) rotate(8deg); opacity: 1; }
        }
      `}</style>
      {/* 5-petal flower */}
      <ellipse cx="12" cy="6" rx="2.8" ry="4.5" fill="#FB7185" opacity="0.75" />
      <ellipse cx="17.7" cy="9.8" rx="2.8" ry="4.5" fill="#FB7185" opacity="0.7" transform="rotate(72 17.7 9.8)" />
      <ellipse cx="15.5" cy="16.2" rx="2.8" ry="4.5" fill="#FB7185" opacity="0.65" transform="rotate(144 15.5 16.2)" />
      <ellipse cx="8.5" cy="16.2" rx="2.8" ry="4.5" fill="#FB7185" opacity="0.65" transform="rotate(216 8.5 16.2)" />
      <ellipse cx="6.3" cy="9.8" rx="2.8" ry="4.5" fill="#FB7185" opacity="0.7" transform="rotate(288 6.3 9.8)" />
      {/* Center */}
      <circle cx="12" cy="12" r="3" fill="#F43F5E" opacity="0.9" />
      <circle cx="11" cy="11" r="1" fill="white" opacity="0.4" />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   NailAccent – Decorative brush stroke / flourish
   (used next to lesson title in LessonContent)
   ────────────────────────────────────────────── */
export function NailAccent({ size = 26, className = '' }: AssetProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={`motion-safe:animate-[accent-shimmer_3s_ease-in-out_infinite] ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes accent-shimmer {
          0%, 100% { opacity: 0.7; filter: brightness(1); }
          50% { opacity: 1; filter: brightness(1.15); }
        }
      `}</style>
      {/* Nail polish bottle silhouette */}
      <rect x="11" y="2" width="6" height="4" rx="1" fill="#FECDD3" opacity="0.7" />
      <rect x="12.5" y="5" width="3" height="3" rx="0.5" fill="#FB7185" opacity="0.6" />
      {/* Bottle body */}
      <path
        d="M9 10C9 8.5 10.5 8 14 8C17.5 8 19 8.5 19 10V20C19 22.5 17.5 24 14 24C10.5 24 9 22.5 9 20V10Z"
        fill="url(#nail-gradient)"
        opacity="0.85"
      />
      {/* Shine highlight */}
      <path
        d="M11 11C11 10 12 9.5 13 9.5C13 9.5 11.5 12 11 16V11Z"
        fill="white"
        opacity="0.4"
      />
      {/* Small sparkle accents around bottle */}
      <circle cx="6" cy="14" r="1" fill="#F43F5E" opacity="0.4" />
      <circle cx="22" cy="10" r="0.8" fill="#FB7185" opacity="0.35" />
      <circle cx="21" cy="18" r="1.2" fill="#FECDD3" opacity="0.3" />
      <circle cx="7" cy="8" r="0.7" fill="#F43F5E" opacity="0.3" />
      <defs>
        <linearGradient id="nail-gradient" x1="9" y1="8" x2="19" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#FB7185" />
        </linearGradient>
      </defs>
    </svg>
  )
}

/* ──────────────────────────────────────────────
   CompletionBadge – Stylized check with petals
   (replaces generic CheckCircle for completed lessons)
   ────────────────────────────────────────────── */
export function CompletionBadge({ size = 22, className = '' }: AssetProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`motion-safe:animate-[badge-pop_0.4s_ease-out_1] ${className}`}
      aria-hidden="true"
    >
      <style>{`
        @keyframes badge-pop {
          0% { transform: scale(0.6); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      {/* Outer petal accents (decorative floral details) */}
      <ellipse cx="12" cy="3.5" rx="2.8" ry="2.5" fill="#FDA4AF" opacity="0.65" transform="rotate(0 12 12)" />
      <ellipse cx="20.5" cy="12" rx="2.8" ry="2.5" fill="#FDA4AF" opacity="0.65" transform="rotate(90 20.5 12)" />
      <ellipse cx="12" cy="20.5" rx="2.8" ry="2.5" fill="#FDA4AF" opacity="0.65" transform="rotate(0 12 20.5)" />
      <ellipse cx="3.5" cy="12" rx="2.8" ry="2.5" fill="#FDA4AF" opacity="0.65" transform="rotate(90 3.5 12)" />
      {/* Diagonal petals */}
      <ellipse cx="18" cy="6" rx="2.2" ry="2" fill="#FDA4AF" opacity="0.5" transform="rotate(45 18 6)" />
      <ellipse cx="6" cy="18" rx="2.2" ry="2" fill="#FDA4AF" opacity="0.5" transform="rotate(45 6 18)" />
      <ellipse cx="18" cy="18" rx="2.2" ry="2" fill="#FDA4AF" opacity="0.5" transform="rotate(-45 18 18)" />
      <ellipse cx="6" cy="6" rx="2.2" ry="2" fill="#FDA4AF" opacity="0.5" transform="rotate(-45 6 6)" />
      {/* Main circle */}
      <circle cx="12" cy="12" r="7.5" fill="url(#check-gradient)" />
      {/* Inner subtle ring */}
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
      {/* Checkmark */}
      <path
        d="M8.5 12.5L10.8 14.8L15.5 9.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient id="check-gradient" x1="4.5" y1="4.5" x2="19.5" y2="19.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22C55E" />
          <stop offset="1" stopColor="#16A34A" />
        </linearGradient>
      </defs>
    </svg>
  )
}
