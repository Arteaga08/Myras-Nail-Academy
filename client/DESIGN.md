# Design System: Myra's Nail Academy

## 1. Visual Theme & Atmosphere

A feminine-editorial platform with the refined warmth of a luxury beauty atelier. Think: soft natural light on white marble, scattered rose petals, the quiet confidence of an expert who doesn't need to shout. The interface breathes — generous whitespace alternates with rich, layered sections. Layouts are deliberately asymmetric: editorial splits, offset photo frames, and staggered prose columns communicate curated intent rather than template-filling.

- **Density:** 4 — Gallery Airy. Sections breathe. No information overload.
- **Variance:** 7 — Offset Asymmetric. Split-screen heroes, 5/7-column editorial grids, diagonal section breaks.
- **Motion:** 6 — Fluid CSS. Floating decorative assets, shimmering sparkles, slow-spinning flower frames. No cinematic keyframing — elegance in restraint.

The brand persona is a senior nail artist with an eye for architecture: precise, feminine, and quietly luxurious. Every screen should feel like a landing page for an atelier, not a generic e-learning platform.

---

## 2. Color Palette & Roles

### Brand & Accent
- **Petal Rose** (#FFF5F8) — Primary page background. The lightest blush, not white.
- **Rose Haze** (#FFE4EC) — Badge fills, chip backgrounds, decorative tints.
- **Soft Petal** (#FFC2D4) — Decorative SVG fills (5-petal flower petals).
- **Rose Centre** (#F8A5C2) — Decorative flower centers, navbar tint.
- **Rose Signal** (#F06292) — **CTA primary, text emphasis, button fill, brand accent.** The one true pink.
- **Rose Deep** (#E91E63) — Loading state hover, strong emphasis.
- **Rose Press** (#C2185B) — Button active/hover state. Tactile press feedback.
- **Rose Night** (#3D051C) — Dark emphasis text on brand backgrounds.

### Lavender Accent (replaces all Gold)
- **Lavender Mist** (#F0EEF9) — Subtle background tints.
- **Lavender Soft** (#D8D4F0) — Badge fills, accent backgrounds.
- **Lavender Petal** (#BDB4E0) — **6-petal rotating frame fill.** The signature decorative color.
- **Lavender Mid** (#A396D4) — Decorative accent.
- **Lavender Spark** (#8B7EC8) — **Sparkle asset color, progress bars, percentages, accent buttons.** The accent token.
- **Lavender Deep** (#7060BC) — Hover state for accent buttons.
- **Lavender Ink** (#5648A0) — Dark emphasis on lavender surfaces.

### Nude / Champagne Secondary
- **Ivory Canvas** (#FDFAF7) — Alternate section backgrounds.
- **Champagne Soft** (#F8F1EA) — Section alternation fill.
- **Champagne Mid** (#EEDFD0) — Alternate section, decorative borders.
- **Caramel Border** (#D9BFA6) — Decorative borders, bottle cap color in SVG.
- **Warm Tan** (#B8946F) — Decorative fills.
- **Walnut** (#8C6A4A) — Warm emphasis text on champagne surfaces.

### Neutral — Text & UI
- **Zinc Canvas** (#FAFAFA) — Module card backgrounds.
- **Zinc Tint** (#F4F4F5) — Table backgrounds, separator fills.
- **Zinc Border** (#E4E4E7) — Card borders, structural separators.
- **Zinc Ghost** (#D4D4D8) — Ghost button borders.
- **Zinc Muted** (#A1A1AA) — Captions, placeholders, metadata.
- **Zinc Mid** (#71717A) — Secondary body text.
- **Zinc Body** (#52525B) — **Primary body text.** Not black — warm off-charcoal.
- **Zinc Strong** (#3F3F46) — Medium-weight headings on light backgrounds.
- **Zinc Ink** (#18181B) — **Primary heading color.** Off-black, never pure `#000000`.

### Semantic
- **Success Surface** (#DCFCE7) + **Success Ink** (#16A34A)
- **Warning Surface** (#FEF3C7) + **Warning Ink** (#F59E0B)
- **Error Surface** (#FEE2E2) + **Error Ink** (#DC2626)
- **Info Surface** (#DBEAFE) + **Info Ink** (#2563EB)

> **BANNED:** All gold (`#E6C068`, `#C9A24C`). Pure black (`#000000`). Neon glows. Oversaturated gradients. Cool gray (Slate) mixed with warm Zinc — one neutral family only.

---

## 3. Typography Rules

- **Display / Headlines:** `Fraunces` — A modern editorial serif with optical ink traps and expressive high-contrast strokes. Used exclusively for headings and display text. Track-tight (`-0.02em` to `-0.03em`). Weight 700–900. Hierarchy is communicated through scale and weight, never through text-shadow or gradient fills. One keyword per headline may be colored **Rose Signal** (#F06292) — never more than one word per line.

- **Body / UI:** `DM Sans` — A clean, geometric sans-serif with humanist warmth. Used for all body copy, labels, buttons, captions, and metadata. Relaxed leading (1.6–1.7 for body). Maximum 65 characters per line for paragraph text. Weight 400–700. Body text is always **Zinc Body** (#52525B) — never rose or lavender.

- **Scale:**
  - `display-2xl` — 88px / weight 900 / tracking -0.03em — Reserved for hero landing impact titles
  - `display-xl` — 72px / weight 800 / tracking -0.02em — Standard landing hero headline
  - `h1` — 56px / weight 800 / tracking -0.02em — Interior page titles (About, Courses)
  - `h2` — 40px / weight 700 / tracking -0.01em — Section titles
  - `h3` — 28px / weight 700 — Card titles, subtitles
  - `h4` — 22px / weight 700 — Module items, list headers
  - `body-lg` — 18px / weight 400 / leading 1.7 — Primary body prose
  - `body-md` — 16px / weight 400 / leading 1.65 — Descriptions
  - `body-sm` — 14px / weight 400 / leading 1.5 — Metadata, dates
  - `caption` — 12px / weight 500 / tracking +0.02em — Small labels
  - `overline` — 11px / weight 700 / tracking +0.08em — Uppercase badge text

- **Banned:** `Inter`, `Georgia`, `Times New Roman`, `Garamond`, `Palatino`. Gradient text fills on display headings. All-caps headlines. `text-shadow` on any typography.

---

## 4. Component Stylings

### Buttons — All Pill Shape
Every button is fully pill-shaped (`border-radius: 9999px`). No rectangular buttons. No rounded corners — pills only.

- **Primary** — Fill: Rose Signal (#F06292). Text: white. Hover: Rose Press (#C2185B). Active: -1px translate + Rose Press. No shadow. No outer glow. `px-8 py-3.5 text-base font-semibold` for large; `px-4 py-1.5 text-xs` for small.
- **Secondary** — Transparent fill. Border: 1.5px Rose Signal. Text: Rose Signal. Hover: Petal Rose (#FFF5F8) fill. Active: Rose Haze (#FFE4EC) fill.
- **Accent** — Fill: Lavender Spark (#8B7EC8). Text: white. Hover: Lavender Deep (#7060BC). For non-primary actions that need brand personality.
- **Ghost** — Transparent. Border: 1.5px Zinc Ghost (#D4D4D8). Text: Zinc Mid (#71717A). Hover: Zinc Tint (#F4F4F5) fill.
- **Nude** — Fill: Champagne Mid (#EEDFD0). Text: Walnut (#8C6A4A). Hover: Caramel Border (#D9BFA6). Warm, understated.
- **Disabled** — `opacity-40 cursor-not-allowed`. Same shape, no hover effects.
- **Loading** — Same style + internal spinner. No style change — the spinner communicates state.

> **BANNED on buttons:** `box-shadow` with color. Outer glows. Custom cursors. `rounded-xl` or `rounded-2xl` — only `rounded-full`.

### Cards — Course & Enrollment
- **Course Card** — `border-radius: 20px`. Border: 1px Zinc Border (#E4E4E7). No colored shadow. Shadow: `0 1px 3px rgba(24,24,27,0.08)`. Image top: 200px fixed height, `object-fit: cover`. Body: `padding: 16px`. Category badge: overline text in Lavender. Price: body-lg in Rose Signal. Strikethrough price: body-sm in Zinc Muted. CTA: primary pill button, full-width.
- **Enrollment Card** — `border-radius: 16px`. Border: 1px Zinc Border. Progress bar: background Lavender Soft (#D8D4F0), fill Lavender Spark (#8B7EC8), 6px height, pill. Percentage text: body-sm in Lavender Spark. CTA: primary pill, full-width.
- **Module Card** — `border-radius: 12px`. Border: 1px Zinc Border. Background: Zinc Canvas (#FAFAFA). Icon 28×28px, `border-radius: 8px`. Completed: icon bg Rose Haze (#FFE4EC), check in Rose Signal. In Progress: icon bg Rose Signal (white icon), border Rose Signal, card bg Petal Rose (#FFF5F8). Locked: icon bg Zinc Border, `opacity-45`.

> Cards are used only when elevation communicates hierarchy. Never use card grids as a default layout pattern for equal-weight content.

### Inputs & Forms
Label above input, never floating. Error text below the field, in Error Ink (#DC2626), `body-sm`. Focus ring in Rose Signal, 2px offset. Input borders: Zinc Border (#E4E4E7). Input background: white. `border-radius: 12px` (rounded-xl). Helper text in Zinc Muted below the field.

### Loading States
Skeletal shimmer loaders that match the exact layout dimensions of the content being loaded — not generic circular spinners. The shimmer uses a soft gradient from Zinc Tint (#F4F4F5) to Zinc Canvas (#FAFAFA).

---

## 5. Layout Principles

**Grid-first architecture.** CSS Grid is the default. Flexbox for row/column alignment only — never `calc()` percentage hacks for column widths.

- **Max-width container:** `max-w-7xl` (1280px) centered with `mx-auto`.
- **Container padding:** Mobile `px-4` (16px) → Tablet `px-6` (24px) → Desktop `px-8` (32px).
- **Section vertical padding:** Desktop `py-24` (96px). Mobile `py-12` (48px). Use `clamp(3rem, 8vw, 6rem)` for fluid scaling.
- **Hero sections:** Asymmetric split-column (5/7 or 6/6 with offset alignment). Centered hero layouts are BANNED for this project — the editorial variance demands left-dominant or split compositions.
- **Feature rows:** 2-column zig-zag layouts, or asymmetric 5/7 grids. The generic "3 equal cards horizontally" layout is BANNED.
- **Decorative assets:** Always `pointer-events-none`, `position: absolute`, `z-index: 0`. Opacity 0.25–0.50. Never obscure content. Maximum 4–5 per page on marketing pages. Zero on Dashboard/Player screens.
- **Sections alternate** between Petal Rose (#FFF5F8) background and Champagne Soft (#F8F1EA) background for visual rhythm.

---

## 6. Decorative Assets

Five canonical SVG/icon assets define the brand personality. Every asset follows global rules: `pointer-events-none`, `z-0`, opacity 0.25–0.50, `prefers-reduced-motion` disables all animation.

### Sparkle (Phosphor `SparkleIcon`)
Cross-shaped 4-point sparkle. Color: **Lavender Spark** (#8B7EC8). Animation: `shimmerAnim` — opacity 0.4→0.9 + scale 1→1.1, 4–5s ease-in-out infinite. Size: 28–48px. Usage: corners of hero sections, near CTA buttons, between section breaks.

### Flor 5 Pétalos (SVG)
Five ellipse petals (`rx=5, ry=8`) rotated at 72° intervals. Petal fill: **Soft Petal** (#FFC2D4). Center circle fill: **Rose Centre** (#F8A5C2). Animation: `floatA` — translateY(-10px) + rotate(4deg), 7s ease-in-out infinite. Size: 40–60px. Opacity: 0.35–0.45.

### Frasco de Esmalte (SVG)
Nail polish bottle silhouette: rectangular cap (`nude-300` fill) + bottle body (`rose-500` fill). Animation: `floatB` — translateY(-7px) + rotate(-3deg), 6s ease-in-out infinite. Size: 36–48px. Opacity: 0.25–0.35.

### Marco Flor 6 Pétalos — `FlowerFrame6Petals` ⭐
The hero decorative component. Six ellipses (`cx=100, cy=40, rx=30, ry=36`) in **Lavender Petal** (#BDB4E0, opacity 0.85), each rotated 60° around center (100,100). Two nested animations: outer frame spins at `spin 45s linear infinite`; entire wrapper floats at `floatA 8s ease-in-out infinite`. Circular photo container sits at `z-10` at center — `overflow-hidden rounded-full border-4-white`. Frame size: 400–550px. Photo size: 56% of frame. Usage: About page instructor photo, Home instructor section. `pointer-events-none` on the frame, not the photo.

### Flower Bullet (Phosphor `FlowerIcon` duotone)
No animation. Color: **Rose Centre** (#F8A5C2). Size: 22–28px. Used exclusively as list item bullets in value/benefit lists. Never in navigation or form contexts.

### Asset Budget by Page
| Page | Allowed Assets | Maximum |
|------|---------------|---------|
| Landing / Home | Sparkle · Flor 5p · Frasco · Marco 6p | 4–5 |
| About / Instructor | Sparkle · Flor 5p · Marco 6p | 3–4 |
| Course Detail | Sparkle · Flor 5p | 2–3 |
| Login / Register | Sparkle · Flor 5p · Frasco | 3 |
| Dashboard / Player | **None** | 0 |

---

## 7. Motion & Interaction

Spring physics is the default easing model: `stiffness: 100, damping: 20`. No linear easing on UI transitions. No bounce-heavy springs (`damping < 15`).

**Keyframe library:**
```css
@keyframes floatA {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-10px) rotate(4deg); }
}
@keyframes floatB {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50%       { transform: translateY(-7px) rotate(-3deg); }
}
@keyframes shimmerAnim {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50%       { opacity: 0.9; transform: scale(1.1); }
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

**Perpetual micro-interactions on active states:** All decorative assets run infinite CSS animation loops. Progress bars fill with `transition: width 500ms ease-out`. Button hover transitions: `transition-colors duration-150`. Card hover: `-translate-y-1` with shadow elevation, `duration-200`.

**Staggered list reveals:** Module lists, lesson sidebars, and feature grids mount with cascade delays (`animation-delay: 0ms, 80ms, 160ms...`). Never mount all items simultaneously.

**Performance rules:** Animate exclusively via `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, or `padding`. Decorative SVG assets in `pointer-events-none` wrappers. Respect `prefers-reduced-motion: reduce` — disable all animations with `animation: none !important`.

---

## 8. Anti-Patterns (Banned)

**Typography**
- `Inter`, `Georgia`, `Times New Roman`, `Garamond`, `Palatino` — BANNED
- Gradient text fills on headlines — BANNED
- All-caps headline text — BANNED
- More than one keyword colored Rose Signal per headline line — BANNED
- `text-shadow` on any element — BANNED

**Color**
- Pure black (`#000000`) — BANNED. Use Zinc Ink (#18181B)
- Gold tokens (`gold-400`, `gold-500`, `#E6C068`, `#C9A24C`) — BANNED. Migrated to lavender
- Neon outer glows — BANNED. No `box-shadow` with color on buttons or cards
- Oversaturated gradients on large areas — BANNED
- Mixing Zinc neutrals with Slate neutrals — BANNED. One neutral family only
- AI purple/blue neon aesthetic — BANNED

**Layout**
- 3-column equal card grids — BANNED. Use 2-column zig-zag or asymmetric split
- Centered hero sections — BANNED. Use split-screen or left-dominant layouts
- Overlapping elements (text over image, text over text) — BANNED. Clean spatial zones
- `calc()` percentage hacks for column widths — BANNED. Use CSS Grid
- `h-screen` — BANNED on full-height sections. Use `min-h-[100dvh]`
- Decorative assets on Dashboard or Player screens — BANNED

**Components**
- `rounded-xl` or `rounded-2xl` on buttons — BANNED. Only `rounded-full`
- Rectangular buttons of any kind — BANNED. All pills
- Floating label inputs — BANNED. Label above, always
- Circular generic spinner loaders — BANNED. Use skeletal shimmer
- `box-shadow` with rose, lavender, or any brand color — BANNED. Only neutral rgba shadows

**Content**
- Emojis in UI — BANNED
- AI copywriting clichés: "Elevate", "Seamless", "Unleash", "Next-Gen", "Transform" — BANNED
- Generic placeholder names: "John Doe", "Acme Corp", "Nexus" — BANNED
- Fake round numbers: "99.99% satisfaction", "50% off always" — BANNED
- Filler navigation text: "Scroll to explore", "Swipe down", bouncing chevrons — BANNED
- Broken or placeholder image URLs — use `picsum.photos` or inline SVG avatars

**Motion**
- Linear easing on UI transitions — BANNED. Use spring physics or ease-in-out
- Animating `top`, `left`, `width`, `height` — BANNED. Transform and opacity only
- Custom mouse cursors — BANNED
- Ignoring `prefers-reduced-motion` — BANNED. Always provide the `animation: none` override

---

*Generated for Google Stitch — encode these rules in every Stitch prompt to reproduce the Myra's Nail Academy aesthetic faithfully.*
