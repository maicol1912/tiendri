---
name: figma-replication
description: >
  End-to-end workflow for replicating Figma designs into storefront templates pixel-perfect.
  Covers image extraction with auto-validation and fallback to manual, implementation with design tokens,
  and mandatory visual verification before delivery.
  Trigger: When replicating a Figma design into a template, implementing a storefront from Figma,
  or when told to make a template match a Figma file.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Replicating a Figma design into a storefront template
- Implementing a new template from a Figma community or team file
- Re-doing a template to match Figma more faithfully
- Any task that says "must look identical to the Figma"

## Prerequisites

Load these skills BEFORE starting:
- `figma-mcp` — for Figma MCP extraction tools and workflow
- `agent-browser` — for browser validation at the end

## Workflow

### Phase 1: Design Token Extraction

Use `figma-mcp` skill workflow to extract from the Figma file:

1. `get_metadata` on the target section to discover all screen node IDs
2. `get_design_context` on each screen to extract design tokens
3. `get_screenshot` on each screen for visual reference

Save design tokens in this format:

```json
{
  "colors": {
    "primary": "#hex",
    "secondary": "#hex",
    "accent": "#hex",
    "background": "#hex",
    "surface": "#hex",
    "text": "#hex",
    "textSecondary": "#hex"
  },
  "typography": {
    "fontFamily": "Font Name",
    "heading": { "size": "px", "weight": 700, "lineHeight": 1.15 },
    "subheading": { "size": "px", "weight": 600 },
    "body": { "size": "px", "weight": 400 },
    "caption": { "size": "px", "weight": 400 }
  },
  "spacing": {
    "pagePadding": "px",
    "cardGap": "px",
    "sectionGap": "px"
  },
  "borderRadius": {
    "card": "px",
    "button": "px",
    "image": "px"
  },
  "shadows": {
    "card": "CSS shadow value",
    "elevated": "CSS shadow value"
  }
}
```

### Phase 2: Image Extraction + Validation

**Step 1: Try automated extraction**

For each image in the design (product photos, hero banners, category icons, avatars, decorative elements):

1. Use `get_design_context` on individual image nodes to find image fill URLs
2. Use `get_screenshot` on individual image nodes as fallback
3. Download each image to `public/templates/{template-name}/images/`

**Step 2: Validate EVERY extracted image**

| Check | Pass | Fail |
|-------|------|------|
| File size | >5KB | <5KB = likely corrupted/placeholder |
| Visual match | Image content matches what Figma shows | Shows different content (wrong asset, background pattern, etc.) |
| Format | PNG/JPG/SVG as expected | Unexpected format or broken file |
| Dimensions | Reasonable for use case (product: >200px, banner: >600px wide) | Tiny thumbnails or massive screenshots |

**Step 3: If validation fails → escalate**

```
CTO: Las imágenes no se pudieron extraer correctamente del Figma.
Esto pasa con archivos community donde las capas están aplanadas.

Necesito que extraigas manualmente estas imágenes:
- [ ] Banner/hero image (la imagen principal del banner)
- [ ] Product image 1 (nombre del producto)
- [ ] Product image 2 (nombre del producto)
- [ ] ...

Guardalas en: public/templates/{template}/images/
Nombres sugeridos: banner.png, product-1.png, product-2.png, ...
```

**Detection: Community file with flattened layers**

Signs that automated extraction will fail:
- `get_metadata` shows mostly `rounded-rectangle` elements instead of `frame` with children
- File notes say "components have been detached & removed"
- `get_design_context` returns `<img>` elements, no real component structure
- Extracted images are <5KB or show wrong content

When detected, skip automated extraction and escalate immediately.

### Phase 3: Implementation

For each screen in the Figma:

1. Create/update components in `src/components/templates/{template}/`
2. Use EXACT design tokens from Phase 1 (hex colors, font sizes, spacing)
3. Reference images from `public/templates/{template}/images/`
4. Keep existing interactivity — only change visual layer

**Critical implementation rules:**

| Rule | Why |
|------|-----|
| Use `params.slug` from URL, never hardcode store slugs | Hardcoded slugs break navigation when URL slug differs |
| Product IDs must be identical across ALL route files | Mismatched IDs cause 404 on product detail |
| Banner/promo images need per-slide `imagePosition` | Different images have different compositions — one `object-position` doesn't fit all |
| Use `object-contain` + `object-position: right` for product images in banners | `object-cover` crops product photos unpredictably |
| Mock data must be IDENTICAL in home, detail, search, cart, checkout routes | Any divergence = bugs |

**Banner/promo component pattern:**

```tsx
// Support different image modes per slide
<Image
  src={slide.imageUrl}
  alt={slide.headline}
  fill
  style={{
    objectFit: slide.imagePosition === "contain-right" ? "contain" : "cover",
    objectPosition: slide.imagePosition === "contain-right" ? "right center" : slide.imagePosition ?? "center",
  }}
/>
```

### Phase 4: Fidelity Checklist (MANDATORY before reporting done)

Every item must PASS. If any fails, fix it before delivering.

- [ ] **Colors**: Exact hex values from Figma — verify with design tokens
- [ ] **Typography**: Correct font family, sizes, weights — no approximations
- [ ] **Layout**: Same grid structure, column count, section order as Figma
- [ ] **Spacing**: Padding, margins, gaps match Figma — measure from design context
- [ ] **Border radius**: Exact values, not "close enough"
- [ ] **Shadows**: Exact CSS shadow values from Figma
- [ ] **Images**: ALL from Figma, zero placeholder/stock images
- [ ] **Texts**: Product names, prices, section titles match Figma
- [ ] **Icons**: Matching icons (Lucide, SVG from Figma, or custom)
- [ ] **Decorative elements**: Badges, borders, gradients, patterns from Figma
- [ ] **IDs consistent**: Product IDs match across ALL route files
- [ ] **Slugs dynamic**: Routes use `params.slug`, not hardcoded values
- [ ] **Navigation works**: Product click → detail page loads (no 404)
- [ ] **No extra UI on wrong pages**: e.g., no bottom nav on product detail

### Phase 5: Browser Validation (MANDATORY)

Load `agent-browser` skill, then:

1. Start dev server (`npm run dev`)
2. Navigate to template home page
3. Take screenshots at mobile (375px) and desktop (1440px)
4. Compare against Figma screenshots from Phase 1
5. Verify navigation: click product → detail loads
6. Verify cart: navigate to cart → renders
7. Check for JS console errors

If discrepancies found, fix and re-validate. Iterate up to 3 times internally. Escalate to CTO only after 3 failed attempts.

## Anti-Patterns

| Anti-Pattern | Correct Approach |
|---|---|
| Using placeholder/Unsplash/stock images | Extract from Figma or ask CTO to provide |
| Reporting "done" without browser screenshots | Always validate in browser before delivery |
| Assuming `object-cover object-right` works for all banner images | Use per-slide `imagePosition` prop |
| Hardcoding store slug in navigation | Use `params.slug` from URL |
| Different product IDs across route files | Single source of truth, copy to all routes |
| Downloading full-screen Figma screenshots as "assets" | Extract individual image nodes, not screen captures |
| "Inspired by" the Figma | Must be IDENTICAL to the Figma |
| Using `get_design_context` code output as component code | Extract design TOKENS only, implement from scratch |

## Commands

```bash
# Start dev server for validation
npm run dev

# Type check after implementation
npx tsc --noEmit

# Check for inconsistent product IDs across routes
rg "id: \"" src/app/\(storefront\)/store/\[slug\]/{template}/ --no-heading

# Check for hardcoded slugs
rg "slug.*=.*\"[a-z-]+\"" src/app/\(storefront\)/store/\[slug\]/{template}/ --no-heading

# Verify all referenced images exist
rg "/templates/{template}/" src/ -o --no-heading | sort -u | while read img; do
  [ -f "public$img" ] || echo "MISSING: $img"
done
```

## Resources

- **Figma extraction**: See [figma-mcp](../figma-mcp/SKILL.md) for MCP tool usage
- **Browser validation**: See [agent-browser](../agent-browser/SKILL.md) for browser automation
- **Responsive patterns**: See [responsive-design](../responsive-design/SKILL.md) for mobile ↔ desktop
- **Component patterns**: See [component-patterns](../component-patterns/SKILL.md) for shadcn/Tailwind conventions
