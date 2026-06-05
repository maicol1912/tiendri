# Tiendri V2

## Qué es
SaaS para comerciantes colombianos — catálogo online + pedidos via WhatsApp.

## Documentación

Leer ANTES de cualquier tarea:

| Doc | Qué contiene |
|-----|--------------|
| `docs/vision.md` | Qué es Tiendri, problema, solución, target, diferenciador, marca |
| `docs/mvp.md` | Scope del MVP, features, reglas de negocio, flujos UX, pricing |
| `docs/technical.md` | Stack, modelo de datos, schema DB, templates, arquitectura |
| `docs/competitors.md` | Análisis de 5 competidores + oportunidades |
| `docs/merchant-customization.md` | Roadmap de customización por merchant |
| `ai/rules/tiendri-rules.md` | Reglas de negocio, código, errores, seguridad — OBLIGATORIO |

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
- `src/templates/` — sistema de templates (tech-premium implementado)
- `src/templates/registry.ts` — template schema registry (async + sync loaders)
- `src/types/templates/` — contratos globales (TemplateConfig, 5 capas)
- `src/types/domain/` — domain types del dashboard (Category, Subcategory, Product, ActionResult)
- `src/types/store.ts` — tipos compartidos (Product, Category, StoreInfo)
- `src/lib/` — utilidades (resolveTemplateConfig, supabase clients)
- `src/lib/repositories/` — repository pattern: interfaces + localStorage implementations + factory
- `src/lib/validators/` — Zod schemas (category, product, store-customization)
- `src/hooks/` — React hooks: useCategories, useSubcategories, useProducts, useImageUpload
- `src/components/customizer/` — Theme Customizer genérico
- `src/components/dashboard/` — dashboard shell: sidebar, header, breadcrumbs
- `src/components/dashboard/schema-form/` — dynamic form renderer (DynamicField, DynamicSection, RepeatableSection, DynamicTabContent)
- `src/components/shared/` — reusable components: ConfirmDialog, DataTable, EmptyState, SortableList, PriceInput, VariantEditor, StorageIndicator
- `ai/skills/` — skills del proyecto (template-migrator, etc.)
- `ai/rules/` — reglas arquitectónicas
- `docs/` — documentación del producto

## Reglas críticas
- Leer `ai/rules/tiendri-rules.md` antes de cualquier trabajo
- Leer `ai/rules/template-architecture-rules.md` para trabajo con templates
- Templates: `satisfies TemplateConfig`, CSS vars `--t-*`, zero hardcoded colors
- Texto UI en español colombiano
- Conventional commits

## Templates
Solo `tech-premium` implementado. 7+ pendientes de migración.
Usar skill `template-migrator` para nuevas migraciones.

## Template System
Cada template exporta `config.ts` (defaults) + `config-schema.ts` (schema configurable).
El dashboard lee el schema y renderiza forms dinámicamente (modelo Shopify).
Ver `docs/template-system.md` para la guía completa.
Para crear un nuevo template: ver sección "Creating a New Template" en ese doc.

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
| Prompts IA, assets visuales | Steve | `ai/agents/ai-content-specialist.md` |
| Auditorías de seguridad | Diego | `ai/agents/security-analyst.md` |
| Testing, QA | Andrea | `ai/agents/qa-tester.md` |

## Reglas de workflow

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
