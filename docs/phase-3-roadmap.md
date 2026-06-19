# Phase 3 — Escalabilidad y Datos Reales

## Contexto
Fases 0-2 de la auditoría triple completadas (2026-06-18). Esta fase fue diferida porque contiene tareas grandes que dependen de la infraestructura Supabase.

### Métricas actuales (post Fase 2)
- Código: ~8.5/10
- Organización: ~8.5/10
- SEO: ~78/100

### Métricas objetivo (post Fase 3)
- Código: 9/10
- Organización: 9/10
- SEO: 90/100

---

## Items

### 3.1 — Phase 7: Datos reales de Supabase en storefront [L] [SEO + CODE]
**El más importante.** Actualmente el storefront en `src/app/[slug]/page.tsx` pasa `mockData.products` y `mockData.categories` al template. Google indexa productos demo, no los reales del merchant.

**Qué hacer:**
- Conectar el `TemplateLayout` a datos reales de Supabase (products, categories del store)
- Eliminar la dependencia de `mockData` en la ruta `[slug]`
- Asegurar que `generateMetadata` use datos reales para SEO
- Las template preview pages (`/template/[templateName]`) SIGUEN usando mock data (son para dev)

**Archivos clave:**
- `src/app/[slug]/page.tsx` — entry point del storefront
- `src/infrastructure/repositories/` — repo interfaces
- `src/storefront/adapters/` — data transformations

**Dependencias:** Supabase tables (stores, products, categories) con datos reales poblados

---

### 3.2 — Refactorizar CartItem [M] [CODE]
`CartItem` en `src/types/domain/cart.ts` actualmente almacena datos de display (description, rating, cardBgColor). Si el producto cambia, el carrito muestra datos stale.

**Qué hacer:**
- CartItem → solo `{ productId, variantName, quantity }`
- Resolver datos de display en render time
- Actualizar `CartProvider` en `src/templates/_core/cart/`

---

### 3.3 — Migrar localStorage repos → Supabase [L] [CODE]
Los repositorios en `src/infrastructure/repositories/local-storage/` usan `localStorage` con keys hardcodeadas (`tiendri_demo-store_*`). Multi-tenant es imposible — todas las tiendas comparten el mismo bucket.

**Qué hacer:**
- Crear implementaciones Supabase de las interfaces de repository
- Actualizar la factory en `src/infrastructure/repositories/factory.ts`
- Migrar datos existentes de localStorage a Supabase
- El `storeId` parámetro debe funcionar de verdad

**Archivos clave:**
- `src/infrastructure/repositories/interfaces.ts` — contratos (no cambian)
- `src/infrastructure/repositories/local-storage/` — implementaciones actuales
- `src/infrastructure/repositories/factory.ts` — factory pattern

---

### 3.4 — Validación cross-field en Zod [S] [CODE]
`compare_at_price > price` solo se valida client-side. El schema Zod en `src/shared/validators/product.schema.ts` no lo enforce.

**Qué hacer:**
- Agregar `.refine()` al schema de producto
- Server Actions respetarán la regla automáticamente (ya llaman `safeParse`)

---

### 3.5 — Fix resolveTemplateConfig casts [M] [CODE]
`src/catalog/resolveTemplateConfig.ts` usa double unsafe casts para type narrowing. Cuando `BrandingConfig` evolucione, los casts fallarán silenciosamente.

**Qué hacer:**
- Retornar `TemplateManifest` directamente en vez de cast down a `TemplateConfig`
- Actualizar `src/templates/registry.ts` si es necesario

---

### 3.6 — BreadcrumbList schema en product detail [S] [SEO]
Las páginas de producto del storefront no tienen schema de `BreadcrumbList` (Tienda → Categoría → Producto). Rich snippets de breadcrumbs en Google mejoran CTR.

**Archivos:** Pages de producto dentro de `src/templates/_core/pages/`

---

### 3.7 — FAQPage schema en landing [S] [SEO]
La sección de pricing/cómo funciona de `src/app/(marketing)/` podría estructurarse como FAQ para rich snippets.

---

### 3.8 — Completar site.webmanifest [XS] [SEO]
`public/site.webmanifest` falta `"start_url": "/"`, `"lang": "es"`, `"description"`.

---

### 3.9 — Crear OG default image [S] [SEO]
El wiring para `public/og-default.png` ya está listo (fallback en root layout y storefront). Falta crear el asset real: 1200x630px, branded Tiendri.

---

### 3.10 — Página de precios con contenido real [M] [SEO]
`src/app/(marketing)/precios/page.tsx` es un placeholder (`<div>Precios Page</div>`). Está en el sitemap con priority 0.8 pero no tiene contenido.

---

## Orden recomendado de ejecución
1. **3.8** (webmanifest) + **3.9** (OG image) + **3.4** (Zod refine) — quick wins, 30 min total
2. **3.1** (Supabase real data) — el blocker más grande para SEO y producto real
3. **3.3** (localStorage → Supabase repos) — habilita multi-tenant
4. **3.2** (CartItem refactor) — depende de 3.3
5. **3.5** (resolveTemplateConfig) — independiente, hacer cuando convenga
6. **3.6** + **3.7** (schemas SEO) — después de 3.1 (necesitan datos reales)
7. **3.10** (precios page) — independiente, hacer cuando el contenido esté definido

## Notas
- Phase 3 items tagged [L] requieren un SDD (Spec-Driven Development) plan separado
- Items [S] y [XS] se pueden atacar directamente sin SDD
- La migración a Supabase (3.1 + 3.3) es el cambio más impactante — convierte el prototipo en producto real
