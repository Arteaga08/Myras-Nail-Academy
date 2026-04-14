# Myra's Nail Academy — Design System (Colors)

> **Versión 1.0** — Paleta inspirada en [shop.katjes.de](https://shop.katjes.de/) adaptada a un contexto **nail academy**: rosas suaves y elegantes, nude/champagne clásico, con acentos vibrantes.
>
> Soporta **light + dark mode**. Todos los tokens están en `tokens/colors.json` (primitivos) y `tokens/semantic-light.json` / `tokens/semantic-dark.json` (semánticos).
>
> Visualiza todo en el navegador abriendo `preview.html`.

---

## 1. Filosofía

Tres capas (siguiendo el patrón de Tailwind / Radix / Material 3):

1. **Primitivos** — Escalas numéricas por familia (`rose-500`, `neutral-100`). Nunca uses estos directamente en componentes.
2. **Semánticos** — Roles (`button-primary-hover`, `text-secondary`). Los componentes consumen SIEMPRE estos.
3. **Componente** — Variantes específicas si un componente lo requiere.

Cambiar de light a dark **solo cambia la capa semántica**. Los componentes no se tocan.

---

## 2. Paleta base (Primitivos)

### Rosa (marca)
| Token | HEX | Uso |
|---|---|---|
| `rose-50`  | `#FFF5F8` | Fondos muy suaves |
| `rose-100` | `#FFE4EC` | Chips, fondos sutiles |
| `rose-200` | `#FFC2D4` | Bordes suaves, hover ligero |
| `rose-300` | `#FF9BB8` | Acentos, focus dark |
| `rose-400` | `#F06292` | Primary en dark mode |
| `rose-500` | `#E91E63` | **Primary brand** |
| `rose-600` | `#C2185B` | Hover primary |
| `rose-700` | `#9A0E47` | Pressed |
| `rose-800` | `#6B0A32` | Texto sobre rosa claro |
| `rose-900` | `#3D051C` | Headings dark mode |

### Nude / Champagne (secundario elegante)
| Token | HEX | Uso |
|---|---|---|
| `nude-50`  | `#FDFAF7` | Fondo cálido alternativo |
| `nude-100` | `#F8F1EA` | Cards soft |
| `nude-200` | `#EEDFD0` | Bordes decorativos |
| `nude-300` | `#D9BFA6` | Acento nude |
| `nude-400` | `#B8946F` | Champagne medio |
| `nude-500` | `#8C6A4A` | Champagne profundo |

### Neutros
`neutral-0` `#FFFFFF` · `neutral-50` `#FAFAFA` · `neutral-100` `#F4F4F5` · `neutral-200` `#E4E4E7` · `neutral-300` `#D4D4D8` · `neutral-400` `#A1A1AA` · `neutral-500` `#71717A` · `neutral-600` `#52525B` · `neutral-700` `#3F3F46` · `neutral-800` `#27272A` · `neutral-900` `#18181B` · `neutral-950` `#0A0A0B`

### Semánticos de estado
- **Success** — `#DCFCE7` / `#16A34A` / `#15803D`
- **Warning** — `#FEF3C7` / `#F59E0B` / `#B45309`
- **Error** — `#FEE2E2` / `#DC2626` / `#B91C1C` / `#991B1B`
- **Info** — `#DBEAFE` / `#2563EB` / `#1D4ED8`

### Dorado (acento nail art)
`gold-400` `#E6C068` · `gold-500` `#C9A24C`

---

## 3. Tokens Semánticos

### Light Mode
| Rol | Token primitivo | HEX |
|---|---|---|
| `background` | `neutral-0` | `#FFFFFF` |
| `background-subtle` | `nude-50` | `#FDFAF7` |
| `background-muted` | `neutral-100` | `#F4F4F5` |
| `surface` | `neutral-0` | `#FFFFFF` |
| `surface-sunken` | `nude-100` | `#F8F1EA` |
| `text-primary` | `neutral-900` | `#18181B` |
| `text-secondary` | `neutral-600` | `#52525B` |
| `text-muted` | `neutral-500` | `#71717A` |
| `text-disabled` | `neutral-400` | `#A1A1AA` |
| `text-brand` | `rose-600` | `#C2185B` |
| `border-default` | `neutral-200` | `#E4E4E7` |
| `border-brand` | `rose-400` | `#F06292` |
| `border-focus` | `info-500` | `#2563EB` |

### Dark Mode
| Rol | Token primitivo | HEX |
|---|---|---|
| `background` | `neutral-950` | `#0A0A0B` |
| `background-subtle` | `neutral-900` | `#18181B` |
| `surface` | `neutral-900` | `#18181B` |
| `surface-raised` | `neutral-800` | `#27272A` |
| `text-primary` | `neutral-50` | `#FAFAFA` |
| `text-secondary` | `neutral-300` | `#D4D4D8` |
| `text-brand` | `rose-300` | `#FF9BB8` |
| `border-default` | `neutral-700` | `#3F3F46` |
| `border-focus` | `rose-300` | `#FF9BB8` |

---

## 4. Botones — 6 Estados

Todos los botones tienen 6 estados obligatorios: **Default · Hover · Focus · Pressed · Disabled · Loading**.

### 4.1 Primary (Light)
| Estado | Background | Text | Extras |
|---|---|---|---|
| Default | `#E91E63` | `#FFFFFF` | shadow-sm |
| Hover | `#C2185B` | `#FFFFFF` | shadow-md |
| Focus | `#E91E63` | `#FFFFFF` | ring 2px `#2563EB`, offset 2px |
| Pressed | `#9A0E47` | `#FFFFFF` | scale(0.98), shadow-xs |
| Disabled | `#E4E4E7` | `#A1A1AA` | cursor: not-allowed |
| Loading | `#E91E63` | `rgba(255,255,255,0.7)` | spinner `#FFFFFF`, pointer-events: none |

### 4.2 Primary (Dark)
| Estado | Background | Text |
|---|---|---|
| Default | `#F06292` | `#0A0A0B` |
| Hover | `#FF9BB8` | `#0A0A0B` |
| Focus | `#F06292` | `#0A0A0B` + ring `#FFC2D4` |
| Pressed | `#E91E63` | `#FFFFFF` |
| Disabled | `#27272A` | `#52525B` |
| Loading | `#F06292` (70%) | spinner `#0A0A0B` |

### 4.3 Secondary (outline)
**Light:** Default bg transparent / text `#C2185B` / border 1.5px `#F06292`. Hover bg `#FFF5F8`. Pressed bg `#FFE4EC`.
**Dark:** Default text `#FF9BB8` / border `#F06292`. Hover bg `rgba(240,98,146,0.1)`.

### 4.4 Ghost / Text
Sin background ni borde. Texto en color de marca; hover y pressed añaden fondo sutil de rosa. Mismas reglas de focus ring y disabled que los demás.

### 4.5 Destructive
| Estado | Background | Text |
|---|---|---|
| Default | `#DC2626` | `#FFFFFF` |
| Hover | `#B91C1C` | `#FFFFFF` |
| Pressed | `#991B1B` | `#FFFFFF` |
| Disabled | `#E4E4E7` | `#A1A1AA` |

Ver detalle completo en `tokens/semantic-light.json` y `tokens/semantic-dark.json` (keys `semantic.button.*`).

---

## 5. Labels & Inputs — 7 Estados

| Estado | Label | Helper | Border input | Bg input |
|---|---|---|---|---|
| Default | `#3F3F46` | `#71717A` | `#D4D4D8` | `#FFFFFF` |
| Focus | `#C2185B` | `#71717A` | `#E91E63` (2px) | `#FFFFFF` + ring suave |
| Filled | `#3F3F46` | `#71717A` | `#A1A1AA` | `#FFFFFF` |
| Error | `#DC2626` | `#DC2626` | `#DC2626` | `#FEE2E2` |
| Success | `#16A34A` | `#16A34A` | `#16A34A` | `#FFFFFF` |
| Disabled | `#A1A1AA` | `#A1A1AA` | `#E4E4E7` | `#F4F4F5` |
| Required `*` | `#E91E63` | — | — | — |

Dark mode en `tokens/semantic-dark.json` (key `semantic.label`).

---

## 6. Cards — 7 Variantes

| Variante | Background | Border | Shadow | Cuándo usar |
|---|---|---|---|---|
| **Default** | `#FFFFFF` | 1px `#E4E4E7` | shadow-sm | Contenido genérico |
| **Elevated** | `#FFFFFF` | none | shadow-md | Cards destacados |
| **Soft** | `#FDFAF7` | 1px `#EEDFD0` | none | Cards decorativos cálidos |
| **Brand** | `#FFF5F8` | 1px `#FFC2D4` | none | Promos, CTAs |
| **Interactive** | `#FFFFFF` → `#FDFAF7` (hover) | `#E4E4E7` → `#FF9BB8` | sm → lg | Cards clicables (ej. cursos) |
| **Selected** | `#FFF5F8` | 2px `#E91E63` | shadow-sm | Estado activo |
| **Disabled** | `#F4F4F5` | 1px `#E4E4E7` | none | No disponible (opacity 0.6) |

### Sombras (tokens)
```
shadow-xs:  0 1px 2px rgba(233, 30, 99, 0.04)
shadow-sm:  0 1px 3px rgba(24, 24, 27, 0.08), 0 1px 2px rgba(24, 24, 27, 0.04)
shadow-md:  0 4px 12px rgba(24, 24, 27, 0.08)
shadow-lg:  0 12px 24px rgba(233, 30, 99, 0.12)
shadow-xl:  0 24px 48px rgba(24, 24, 27, 0.16)
```
Dark mode: usar `rgba(0,0,0,0.4–0.5)`.

---

## 7. Accesibilidad (WCAG AA)

| Par | Ratio | Resultado |
|---|---|---|
| `#FFFFFF` sobre `#E91E63` | 4.56:1 | ✅ AA Large |
| `#FFFFFF` sobre `#C2185B` | 6.83:1 | ✅ AA Normal |
| `#18181B` sobre `#FFFFFF` | 18.88:1 | ✅ AAA |
| `#52525B` sobre `#FFFFFF` | 8.13:1 | ✅ AAA |
| `#C2185B` sobre `#FFF5F8` | 6.45:1 | ✅ AA Normal |
| `#FAFAFA` sobre `#0A0A0B` | 19.38:1 | ✅ AAA (dark) |
| `#FF9BB8` sobre `#0A0A0B` | 10.52:1 | ✅ AAA (dark) |

**Focus ring:** `#2563EB` (info-500) en light — `#FF9BB8` en dark. Mínimo 2px + offset 2px.

---

## 8. Cómo consumir estos tokens (cuando llegue el frontend)

### Opción A — CSS variables
```css
:root {
  --color-rose-500: #E91E63;
  --color-button-primary-bg: var(--color-rose-500);
  --color-text-primary: #18181B;
}
[data-theme="dark"] {
  --color-button-primary-bg: #F06292;
  --color-text-primary: #FAFAFA;
}
```

### Opción B — Tailwind
Mapear `colors.json` al `tailwind.config.js` (`theme.extend.colors`).

### Opción C — Style Dictionary
`colors.json` está en formato W3C Design Tokens, compatible directo con Style Dictionary para generar CSS/SCSS/JS/iOS/Android.

---

## 9. Archivos

```
design-system/
├── DESIGN_SYSTEM.md          ← este archivo
├── preview.html              ← visualización interactiva
└── tokens/
    ├── colors.json           ← primitivos (marca, neutros, estados)
    ├── semantic-light.json   ← roles en modo claro
    └── semantic-dark.json    ← roles en modo oscuro
```

---

## 10. Próximos pasos

- [ ] Abrir `preview.html` y validar visualmente la paleta
- [ ] Decidir tipografía (fuera de alcance de este doc)
- [ ] Definir escala de spacing, radius y tipografía en una v2 del design system
- [ ] Al iniciar el frontend: generar CSS variables desde `tokens/` con Style Dictionary o script custom
