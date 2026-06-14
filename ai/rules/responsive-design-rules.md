# Responsive Design Rules

**Quién lo usa**: Camilo (implementación), Valentina (diseño visual responsive)
**Cuándo**: Cualquier componente o página que necesite adaptarse a múltiples viewports

## Principio base

Diseñar primero para mobile (390px). Si funciona en un Moto E con datos móviles lentos, funciona en todos lados. Los breakpoints de Tailwind: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px).

---

## 1. Container Max-Width por Tipo de Página

| Tipo de Página | Max-Width | Razón |
|---|---|---|
| Home / Product Grid | `max-w-7xl` (1280px) | Grids de 4+ columnas |
| Product Detail | `max-w-5xl` (1024px) | 2 columnas: imagen + info |
| Cart | `max-w-3xl` o 2-col dentro de `max-w-5xl` | Contenido de lectura |
| Checkout / Forms | `max-w-3xl` (768px) | Formularios legibles |
| Search Results | `max-w-7xl` (1280px) | Misma grilla que home |

SIEMPRE centrar con `mx-auto` + padding responsive: `px-4 md:px-6 lg:px-8`.

---

## 2. Desktop Layout Density — Regla del 40%

Si el contenido ocupa menos del 40% del viewport width a 1440px, el layout está MAL.

- **Content nunca debe flotar en espacio vacío** — si hay espacio, usar 2 columnas, sidebar o contenido adicional
- **Gap scaling**: mobile gap × 1.5 para tablet, × 2 para desktop. NUNCA más de 2x
- **Section spacing**: `py-6` mobile → `py-8` tablet → `py-12` desktop

---

## 3. Patrones de Layout Desktop

**Product Detail — 2 columnas:**
```tsx
<div className="lg:flex lg:gap-8 lg:items-start">
  <div className="lg:w-[45%] lg:sticky lg:top-20">{/* Image + Desktop CTA */}</div>
  <div className="lg:w-[55%]">{/* Product info */}</div>
</div>
```

**Cart/Checkout — 2 columnas en desktop:**
```tsx
<div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 lg:items-start">
  <div>{/* Items */}</div>
  <div className="lg:sticky lg:top-20">{/* Order summary */}</div>
</div>
```

---

## 4. Patrones de Adaptación de Componentes Mobile → Desktop

| Componente Mobile | Desktop Adaptation |
|---|---|
| **Sticky bottom bar** (CTA) | `lg:hidden` el bar. Mostrar botón inline en el contenido. |
| **Bottom navigation** (tabs) | `lg:hidden`. Navegación va en header o sidebar. |
| **Product grid 2 cols** | `md:grid-cols-3 lg:grid-cols-4`. Gap escalado. |
| **Product detail (stacked)** | 2 columnas — imagen izq (45-50%), info der (50-55%). |
| **Cart (single column)** | 2 columnas — items izq (60%), resumen der (40%) sticky. |
| **Checkout (single column)** | 2 columnas — formulario izq, order summary der (sticky). |
| **Modals/sheets** | Mobile: bottom sheet. Desktop: modal centrado. |
| **Horizontal scroll pills** | Desktop: más gap, wrap si necesario. |

---

## 5. Sticky Bottom Bar → Inline Button

```tsx
{/* Desktop: inline, hidden on mobile */}
<div className="hidden lg:block mt-4">
  <button className="w-full py-3.5 rounded-full bg-primary text-white">Agregar al carrito</button>
</div>
{/* Mobile: sticky bar, hidden on desktop */}
<div className="lg:hidden fixed bottom-0 ..."><StickyBottomBar /></div>
```

---

## 6. Image Handling

| Contexto | object-fit | Por qué |
|---|---|---|
| Product cards, thumbnails, hero backgrounds | `object-cover` | Llena el espacio |
| Logos, iconos, productos donde se debe ver TODO | `object-contain` | No recorta |
| Collages/banners con fotos | `object-cover` con `objectPosition` | Centrando sujeto |

**Aspect ratios estándar:**
- Product card: `aspect-square`
- Banner hero: `aspect-video` desktop / `aspect-[4/3]` mobile
- Category card: `aspect-[4/3]`
- Avatar: `aspect-square` + `rounded-full`

**Regla de flex + Image fill**: un `div` con `position: relative` y `Image fill` COLAPSA a 0px sin dimensiones explícitas.

```tsx
// CORRECTO — flex-1 + h-full
<div className="relative flex-1 h-full overflow-hidden">
  <Image fill className="object-cover" ... />
</div>
```

---

## 7. Spacing y Typography Scaling

- **Sistema de 8px**: todos los valores múltiplos de 4px (Tailwind default)
- **Typography scaling con clamp:**
  - Heading: `clamp(24px, 4vw, 48px)`
  - Subheading: `clamp(18px, 3vw, 28px)`
  - Body: `clamp(14px, 2vw, 16px)`
  - Caption: `clamp(11px, 1.5vw, 13px)`
- **Line length**: 45-75 caracteres por línea

---

## 8. Reglas rápidas (Camilo — errores de producción)

- **Bottom nav**: `fixed bottom-0` mobile, `lg:hidden` desktop
- **Footer padding**: `pb-24 lg:pb-8` cuando hay bottom nav
- **Anti-dispersión**: >200px vacío entre contenido y footer → layout está MAL
- **Grid scaling**: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6`

---

## 9. Checklist Pre-Entrega Desktop

- [ ] ¿Se ve bien a 390px (mobile)?
- [ ] ¿Se ve bien a 1440px (desktop)?
- [ ] ¿Contenido >40% del viewport width en desktop?
- [ ] ¿Sticky bottom bars ocultos en desktop con botones inline?
- [ ] ¿Bottom nav oculto en desktop?
- [ ] ¿Grids escalan de 2 cols → 3-4 cols?
- [ ] ¿Product details son 2 columnas en desktop?
- [ ] ¿Containers tienen max-width apropiado?
- [ ] ¿Imágenes no se cortan ni colapsan?
- [ ] ¿TODOS los elementos del mockup están presentes?

---

## 10. "Visual 1:1" con Mockup — Qué incluye

Cuando el CTO pide "1:1 con el mockup", eso incluye TODOS los elementos decorativos e informativos:

- **Incluir**: badges de descuento, ratings, banners promocionales, secciones de "vistos recientemente", opciones de envío, indicadores de stock
- **Con datos mock/estáticos** — no necesitan funcionar, pero deben VERSE
- **NO remover elementos "porque no están en el MVP"** — el MVP limita FUNCIONALIDAD, no ELEMENTOS VISUALES
- Si un elemento del mockup parece fuera de scope, PREGUNTAR al CTO

---

## Skill relacionado

Para patrones avanzados de responsive: `ai/skills/responsive-design/SKILL.md`
