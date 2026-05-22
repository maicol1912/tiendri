# Template Migration Checklist

Template: ________________
Old name: ________________
New name: ________________
Date: ________________

## Phase 1: Discovery
- [ ] Explored ALL source files in old repo
- [ ] Inventoried components and visual structure
- [ ] Mapped image references and located files
- [ ] Identified all hardcoded data
- [ ] Checked for Figma URLs (url.txt)
- [ ] Documented page structure (which pages exist)

## Phase 2: Scaffold
- [ ] Created folder structure in src/templates/[name]/
- [ ] config.ts, types.ts, index.tsx
- [ ] mock/data.ts, mock/assets.ts
- [ ] components/ folder with all needed components
- [ ] hooks/useTemplateNav.ts (copy from tech-premium)
- [ ] context/CartContext.tsx (copy from tech-premium)
- [ ] utils/ (copy grid-classes.ts + layout-classes.ts)

## Phase 3: Config
- [ ] ALL colors defined in config.colors
- [ ] Border radius in config.radius
- [ ] Grid columns in config.grid
- [ ] Layout options in config.layout
- [ ] Sections array in config.sections
- [ ] navLinks, footerServices, footerAssistance, productTabs
- [ ] Config uses `satisfies TemplateConfig`

## Phase 4: Components
- [ ] Generic component names (no template prefix)
- [ ] Zero hardcoded strings (all from config/mock)
- [ ] Zero hardcoded colors (all via --t-* CSS vars)
- [ ] Zero hardcoded grid classes (all via gridColsClass)
- [ ] fontFamily override on thin/light headings
- [ ] Intl.NumberFormat for prices
- [ ] ALL text in Spanish
- [ ] Semantic HTML + aria-labels
- [ ] Next.js Image with proper attrs
- [ ] Shell/Page separation pattern

## Phase 5: Images
- [ ] All images copied to public/mocks/[name]/
- [ ] Standardized naming (hero-*, product-01..08, etc.)
- [ ] assets.ts updated with correct paths
- [ ] No corrupt images (all > 3KB)
- [ ] Mobile-specific images added if needed

## Phase 6: Customization
- [ ] CSS vars injected (--t-* prefix)
- [ ] Layout options via layout-classes.ts
- [ ] Section ordering works (config.sections)
- [ ] Grid configurable (config.grid)
- [ ] Customizer metadata defined

## Phase 7: URL Routing
- [ ] Sub-routes created (producto, catalogo, carrito, buscar, checkout)
- [ ] useTemplateNav hook working
- [ ] CartProvider in layout (persists across pages)
- [ ] Browser back/forward works

## Phase 8: Integration
- [ ] Added to template registry
- [ ] Metadata added to page.tsx
- [ ] TemplateLayoutClient handles new template

## Phase 9: Verification
- [ ] `npx tsc --noEmit` → 0 errors
- [ ] All routes return 200
- [ ] Visual matches Figma (desktop)
- [ ] Visual matches Figma (mobile)
- [ ] Navigation works (all pages)
- [ ] Filters + pagination work
- [ ] Search works (debounce)
- [ ] Cart works (add/remove/persist)
- [ ] Checkout works (form + WhatsApp/CTA)
- [ ] Customizer changes reflect live
- [ ] Zero hardcoded hex in components (grep verified)
- [ ] Zero direct config imports (grep verified)
- [ ] Zero --tp- prefix (grep verified)
