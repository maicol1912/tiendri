---
name: nextjs
description: >
  Mejores prácticas de Next.js App Router: Server/Client Components, layouts, metadata, ISR, middleware, loading/error states.
  Trigger: Cuando se cree o modifique páginas, layouts, middleware, metadata o rutas en Next.js.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Crear o modificar páginas y layouts
- Decidir entre Server Component y Client Component
- Implementar loading states, error boundaries o not-found
- Configurar metadata y SEO
- Trabajar con middleware de autenticación
- Implementar ISR o revalidación de cache

## Critical Patterns

### Server vs Client Component — árbol de decisión

| ¿Necesita...? | Respuesta | Usar |
|----------------|-----------|------|
| useState, useEffect, event handlers | Sí | `'use client'` |
| Acceso a cookies, headers, DB | Sí | Server Component |
| Interactividad (clicks, inputs, toggles) | Sí | `'use client'` |
| Solo renderizar datos | Sí | Server Component |
| Ambos (datos + interactividad) | — | Server wrapper + Client child |

Regla: **Server Component por defecto**. Solo agregar `'use client'` cuando sea estrictamente necesario. Empujar el `'use client'` lo más abajo posible del árbol.

### Estructura de ruta — archivos especiales

```
app/
├── layout.tsx          # Layout raíz (Server Component, NO 'use client')
├── page.tsx            # Página (Server Component por defecto)
├── loading.tsx         # Skeleton mientras carga (auto-wraps en Suspense)
├── error.tsx           # Error boundary ('use client' obligatorio)
├── not-found.tsx       # 404 custom
└── (grupo)/            # Route group (no afecta URL)
    └── layout.tsx      # Layout del grupo
```

### Metadata — patrón para SEO

```typescript
// Estática
export const metadata: Metadata = {
  title: 'Mi Página',
  description: 'Descripción',
}

// Dinámica (storefront público)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await getStore(params.slug)
  return {
    title: store.name,
    description: store.description,
    openGraph: {
      title: store.name,
      description: store.description,
      images: store.banner ? [store.banner] : [],
    },
  }
}
```

Ver template completo en [assets/dynamic-metadata.tsx](assets/dynamic-metadata.tsx).

### ISR y revalidación

| Escenario | Estrategia |
|-----------|------------|
| Storefront público | ISR + `revalidatePath()` cuando el merchant edita |
| Dashboard | No cachear — datos siempre frescos |
| Landing page | Static (build time) |

```typescript
// En Server Action, después de mutar datos:
revalidatePath(`/store/${slug}`)
```

### Middleware — patrón de auth

| Ruta | Comportamiento |
|------|----------------|
| `/dashboard/*` | Sin sesión → redirect `/auth/login` |
| `/auth/*` | Con sesión → redirect `/dashboard` |
| `/store/*` | Público, no proteger |
| `/_next/*`, `favicon.ico` | Excluir del middleware |

Ver template en [assets/middleware.ts](assets/middleware.ts).

### Loading states — skeletons, no spinners

- Cada `loading.tsx` debe tener un skeleton que refleje la estructura de la página
- NUNCA un spinner genérico centrado
- El skeleton debe coincidir con el layout final para evitar CLS (Cumulative Layout Shift)

### Imports y code splitting

| Patrón | Cuándo |
|--------|--------|
| `import` estático | Componentes críticos (above the fold) |
| `dynamic(() => import(...))` | Componentes pesados o below the fold |
| `dynamic(..., { ssr: false })` | Componentes que usan APIs del browser |

## Commands

```bash
# Dev server
pnpm dev

# Build de producción
pnpm build

# Analizar bundle
pnpm dlx @next/bundle-analyzer
```

## Resources

- **Templates**: Ver [assets/](assets/) para middleware, metadata, page patterns
- **Documentación**: Ver [references/](references/) para docs del proyecto
