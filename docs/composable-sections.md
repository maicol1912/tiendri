# Secciones Composables

> Leer `docs/template-system.md` antes si no estás familiarizado con la arquitectura de templates.
> Ver `docs/css-variables.md` para el catálogo de variables `--t-*`.

---

## 1. Qué son

Las secciones composables permiten que múltiples variantes visuales de una misma sección funcional (Hero, Card, CategoryNav) sean intercambiables en runtime sin modificar el código de ningún template. Un merchant puede elegir qué variante visual usar en cada slot; el template define cuál es el default. Las variantes son componentes React independientes que viven en `src/templates/_shared/` y pueden ser usadas por cualquier template.

---

## 2. Slots y variantes

Solo los slots con directorio en `src/templates/_shared/` están implementados.

| Slot | Directorio | Variantes implementadas |
|------|------------|------------------------|
| Hero | `hero-variants/` | full-bleed, contained, split, text-only |
| Card layout | `card-layouts/` | below-image, overlay-bottom, overlay-full, side-by-side |
| Category nav | `category-nav-variants/` | horizontal-scroll, grid, tabs, chips |

**Total implementado: 12 variantes en 3 slots.**

### Slots pendientes (documentados, no implementados)

Los siguientes slots aparecían en documentación anterior pero NO tienen directorio ni código en `_shared/`:

- Header, Footer, BottomNav, Cart, Checkout

Estos slots deberán seguir el mismo patrón cuando se implementen. Sus tipos (`HeaderVariant`, `FooterVariant`, etc.) pueden existir en `primitives.ts` como anticipación, pero no hay componentes ni registros aún.

---

## 3. Patrones

El sistema se apoya en tres patrones que trabajan juntos:

**Registry**: cada slot exporta un objeto (`HERO_REGISTRY`, `CARD_LAYOUT_REGISTRY`, `CATEGORY_NAV_REGISTRY`) que mapea cada clave de variante a un componente React cargado con `next/dynamic` para code-splitting automático.

**Router**: componente dentro de cada template que lee `structuralVariants?.{slot}Variant ?? recipe?.default{Slot}Variant ?? '{fallback}'`, valida contra un `Set` de variantes conocidas, busca en el registro y renderiza. El router vive en `src/templates/{template}/components/`.

**Adapter**: cada template tiene un `adapters.ts` que convierte sus tipos de datos internos a los contratos compartidos (`SharedStoreInfo`, `SharedCategory`) que los componentes de `_shared/` esperan. Desacopla los componentes de la implementación interna del template.

---

## 4. Cómo agregar una variante

Checklist para agregar una variante a un slot existente:

1. Agregar el nuevo valor al tipo union correspondiente en `src/types/templates/primitives.ts`
2. Crear el componente en `src/templates/_shared/{slot}/`, con default export
3. Importar con `dynamic()` y registrar en el `REGISTRY` del slot (`index.ts`)
4. Agregar la variante al `VALID_VARIANTS` set del Router del template
5. Agregar la opción al config-schema del template para que aparezca en el dashboard
6. Verificar con `npx tsc --noEmit` — el tipo `Record<VariantKey, ComponentType>` forzará que el registro esté completo

---

## 5. Mejores prácticas

**Copiar, no reescribir.** Partir del componente más similar existente. Reescribir desde cero ha introducrado regresiones históricas: manejo roto del discriminated union de `HeroProps` (`mode: 'static' | 'carousel'`), directivas `'use client'` faltantes, y colores hardcodeados.

**Default export obligatorio.** `next/dynamic()` requiere default export. Un named export rompe el registro en runtime con un error críptico.

**`'use client'` solo cuando es necesario.** Agregarlo si el componente tiene event handlers, hooks de React, o APIs del browser. Omitirlo en variantes puramente presentacionales.

**CSS vars para colores, nunca hex hardcodeados.** Usar `var(--t-primary)`, `var(--t-background)`, `var(--t-text-muted)`, etc. Si se hardcodea un color, la paleta del merchant no funciona.

**Variantes presentacionales únicamente.** Las variantes no deben manejar estado propio ni efectos secundarios. Reciben todo lo que necesitan via props desde el Router.

**No importar desde templates específicos.** Las variantes en `_shared/` solo pueden importar desde `@/types/` y sus propios `types.ts`. Nunca desde `@/templates/tech-premium/` u otro template concreto.

**El guard `VALID_VARIANTS`.** Todo Router debe validar la variante contra un `Set` antes de buscarla en el registro. Esto previene que un valor stale o corrupto en `StoreCustomization` rompa el render.

**TypeScript como red de seguridad.** El tipo `Record<VariantKey, ComponentType<Props>>` garantiza que agregar un valor al union sin agregarlo al registro produce error de compilación. Correr `tsc --noEmit` después de cada cambio al sistema de variantes.

---

## 6. Archivos clave

```
src/templates/_shared/
├── style-maps.ts                    — class maps compartidos (CARD_STYLE_MAP, etc.)
├── hero-variants/
│   ├── types.ts                     — HeroLayoutProps
│   ├── index.ts                     — HERO_REGISTRY
│   ├── Contained.tsx
│   ├── FullBleed.tsx
│   ├── Split.tsx
│   └── TextOnly.tsx
├── card-layouts/
│   ├── types.ts                     — CardLayoutProps
│   ├── index.ts                     — CARD_LAYOUT_REGISTRY
│   ├── BelowImage.tsx
│   ├── OverlayBottom.tsx
│   ├── OverlayFull.tsx
│   └── SideBySide.tsx
└── category-nav-variants/
    ├── types.ts                     — CategoryNavProps
    ├── index.ts                     — CATEGORY_NAV_REGISTRY
    ├── Grid.tsx
    ├── Chips.tsx
    ├── HorizontalScroll.tsx
    └── Tabs.tsx

src/types/templates/
├── primitives.ts                    — tipos union de variantes (HeroVariant, CardContentLayout, etc.)
└── structural-variants.ts           — StructuralVariants + TemplateRecipe

src/templates/{template}/
├── adapters.ts                      — toSharedStore, toSharedCategories
└── components/
    └── {Slot}Router.tsx             — Router por slot (ej: HeroRouter.tsx)
```

Documentación relacionada:
- `docs/template-system.md` — arquitectura general de templates y TemplateConfig
- `docs/css-variables.md` — catálogo completo de variables `--t-*`

---

_Última actualización: 2026-06-13_
_Basado en: contenido real de `src/templates/_shared/` — 3 slots, 12 variantes._
