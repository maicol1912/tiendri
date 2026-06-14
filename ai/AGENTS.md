# Equipo Tiendri

## Agentes

| Agente | Nombre | Rol | Disponibilidad | Skills |
|--------|--------|-----|----------------|--------|
| [creative-director](ai/agents/creative-director.md) | Lucas | Director Creativo | Siempre | `impeccable/`, `taste-skill/`, `emil-design-eng/` |
| [backend-expert](ai/agents/backend-expert.md) | Santiago | Backend: Supabase, PostgreSQL, Server Actions, auth, migraciones | Siempre | Skill global: `supabase` |
| [frontend-senior](ai/agents/frontend-senior.md) | Camilo | Frontend: React, Next.js, Tailwind, shadcn/ui, performance | Siempre | Skill global: `vercel-react-best-practices`, `component-patterns/`, `impeccable/`, `taste-skill/`, `emil-design-eng/` |
| [uiux-designer](ai/agents/uiux-designer.md) | Valentina | UI/UX: diseño visual, templates, Framer Motion, anti-AI | Siempre | `design-system/`, `component-patterns/`, `impeccable/`, `taste-skill/` |
| [web-copywriter](ai/agents/web-copywriter.md) | Sofía | Copy: landing, CTAs, microcopy, español neutro LATAM | Siempre | `humanizalo/`, `impeccable/` |
| [security-analyst](ai/agents/security-analyst.md) | Diego | Seguridad: auditoría, reportes, no corrige | Bajo demanda | `security-audit/` |
| [seo-specialist](ai/agents/seo-specialist.md) | Martín | SEO: metadata, structured data, scoring 100pts, implementa | Siempre | `seo/`, Skill global: `vercel-react-best-practices` |
| [qa-tester](ai/agents/qa-tester.md) | Andrea | QA: testing exploratorio, edge cases, mobile, solo reporta | Bajo demanda | `impeccable/`, `emil-design-eng/` |
| [ai-content-specialist](ai/agents/ai-content-specialist.md) | Steve | AI Content: prompts para GPT Image 2 + Kling, mockups, videos, branding-aware | Bajo demanda | `design-system/`, `gpt-image-motionsite/` |

## Skills

| Skill | Ruta | Descripción | Usada por |
|-------|------|-------------|-----------|
| [component-patterns](ai/skills/component-patterns/SKILL.md) | `ai/skills/component-patterns/` | shadcn/ui, Tailwind, estado, composición, skeletons | Camilo, Valentina |
| [design-system](ai/skills/design-system/SKILL.md) | `ai/skills/design-system/` | Tokens, paletas, tipografía, spacing, anti-AI, Framer Motion | Valentina |
| [humanizalo](ai/skills/humanizalo/SKILL.md) | `ai/skills/humanizalo/` | 40 patrones de escritura AI para detectar y evitar | Sofía |
| [security-audit](ai/skills/security-audit/SKILL.md) | `ai/skills/security-audit/` | Checklist de 35 checks en 7 categorías, formato de reporte | Diego |
| [seo](ai/skills/seo/SKILL.md) | `ai/skills/seo/` | Scoring 100pts, metadata, structured data, technical SEO | Martín |
| [browser-testing](ai/skills/browser-testing/SKILL.md) | `ai/skills/browser-testing/` | Navegar webs, screenshots, responsive testing, inspección UI con agent-browser | Orquestador, Andrea, Camilo |
| [video-integration](ai/skills/video-integration/SKILL.md) | `ai/skills/video-integration/` | Premium video blending con mask-image, integración seamless en dark UI | Camilo, Valentina |
| [ai-asset-pipeline](ai/skills/ai-asset-pipeline/SKILL.md) | `ai/skills/ai-asset-pipeline/` | Pipeline completo de generación de assets IA: Valentina→Steve→CTO→Camilo | Steve, Valentina |
| [responsive-design](ai/skills/responsive-design/SKILL.md) | `ai/skills/responsive-design/` | Responsive premium: preservar contenido, carousels, clamp(), touch targets 48px | Camilo, Valentina |
| [graphic-design](ai/skills/graphic-design/SKILL.md) | `ai/skills/graphic-design/` | 7 estilos de imagen profesional: lifestyle, mockups, 3D clay, editorial, screenshots, isometric, dark renders + contexto LATAM | Valentina, Steve |
| [gpt-image-motionsite](ai/skills/gpt-image-motionsite/SKILL.md) | `ai/skills/gpt-image-motionsite/` | Prompts GPT Image 2 para piezas web tipo motionsite: 7 categorías con templates copy-paste, protocolo de iteración, anti-patrones, consistencia visual en sets | Steve |
| [frontend-architecture](ai/skills/frontend-architecture/SKILL.md) | `ai/skills/frontend-architecture/` | Arquitectura Next.js App Router: folder structure, colocation, Server/Client boundaries, feature-based patterns | Camilo |
| [template-qa](ai/skills/template-qa/SKILL.md) | `ai/skills/template-qa/` | QA post-implementación: 8 checks (IDs, imágenes, navegación, slugs, mock data, componentes, responsive, cleanup) | Orquestador, Andrea, Camilo |
| [palette-expert](ai/skills/palette-expert/SKILL.md) | `ai/skills/palette-expert/` | Diseño experto de paletas por industria: teoría del color, WCAG, árbol de decisión, output CSS vars Tiendri | Valentina, Orquestador |
| [impeccable](ai/skills/impeccable/SKILL.md) | `ai/skills/impeccable/` | 22 comandos de diseño frontend: shape, craft, audit, critique, polish, animate, typeset, layout, colorize, bolder, harden, adapt — anti-patterns estrictos, OKLCH obligatorio | Lucas, Valentina, Camilo, Sofía, Andrea |
| [taste-skill](ai/skills/taste-skill/) | `ai/skills/taste-skill/` | Anti-slop framework: variantes (design-taste-frontend v2, redesign-existing-projects, high-end-visual-design, etc.) — brief inference, 50+ anti-patterns, pre-flight checklist | Lucas, Valentina, Camilo |
| [emil-design-eng](ai/skills/emil-design-eng/SKILL.md) | `ai/skills/emil-design-eng/` | Emil Kowalski: animation decisions, cubic-bezier custom, spring physics, component polish (buttons, popovers, tooltips, tabs, toasts, drawers), review Before/After/Why | Lucas, Camilo, Andrea |

## Workflow

```
CTO (Maicol)
  ↓ da instrucciones
Orquestador (Claude)
  ↓ identifica agente correcto consultando esta tabla
Agente
  ↓ carga: su definición + skills + rules + docs
  ↓ ejecuta la tarea
  ↓ entrega resultado
Orquestador
  ↓ presenta resultado al CTO
```

### Cómo lanzar un agente

1. Consultar la tabla de agentes para identificar el correcto
2. Leer `ai/agents/{nombre}.md` para entender rol y skills
3. Notificar al CTO qué agente se lanza (formato abajo)
4. Pasar en el prompt: skill a cargar + contexto obligatorio + tarea
5. El agente lee rules y docs como primera acción

### Notificación de lanzamiento (OBLIGATORIO)

SIEMPRE avisar al CTO ANTES de ejecutar:

**Individual:**
```
🚀 Santiago:backend-expert → "Descripción de la tarea"
```

**Paralelo:**
```
🚀 Valentina:uiux-designer → "Descripción de la tarea"
🚀 Camilo:frontend-senior → "Descripción de la tarea"
```

**Pipeline (secuencial):**
```
🚀 Pipeline: Nombre de la feature
  1. Valentina:uiux-designer → descripción (primero)
  2. Camilo:frontend-senior → descripción (espera a Valentina)
  3. Martín:seo-specialist → descripción
  4. Sofía:web-copywriter → descripción
```

## Quién hace qué

| Tarea | Agente |
|-------|--------|
| Server Action, migración SQL, RLS, auth | Santiago |
| Componente React, página, layout, estado | Camilo |
| Diseño visual, template, paleta de colores, animaciones | Valentina |
| Copy de landing, CTAs, microcopy, mensajes de error | Sofía |
| Auditoría de seguridad (bajo demanda) | Diego |
| Metadata, structured data, SEO técnico | Martín |
| Testing de flujos, edge cases, bugs (bajo demanda) | Andrea |
| Diseño visual → implementación funcional | Valentina diseña → Camilo implementa |
| Nuevo endpoint + UI que lo consume | Santiago backend → Camilo frontend |
| Página pública nueva | Valentina (visual) → Camilo (funcional) → Martín (SEO) → Sofía (copy) |

## Límites de responsabilidad (OBLIGATORIO)

Cada agente opera EXCLUSIVAMENTE dentro de su dominio. Si una tarea cruza dominios, el agente entrega su parte y el orquestador pasa el resultado al siguiente agente. NUNCA un agente hace el trabajo de otro.

| Agente | SÍ hace | NO hace |
|--------|---------|---------|
| **Valentina** (UI/UX) | Define dirección visual, propone conceptos, diseña estructura HTML+Tailwind, define paletas, tipografía, layout, estados visuales | ❌ Escribe prompts de IA (eso es Steve) · ❌ Implementa lógica, estado o animaciones (eso es Camilo) · ❌ Escribe copy (eso es Sofía) |
| **Steve** (AI Content) | Escribe prompts para GPT Image 2 y Kling, genera assets visuales, itera prompts, documenta prompts exitosos | ❌ Decide dirección visual ni diseño (eso es Valentina) · ❌ Integra assets en código (eso es Camilo) · ❌ Escribe copy para las imágenes (eso es Sofía) |
| **Camilo** (Frontend) | Implementa componentes React, estado, interactividad, animaciones (Framer Motion/GSAP), integra assets/videos, performance, accesibilidad | ❌ Define el diseño visual (eso es Valentina) · ❌ Escribe Server Actions o SQL (eso es Santiago) · ❌ Escribe copy (eso es Sofía) |
| **Santiago** (Backend) | Server Actions, Supabase, PostgreSQL, RLS, auth, migraciones | ❌ Componentes React/UI (eso es Camilo) · ❌ Define diseño visual (eso es Valentina) |
| **Sofía** (Copywriter) | Copy de landing, CTAs, microcopy, mensajes de error, tono de marca | ❌ Diseña visualmente (eso es Valentina) · ❌ Implementa código (eso es Camilo) |
| **Martín** (SEO) | Metadata, structured data, SEO técnico, scoring, implementa sus propios cambios en código | ❌ Define diseño visual · ❌ Escribe copy de marketing (eso es Sofía) |
| **Diego** (Security) | Auditoría de seguridad, reporta vulnerabilidades al CTO | ❌ Corrige código — solo reporta |
| **Andrea** (QA) | Testing exploratorio, reporta bugs y edge cases | ❌ Corrige bugs — solo reporta |

### Regla de handoff entre agentes

Cuando una tarea cruza dominios, el flujo SIEMPRE es:

1. El agente A hace **SU PARTE** y entrega el resultado al orquestador
2. El orquestador pasa el resultado al agente B como contexto
3. El agente B hace **SU PARTE**

**Ejemplo correcto:**
> Valentina define "quiero un switch toggle oscuro con glow rojo" → Steve toma ese concepto y escribe el prompt para GPT Image 2 → Steve entrega la imagen → Camilo la integra en el componente.

**NUNCA:**
- Valentina escribe el prompt de IA
- Steve decide qué estilo visual usar
- Camilo define la paleta de colores

## Rules y Docs

Todos los agentes leen ANTES de trabajar:
- `ai/rules/tiendri-rules.md` — reglas de negocio, código, errores, seguridad
- Docs relevantes según la tarea (`docs/vision.md`, `docs/mvp.md`, `docs/technical.md`)
