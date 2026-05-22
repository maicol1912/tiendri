# Tiendri V2

## Qué es
SaaS para comerciantes colombianos — catálogo online + pedidos via WhatsApp.

## Stack
Next.js 16 (App Router) | React 19 | TypeScript strict | Tailwind v4 | shadcn/ui | Supabase

## Comandos
- `pnpm dev` — dev server
- `npx tsc --noEmit` — type check
- `pnpm build` — build

## Estructura clave
- `src/app/` — rutas (marketing, auth, onboarding, dashboard, template/[name], [slug])
- `src/templates/` — sistema de templates (tech-premium implementado)
- `src/types/templates/` — contratos globales (TemplateConfig, 5 capas)
- `src/types/store.ts` — tipos compartidos (Product, Category, StoreInfo)
- `src/lib/` — utilidades (resolveTemplateConfig, supabase clients)
- `src/components/customizer/` — Theme Customizer genérico
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
