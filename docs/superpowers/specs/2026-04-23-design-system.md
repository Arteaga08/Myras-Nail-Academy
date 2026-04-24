# Design System — Myra's Nail Academy
**Fecha:** 2026-04-23  
**Stack:** Next.js · Tailwind CSS v4 · TypeScript  
**Enfoque:** Tokens CSS + Componentes React + DESIGN.md  

---

## 1. Paleta de Colores

### Rose — Color Principal (Brand)
| Token | Hex | Uso |
|-------|-----|-----|
| `rose-50` | `#FFF5F8` | Fondo de página base |
| `rose-100` | `#FFE4EC` | Fondos de badges, chips |
| `rose-200` | `#FFC2D4` | Pétalos flor 5p, fondos suaves |
| `rose-300` | `#FF9BB8` | Decorativo |
| `rose-400` | `#F8A5C2` | Centro flor 5p, navbar |
| `rose-500` | `#F06292` | **CTA principal, énfasis en texto, botón primary** |
| `rose-600` | `#E91E63` | Hover estado loading |
| `rose-700` | `#C2185B` | Hover de botones |
| `rose-800` | `#6B0A32` | Decorativo oscuro |
| `rose-900` | `#3D051C` | Texto oscuro de énfasis en body |

### Lavender — Acento (reemplaza Gold)
| Token | Hex | Uso |
|-------|-----|-----|
| `lavender-50` | `#F0EEF9` | Centro marco flor, fondos muy sutiles |
| `lavender-100` | `#D8D4F0` | Fondos de badges accent |
| `lavender-200` | `#BDB4E0` | **Pétalos marco flor 6p** |
| `lavender-300` | `#A396D4` | Decorativo |
| `lavender-400` | `#8B7EC8` | **Sparkle, botón accent, progress bar, porcentajes** |
| `lavender-500` | `#7060BC` | Hover botón accent |
| `lavender-600` | `#5648A0` | Énfasis oscuro |

> ⚠️ **Gold eliminado completamente.** Todo uso de `gold-400` y `gold-500` debe migrarse a `lavender-400`.

### Nude / Champagne — Secundario
| Token | Hex | Uso |
|-------|-----|-----|
| `nude-50` | `#FDFAF7` | Fondos alternativos muy suaves |
| `nude-100` | `#F8F1EA` | Fondos de sección alternos |
| `nude-200` | `#EEDFD0` | Fondos de sección alternos |
| `nude-300` | `#D9BFA6` | Borders decorativos, tapa frasco |
| `nude-400` | `#B8946F` | Decorativo |
| `nude-500` | `#8C6A4A` | Texto énfasis cálido |

### Neutral — Texto y UI
| Token | Hex | Uso |
|-------|-----|-----|
| `neutral-50` | `#FAFAFA` | Fondos de cards módulo |
| `neutral-100` | `#F4F4F5` | Fondos de tabla, separadores |
| `neutral-200` | `#E4E4E7` | Borders de cards, separadores |
| `neutral-300` | `#D4D4D8` | Borders ghost buttons |
| `neutral-400` | `#A1A1AA` | Captions, placeholders, metadata |
| `neutral-500` | `#71717A` | Texto secundario |
| `neutral-600` | `#52525B` | Body text principal |
| `neutral-700` | `#3F3F46` | Texto medio |
| `neutral-900` | `#18181B` | Títulos principales |

### Semánticos (sin cambios)
- **Success:** `#DCFCE7` (bg) · `#16A34A` (text)
- **Warning:** `#FEF3C7` (bg) · `#F59E0B` (text)
- **Error:** `#FEE2E2` (bg) · `#DC2626` (text)
- **Info:** `#DBEAFE` (bg) · `#2563EB` (text)

---

## 2. Tipografía

### Fuentes
- **Display / Títulos:** `Fraunces` — serif elegante, peso 700–900
- **Cuerpo / UI:** `DM Sans` — sans-serif limpio, peso 400–700

### Escala — Estilo Editorial

> **Nota:** El estilo "Editorial" seleccionado usa `display-xl` (72px) como el título de impacto principal en la landing. El token `h1` (56px) es para títulos de páginas interiores (About, Detalle de Curso, etc.).

| Token | Tamaño | Peso | Tracking | Uso |
|-------|--------|------|----------|-----|
| `display-2xl` | 88px | 900 | -0.03em | Hero principal landing (título más grande) |
| `display-xl` | 72px | 800 | -0.02em | **Hero landing estándar** — el "H1" del estilo editorial |
| `h1` | 56px | 800 | -0.02em | Títulos de páginas interiores (About, Cursos) |
| `h2` | 40px | 700 | -0.01em | Títulos de sección |
| `h3` | 28px | 700 | 0 | Subtítulos, títulos de card |
| `h4` | 22px | 700 | 0 | Módulos, ítems de lista |
| `body-lg` | 18px | 400 | 0 | Cuerpo principal, leading 1.7 |
| `body-md` | 16px | 400 | 0 | Descripciones, leading 1.65 |
| `body-sm` | 14px | 400 | 0 | Metadata, fechas, leading 1.5 |
| `caption` | 12px | 500 | +0.02em | Etiquetas uppercase |
| `overline` | 11px | 700 | +0.08em | Badges rose uppercase |

### Reglas de Color en Textos
- **Una sola palabra clave** por título se colorea con `rose-500`
- Usar `<em>` o `<span>` con `text-rose-500` para el énfasis
- Nunca colorear más de una palabra por línea de título
- Body text nunca usa colores de énfasis — solo `neutral-600`
- Lavender solo en UI (badges, progress, porcentajes), no en títulos

---

## 3. Botones

### Estilo base: Todo Pill (`border-radius: 9999px`)

### Variantes

| Variante | Background | Text | Border | Hover |
|----------|-----------|------|--------|-------|
| `primary` | `rose-500` | white | — | `rose-700` |
| `secondary` | transparent | `rose-500` | `rose-500` 1.5px | bg `rose-50` |
| `accent` | `lavender-400` | white | — | `lavender-500` |
| `ghost` | transparent | `neutral-500` | `neutral-300` 1.5px | bg `neutral-100` |
| `nude` | `nude-200` | `nude-500` | — | `nude-300` |
| `danger` | `error-500` | white | — | `error-600` |

### Tamaños

| Size | Padding | Font | Uso |
|------|---------|------|-----|
| `sm` | `7px 16px` | 12px / 600 | Dentro de cards |
| `md` | `10px 24px` | 14px / 600 | Acciones generales |
| `lg` | `14px 32px` | 16px / 600 | CTAs principales |

### Estados
- **disabled:** `opacity-40 cursor-not-allowed`
- **loading:** mismos estilos + spinner interno
- Sin `box-shadow` de color — borders y background únicamente

---

## 4. Spacing System

**Base: 8px**

| Token | Value | Uso principal |
|-------|-------|---------------|
| `space-2` | 8px | Gaps mínimos, íconos + texto |
| `space-4` | 16px | Gap entre elementos inline |
| `space-6` | 24px | Gap entre ítems de lista |
| `space-10` | 40px | Gap entre componentes en grid |
| `space-12` | 48px | Padding interno de secciones (mobile) |
| `space-16` | 64px | Gap entre columnas de grid |
| `space-24` | 96px | **Padding vertical de secciones (desktop)** |
| `space-32` | 128px | Hero sections, separaciones grandes |

### Padding de Contenedor
- Mobile: `px-4` (16px)
- Tablet: `px-6` (24px)
- Desktop: `px-8` (32px)
- Max-width contenedor: `max-w-7xl`

---

## 5. Cards

### Card de Curso (Course Card)
- `border-radius: 20px`
- `border: 1px solid neutral-200`
- Sin box-shadow de color
- Imagen superior: altura fija 200px, `object-fit: cover`
- Body: `padding: 16px`
- Badge de categoría: overline en lavender
- Precio: `body-lg` en `rose-500`
- Precio tachado: `body-sm` en `neutral-400`
- CTA: botón `primary sm` full-width

### Card de Enrollment (Mi Progreso)
- `border-radius: 16px`
- `border: 1px solid neutral-200`
- Progress bar: bg `lavender-100`, fill `lavender-400`, height 6px, pill
- Porcentaje: `body-sm` en `lavender-400`
- CTA: botón `primary sm` full-width

### Card de Módulo (Module Card)
- `border-radius: 12px`
- `border: 1px solid neutral-200`
- bg `neutral-50`
- Ícono 28x28px, `border-radius: 8px`
- **Completado:** ícono bg `rose-100`, check text `rose-500`
- **En progreso:** ícono bg `rose-500` (white icon), border `rose-500`, bg `rose-50`
- **Bloqueado:** ícono bg `neutral-200`, `opacity-45`

---

## 6. Decorative Assets

### Reglas Globales
- Siempre `pointer-events-none` y `z-0`
- Opacity entre **0.25–0.50** — decorativos, nunca protagonistas
- Respetar `prefers-reduced-motion` — desactivar animaciones

### Catálogo

#### Sparkle (Phosphor)
- Color: `lavender-400` (#8B7EC8) — **ya no gold**
- Animación: `shimmerAnim` 4–5s (opacity 0.4→0.9 + scale 1→1.1)
- Tamaño: 28–48px
- Opacity: 0.35–0.45

#### Flor 5 Pétalos (SVG)
- Pétalos: `rose-200` · Centro: `rose-400`
- Animación: `floatA` 7s (translateY -10px + rotate 4deg)
- Tamaño: 40–60px · Opacity: 0.35–0.45

#### Frasco de Esmalte (SVG)
- Cuerpo: `rose-500` · Tapa: `nude-300`
- Animación: `floatB` 6s (translateY -7px + rotate -3deg)
- Tamaño: 36–48px · Opacity: 0.25–0.35

#### Marco Flor 6 Pétalos (SVG) ⭐
- 6 pétalos · `rx=30, ry=36` · rotación cada 60°
- Color pétalos: `lavender-200` (#BDB4E0)
- Animación marco: `spin` 45s linear infinite
- Animación conjunto: `floatA` 8s sobre el wrapper
- Foto en centro: `div` circular `z-10` · border 4px white · `overflow-hidden`
- Tamaño marco: 400–550px · Foto: 280–400px
- Opacity pétalos: 0.40–0.50

#### Flower Bullet (Phosphor duotone)
- Color: `rose-400`
- Sin animación
- Tamaño: 22–28px · Uso: listas de valores/beneficios

### Uso por Página

| Página | Assets permitidos | Máx. |
|--------|------------------|------|
| Landing / Home | Sparkle · Flor 5p · Frasco · Marco 6p | 4–5 |
| About / Instructora | Sparkle · Flor 5p · Marco 6p | 3–4 |
| Detalle de Curso | Sparkle · Flor 5p | 2–3 |
| Login / Register | Sparkle · Flor 5p · Frasco | 3 |
| Dashboard / Player | **Ninguno** | 0 |

---

## 7. Sombras

Sin `box-shadow` de color en componentes interactivos (se elimina el glow rosado anterior). Solo sombras neutrales para elevación:

| Token | Value | Uso |
|-------|-------|-----|
| `shadow-xs` | `0 1px 2px rgba(24,24,27,0.04)` | Inputs, elementos pequeños |
| `shadow-sm` | `0 1px 3px rgba(24,24,27,0.08)` | Cards, dropdowns |
| `shadow-md` | `0 4px 12px rgba(24,24,27,0.08)` | Modales, panels |
| `shadow-lg` | `0 12px 24px rgba(24,24,27,0.10)` | Overlays |
| `shadow-xl` | `0 24px 48px rgba(24,24,27,0.16)` | Hero cards grandes |

---

## 8. Border Radius

| Token | Value | Uso |
|-------|-------|-----|
| `rounded-sm` | 6px | Badges pequeños de estado |
| `rounded-md` | 8px | Íconos de módulo, chips internos |
| `rounded-lg` | 12px | Module cards |
| `rounded-xl` | 16px | Enrollment cards, inputs |
| `rounded-2xl` | 20px | Course cards |
| `rounded-3xl` | 24px–48px | Secciones grandes, hero cards |
| `rounded-full` | 9999px | **Todos los botones**, avatares, pills |

---

## 9. Implementación

### Estructura de archivos
```
client/src/
├── app/globals.css          ← tokens CSS (ya existe, extender)
├── components/
│   └── ui/
│       ├── Button.tsx       ← variantes pill
│       ├── Heading.tsx      ← escala tipográfica
│       ├── Card.tsx         ← course, enrollment, module
│       ├── Badge.tsx        ← overline/caption pills
│       └── DecorativeAssets/
│           ├── Sparkle.tsx
│           ├── FloatingFlower.tsx
│           ├── NailBottle.tsx
│           └── FlowerFrame.tsx  ← marco 6p + foto
```

### globals.css — tokens nuevos a agregar
```css
/* Lavender (reemplaza gold) */
--color-lavender-50:  #F0EEF9;
--color-lavender-100: #D8D4F0;
--color-lavender-200: #BDB4E0;
--color-lavender-300: #A396D4;
--color-lavender-400: #8B7EC8;
--color-lavender-500: #7060BC;
--color-lavender-600: #5648A0;

/* Eliminar gold-400 y gold-500 */
```
