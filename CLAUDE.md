# Tiendri V2

## Qué es
SaaS para comerciantes colombianos — catálogo online + pedidos via WhatsApp.

## Documentación

Leer ANTES de cualquier tarea:

| Doc | Qué contiene |
|-----|-------------|
| `docs/product.md` | Visión, público objetivo, scope MVP, competidores, marca |
| `docs/technical.md` | Stack, arquitectura, modelo de datos, utilidades compartidas |
| `docs/template-system.md` | Anatomía de un template, registry, flujo de resolución |
| `docs/preset-system.md` | Paletas por template, sistema de color |
| `docs/composable-sections.md` | 7 variant slots, 31 variantes, 12 section renderers, SECTION_REGISTRY |
| `docs/onboarding.md` | Wizard 5 pasos, vibes, tour guiado |
| `docs/css-variables.md` | Grupos de CSS vars --t-*, generación, consumo |
| `docs/dashboard.md` | Rutas, shell, sistema de configuración schema-driven |
| `ai/rules/tiendri-rules.md` | Reglas de negocio, código, errores, seguridad — OBLIGATORIO |
| `docs/phase-3-roadmap.md` | Roadmap Fase 3: Supabase real data, escalabilidad, SEO avanzado |

## Stack
Next.js 16 (App Router) | React 19 | TypeScript strict | Tailwind v4 | shadcn/ui | Supabase | Deploy: Vercel (auto-deploy on push to main)

## Comandos
- `pnpm dev` — dev server
- `npx tsc --noEmit` — type check
- `pnpm build` — build

## Git
- Ramas: `develop` (trabajo diario) → `main` (producción)
- Push a `main` = deploy automático en Vercel
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Nunca force push, nunca skip hooks

## Estructura clave
- `src/app/` — rutas (marketing, auth, onboarding, dashboard, template/[name], [slug])
- `src/app/(dashboard)/_hooks/` — hooks del dashboard (useRepositories, useMediaLibrary, useImageUpload, useDashboardTour)
- `src/catalog/` — motor de resolución de templates (resolveTemplateConfig, buildCssVars, getStoreBySlug)
- `src/components/ui/` — primitivas shadcn/ui
- `src/components/shared/` — componentes reutilizables: ConfirmDialog, DataTable, EmptyState, SortableList, PriceInput, VariantEditor
- `src/components/dashboard/` — dashboard shell: sidebar, header, breadcrumbs
- `src/components/dashboard/schema-form/` — dynamic form renderer (DynamicField, DynamicSection, RepeatableSection, DynamicTabContent)
- `src/components/customizer/` — Theme Customizer genérico
- `src/components/onboarding/` — wizard step components
- `src/infrastructure/supabase/` — Supabase clients (client, server, middleware)
- `src/infrastructure/repositories/` — repository pattern: interfaces + localStorage implementations + factory
- `src/infrastructure/database.types.ts` — tipos generados de Supabase
- `src/onboarding/` — onboarding provider, vibes, first-time utils, tour steps
- `src/shared/format.ts` — formatPrice, formatPriceCurrency
- `src/shared/validators/` — Zod schemas (category, product, store-customization)
- `src/shared/seo/` — SEO utilities (safe-json-ld, metadata, json-ld)
- `src/shared/fonts.ts` — font configuration
- `src/shared/utils.ts` — utilidades generales (cn)
- `src/storefront/` — runtime del storefront (whatsapp, formatWhatsAppMessage, adapters/)
- `src/templates/` — sistema de templates (8 implementados)
- `src/templates/_shared/` — utils/, hooks/, components/, style-maps.ts compartidos entre templates
- `src/templates/_variants/` — 7 slot registries con 31 variantes (header, hero, product-card, footer, bottom-nav, category-nav, search-bar)
- `src/templates/_core/sections/` — 12 section renderers + SECTION_REGISTRY con dispatch dinámico
- `src/templates/_core/cart/` — CartProvider unificado, useCart, CartItem canónico
- `src/templates/registry.ts` — template registry (async loaders)
- `src/types/templates/` — contratos globales (TemplateConfig, 5 capas, SectionId union)
- `src/types/domain/` — domain types (Category, Subcategory, Product, Store, Cart, ActionResult, UIProductVariant)
- `ai/skills/` — skills del proyecto (ver `ai/skills/README.md`)
- `ai/rules/` — reglas arquitectónicas
- `docs/` — documentación del producto

## Reglas críticas
- **NUNCA usar el tool `Workflow`** — prohibido para TODO (lectura y escritura). Consume demasiados tokens y los agentes paralelos sobreescriben cambios entre sí. Usar agentes individuales (`Agent` tool) en su lugar: secuenciales para ediciones, o paralelos SOLO si tocan archivos estrictamente no-solapados. Siempre VERIFICAR que los cambios se aplicaron después de que un agente termine.
- Leer `ai/rules/tiendri-rules.md` antes de cualquier trabajo
- Leer `ai/rules/template-architecture-rules.md` para trabajo con templates
- Templates: `satisfies TemplateManifest`, CSS vars `--t-*`, zero hardcoded colors
- Secciones composables: 7 variant slots en `_variants/` (header, hero, product-card, footer, bottom-nav, category-nav, search-bar) con 31 variantes + 12 section renderers en `_core/sections/` con dispatch dinámico por SECTION_REGISTRY
- Paletas de color por template definidas en palettes.ts
- Texto UI en español colombiano
- Conventional commits

## Skill Router

Tabla rápida para el orchestrator. Consultar ANTES de lanzar cualquier agente.

### Skills Locales (proyecto)

| Necesito... | Skill | Path |
|-------------|-------|------|
| Crear componente React, estructura de archivos | frontend-architecture | `ai/skills/frontend-architecture/` |
| Responsive, breakpoints, mobile-first | responsive-design | `ai/skills/responsive-design/` |
| Tokens, paleta Ember Core, anti-patterns AI | design-system | `ai/skills/design-system/` |
| Diseñar paleta por industria, migrar colores | palette-expert | `ai/skills/palette-expert/` |
| Audit y polish de UI, jerarquía, tipografía | impeccable | `ai/skills/impeccable/` |
| Filosofía de animación, polish fino | emil-design-eng | `ai/skills/emil-design-eng/` |
| Prompts GPT Image 2 (hero, 3D clay, editorial) | gpt-image-motionsite | `ai/skills/gpt-image-motionsite/` |
| Workflow completo IA: imagen + video | ai-asset-pipeline | `ai/skills/ai-asset-pipeline/` |
| Integrar video en dark UI con CSS mask | video-integration | `ai/skills/video-integration/` |
| Generación de imágenes en 7 estilos | graphic-design | `ai/skills/graphic-design/` |
| Screenshots para App Store / Google Play, marketing de apps | app-store-screenshots | `ai/skills/app-store-screenshots/` |
| DESIGN.md para Google Stitch | stitch-design-taste | `ai/skills/stitch-design-taste/` |
| SEO: scoring, metadata, structured data | seo | `ai/skills/seo/` |
| Auditoría de seguridad pre-deploy | security-audit | `ai/skills/security-audit/` |
| QA post-implementación de template | template-qa | `ai/skills/template-qa/` |
| Browser automation, screenshots CLI | agent-browser | `ai/skills/agent-browser/` |
| Workflow browser testing Tiendri | browser-testing | `ai/skills/browser-testing/` |
| Detectar y eliminar tells de escritura AI | humanizalo | `ai/skills/humanizalo/` |

### taste-skill/ — Dirección Creativa (sub-skills)

| Necesito... | Skill | Path |
|-------------|-------|------|
| Anti-slop, landings, redesigns | design-taste-frontend | `ai/skills/taste-skill/design-taste-frontend/` |
| Diseño nivel agencia $150k+, Apple-esque | high-end-visual-design | `ai/skills/taste-skill/high-end-visual-design/` |
| Auditar y mejorar diseño existente | redesign-existing-projects | `ai/skills/taste-skill/redesign-existing-projects/` |

### Skills Globales

| Necesito... | Skill global |
|-------------|-------------|
| Next.js App Router, Server/Client, ISR | `vercel-react-best-practices` |
| Supabase, Server Actions, RLS, Storage | `supabase` |
| PostgreSQL best practices | `supabase-postgres-best-practices` |
| Extraer diseños de Figma via MCP | `figma-use` |
| Implementar diseño Figma en código | `implement-design` |
| Accesibilidad WCAG 2.2 | `accessibility` |
| Performance web, Core Web Vitals | `performance` |
| Testing con Playwright | `webapp-testing` |

## Templates
8 templates implementados: tech-premium, fashion, furniture-dark, furniture-light, beauty-soft, beauty-elegant, decor-warm, food-night.

## Template System
Cada template exporta `config.ts` (defaults) + `config-schema.ts` (schema configurable) + `palettes.ts` (paletas de color) + `ui-config.ts` (configuración de UI por template).
El dashboard lee el schema y renderiza forms dinámicamente (modelo Shopify).
Ver `docs/template-system.md` para la guía completa.

## Equipo

Equipo de agentes definido en `ai/AGENTS.md`. Consultar para: tabla de agentes, skills, workflow, límites de responsabilidad, handoffs.

### Specialist ownership

| Dominio | Agente | Archivo |
|---------|--------|---------|
| Dirección creativa, briefs, anti-slop, review visual | Lucas | `ai/agents/creative-director.md` |
| UI/UX, paletas, tipografía | Valentina | `ai/agents/uiux-designer.md` |
| Frontend, animaciones, componentes | Camilo | `ai/agents/frontend-senior.md` |
| Backend, DB, Server Actions | Santiago | `ai/agents/backend-expert.md` |
| Copy, CTAs, microcopy | Sofía | `ai/agents/web-copywriter.md` |
| SEO, metadata, structured data | Martín | `ai/agents/seo-specialist.md` |
| Prompts IA, assets visuales, screenshots App Store / Play Store | Steve | `ai/agents/ai-content-specialist.md` |
| Auditorías de seguridad | Diego | `ai/agents/security-analyst.md` |
| Testing, QA | Andrea | `ai/agents/qa-tester.md` |

## Reglas de workflow

### Protocolo de lanzamiento de agentes (OBLIGATORIO)
Antes de cada `Agent()` call, seguir el checklist de `ai/rules/agent-launch-protocol.md`. Un sub-agente arranca con CERO contexto — si el prompt es incompleto, el resultado es deficiente.

### Rol de Lucas — Director Creativo (OBLIGATORIO)
- **Lucas** = DIRECCIÓN: briefs creativos, anti-slop validation, review visual, scoring final.
- Lucas DIRIGE a Valentina, Camilo, Sofía y Andrea. NO diseña, NO codea, NO escribe copy.
- Para trabajo visual significativo (templates, redesigns, landings): Lucas genera brief → CTO aprueba → equipo ejecuta.
- Lucas valida output con: impeccable (audit/critique), taste-skill (AI Slop Test), emil-design-eng (animaciones).

### Separación Valentina ↔ Camilo (OBLIGATORIO)
- **Valentina** = VISUAL: HTML + Tailwind + CSS variables. CERO lógica, CERO estado, CERO Framer Motion code.
- **Camilo** = FUNCIONAL: toma lo visual y agrega estado, interactividad, animaciones, accesibilidad, performance, Server/Client split.
- Valentina DESCRIBE animaciones. Camilo las IMPLEMENTA.
- Si Valentina entrega código con useState, useEffect o event handlers complejos → está MAL.

### Discusión previa al diseño (OBLIGATORIO)
Para decisiones de DISEÑO visual (paleta, tipografía, estilo, estructura de página):
1. El agente PROPONE opciones al CTO
2. El CTO APRUEBA, ajusta o rechaza
3. RECIÉN DESPUÉS el agente implementa

### Output a tmp/ (OBLIGATORIO)
Todo draft, output intermedio o exploratorio va a `tmp/`. Nunca directo a `ai/`, `docs/`, `public/`, o `src/`. Solo el CTO decide qué se promueve a su ubicación final.

### Validación browser (features grandes)
Para features que tocan UI de forma significativa (nuevas páginas, refactors visuales, migraciones de template):
- Usar `ai/skills/agent-browser/` para verificar renderizado y funcionalidad
- `tsc --noEmit` verifica tipos, NO renderizado — ambos son necesarios
- Screenshots en mobile (375px) y desktop (1440px) como evidencia
- Camilo: Golden Path completo + CERO errores de consola JS
- Valentina: todos los elementos visuales se ven como el design system define
- NO aplica para: bug fixes chicos, cambios de config, refactors de tipos, docs

### Replicación de diseños Figma (OBLIGATORIO)
Cuando se replica un diseño de Figma, el resultado debe ser IDÉNTICO al original — no "inspirado en", IGUALADO a:

**Extracción de assets:**
- Usar `get_design_context` en nodos individuales de imagen para obtener URLs de descarga
- Drill into: product cards, category cards, hero banners, avatars, íconos decorativos
- Descargar CADA imagen individualmente
- Guardar en `public/templates/{template-name}/`

**Anti-patterns:**
- Descargar screenshots de pantallas completas → MAL
- Usar URLs de Unsplash/placeholder → MAL
- Igualar solo layout/colores sin imágenes → MAL
- "Inspirado en" en vez de "igualado a" → MAL

**Checklist de fidelidad:**
- Colores: hex exactos del Figma
- Tipografía: familia, tamaños, pesos del Figma
- Layout: misma estructura de pantallas
- Spacing: padding, margins, gaps del Figma
- Imágenes: TODAS descargadas del Figma como assets individuales
- Textos: nombres de productos, precios, descripciones del Figma
