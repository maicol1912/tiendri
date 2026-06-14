# Skill Registry — Tiendri V2

Índice central de todas las skills disponibles. Antes de cargar una skill, consultá esta tabla.
**Total indexado:** 19 skills + 9 sub-skills bajo `taste-skill/` = 28 skills locales + 8 skills globales.

---

## Skills Globales (instaladas en ~/.claude/skills/)

Estas skills son mantenidas por los equipos oficiales y se actualizan automáticamente.

| Skill | Fuente | Installs | Reemplaza |
|-------|--------|----------|-----------|
| `supabase` | supabase/agent-skills | 120K | Custom supabase/ |
| `supabase-postgres-best-practices` | supabase/agent-skills | 229K | — |
| `vercel-react-best-practices` | vercel-labs/agent-skills | 474K | Custom nextjs/ |
| `figma-use` | figma/mcp-server-guide | 3.9K | Custom figma-mcp/ |
| `implement-design` | figma/mcp-server-guide | 5.9K | — |
| `accessibility` | addyosmani/web-quality-skills | 28K | — (nuevo) |
| `performance` | addyosmani/web-quality-skills | 16.6K | — (nuevo) |
| `webapp-testing` | anthropics/skills | 94.9K | — (nuevo) |

---

## Cómo usar

1. Identificá tu tarea en la **Tabla de Decisión**
2. Cargá SOLO las skills que aplican al agente que va a ejecutar
3. Las skills de categorías `Workflow & Tooling` se cargan siempre para commits y convenciones
4. Cada SKILL.md tiene los detalles — este README es solo el índice de entrada rápida

---

## Skills por Categoría

### Frontend & Componentes

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| vercel-react-best-practices | Skill global | App Router, Server/Client split, layouts, metadata, ISR, middleware | Crear o modificar páginas, layouts, rutas en Next.js |
| frontend-architecture | `ai/skills/frontend-architecture/` | Estructura de carpetas, organización de features, Server/Client boundaries, patrones de componentes Tiendri (CSS vars de tienda, StoreContext, Sonner, estados obligatorios, Optimistic Updates) | Nueva página, feature module, decisión de dónde va un archivo, o crear/modificar cualquier componente UI |
| responsive-design | `ai/skills/responsive-design/` | Layouts responsivos premium que preservan contenido desktop en mobile | Implementar responsive, adaptar layouts, revisar mobile behavior |

### Diseño & Visual

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| design-system | `ai/skills/design-system/` | Tokens de diseño, paleta Ember Core, tipografía, spacing, anti-patterns AI | Diseñar o revisar componentes, templates, paletas |
| palette-expert | `ai/skills/palette-expert/` | Diseño experto de paletas de color por industria con output CSS vars, integración técnica de tokens en templates, migración de hardcoded colors | Crear paleta para template nuevo, auditar contraste, migrar paleta, diseñar por industria, evaluar con criterio de diseñador senior |
| graphic-design | `ai/skills/graphic-design/` | Generación de imágenes premium en 7 estilos (lifestyle, 3D clay, etc.) | Proponer o generar cualquier asset visual para la plataforma |
| impeccable | `ai/skills/impeccable/` | Critique, audit y polish de UI: jerarquía, tipografía, color, motion, copy | Rediseñar, auditar, o elevar la calidad de cualquier interfaz |
| stitch-design-taste | `ai/skills/stitch-design-taste/` | Genera DESIGN.md para Google Stitch: tipografía, color, layout y comportamientos para pantallas IA | Generar design system para Google Stitch |

### Animación & Motion

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| emil-design-eng | `ai/skills/emil-design-eng/` | Filosofía Emil Kowalski: polish de UI, decisiones de animación, detalles invisibles | Implementar animaciones, decidir si algo necesita motion, polish fino |

### Backend & Database

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| supabase | Skill global | Server Actions, RLS, Storage, migraciones SQL, auth en Tiendri | Tocar base de datos, auth, storage, o Server Actions |
| supabase-postgres-best-practices | Skill global | Best practices de PostgreSQL con Supabase | Cualquier trabajo con la DB |
| security-audit | `ai/skills/security-audit/` | Checklist de seguridad web para Supabase + Next.js + multi-tenancy | Auditar feature nueva, revisar seguridad de módulo, pre-deploy |

### Templates & Storefront

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| template-qa | `ai/skills/template-qa/` | QA post-implementación: mock data, imágenes, routing, fidelidad visual — PASS/FAIL | Después de implementar o modificar un storefront template |
| palette-expert | `ai/skills/palette-expert/` | (ver Diseño & Visual) | — |

### Assets & Media

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| ai-asset-pipeline | `ai/skills/ai-asset-pipeline/` | Workflow completo para generar imágenes y videos con IA (GPT Image 2, Kling, Seedance) | Generar cualquier asset visual con IA para la plataforma |
| gpt-image-motionsite | `ai/skills/gpt-image-motionsite/` | Prompts GPT Image 2 para piezas web tipo motionsite: hero sections, 3D clay/cartoon, product showcases, backgrounds, editoriales LATAM, isométricos, sets de íconos | Crear prompts para GPT Image 2, generar assets visuales, hero images, ilustraciones 3D clay |
| video-integration | `ai/skills/video-integration/` | Integración premium de videos en dark UI con CSS mask-image (efecto transparente) | Integrar video AI-generado en cualquier página |
| figma-use | Skill global | Workflow de extracción de Figma via MCP: tools, asset bank, design-to-code | Extraer diseños de Figma, construir asset bank, usar Figma MCP tools |
| implement-design | Skill global | Implementar diseños extraídos de Figma en código | Traducir diseño Figma a componentes React |

### SEO & Contenido

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| seo | `ai/skills/seo/` | Auditoría e implementación SEO: scoring 100pts, metadata, structured data, technical SEO | Implementar o auditar SEO en páginas, storefronts, landings |
| humanizalo | `ai/skills/humanizalo/` | Detecta y elimina 40 tells de escritura AI, scoring 6 dimensiones, loop de auto-audit | Editar o revisar cualquier texto para que suene humano |

### Workflow & Tooling

| Skill | Path | Qué hace | Trigger |
|-------|------|----------|---------|
| agent-browser | `ai/skills/agent-browser/` | Automatización de browser via CLI: navegación, screenshots, scraping, testing web | Ver una página en el browser, tomar screenshots, verificar UI en vivo |
| browser-testing | `ai/skills/browser-testing/` | Navegar sitios, tomar screenshots, inspeccionar UI, testear flujos con agent-browser | Ver cómo se ve la landing, verificar responsive, inspeccionar sitio referencia |

---

## Tabla de Decisión

| Necesito... | Skill a cargar |
|-------------|----------------|
| Crear un componente React | `frontend-architecture/` |
| Decidir Server vs Client Component | Skill global: `vercel-react-best-practices` |
| Implementar responsive / mobile | `responsive-design/` |
| Diseñar estructura de carpetas o feature module | `frontend-architecture/` |
| Trabajar con paleta de colores o tokens | `design-system/` + `palette-expert/` |
| Diseñar paleta de colores para template | `palette-expert/` |
| Auditar o rediseñar una interfaz | `impeccable/` |
| Implementar animaciones con polish | `emil-design-eng/` |
| Generar imágenes o videos con IA | `ai-asset-pipeline/` + `graphic-design/` |
| Crear prompts para GPT Image 2 | `gpt-image-motionsite/` |
| Integrar un video en una página dark | `video-integration/` |
| Extraer diseños de Figma | Skill global: `figma-use` |
| Implementar diseño Figma en código | Skill global: `implement-design` |
| Crear un nuevo storefront template | `palette-expert/` + Skill global: `figma-use` |
| QA de un template terminado | `template-qa/` |
| Trabajar con Supabase (DB, auth, storage) | Skill global: `supabase` + `supabase-postgres-best-practices` |
| Auditar seguridad antes de deploy | `security-audit/` |
| Implementar o auditar SEO | `seo/` |
| Escribir o revisar texto (cualquiera) | `humanizalo/` |
| Ver una página en browser / tomar screenshot | `agent-browser/` o `browser-testing/` |
| Rediseñar un proyecto existente | `taste-skill/redesign-existing-projects/` + `impeccable/` |
| Generar design system para Google Stitch | `stitch-design-taste/` |

---

## taste-skill/ (Sub-skills de diseño avanzado)

Sub-skills especializadas en dirección creativa. Se cargan bajo demanda según el estilo o contexto requerido.

| Skill | Path | Estado | Qué hace |
|-------|------|--------|----------|
| design-taste-frontend | `taste-skill/design-taste-frontend/` | ✅ ACTIVA (v2 — default) | Anti-slop frontend skill para landings, portfolios y redesigns — lee el brief, infiere dirección |
| design-taste-frontend-v1 | `taste-skill/_archived/design-taste-frontend-v1/` | ⚠️ LEGACY (v1 — backward compat) | Versión original con dials configurables (DESIGN_VARIANCE, MOTION_INTENSITY, VISUAL_DENSITY) |
| high-end-visual-design | `taste-skill/high-end-visual-design/` | ✅ ACTIVA | Diseño nivel agencia $150k+, fuentes premium, Apple-esque, micro-interacciones, varianza forzada |
| redesign-existing-projects | `taste-skill/redesign-existing-projects/` | ✅ ACTIVA | Audita y mejora diseños existentes sin reescribir desde cero — elimina patterns genéricos de IA |

---

## Dependencias entre Skills

- **`template-qa`** se ejecuta como paso de validación post-implementación de templates
- **`ai-asset-pipeline`** puede combinarse con `video-integration/` (primero se genera el video, luego se integra)
- **`browser-testing`** y **`agent-browser`** son complementarias — `agent-browser` es la herramienta CLI, `browser-testing` es el workflow para usarla en Tiendri
- **`taste-skill/design-taste-frontend`** es el sucesor de `design-taste-frontend-v1` — usar v2 por defecto salvo que necesites comportamiento exacto de v1
- **`impeccable`** + **`taste-skill/redesign-existing-projects`** se combinan para redesigns completos
- **`humanizalo`** aplica a TODO texto antes de entregar copy al usuario final

---

## Notas de Indexación

- `agent-browser` tiene `hidden: true` — no aparece en autocomplete pero es completamente funcional
- `browser-testing` y `agent-browser` son skills separadas pero muy relacionadas; `browser-testing` es el contexto Tiendri sobre `agent-browser`
- `palette-expert` aparece en dos categorías (Diseño y Templates) — es cross-domain, cubre tanto diseño como integración técnica
- `taste-skill/design-taste-frontend-v1` está marcada como LEGACY solo para backward compat; `design-taste-frontend` (v2) es el default
