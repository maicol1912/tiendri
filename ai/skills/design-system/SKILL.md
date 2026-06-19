---
name: design-system
description: >
  Tokens de diseño, paletas de color, tipografía, spacing, y anti-patterns de AI para Tiendri.
  Trigger: Cuando se diseñe o revise componentes, templates, páginas o paletas de color.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "3.0"
---

## Tiendri Design System — Ember Core (única paleta activa)

Tiendri usa **un único design system activo: Ember Core**. Es la paleta oficial para todas las páginas del proyecto.

| Sistema | Estado | Contexto |
|---------|--------|----------|
| **Ember Core** | ✅ ACTIVO — única paleta | Todo el proyecto: landing, dashboard, storefront, auth, onboarding |

---

## Ember Core (única paleta activa)

> Aprobado por el CTO. Paleta única y oficial de Tiendri. Para usar en TODO el proyecto.
> Archivo de tokens CSS: [assets/tiendri-tokens.css](assets/tiendri-tokens.css) — variables `--ember-*`

### Mood

"Dark tech, agresivo, glow effects. Como una startup de Silicon Valley que sabe que su producto es el mejor. No pide permiso — lo muestra."

Referencia visual: AgentAI (hyliox.com) — calidad de diseño premium, impacto inmediato.

### Paleta de colores — Ember Core

Paleta: **negro + blanco + azul**. Dashboard = light (fondo blanco, texto negro, accent azul). Landing/marketing = dark (fondo negro, texto blanco, accent azul).

| Token CSS | HEX | Role |
|-----------|-----|------|
| `--ember-bg-deep` | `#0B0A0D` | Deepest layer — fondo de sección más profunda |
| `--ember-bg-base` | `#100F14` | Main background — fondo principal del body |
| `--ember-bg-elevated` | `#16141B` | Cards, panels |
| `--ember-bg-surface` | `#1C1A22` | Inputs, interactive surfaces |
| `--ember-blue-600` | `#2563EB` | CTAs, main accent — PRIMARY |
| `--ember-blue-500` | `#3B82F6` | Hover, active states |
| `--ember-blue-800` | `#1E3A8A` | Deep blue, pressed states |
| `--ember-blue-400` | `#60A5FA` | Links, light highlights |
| `--ember-blue-950` | `#0A1628` | Badge backgrounds, subtle tints |
| `--ember-text-primary` | `#F5F5F6` | Headings |
| `--ember-text-secondary` | `#A8A3B3` | Body copy |
| `--ember-text-muted` | `#6B6578` | Captions |

Regla: Usar ÚNICAMENTE tokens `--ember-*`.

### Tipografía — Ember Core

Google Fonts: Space Grotesk + Inter

- **Display**: Space Grotesk (700) — geométrica, industrial. Headings, hero text.
- **Body**: Inter (400-500) — clean, reliable. Body copy, UI.

```css
--ember-font-display: 'Space Grotesk', sans-serif;
--ember-font-body:    'Inter', sans-serif;
```

Escala tipográfica para landing:

| Elemento | Mobile | Desktop | Weight | Font |
|----------|--------|---------|--------|------|
| hero h1 | 48px | 80px | 700 | Space Grotesk |
| section h2 | 32px | 52px | 700 | Space Grotesk |
| card h3 | 20px | 24px | 600 | Space Grotesk |
| body | 16px | 18px | 400 | Inter |
| caption | 12px | 14px | 400 | Inter |

### Estilo visual — Ember Core

**Glass cards (máximo 2-3 por viewport)**
```css
background: rgba(255, 255, 255, 0.04);
backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.07);
border-radius: 16px;
```

**Glow CTA — solo en elementos primarios**
```css
box-shadow: 0 0 24px rgba(37, 99, 235, 0.35),
            0 0 64px rgba(37, 99, 235, 0.15);
```

**3D Placeholder (hasta que Camilo integre Spline)**
```css
background: radial-gradient(circle at center,
  rgba(37, 99, 235, 0.25) 0%,
  rgba(37, 99, 235, 0.08) 40%,
  transparent 70%);
```

**Grid texture (sutil, no dominante)**
```css
background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
background-size: 60px 60px;
```

**Border radius landing**
- Cards/panels: 16px
- Botones CTA: 8px
- Badges: 4px (intencional — no pill genérico)

### Reglas Ember Core — NO hacer

| NO | POR QUÉ |
|----|---------|
| Fondo negro puro #000 | Sin personalidad — usar #0B0A0D con matiz violeta |
| Glass en TODOS los elementos | Máximo 2-3 por viewport |
| Glow en todo | Solo en CTAs y 1-2 elementos accent por sección |
| Gradiente azul → negro genérico | Radial gradients con posición intencional |
| Cards con mismo tamaño y padding | Variar jerarquía visual |
| Timeline con 3 cards idénticos | Cada paso tiene layout diferente |

---

## When to Use

- Diseñar o revisar componentes visuales
- Definir o modificar paletas de color
- Crear templates de storefront
- Implementar animaciones con Framer Motion
- Verificar que un diseño NO parece generado por IA

## Critical Patterns

### Anti-AI Checklist — verificar SIEMPRE antes de entregar

| Señal de IA | Qué hacer en cambio |
|-------------|---------------------|
| Gradiente azul → violeta → rosa | Color sólido con propósito o gradiente sutil de la paleta |
| 3 cards iguales con ícono + título + párrafo | Variar layout, tamaños, jerarquía entre cards |
| Spacing uniforme en toda la página | Ritmo visual — secciones densas y secciones con aire |
| Misma sombra y radius en todo | Variar elevación según importancia del elemento |
| Tipografía monótona (un solo peso/tamaño) | Sistema tipográfico con escala, pesos y roles |
| Badges pastel decorativos | Badges solo cuando comunican información real |
| Hero con ilustración abstracta/blobby | Contenido real, mockups del producto, o whitespace |
| CTA idéntico en todas las secciones | Variar jerarquía: primario, secundario, ghost |
| Layout perfectamente simétrico | Asimetría intencional que guía el ojo |
| Íconos como decoración sin función | Íconos solo donde aportan comprensión |

### Paleta de colores — estructura

| Rol | Propósito | Ejemplo |
|-----|-----------|---------|
| **primary** | Acción principal, CTAs, links activos | Botón "Crear tienda" |
| **primary-hover** | Hover del primary (más oscuro o saturado) | Hover de CTAs |
| **secondary** | Acción secundaria, acentos | Badges, tags |
| **surface** | Fondo de cards y contenedores | Card background |
| **surface-alt** | Fondo alternativo para contraste | Secciones alternadas |
| **text** | Texto principal | Headings, body |
| **text-muted** | Texto secundario | Descripciones, placeholders |
| **border** | Bordes y separadores | Dividers, card borders |
| **success** | Confirmación, disponible | "Producto agregado" |
| **warning** | Precaución | "Stock bajo" |
| **error** | Error, no disponible | Validación fallida |

Regla: NUNCA inventar colores fuera de la paleta. Si necesitás un color nuevo, definilo con rol y justificación.

### Tipografía — sistema

| Rol | Uso | Configuración |
|-----|-----|---------------|
| **Display** | Headings principales, hero text | Font display, weight 700-800, tracking tight |
| **Body** | Texto de lectura, descripciones | Font body, weight 400-500, tracking normal |
| **Caption** | Labels, metadata, timestamps | Font body, weight 400, size xs-sm |
| **Mono** | Precios, códigos, datos numéricos | Font mono o tabular nums |

Escala tipográfica (mobile → desktop):
```
xs:    12px → 12px
sm:    14px → 14px
base:  16px → 16px
lg:    18px → 20px
xl:    20px → 24px
2xl:   24px → 30px
3xl:   30px → 36px
4xl:   36px → 48px
```

### CSS Variables — temas de storefront

```css
/* Cada template define estas 13 variables */
--store-primary
--store-primary-hover
--store-secondary
--store-surface
--store-surface-alt
--store-text
--store-text-muted
--store-border
--store-radius-card
--store-font-display
--store-font-body
```

Los componentes del storefront SIEMPRE usan estas variables — nunca colores hardcodeados.

### Spacing — sistema

Usar la escala de Tailwind con intención:

| Token | px | Uso típico |
|-------|-----|------------|
| 1 | 4px | Gaps internos mínimos |
| 2 | 8px | Padding interno de badges, gaps tight |
| 3 | 12px | Padding de inputs, gaps entre items |
| 4 | 16px | Padding de cards, gaps estándar |
| 6 | 24px | Separación entre secciones internas |
| 8 | 32px | Separación entre grupos de contenido |
| 12 | 48px | Separación entre secciones de página |
| 16 | 64px | Separación entre secciones mayores |
| 24 | 96px | Padding de secciones de landing |

Regla: el spacing NO es uniforme — varía para crear ritmo visual.

### Framer Motion — cuándo y cómo

| Escenario | Usar | Patrón |
|-----------|------|--------|
| Entrada de elementos al scroll | Sí | `whileInView` + fade up |
| Listas que aparecen | Sí | Stagger de 50-100ms entre items |
| Page transitions | Sí | `AnimatePresence` + fade/slide |
| Cambio de estado (toggle, tab) | Sí | `layout` animation |
| Hover de cards | NO | CSS `transition` es suficiente |
| Loading spinners | NO | CSS animation |
| Decoración sin propósito | NUNCA | — |

Ver patterns en [assets/framer-patterns.tsx](assets/framer-patterns.tsx).

### Layout patterns por tipo de página

| Página | Patrón |
|--------|--------|
| **Landing** | Secciones full-width alternando fondo, hero impactante, social proof, CTA final |
| **Dashboard** | Sidebar fija + contenido scrollable, header con breadcrumb |
| **Storefront** | Header con branding → nav de categorías → grilla de productos → footer |
| **Onboarding** | Wizard centrado, progress indicator, una acción por paso |
| **Auth** | Split screen o card centrada, mínimo visual |

## Commands

```bash
# Agregar Framer Motion
pnpm add framer-motion

# Ver todas las variables CSS activas (en browser)
# DevTools → Elements → <html> → Computed → filter "--store"
```

## Resources

- **Templates**: Ver [assets/](assets/) para patrones de Framer Motion y paleta base
- **Documentación**: Ver [references/](references/) para docs del proyecto
