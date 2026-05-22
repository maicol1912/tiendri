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

### 1. Template Route Structure

Every storefront template follows this route structure:

```
src/app/(storefront)/store/[slug]/{template}/
├── page.tsx                    # Home — mock products, promo slides, categories
├── product/[id]/page.tsx       # Product detail — finds product by ID
├── cart/page.tsx                # Cart — reads from cart context
├── checkout/page.tsx            # Checkout — form + WhatsApp
├── search/page.tsx              # Search — filters products
└── (optional) categories/page.tsx
    (optional) wishlist/page.tsx
```

Parent routes that ALSO contain template mock data:

```
src/app/(storefront)/store/[slug]/
├── page.tsx                    # Multi-template switcher — has {TEMPLATE}_MOCK_PRODUCTS
├── product/[productId]/page.tsx # Generic product detail — has {TEMPLATE}_MOCK_PRODUCTS
└── search/page.tsx              # Generic search — has {TEMPLATE}_MOCK_PRODUCTS
```

**All files with mock data must stay in sync.**

### 2. The 8-Check QA Protocol

Run ALL checks in order. Report PASS/FAIL for each with specific file:line for failures.

## QA Checks

### Check 1: Product ID Consistency

**What**: All product IDs must be IDENTICAL across every route file that defines them.

**How**:
```bash
# Find all product ID definitions for this template
rg "id: \"" src/app/\(storefront\)/store/\[slug\]/{template}/ -n --no-heading
rg "id: \"{template-prefix}" src/app/\(storefront\)/store/\[slug\]/page.tsx -n --no-heading
rg "id: \"{template-prefix}" src/app/\(storefront\)/store/\[slug\]/product/ -n --no-heading
rg "id: \"{template-prefix}" src/app/\(storefront\)/store/\[slug\]/search/ -n --no-heading
```

**Pass**: Same IDs (e.g., `p-1`, `p-2`, `p-3`, `p-4`) in ALL files.
**Fail**: Prefixed IDs in some files (e.g., `pet-p-1` in parent, `p-1` in template).

**Common bug**: Parent routes prefix IDs with template name (`pet-p-1`, `food-p-1`). Template routes use unprefixed (`p-1`). Product click navigates with prefixed ID → detail page can't find it → 404.

### Check 2: Image Reference Validation

**What**: Every image path referenced in code must point to an existing file >5KB.

**How**:
```bash
# Extract all image paths for this template
rg "/templates/{template}/" src/ -o --no-heading | sort -u

# For each path, verify file exists and check size
# Files <5KB are likely corrupted or placeholder
```

**Pass**: All referenced images exist, all >5KB.
**Fail**: Missing file, or file <5KB (corrupted).

### Check 3: Navigation Flow

**What**: Click product from home → product detail page loads (no 404).

**How**:
1. Read the home page to find how product IDs are defined
2. Read the shell component to find how product click navigation works
3. Read the detail page to find how it looks up products by ID
4. Verify: IDs match AND slug handling is consistent

**Pass**: Product click generates URL `/store/{slug}/{template}/product/{id}`, detail page finds product with that ID.
**Fail**: URL mismatch, ID mismatch, or slug hardcoded.

### Check 4: Slug Handling

**What**: Routes must use `params.slug` from the URL, never hardcoded store slugs.

**How**:
```bash
# Search for hardcoded slug assignments
rg "MOCK_STORE\.slug|slug:.*\"[a-z]" src/app/\(storefront\)/store/\[slug\]/{template}/ -n --no-heading

# Correct pattern: const store = { ...MOCK_STORE, slug }
# Wrong pattern: using MOCK_STORE.slug directly for navigation
```

**Pass**: All route pages override slug with `params.slug`.
**Fail**: Any route uses `MOCK_STORE.slug` for navigation.

### Check 5: Mock Data Sync

**What**: Products in all route files must have identical name, price, images.

**How**: Compare the mock product arrays across all route files. Check:
- Same number of products
- Same names
- Same prices
- Same image paths
- Same `featured` flags

**Pass**: All route files have identical product data.
**Fail**: Any divergence in names, prices, images, or count.

### Check 6: Component Rendering Rules

**What**: Certain components should only appear on certain pages.

| Component | Home | Detail | Cart | Checkout | Search |
|-----------|------|--------|------|----------|--------|
| Bottom nav | YES | NO | YES | NO | YES |
| Header (full) | YES | NO | YES | YES | YES |
| Back button header | NO | YES | YES | YES | NO |
| Sticky CTA | NO | YES | NO | NO | NO |

**How**: Read each page/shell component and check which navigation components are rendered.

**Pass**: Components match the table above.
**Fail**: Bottom nav on detail page, missing back button, etc.

### Check 7: Responsive Layout

**What**: Template renders correctly at mobile (375px) and desktop (1440px).

**How**: Use `agent-browser` to take screenshots at both viewports.

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
| 1 | Product ID Consistency | PASS/FAIL | {details or file:line} |
| 2 | Image References | PASS/FAIL | {missing files or sizes} |
| 3 | Navigation Flow | PASS/FAIL | {broken link details} |
| 4 | Slug Handling | PASS/FAIL | {hardcoded slug locations} |
| 5 | Mock Data Sync | PASS/FAIL | {divergence details} |
| 6 | Component Rendering | PASS/FAIL | {wrong component locations} |
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
| Prefixed IDs in parent routes | `replace_all` to remove prefix: `pet-p-` → `p-` |
| Missing image file | Verify path typo, or image needs re-extraction |
| Image <5KB | Re-download from Figma or ask CTO to provide |
| Hardcoded slug | Add `const { slug } = await params;` and `{ ...MOCK_STORE, slug }` |
| Mock data out of sync | Copy canonical product array from home page to all other routes |
| Bottom nav on detail | Remove `BottomNav` import and JSX from detail page/shell |
| Orphaned images | Delete unused files from `public/templates/{template}/` |

## Commands

```bash
# Quick ID consistency check
rg "id: \"p-" src/app/\(storefront\)/store/\[slug\]/ -l --no-heading | sort

# Find all image references for a template
rg "/templates/{template}/" src/ -o --no-heading | sort -u

# Check for orphaned images (PowerShell)
Get-ChildItem public/templates/{template} -Recurse -File | ForEach-Object {
  $name = $_.Name
  $refs = rg $name src/ --count-matches 2>$null
  if (-not $refs) { Write-Host "ORPHANED: $($_.FullName)" }
}

# Type check
npx tsc --noEmit

# Start dev server for manual/browser validation
npm run dev
```

## Resources

- **Figma replication workflow**: See [figma-replication](../figma-replication/SKILL.md) for implementation workflow
- **Browser testing**: See [agent-browser](../agent-browser/SKILL.md) for automated screenshots
- **Responsive patterns**: See [responsive-design](../responsive-design/SKILL.md) for viewport rules
