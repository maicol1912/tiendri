# Dashboard

Panel de administración del merchant. Desde acá el comerciante gestiona productos, categorías, apariencia de su tienda y opciones para compartirla.

---

## Estructura

El shell vive en `src/app/(dashboard)/layout.tsx` y compone tres piezas de `src/components/dashboard/`:

- **sidebar.tsx** — navegación lateral, desktop (`lg:block`)
- **header.tsx** — barra superior con menú mobile (`lg:hidden`)
- **breadcrumbs.tsx** — migas de pan sobre el contenido, tablet/desktop (`md:block`)

También existe `tour-checklist.tsx` para el onboarding guiado y una carpeta `media/` para componentes de biblioteca de medios.

---

## Rutas

Todas bajo `src/app/(dashboard)/dashboard/`.

| Ruta | Qué hace | Estado |
|------|----------|--------|
| `/dashboard` | Home — stats, acciones rápidas, indicador de almacenamiento | Implementado |
| `/dashboard/categorias` | Listado con drag-and-drop; gestión de subcategorías desde `/[id]` | Implementado |
| `/dashboard/productos` | Listado con filtros, toggles de disponibilidad y destacado | Implementado |
| `/dashboard/banners` | Redirect al tab de configuración correspondiente | Redirect |
| `/dashboard/compartir` | QR + link + WhatsApp share | Implementado |
| `/dashboard/configuracion` | Configuración de tienda — tabs schema-driven | Implementado |
| `/dashboard/biblioteca` | Biblioteca de medios | Implementado |

---

## Sistema de configuración

`/dashboard/configuracion` es schema-driven: el template activo declara su `TemplateConfigSchema` en `config-schema.ts` y el dashboard lo convierte en formularios automáticamente, sin código específico por template.

Orden de tabs: **Identidad → [tabs dinámicos del template] → Apariencia → Negocio**.

Los tres tabs universales son:
- `branding-tab.tsx` — nombre, logo, slogan, redes sociales
- `theme-tab.tsx` — paleta de colores, radio de bordes, tipografía
- `business-tab.tsx` — WhatsApp, dirección, moneda, modo catálogo

Los tabs dinámicos se generan desde `schema.content.tabGroups` y son renderizados por `DynamicTabContent`.

Persistencia actual: localStorage. El repository layer es async por diseño, así que la migración a Supabase es un cambio de implementación, sin tocar páginas ni hooks.

Archivos relevantes: `src/app/(dashboard)/dashboard/configuracion/`, `src/components/dashboard/schema-form/`.

---

## Cómo agregar una sección nueva

1. Crear la carpeta de ruta en `src/app/(dashboard)/dashboard/{nombre}/` con su `page.tsx`
2. Agregar entrada en `NAV_ITEMS` dentro de `src/components/dashboard/sidebar.tsx`
3. Agregar la etiqueta del segmento en `ROUTE_LABELS` de `src/components/dashboard/breadcrumbs.tsx`
4. Si la sección necesita datos de una entidad nueva: crear tipos en `src/types/domain/`, interfaz en `src/lib/repositories/interfaces.ts`, implementación en `src/lib/repositories/local-storage/` y registrar en `src/lib/repositories/factory.ts`
5. Usar los hooks (`useCategories`, `useProducts`) y componentes compartidos (`DataTable`, `EmptyState`, `ConfirmDialog`) de `src/components/shared/` para no reinventar la rueda

---

## Archivos clave

```
src/app/(dashboard)/
  layout.tsx                        ← shell (sidebar + header + breadcrumbs)
  dashboard/
    page.tsx                        ← home
    categorias/
    productos/
    banners/
    compartir/
    configuracion/
      tabs/                         ← branding-tab, theme-tab, business-tab
    biblioteca/

src/components/dashboard/
  sidebar.tsx
  header.tsx
  breadcrumbs.tsx
  tour-checklist.tsx
  media/
  schema-form/                      ← DynamicField, DynamicSection, DynamicTabContent, RepeatableSection

src/lib/repositories/               ← repository pattern + factory + local-storage implementations
src/hooks/                          ← useCategories, useProducts, useSubcategories
src/types/domain/                   ← Category, Product, Subcategory, ActionResult
src/lib/validators/                 ← Zod schemas (category, product, store-customization)
```
