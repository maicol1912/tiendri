---
name: frontend-architecture
description: >
  Scalable Next.js App Router architecture: folder structure, component organization, Server/Client boundaries, and feature-based patterns.
  Trigger: When creating new pages, components, features, or restructuring the frontend. When deciding where a file goes or how to organize a new module.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Creating a new page or route
- Adding a new feature module (auth, dashboard, storefront, onboarding)
- Creating or organizing components (shared vs feature-specific)
- Deciding Server Component vs Client Component
- Structuring Server Actions, hooks, types, or utilities
- Reviewing or refactoring existing folder structure

## Core Principles

1. **Screaming Architecture** — The folder structure should SCREAM what the app does, not what framework it uses. A developer opening the project should immediately see: auth, dashboard, storefront, onboarding — NOT: components, hooks, utils.

2. **Colocation** — Files that change together live together. A feature's components, hooks, types, and actions live inside the feature folder, not scattered across global folders.

3. **Dependency Direction** — Always downward. Features import from shared. Shared NEVER imports from features. UI components NEVER import business logic directly.

4. **Server-First** — Every component is a Server Component by default. `'use client'` is pushed down to the smallest interactive leaf possible.

5. **Explicit Boundaries** — The split between server and client, between features, and between shared/specific code is always explicit and intentional.

## Project Structure

```
src/
├── app/                          # ROUTING ONLY — pages, layouts, metadata
│   ├── (landing)/                # Route group: landing page (/)
│   │   ├── page.tsx              # Thin — importa y compone secciones
│   │   └── components/           # Landing-specific components
│   │       ├── Navbar.tsx
│   │       ├── HeroSection.tsx
│   │       ├── HowItWorksSection.tsx
│   │       ├── ShowcaseSection.tsx
│   │       ├── PricingSection.tsx
│   │       ├── CtaSection.tsx
│   │       └── Footer.tsx
│   ├── (auth)/                   # Route group: auth pages (/auth)
│   │   └── auth/
│   │       ├── page.tsx          # Entry point — renders AuthSplitScreen
│   │       ├── layout.tsx        # Minimal auth layout
│   │       └── components/       # Auth-specific components
│   │           ├── AuthSplitScreen.tsx
│   │           ├── LoginForm.tsx
│   │           ├── RegisterForm.tsx
│   │           ├── ConfirmEmail.tsx
│   │           └── VisualPanel.tsx
│   ├── (dashboard)/              # Route group: protected pages (/dashboard)
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── components/
│   ├── (storefront)/             # Route group: public store (/store/[slug])
│   │   └── store/
│   │       └── [slug]/
│   │           ├── page.tsx
│   │           └── components/
│   ├── layout.tsx                # Root layout (fonts, metadata, body)
│   └── globals.css               # Tailwind + CSS variables + tokens
├── components/                   # GLOBAL ONLY — used across 2+ route groups
│   ├── ui/                       # Base primitives (button, skeleton)
│   └── common/                   # App-wide shared (Logo, Spinner, EmptyState)
├── lib/                          # UTILITIES — pure functions, no UI
│   ├── supabase/                 # Supabase clients
│   ├── validations/              # Zod schemas shared across features
│   └── utils.ts                  # Generic utilities (cn, formatPrice)
├── actions/                      # SERVER ACTIONS — organized by domain
├── hooks/                        # SHARED HOOKS — used across 2+ route groups
├── types/                        # SHARED TYPES — used across 2+ route groups
└── middleware.ts                 # Auth middleware
```

## Decision Trees

### Where Does This File Go?

```
Is it a page/route?
  YES → src/app/(group)/route/page.tsx
  NO ↓

Is it a component?
  Used by ONLY this route? → src/app/(group)/route/components/
  Used by 2+ route groups? → src/components/common/
  Is it a UI primitive (button, input)? → src/components/ui/

Is it a Server Action?
  YES → src/actions/{domain}/action-name.ts

Is it a hook?
  Route-specific → src/app/(group)/route/hooks/
  Shared across routes → src/hooks/

Is it a type?
  Route-specific → colocate in the component file or route folder
  Shared → src/types/

Is it a utility function?
  YES → src/lib/utils.ts or src/lib/{domain}.ts

Is it a Zod schema?
  YES → src/lib/validations/{domain}.ts
```

### Server Component vs Client Component?

```
Does it need useState, useEffect, event handlers, or browser APIs?
  YES → 'use client' — but ONLY this component, not the parent
  NO → Server Component (default, no directive needed)

Does it fetch data?
  YES → Server Component — fetch directly with async/await
  NO → Could be either, default to Server

Does it need interactivity AND data?
  YES → Split into two:
    - ServerWrapper.tsx (fetches data, no 'use client')
    - ClientChild.tsx ('use client', receives data as props)

Rule: Push 'use client' DOWN to the smallest leaf possible
```

### Route Groups — Every Page Gets One

```
(landing)     → /              # Landing page
(auth)        → /auth          # Login, register, confirm-email
(dashboard)   → /dashboard/*   # Protected pages (products, categories, settings)
(storefront)  → /store/[slug]  # Public store pages
(marketing)   → /blog, /about  # Public content (future)
```

Route groups `(name)`:
- Do NOT affect the URL
- Share layouts within the group
- Group middleware behavior
- Make the folder structure SCREAM what each section does
- ALWAYS contain a `components/` folder for colocated components

## Component Organization Patterns

### THE GOLDEN RULE — Colocation First

Every page/route OWNS its components. Components live INSIDE their route group, NOT in a global `components/` folder.

```
✅ CORRECT: src/app/(landing)/components/HeroSection.tsx
❌ WRONG:   src/components/landing/HeroSection.tsx

✅ CORRECT: src/app/(auth)/auth/components/LoginForm.tsx
❌ WRONG:   src/components/auth/LoginForm.tsx
```

`src/components/` is ONLY for components used across 2+ route groups. If a component is used by only ONE page, it lives with that page.

**Graduation rule:** A component starts colocated with its route. Only when it's imported by a SECOND route group does it graduate to `src/components/common/`.

### 1. Feature-Colocated Components

Components used by only ONE route live INSIDE that route:

```
src/app/(dashboard)/dashboard/products/
├── page.tsx
├── components/
│   ├── ProductList.tsx        # Only used in products page
│   ├── ProductCard.tsx        # Only used in products page
│   ├── ProductForm.tsx        # Only used in products page
│   └── ProductFilters.tsx     # Only used in products page
└── hooks/
    └── use-product-filters.ts # Only used in products page
```

### 2. Shared UI Components

Components used across 2+ features graduate to `src/components/`:

```
src/components/
├── ui/                    # Base primitives (shadcn/ui style)
│   ├── button.tsx
│   ├── input.tsx
│   ├── skeleton.tsx
│   ├── dialog.tsx
│   └── toast.tsx
└── common/                # App-wide shared (used by 2+ route groups)
    ├── Logo.tsx
    ├── LoadingSpinner.tsx
    ├── EmptyState.tsx
    └── ErrorBoundary.tsx
```

> Landing, auth, and dashboard components live inside their respective route group folders — NOT here.

### 3. Component Naming

| Type | Convention | Example |
|------|-----------|---------|
| Page component | `page.tsx` (Next.js convention) | `src/app/(dashboard)/dashboard/page.tsx` |
| Layout | `layout.tsx` | `src/app/(auth)/auth/layout.tsx` |
| Route component | PascalCase, descriptive | `ProductList.tsx`, `AuthSplitScreen.tsx` |
| UI primitive | lowercase (shadcn convention) | `button.tsx`, `input.tsx` |
| Hook | `use-kebab-case.ts` | `use-debounce.ts` |
| Server Action | `kebab-case.ts` | `create-product.ts` |
| Type file | `kebab-case.ts` | `database.ts`, `store.ts` |
| Utility | `kebab-case.ts` | `utils.ts`, `format-price.ts` |

## Server Actions Architecture

```
src/actions/
├── auth/
│   ├── register.ts          # registerUser(formData)
│   ├── login.ts             # loginUser(formData)
│   └── logout.ts            # logoutUser()
├── stores/
│   ├── create-store.ts      # createStore(data)
│   ├── update-store.ts      # updateStore(id, data)
│   └── delete-store.ts      # deleteStore(id)
├── products/
│   ├── create-product.ts
│   ├── update-product.ts
│   ├── delete-product.ts
│   └── reorder-products.ts
└── categories/
    ├── create-category.ts
    ├── update-category.ts
    └── delete-category.ts
```

**Rules:**
- One action per file (single responsibility)
- Every action validates input with Zod FIRST
- Every action checks auth with `getUser()` FIRST
- Return type: `{ success: true, data: T }` or `{ success: false, error: { code, message, field? } }`
- Server Actions are `'use server'` — never import client code

## Layout Architecture

### Root Layout (`src/app/layout.tsx`)
- Fonts (Space Grotesk, Inter)
- Global CSS
- Metadata defaults
- NO auth logic, NO navigation — those go in route group layouts

### Auth Layout (`src/app/(auth)/auth/layout.tsx`)
- Minimal: background + children
- NO sidebar, NO navbar

### Dashboard Layout (`src/app/(dashboard)/dashboard/layout.tsx`)
- Sidebar navigation
- Header with store name + actions
- Auth guard (redirect if no session)
- Breadcrumbs

### Storefront Layout (`src/app/(storefront)/store/[slug]/layout.tsx`)
- Store header (logo, name, nav)
- Store footer
- Template CSS variables applied here
- Public — no auth required

## Import Rules (Dependency Direction)

```
✅ ALLOWED:
  page.tsx → components/  (route imports its own components)
  page.tsx → src/components/ui/  (route imports shared UI)
  page.tsx → src/actions/  (route calls server actions)
  page.tsx → src/lib/  (route uses utilities)
  components/ → src/components/ui/  (feature components use shared UI)
  src/actions/ → src/lib/  (actions use utilities)

❌ FORBIDDEN:
  src/components/ui/ → src/actions/  (UI primitives never call actions)
  src/components/ui/ → src/app/  (shared UI never imports from routes)
  src/lib/ → src/components/  (utilities never import UI)
  src/actions/ → src/components/  (actions never import UI)
  Feature A → Feature B  (features are independent)
```

## File Size Guidelines

| File Type | Max Lines | If exceeded |
|-----------|----------|-------------|
| Page component | 50 | Extract logic to components/ |
| Component | 200 | Split into sub-components |
| Server Action | 80 | Extract helpers to lib/ |
| Hook | 100 | Split into smaller hooks |
| Utility | 50 | One function per file if complex |

**page.tsx should be THIN** — it imports components and composes them. It does NOT contain UI logic.

```tsx
// GOOD — thin page
export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <StoreStats />
      <RecentOrders />
    </div>
  )
}

// BAD — fat page with inline UI
export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3">
        {/* 200 lines of inline JSX */}
      </div>
    </div>
  )
}
```

## Anti-Patterns

| DON'T | WHY | DO INSTEAD |
|-------|-----|------------|
| All components in global `components/` | Becomes a dumping ground | Colocate with route first, graduate to shared when used 2+ times |
| `'use client'` on page.tsx | Loses Server Component benefits | Push down to interactive leaf components |
| Fat page.tsx with inline UI | Unreadable, untestable | Extract to components/ within the route |
| Importing between features | Creates coupling | Extract shared code to `lib/` or `components/common/` |
| Generic names (`Helper.tsx`, `Utils.tsx`) | Unclear purpose | Descriptive names (`ProductPriceFormatter.tsx`) |
| One massive `types.ts` | Hard to maintain | Split by domain (`store.ts`, `product.ts`) |
| Server Actions in component files | Mixes concerns | Separate `actions/` directory by domain |
| Deep nesting (5+ levels) | Navigation nightmare | Flatten with route groups and colocation |

## Commands

```bash
# Create new feature structure
mkdir -p src/app/(dashboard)/dashboard/products/components
mkdir -p src/app/(dashboard)/dashboard/products/hooks

# Check for circular imports (if using ESLint)
npx eslint --rule 'import/no-cycle: error' src/

# Generate Supabase types
npx supabase gen types typescript --project-id $PROJECT_ID > src/types/database.ts
```

## Patrones de Componentes — Tiendri

Patrones específicos del proyecto que todo componente del storefront y dashboard debe seguir.

### CSS Variables para temas de tienda

Los componentes del storefront SIEMPRE usan estas variables. NUNCA hardcodear colores de tienda:

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

Estas variables las define cada template. Ver template completo en [assets/component-template.tsx](assets/component-template.tsx).

### StoreContext — patrón de abstracción Supabase / localStorage

```typescript
// Hook que abstrae Supabase vs localStorage
const isBackend = !!user && !!storeId

// Si autenticado → Server Action → Supabase
// Si demo → localStorage
```

Regla: el componente NUNCA sabe si los datos vienen de Supabase o localStorage. `useStoreActions` lo abstrae.

Estado del catálogo (dashboard) → `StoreContext` con `useReducer` (25+ acciones).
Datos del visitante (carrito) → `localStorage` via hook custom.

### Optimistic Updates con Rollback

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

### Toasts — Sonner obligatorio

Usar **Sonner** para todos los toasts. NUNCA usar el toast deprecated de shadcn.

```typescript
import { toast } from 'sonner'

toast.success('Producto guardado')
toast.error('Error al guardar')
```

### Estados obligatorios por componente

Todo componente que muestra datos DEBE manejar los cuatro estados:

| Estado | Implementación |
|--------|----------------|
| **Loading** | Skeleton que refleja el layout final — NUNCA spinner genérico |
| **Empty** | Mensaje + CTA contextual ("Agregá tu primer producto") |
| **Error** | Mensaje claro + acción de retry |
| **Success** | El contenido normal, bien renderizado |

Ver skeletons de referencia en [assets/skeleton-pattern.tsx](assets/skeleton-pattern.tsx).

### shadcn/ui — customización

| Nivel | Qué hacer | Cuándo |
|-------|-----------|--------|
| **Usar directo** | Import y usar tal cual | El componente base sirve |
| **Extender** | Wrappear con props extra y estilos | Necesitás variantes del proyecto |
| **Componer** | Combinar múltiples primitivos | Componente complejo nuevo |

- NUNCA modificar archivos dentro de `components/ui/` directamente
- Crear wrappers en `components/` que extiendan los de `ui/`

## Resources

- **Next.js official docs**: Skill global `vercel-react-best-practices`
- **Design system**: See `ai/skills/design-system/SKILL.md`
