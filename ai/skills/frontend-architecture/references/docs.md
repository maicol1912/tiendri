# Referencias

- **Next.js App Router docs**: Skill global `vercel-react-best-practices`
- **Component patterns**: `ai/skills/component-patterns/SKILL.md`
- **Supabase integration**: Skills globales `supabase` + `supabase-postgres-best-practices`
- **Design system**: `ai/skills/design-system/SKILL.md`
- **Project technical docs**: `docs/technical.md`
- **MVP scope**: `docs/mvp.md`

## Estructura actual del proyecto

| Ruta | Que contiene |
|------|-------------|
| `src/app/(landing)/` | Route group landing — page.tsx + components/ (Navbar, Hero, HowItWorks, etc.) |
| `src/app/(landing)/components/` | Secciones de la landing colocadas con su ruta (NO en src/components/) |
| `src/app/(auth)/auth/` | Route group auth — page.tsx + layout.tsx + components/ |
| `src/app/(auth)/auth/components/` | Auth components (AuthSplitScreen, LoginForm, RegisterForm, ConfirmEmail, VisualPanel) |
| `src/components/ui/` | Primitivos base (button, skeleton) — usados en 2+ route groups |
| `src/components/common/` | Componentes app-wide compartidos (Logo, Spinner, EmptyState) |
| `src/app/globals.css` | Tailwind config + CSS variables + tokens |
| `src/app/layout.tsx` | Root layout con fonts |

## Proximas carpetas a crear

| Feature | Ruta esperada |
|---------|--------------|
| Dashboard | `src/app/(dashboard)/dashboard/` + `components/` |
| Storefront publico | `src/app/(storefront)/store/[slug]/` + `components/` |
| Server Actions | `src/actions/{domain}/` |
| Shared hooks | `src/hooks/` |
| Shared types | `src/types/` |
| Validaciones Zod | `src/lib/validations/` |
