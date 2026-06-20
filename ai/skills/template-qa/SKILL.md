---
name: template-qa
description: >
  Post-implementation QA for storefront templates. Validates mock data consistency across routes,
  image references, navigation, routing, and visual fidelity. Produces a PASS/FAIL checklist report.
  Trigger: After implementing or modifying a storefront template, before delivering to CTO,
  or when asked to validate/QA a template.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- After implementing a new storefront template
- After modifying an existing template (images, layout, data)
- Before reporting a template as "done" to the CTO
- When debugging template issues (404s, broken images, inconsistent data)
- When the CTO asks to validate or QA a template

## Critical Patterns

### 1. Template Architecture (Manifest-Based)

Templates NO tienen archivos `page.tsx` propios bajo `app/`. La arquitectura es:

```
Entry points:
  src/app/template/[templateName]/page.tsx   # Preview del template (CTO/dev)
  src/app/[slug]/page.tsx                    # Storefront público (cliente final)

Rendering pipeline:
  TemplateLayout → shells → CoreHomePage → SECTION_REGISTRY (dispatch dinámico)

Mock data (por template):
  src/templates/{name}/mock/data.ts          # Productos, categorías, store info
  src/templates/{name}/mock/assets.ts        # Rutas de imágenes
```

**NO** existen `src/app/(storefront)/store/[slug]/{template}/page.tsx` ni carpetas por template bajo `app/`. Un único `TemplateLayout` renderiza todos los templates via `manifest.ts`.

### 2. Variant Slots y SECTION_REGISTRY

- **12 variant slots** en `src/templates/_variants/` (header, hero, product-card, footer, bottom-nav, category-nav, search-bar, y otros)
- **SECTION_REGISTRY** en `src/templates/_core/sections/index.ts` hace dispatch dinámico sobre `config.sections`
- Cada section en `config.sections` tiene un `id` que mapea a un dispatcher en `SECTION_REGISTRY`
- CSS vars generadas por `buildCssVars` se inyectan en `.template-scope` del layout

### 3. The 8-Check QA Protocol

Run ALL checks in order. Report PASS/FAIL for each with specific file:line for failures.

## QA Checks

### Check 1: Registry Registration

**What**: Template must be registered in both loaders — si falta alguno, no renderiza.

**How**:
```bash
# Verify SCHEMA_LOADERS and CONFIG_LOADERS entries
rg "{template-name}" src/templates/registry.ts -n --no-heading

# Verify MOCK_LOADERS entry
rg "{template-name}" src/templates/mock-loader.ts -n --no-heading
```

**Pass**: Template aparece en `SCHEMA_LOADERS`, `CONFIG_LOADERS` (registry.ts) y `MOCK_LOADERS` (mock-loader.ts).
**Fail**: Falta cualquier entrada → template no carga o tira error en runtime.

### Check 2: Manifest Integrity

**What**: `manifest.ts` debe exportar un objeto válido con `satisfies TemplateManifest`, con todas las secciones referenciadas en `config.sections` y todos los variant slots declarados.

**How**:
```bash
# Verify manifest exports
rg "satisfies TemplateManifest" src/templates/{template}/manifest.ts -n

# Check section IDs match SECTION_REGISTRY keys
rg "id:" src/templates/{template}/manifest.ts -n --no-heading
rg "export const SECTION_REGISTRY" src/templates/_core/sections/index.ts -n
```

**Pass**: `satisfies TemplateManifest` presente; todos los `section.id` de `config.sections` existen como keys en `SECTION_REGISTRY`.
**Fail**: Section ID sin dispatcher → `CoreHomePage` la silencia o tira warning.

### Check 3: Variant Slots Dispatch

**What**: Todos los 12 variant slots (`header`, `hero`, `product-card`, `footer`, `bottom-nav`, `category-nav`, `search-bar`, y los demás) deben resolverse correctamente para el template.

**How**:
1. Leer el `manifest.ts` para ver qué variantes declara cada slot
2. Verificar que esas variantes existen en `src/templates/_variants/{slot}/`
3. Verificar que el shell/layout del template importa y usa los variant components correctos

**Pass**: Todos los slots declarados en el manifest resuelven a un componente existente en `_variants/`.
**Fail**: Variante declarada pero no implementada → render vacío o crash.

### Check 4: Image Reference Validation

**What**: Every image path referenced in mock data or assets must point to an existing file >5KB.

**How**:
```bash
# Extract all image paths for this template from mock/assets.ts
rg "/templates/{template}/" src/templates/{template}/mock/ -o --no-heading | sort -u

# For each path, verify file exists in public/ and check size
# Files <5KB are likely corrupted or placeholder
```

**Pass**: All referenced images exist under `public/`, all >5KB.
**Fail**: Missing file, or file <5KB (corrupted).

### Check 5: CSS Variables Coverage

**What**: Las CSS vars generadas por `buildCssVars` para este template deben ser consumidas por los componentes. No debe haber colores hex hardcodeados.

**How**:
```bash
# Check for hardcoded hex colors in template components
rg "#[0-9a-fA-F]{3,6}" src/templates/{template}/ -n --no-heading

# Verify CSS vars are prefixed --t-* (not --store-* or --tp-*)
rg "var(--" src/templates/{template}/ -o --no-heading | sort -u
```

**Pass**: Cero hex hardcodeados en componentes; todas las vars usan prefijo `--t-*`.
**Fail**: Cualquier hex literal en componente, o prefijos incorrectos (`--store-*`, `--tp-*`).

### Check 6: Config Schema Coverage

**What**: `config-schema.ts` debe exponer campos para cada sección declarada en `manifest.ts`, para que el dashboard los renderice con el schema-form dinámico.

**How**:
1. Leer `src/templates/{template}/config-schema.ts`
2. Comparar las keys con los `section.id` del `manifest.ts`
3. Verificar que cada sección configurable tiene al menos un campo en el schema

**Pass**: Todas las secciones del manifest tienen su grupo en el config-schema.
**Fail**: Sección sin schema → dashboard no puede configurarla.

### Check 7: Responsive Layout

**What**: Template renders correctly at mobile (375px) and desktop (1440px).

**How**: Use `agent-browser` to take screenshots at both viewports via `src/app/template/[templateName]/page.tsx`.

Check:
- No horizontal scroll on mobile
- Grid adapts (2-col mobile → 3-4 col desktop)
- Banner scales properly
- Text doesn't overflow containers
- Touch targets ≥48px on mobile

**Pass**: Layout works at both viewports.
**Fail**: Overflow, broken grid, text clipping.

### Check 8: Orphaned Files

**What**: No unused images in `public/templates/{template}/`.

**How**:
```bash
# List all image files
fd . public/templates/{template}/ -e png -e jpg -e svg -e webp

# For each file, check if it's referenced in code
rg "{filename}" src/ --count
```

**Pass**: Every image file is referenced in at least one source file.
**Fail**: Orphaned images (wasted disk, confusing codebase).

## Report Format

```markdown
## Template QA Report: {template-name}
Date: {YYYY-MM-DD}

| # | Check | Status | Details |
|---|-------|--------|---------|
| 1 | Registry Registration | PASS/FAIL | {missing entries in registry.ts / mock-loader.ts} |
| 2 | Manifest Integrity | PASS/FAIL | {missing satisfies / unregistered section IDs} |
| 3 | Variant Slots Dispatch | PASS/FAIL | {slots declared but not implemented} |
| 4 | Image References | PASS/FAIL | {missing files or sizes} |
| 5 | CSS Variables Coverage | PASS/FAIL | {hardcoded hex / wrong prefix} |
| 6 | Config Schema Coverage | PASS/FAIL | {sections without schema fields} |
| 7 | Responsive Layout | PASS/FAIL | {viewport issues} |
| 8 | Orphaned Files | PASS/FAIL | {unused file list} |

**Overall**: {X}/8 passed
**Blocking issues**: {list critical failures that prevent delivery}
**Recommendations**: {non-blocking improvements}
```

## Auto-Fix Patterns

When a check fails, these are the standard fixes:

| Failure | Fix |
|---------|-----|
| Template no está en `SCHEMA_LOADERS` | Agregar entrada en `src/templates/registry.ts` |
| Template no está en `CONFIG_LOADERS` | Agregar entrada en `src/templates/registry.ts` |
| Template no está en `MOCK_LOADERS` | Agregar entrada en `src/templates/mock-loader.ts` |
| `satisfies TemplateManifest` ausente | Agregar al export del `manifest.ts` |
| Section ID sin dispatcher en SECTION_REGISTRY | Implementar dispatcher en `_core/sections/` y registrar |
| Variante declarada pero no implementada | Crear componente en `_variants/{slot}/` |
| Missing image file | Verify path typo, or image needs re-extraction |
| Image <5KB | Re-download from Figma or ask CTO to provide |
| Hex hardcodeado en componente | Reemplazar con `var(--t-{prop})` apropiado |
| CSS var con prefijo `--store-*` | Reemplazar con `--t-*` equivalente |
| Sección sin schema fields | Agregar grupo a `config-schema.ts` del template |
| Orphaned images | Delete unused files from `public/templates/{template}/` |

## Commands

```bash
# Check registry entries for a template
rg "{template-name}" src/templates/registry.ts src/templates/mock-loader.ts -n --no-heading

# Check manifest exports satisfies TemplateManifest
rg "satisfies TemplateManifest" src/templates/{template}/manifest.ts -n

# Find section IDs declared in manifest
rg "id:" src/templates/{template}/manifest.ts -n --no-heading

# Find all section dispatchers registered in SECTION_REGISTRY
rg "export const SECTION_REGISTRY" src/templates/_core/sections/index.ts -A 30

# Check for hardcoded hex colors in template
rg "#[0-9a-fA-F]{3,6}" src/templates/{template}/ -n --no-heading

# Find all image references for a template
rg "/templates/{template}/" src/templates/{template}/mock/ -o --no-heading | sort -u

# Check for orphaned images (PowerShell)
Get-ChildItem public/templates/{template} -Recurse -File | ForEach-Object {
  $name = $_.Name
  $refs = rg $name src/ --count-matches 2>$null
  if (-not $refs) { Write-Host "ORPHANED: $($_.FullName)" }
}

# Type check
npx tsc --noEmit

# Start dev server for manual/browser validation (preview via template route)
pnpm dev
# Preview URL: http://localhost:3000/template/{templateName}
```

## Resources

- **Figma extraction workflow**: See [figma-mcp](../figma-mcp/SKILL.md) for Figma asset extraction
- **Browser testing**: See [agent-browser](../agent-browser/SKILL.md) for automated screenshots
- **Responsive patterns**: See [responsive-design](../responsive-design/SKILL.md) for viewport rules
