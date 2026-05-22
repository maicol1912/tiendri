---
name: component-patterns
description: >
  Patrones de componentes React con shadcn/ui, Tailwind CSS y gestión de estado.
  Trigger: Cuando se cree o modifique componentes UI, se trabaje con shadcn/ui, Tailwind, o estado global.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Crear o modificar componentes React
- Agregar o customizar componentes de shadcn/ui
- Definir estilos con Tailwind CSS
- Gestionar estado global o local
- Implementar formularios con validación visual

## Critical Patterns

### Composición de componentes — regla base

| Principio | Regla |
|-----------|-------|
| Props interface | SIEMPRE exportar la interface del componente |
| Valores por defecto | En la destructuración, no en defaultProps |
| Children | Preferir composición sobre props de configuración |
| Variantes | Usar `cva` (class-variance-authority) para variantes tipadas |
| Clases | Combinar con `cn()` (clsx + tailwind-merge) |

Ver template en [assets/component-template.tsx](assets/component-template.tsx).

### shadcn/ui — cómo customizar

| Nivel | Qué hacer | Cuándo |
|-------|-----------|--------|
| **Usar directo** | Import y usar tal cual | El componente base sirve |
| **Extender** | Wrappear con props extra y estilos | Necesitás variantes del proyecto |
| **Componer** | Combinar múltiples primitivos | Componente complejo nuevo |

Reglas:
- NUNCA modificar archivos dentro de `components/ui/` directamente
- Crear wrappers en `components/` que extiendan los de `ui/`
- Usar Sonner para toasts, NUNCA el toast deprecated de shadcn

### Tailwind — convenciones

| Patrón | Regla |
|--------|-------|
| Responsive | Mobile-first: `base → sm → md → lg → xl` |
| Dark mode | Usar `dark:` prefix, controlado por `theme_appearance` de la tienda |
| Temas dinámicos | CSS variables (`--store-primary`, etc.) — NUNCA hardcodear colores de tienda |
| Spacing | Usar escala de Tailwind (4, 6, 8, 12, 16), no valores custom arbitrarios |
| Typography | `font-display` para headings, `font-body` para texto |

### CSS Variables para temas de tienda

```css
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

Estas variables las define cada template. Los componentes del storefront SIEMPRE usan estas variables, nunca colores fijos.

### Estado — árbol de decisión

| ¿Qué tipo de estado? | Usar |
|-----------------------|------|
| UI local (open/close, hover) | `useState` |
| Formulario | `useState` o controlled inputs |
| Estado complejo con acciones | `useReducer` + Context |
| Estado del catálogo (dashboard) | `StoreContext` con `useReducer` (25+ acciones) |
| Datos del visitante (carrito) | `localStorage` via hook custom |
| Datos del servidor | Server Component props (SSR) |

### StoreContext — patrón de acciones

```typescript
// Hook que abstrae Supabase vs localStorage
const isBackend = !!user && !!storeId

// Si autenticado → Server Action → Supabase
// Si demo → localStorage
```

Regla: el componente NUNCA sabe si los datos vienen de Supabase o localStorage. `useStoreActions` lo abstrae.

### Optimistic Updates

```typescript
// 1. Guardar snapshot del estado actual
dispatch({ type: 'SAVE_ROLLBACK_SNAPSHOT' })

// 2. Aplicar cambio optimista
dispatch({ type: 'TOGGLE_AVAILABILITY', productId })

// 3. Ejecutar Server Action
const result = await toggleProductAvailability(productId)

// 4. Si falla, revertir
if (!result.success) {
  dispatch({ type: 'ROLLBACK_SNAPSHOT' })
}
```

### Componentes — estados obligatorios

Todo componente que muestra datos DEBE manejar:

| Estado | Implementación |
|--------|----------------|
| **Loading** | Skeleton que refleja el layout final (NO spinner genérico) |
| **Empty** | Mensaje + CTA contextual ("Agregá tu primer producto") |
| **Error** | Mensaje claro + acción de retry |
| **Success** | El contenido normal, bien renderizado |

### Formularios — patrón

| Paso | Qué hacer |
|------|-----------|
| 1 | Controlled inputs con `useState` |
| 2 | Validación visual en tiempo real (border rojo, mensaje bajo el input) |
| 3 | Submit → loading state en botón (disabled + spinner) |
| 4 | Éxito → toast con Sonner + redirect o refresh |
| 5 | Error → toast de error o mensaje inline por campo (`error.field`) |

## Commands

```bash
# Agregar componente de shadcn
pnpm dlx shadcn@latest add button

# Agregar múltiples
pnpm dlx shadcn@latest add dialog sheet dropdown-menu
```

## Resources

- **Templates**: Ver [assets/](assets/) para component template y skeleton patterns
- **Documentación**: Ver [references/](references/) para docs del proyecto
