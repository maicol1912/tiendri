# Template Architecture Rules

Estas reglas gobiernan cómo se construyen, migran y mantienen los templates en Tiendri V2.

## Contratos de tipos

- Todo template config DEBE usar `satisfies TemplateManifest` de `@/types/templates`
- Tipos de dominio compartidos (StoreInfo, Product, Category) viven en `src/types/store.ts`
- Tipos específicos del template viven en `src/templates/[name]/types.ts`

## CSS Variables

- Prefijo genérico `--t-*` para TODAS las variables de template (NO prefijos específicos como `--tp-`)
- CERO colores hex hardcodeados en componentes — todo via `var(--t-*)`
- Variables inyectadas en el div `.template-scope` del layout

## Grid y Layout

- CERO clases Tailwind dinámicas (`grid-cols-${n}`) — Tailwind las purga en build
- Usar `gridColsClass()` de utils con mapas estáticos de strings
- Layout options (cardStyle, hoverEffect, etc.) via `layout-classes.ts` con mapas estáticos

## Componentes

- Nombres genéricos: `Header.tsx`, NO `TechPremiumHeader.tsx`
- Patrón Page/Shell: presentational (props puros) + shell (`"use client"`, estado + hooks)
- CERO imports directos de `[name]Config` en shells/pages — todo via props
- CERO strings hardcodeados — todo desde config/mock data
- Texto UI en español colombiano — nombres de marca en inglés

## Fuentes

- Inter: body text (weight 100, 400, 500, 600, 700)
- Space Grotesk: headings (weight 400, 500, 600, 700)
- Space Grotesk NO tiene weight 100/300 — agregar `fontFamily: "var(--font-sans)"` en headings con `font-thin`/`font-light`
- Fuentes scoped por template via `.template-scope` + `--template-heading-font`

## Routing

- URLs reales por página (NO useState para ruteo)
- Sub-rutas: `producto/[id]`, `catalogo`, `carrito`, `buscar`, `checkout`
- `useTemplateNav()` hook para navegación
- `CartProvider` en layout (persiste entre páginas)
- Browser back/forward debe funcionar

## Secciones

- Orden dinámico via `config.sections` array
- Cada sección toggleable (`visible: true/false`)
- `CoreHomePage` usa `SECTION_REGISTRY` de `_core/sections/index.ts` con loop de dispatch dinámico sobre `config.sections`

## Imágenes

- Mock images en `src/templates/{name}/mock/assets.ts`
- Naming: `hero-*.png`, `product-01..08.png`, `popular-01..04.png`, etc.
- Next.js Image con `priority` en hero, `loading="lazy"` below fold
- Verificar tamaño de archivo > 3KB (menor = probablemente corrupto)

## Precios

- `Intl.NumberFormat("en-US")` — NUNCA `toLocaleString()` (causa hydration mismatch)
- Precios como INTEGER en COP (sin decimales)

## Theme Customizer

- Drawer flotante (NO sidebar fijo) — no afecta el layout del template
- Labels en español amigable para tenderos sin experiencia técnica
- Drag & drop para reordenar secciones (`@dnd-kit`)
- Cambios reflejados en tiempo real via CSS variables
- Genérico: recibe metadata (colorFields, sectionLabels, etc.) como props

## Agregar un template nuevo

1. Crear carpeta en `src/templates/[name]/`
2. `manifest.ts` con `satisfies TemplateManifest` (variants, sections, config)
3. `palettes.ts`, `config-schema.ts`, `ui-config.ts`
4. `mock/data.ts` + `mock/assets.ts`
5. Registrar en `src/templates/registry.ts`
- NO components folder, NO config.ts, NO routers
