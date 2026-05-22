---
name: seo
description: >
  Auditoría e implementación SEO para Next.js App Router. Scoring de 100 puntos, metadata, structured data, technical SEO.
  Trigger: Cuando se implemente o audite SEO en páginas, storefronts, landing o metadata.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Implementar metadata en páginas nuevas
- Generar structured data (JSON-LD) para storefronts
- Auditar SEO de una página o del proyecto completo
- Optimizar imágenes, headings, alt text
- Configurar robots.txt y sitemap
- Verificar performance SEO (next/image, next/font)

## Critical Patterns

### Scoring — 100 puntos en 6 dimensiones

| Dimensión | Puntos | Qué evalúa |
|-----------|--------|-------------|
| Metadata | 25 | Title, Description, OG, Twitter Cards |
| Structured Data | 20 | JSON-LD válido, campos requeridos, schema correcto |
| Contenido | 20 | H1 único, jerarquía H1-H6, alt text, links internos |
| Technical SEO | 15 | robots.txt, sitemap, URLs limpias, HTTPS |
| Performance | 10 | next/image, next/font, code splitting, WebP |
| Mobile | 10 | Responsive, viewport, tap targets, font size |

**Calificaciones**: 90-100 Excelente | 75-89 Bueno | 60-74 Regular | 40-59 Pobre | <40 Crítico

Ver rubrica detallada en [assets/scoring-rubric.md](assets/scoring-rubric.md).

### Metadata — checklist por página

| Check | Regla |
|-------|-------|
| Title existe | Obligatorio en toda página pública |
| Title longitud | 50-60 caracteres (no cortarse en SERP) |
| Title contiene keyword | Keyword principal al inicio |
| Description existe | Obligatorio en toda página pública |
| Description longitud | 150-160 caracteres |
| Description tiene CTA | Invitar a la acción ("Descubrí", "Mirá", "Pedí") |
| OG completo | title, description, image, type, url |
| Twitter Cards | card, title, description, image |

Patrón Next.js App Router:
```typescript
// Estática
export const metadata: Metadata = { title, description, openGraph, twitter }

// Dinámica (storefronts)
export async function generateMetadata({ params }): Promise<Metadata> { ... }
```

### Structured Data — schemas por tipo de página

| Página | Schema | Campos requeridos |
|--------|--------|-------------------|
| Storefront | `Organization` + `WebSite` | name, url, logo, description |
| Producto | `Product` | name, image, description, offers (price, currency, availability) |
| Landing | `WebSite` + `Organization` | name, url, description |
| FAQ | `FAQPage` | mainEntity (question, acceptedAnswer) |

Reglas:
- JSON-LD SIEMPRE como `<script type="application/ld+json">`
- @context siempre `https://schema.org`
- Validar en Google Rich Results Test antes de deployar

Ver templates en [assets/structured-data-templates.tsx](assets/structured-data-templates.tsx).

### Technical SEO — checks obligatorios

| Check | Regla |
|-------|-------|
| robots.txt | Existe en `public/`, permite crawling de storefronts, bloquea `/dashboard/` |
| sitemap.xml | Generado dinámicamente con todas las tiendas públicas |
| URLs limpias | `tiendri.com/{slug}` — semánticas, sin IDs, sin query params |
| HTTPS | Enforced (Vercel lo hace por defecto) |
| Canonical URLs | Evitar contenido duplicado entre rutas |
| next/image | NUNCA `<img>` directo — siempre `next/image` para lazy loading + WebP |
| next/font | Fonts optimizados, display: swap, sin FOUT |
| Alt text | TODA imagen tiene alt descriptivo, no decorativo |
| H1 único | Exactamente UN H1 por página |
| Heading hierarchy | H1 → H2 → H3, sin saltos (no H1 → H3) |

### Storefront SEO — específico de Tiendri

Cada tienda pública en `tiendri.com/{slug}` DEBE tener:

| Elemento | Implementación |
|----------|----------------|
| Title dinámico | `{store.name} — Tiendri` |
| Description dinámica | `store.description` (max 160 chars) |
| OG image | `store.banner` o fallback genérico de Tiendri |
| JSON-LD Organization | name, url, logo, description del negocio |
| JSON-LD Product (por producto) | name, image, price, currency, availability |
| Canonical | `https://tiendri.com/{slug}` |
| H1 | Nombre de la tienda (único) |
| Alt text en productos | `{product.name} — {store.name}` |

### Formato de reporte de auditoría

```markdown
# Auditoría SEO — [Página/Módulo]
**Fecha**: YYYY-MM-DD
**Score**: XX/100 — [Calificación]

## Scores por dimensión
| Dimensión | Score | Estado |
|-----------|-------|--------|
| Metadata | XX/25 | OK/WARN/FAIL |
| Structured Data | XX/20 | OK/WARN/FAIL |
| Contenido | XX/20 | OK/WARN/FAIL |
| Technical | XX/15 | OK/WARN/FAIL |
| Performance | XX/10 | OK/WARN/FAIL |
| Mobile | XX/10 | OK/WARN/FAIL |

## Hallazgos
### [SEO-001] Título del hallazgo
- **Dimensión**: Metadata
- **Impacto**: +X puntos si se corrige
- **Ubicación**: `archivo.tsx:LXXX`
- **Problema**: qué está mal
- **Fix**: cómo corregirlo

## Prioridades (por impacto en score)
1. 🔴 [hallazgo] (+X pts)
2. 🟡 [hallazgo] (+X pts)
3. 🟢 [hallazgo] (+X pts)
```

## Commands

```bash
# Buscar páginas sin metadata
rg "export (const metadata|async function generateMetadata)" app/ --type ts -l

# Buscar <img> que deberían ser next/image
rg "<img " src/ --type tsx

# Buscar H1 duplicados
rg "<h1|<H1" app/ --type tsx -c

# Verificar robots.txt
bat public/robots.txt

# Verificar structured data
rg "application/ld\+json" app/ --type tsx -l

# Buscar imágenes sin alt
rg "<img[^>]*(?!alt=)" src/ --type tsx
```

## Resources

- **Templates**: Ver [assets/](assets/) para structured data, scoring rubric
- **Documentación**: Ver [references/](references/) para docs del proyecto
