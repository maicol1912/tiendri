# Mapa Técnico — TIENDRI V2

SaaS para comerciantes colombianos: catálogo online + pedidos vía WhatsApp.
Este documento es un mapa de alto nivel. El código es la fuente de verdad para los detalles.

---

## 1. Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js (App Router) | 16.2.6 | Framework principal, SSR/ISR, rutas |
| React | 19.2.4 | UI |
| TypeScript strict | ^5 | Lenguaje |
| Tailwind CSS | ^4 | Estilos |
| shadcn/ui + Radix | ^4.8.0 | Componentes UI primitivos |
| Framer Motion | ^12.40.0 | Animaciones en templates y dashboard |
| GSAP + Lenis | ^3.15.0 / ^1.3.23 | Animaciones y scroll en la landing |
| Zod | ^4.4.3 | Validación de formularios y schemas |
| Supabase | ^2.106.1 | PostgreSQL + Auth + Storage |
| Vercel | — | Deploy automático en push a `main` |

---

## 2. Arquitectura

### Grupos de rutas (`src/app/`)

| Grupo | Ruta | Qué hace |
|---|---|---|
| `(marketing)` | `/`, `/precios` | Landing page pública |
| `(auth)` | `/auth` | Login, signup, OAuth callback |
| `(onboarding)` | `/onboarding` | Wizard de configuración inicial (5 pasos) |
| `(dashboard)` | `/dashboard` | Panel del merchant — CRUD y configuración |
| `[slug]` | `/{slug}` | Storefront público del merchant |
| `template/[name]` | `/template/{name}` | Vista previa de templates (desarrollo) |

### Flujo de una solicitud al storefront (`/[slug]`)

- `[slug]/layout.tsx` (Server Component) recibe el slug, llama `getStoreBySlug` contra Supabase.
- Si existe, carga los defaults y el schema del template vía el registry (lazy, con code splitting).
- `resolveTemplateConfig` fusiona: defaults del template → tokens de paleta → overrides del merchant.
- `buildCssVars` convierte el config resuelto en CSS custom properties (`--t-*`).
- El layout inyecta esas vars en `.template-scope`; los children las consumen sin JS de theming.

### Server vs Client Components

Los layouts de storefront y las páginas de catálogo son Server Components — hacen fetch y generan HTML sin JS de theming. Los componentes interactivos (carrito, modal de producto, tabs) son Client Components. El dashboard corre completamente en cliente vía hooks + repositories.

---

## 3. Modelo de datos

La BD tiene una tabla principal `stores` que guarda los datos del negocio y un campo JSONB `customization` con toda la personalización visual y de contenido del merchant.

Las tablas de catálogo (`categories`, `subcategories`, `products`, `product_images`, `product_variants`) y `orders` existen en Supabase pero su representación TypeScript vive en `src/types/domain/`, no en `database.types.ts`.

Directorios de tipos:

- `src/types/database.types.ts` — tipos generados de la BD (tabla `stores`)
- `src/types/domain/` — tipos alineados a la BD, solo para el dashboard
- `src/types/store.ts` — tipos del storefront (optimizados para renderizado)
- `src/types/cart.ts` — estado del carrito
- `src/types/templates/` — sistema de tipos del template (5 capas)

Ver `src/types/` para el detalle de cada contrato.

---

## 4. Sistema de templates

8 templates bajo `src/templates/`, cada uno con la misma estructura interna:

- `manifest.ts` — defaults de colores, grid y layout (`satisfies TemplateManifest`)
- `config-schema.ts` — superficie configurable expuesta al dashboard
- `ui-config.ts` — configuración del ThemeCustomizer (paletas, labels, campos)
- `palettes.ts` — paletas de color predefinidas
- `mock/data.ts` — datos de vista previa
- `mock/assets.ts` — assets de vista previa

El registry (`src/templates/registry.ts`) expone loaders async por template con code splitting. Fallback a `tech-premium` para IDs desconocidos.

La resolución de config sigue tres capas: defaults del template → tokens de paleta → overrides del merchant. El resultado alimenta `buildCssVars` que genera las ~77 CSS vars `--t-*` consumidas por los componentes.

Ver `docs/template-system.md` para la guía completa y `docs/css-variables.md` para el catálogo de vars.

---

## 5. Utilidades compartidas

| Utilidad | Ubicación | Qué hace |
|---|---|---|
| `formatPrice` | `src/lib/format.ts` | Formatea precios COP con separadores de miles |
| `CartProvider` | `src/lib/cart/CartProvider.tsx` | Carrito en localStorage via useReducer, compartido entre templates |
| `QuantityStepper` | `src/components/shared/QuantityStepper.tsx` | Stepper de cantidad que consume CSS vars `--t-*` |
| `buildCssVars` | `src/lib/buildCssVars.ts` | ResolvedStoreConfig → CSS custom properties |
| `resolveTemplateConfig` | `src/lib/resolveTemplateConfig.ts` | Merge de defaults + paleta + overrides del merchant |
| `getStoreBySlug` | `src/lib/getStoreBySlug.ts` | Fetch cacheado de tienda desde Supabase |
| `fonts` | `src/lib/fonts.ts` | 15 font pairs agrupados en 5 estilos, con variables CSS |
| `cn` | `src/lib/utils.ts` | clsx + tailwind-merge |

---

## 6. Data layer

El dashboard usa el patrón Repository: interfaces definidas en `src/lib/repositories/interfaces.ts`, implementadas actualmente con localStorage (`src/lib/repositories/local-storage/`). La factory (`factory.ts`) expone singletons para evitar re-renders y retorna `"demo-store"` como storeId fijo hasta que se implemente auth.

Los hooks de React (`src/hooks/use-repositories.ts`) consumen la factory y aplican actualizaciones optimistas con rollback automático ante fallo.

El storefront lee directamente desde Supabase vía el cliente de servidor (`src/lib/supabase/server.ts`), con RLS que limita la visibilidad a tiendas con `onboarding_completed = true`.

La migración del dashboard a Supabase está pendiente; la factory está diseñada para intercambiar implementaciones sin tocar la UI.

---

## 7. Estructura de carpetas

```
src/
├── app/                    # Rutas de la aplicación (Next.js App Router)
│   ├── (marketing)/        # Landing pública
│   ├── (auth)/             # Flujo de autenticación
│   ├── (onboarding)/       # Wizard de configuración inicial
│   ├── (dashboard)/        # Panel del merchant
│   ├── [slug]/             # Storefront público
│   └── template/[name]/    # Vista previa de templates
│
├── templates/              # Los 8 templates + infraestructura compartida
│   ├── _core/              # Motor: TemplateLayout, shells, pages, sections, hooks
│   ├── _variants/          # 7 registries de slots con 31 variantes
│   ├── _shared/            # utils/, hooks/, components/, style-maps.ts
│   ├── tech-premium/
│   ├── fashion/
│   ├── beauty-elegant/
│   ├── beauty-soft/
│   ├── food-night/
│   ├── furniture-light/
│   ├── furniture-dark/
│   └── decor-warm/
│
├── types/                  # Contratos TypeScript
│   ├── database.types.ts   # Tipos de la BD (tabla stores)
│   ├── store.ts            # Tipos del storefront
│   ├── cart.ts             # Estado del carrito
│   ├── domain/             # Tipos de dominio del dashboard
│   └── templates/          # Sistema de tipos del template (5 capas)
│
├── lib/                    # Lógica de negocio y utilidades
│   ├── supabase/           # Clientes Supabase (client, server, middleware)
│   ├── repositories/       # Interfaces + implementaciones + factory
│   ├── validators/         # Schemas Zod
│   ├── cart/               # CartProvider
│   ├── onboarding/         # Provider, vibes, tour steps
│   ├── buildCssVars.ts
│   ├── resolveTemplateConfig.ts
│   ├── getStoreBySlug.ts
│   └── fonts.ts
│
├── components/             # Componentes React reutilizables
│   ├── ui/                 # shadcn/ui primitivos
│   ├── shared/             # Componentes cross-feature (QuantityStepper, DataTable, etc.)
│   ├── dashboard/          # Shell del dashboard + schema-form renderer + media library
│   ├── onboarding/         # Steps del wizard
│   └── customizer/         # ThemeCustomizer
│
└── hooks/                  # React hooks
    ├── use-repositories.ts # useCategories, useSubcategories, useProducts
    ├── use-image-upload.ts
    ├── use-media-library.ts
    └── [otros hooks del storefront y dashboard]
```

---

_Actualizado: 13/06/2026. Para detalles de implementación, ver el código directamente o los docs especializados en `docs/`._
