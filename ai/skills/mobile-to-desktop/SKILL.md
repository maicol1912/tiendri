---
name: mobile-to-desktop
description: >
  Convert mobile-first Figma designs (375-393px) into proper responsive desktop layouts for e-commerce catalog templates.
  Trigger: When implementing a template from a mobile-only Figma design, when desktop layout looks broken or stretched,
  when product images fill full viewport, when mobile nav shows on desktop.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## When to Use

- Implementing a storefront template from a mobile-only Figma design
- Desktop layout looks stretched, broken, or has massive images
- Product cards or images fill the entire viewport width on desktop
- Bottom navigation still shows on desktop when it shouldn't
- Banners crop or distort on wider screens
- Grids don't expand to fill desktop space properly

## Core Principle

**Mobile is the BLUEPRINT, desktop is the ADAPTATION.** The Figma gives you the visual language (colors, typography, spacing ratios, component styles). Your job is to EXPAND that language to fill desktop space intelligently — not to stretch mobile components to full width.

## GOLDEN RULE: Never Break Mobile

**Adding desktop styles MUST NOT break mobile functionality.** This is the #1 source of regressions.

### How to protect mobile when adding desktop:

1. **NEVER change existing mobile classes** — only ADD responsive prefixed classes (`md:`, `lg:`)
2. **NEVER move elements into `hidden md:flex` wrappers** if they're the ONLY instance — mobile loses them
3. **When hiding mobile elements on desktop**, the element MUST still exist for mobile:
   ```tsx
   // WRONG: moved checkout button into desktop-only sidebar, mobile lost it
   <div className="hidden lg:block">
     <CheckoutButton />  {/* Mobile can't see this! */}
   </div>
   
   // CORRECT: button exists in BOTH places, hidden appropriately
   <div className="lg:hidden">
     <CheckoutButton />  {/* Mobile sees this */}
   </div>
   <div className="hidden lg:block">
     <CheckoutButton />  {/* Desktop sees this */}
   </div>
   ```
4. **When restructuring layout** (e.g., cart items + sidebar), keep the mobile flow INTACT:
   ```tsx
   // CORRECT: mobile stacks naturally, desktop goes side-by-side
   <div className="flex flex-col lg:flex-row lg:gap-8">
     <div className="flex-1">{items}</div>
     <div className="mt-6 lg:mt-0 lg:w-[380px]">
       {summary}
       {/* CTA button must be HERE for both mobile and desktop */}
       <CheckoutButton />
     </div>
   </div>
   ```
5. **After EVERY desktop change**, verify at 375px that:
   - [ ] All buttons are visible and tappable
   - [ ] All navigation works
   - [ ] Cart checkout flow is intact
   - [ ] No content is hidden that shouldn't be
   - [ ] Bottom nav still shows on mobile
   - [ ] Sticky bottom bars (cart CTA, checkout CTA) still show on mobile

### Common mobile breakage patterns:

| What you did | What broke on mobile | How to prevent |
|-------------|---------------------|----------------|
| Wrapped CTA in `hidden lg:block` | Checkout button disappeared | Duplicate: `lg:hidden` + `hidden lg:block` |
| Changed `fixed bottom-0` to `lg:static` | Sticky bar floats away on mobile | Use `fixed bottom-0 lg:static` |
| Moved summary into sidebar div | Summary/total hidden on mobile | Keep in flow, use `flex-col lg:flex-row` |
| Changed `w-full` to `lg:w-[380px]` | Element shrinks on mobile | Use `w-full lg:w-[380px]` |
| Removed `px-4` for `lg:px-8` | No padding on mobile | Use `px-4 lg:px-8` (additive) |
| Set `md:hidden` on a critical element | Element gone on tablet too | Verify the element has a desktop equivalent |

## Critical Rules (MANDATORY)

### Rule 1: Content Container — ALWAYS Constrain

Every page MUST have a max-width container. NEVER let content span the full viewport.

```tsx
// ALWAYS wrap page content
<main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
  {children}
</main>
```

| Breakpoint | Container | Padding |
|------------|-----------|---------|
| Mobile | `w-full` | `px-4` (16px) |
| `md` (768px) | `max-w-7xl` | `px-6` (24px) |
| `lg` (1024px) | `max-w-7xl` | `px-8` (32px) |

### Rule 2: Product Grid — Progressive Columns

NEVER keep a 2-column grid on desktop. ALWAYS expand.

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {products.map(p => <ProductCard key={p.id} product={p} />)}
</div>
```

| Breakpoint | Columns | Gap |
|------------|---------|-----|
| Mobile | `grid-cols-2` | `gap-4` |
| `md` | `grid-cols-3` | `gap-5` |
| `lg` | `grid-cols-4` | `gap-6` |
| `xl` (optional) | `grid-cols-5` | `gap-6` |

### Rule 3: Product Card Images — NEVER Full Viewport

Product images MUST have constrained dimensions. NEVER let them fill the screen.

```tsx
// CORRECT: constrained image
<div className="relative w-full aspect-[3/4] max-h-[400px] overflow-hidden rounded-lg">
  <Image src={...} fill className="object-cover" />
</div>

// WRONG: image fills whatever space is available
<div className="relative w-full h-full">
  <Image src={...} fill className="object-cover" />
</div>
```

**Image max-height rules:**

| Context | Mobile | Desktop |
|---------|--------|---------|
| Product card thumbnail | `aspect-[3/4]` natural | `max-h-[300px]` |
| Product detail hero | `h-[400px]` | `h-[500px] max-w-lg` |
| Banner/promo | `h-[132px]` | `h-[200px]` or `aspect-ratio` locked |
| Cart item thumbnail | `w-[80px] h-[80px]` | `w-[100px] h-[100px]` |
| Category icon | `w-[60px] h-[60px]` | `w-[70px] h-[70px]` |

### Rule 4: Hero/Banner Sections — Lock Aspect Ratio OR Cap Height

Banners from mobile Figma are typically 375x132 (~3:1 ratio). On desktop they WILL distort.

**Option A: Two banners side by side (PREFERRED for desktop)**
```tsx
{/* Mobile: carousel */}
<div className="md:hidden">
  <Carousel slides={slides} />
</div>

{/* Desktop: grid of 2 */}
<div className="hidden md:grid md:grid-cols-2 gap-4">
  {slides.map(slide => (
    <div key={slide.id} className="overflow-hidden rounded-lg">
      <img src={slide.image} alt={slide.title} className="w-full h-auto rounded-lg" />
    </div>
  ))}
</div>
```

**Option B: Single banner with max-height**
```tsx
<div className="relative w-full max-h-[200px] overflow-hidden rounded-lg">
  <img src={banner} className="w-full h-auto" />
</div>
```

**NEVER do:**
- `object-cover` on a banner with baked-in text (crops the text)
- Fixed height without aspect ratio (distorts)
- Full-width banner without max-height on desktop (too tall)

### Rule 5: Navigation — Transform, Don't Duplicate

| Component | Mobile | Desktop |
|-----------|--------|---------|
| Bottom nav (tabs) | Show: fixed bottom | Hide: `md:hidden` |
| Top nav bar | Simple: logo + icons | Expand: logo + nav links + search + icons |
| Hamburger menu | Show: `md:hidden` | Hide, show full nav |
| Search bar | Icon only or collapsed | Full search input visible |

```tsx
{/* Bottom nav: mobile only */}
<nav className="fixed bottom-0 left-0 right-0 md:hidden">
  <BottomNav />
</nav>

{/* Top nav: always visible, expands on desktop */}
<header className="sticky top-0">
  {/* Mobile: logo + icon buttons */}
  <div className="flex md:hidden items-center justify-between px-4 py-3">
    <Logo />
    <div className="flex gap-2">
      <CartIcon />
      <UserIcon />
    </div>
  </div>
  
  {/* Desktop: full nav bar */}
  <div className="hidden md:flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
    <Logo />
    <nav className="flex gap-6">{links}</nav>
    <SearchBar />
    <div className="flex gap-3">
      <CartIcon />
      <UserIcon />
    </div>
  </div>
</header>
```

### Rule 6: Typography — Scale Up, Don't Stretch

Mobile fonts are designed for 375px. On desktop, they need to scale proportionally.

```tsx
// Heading: scales from mobile to desktop
<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// Section title: moderate scale
<h2 className="text-lg md:text-xl lg:text-2xl font-semibold">

// Body: stays consistent
<p className="text-sm md:text-base">
```

| Element | Mobile | md | lg |
|---------|--------|----|----|
| Page title | `text-2xl` (24px) | `text-3xl` (30px) | `text-4xl` (36px) |
| Section title | `text-lg` (18px) | `text-xl` (20px) | `text-2xl` (24px) |
| Product name | `text-sm` (14px) | `text-base` (16px) | `text-base` (16px) |
| Price | `text-base` (16px) | `text-lg` (18px) | `text-lg` (18px) |
| Body text | `text-sm` (14px) | `text-base` (16px) | `text-base` (16px) |
| Caption/muted | `text-xs` (12px) | `text-sm` (14px) | `text-sm` (14px) |

### Rule 7: Layout Transformations

| Mobile Pattern | Desktop Transformation |
|----------------|----------------------|
| Vertical stack | Side by side (`flex-col md:flex-row`) |
| Horizontal carousel | Grid (`overflow-x-auto md:grid md:grid-cols-N`) |
| Single column | Multi-column (`md:grid md:grid-cols-2`) |
| Full-width card | Constrained card (`max-w-2xl` or grid item) |
| Bottom sheet | Side panel or modal |
| Stacked form | Two-column form (`md:grid md:grid-cols-2 md:gap-6`) |
| Single product view | Product + sidebar info (`md:flex md:gap-8`) |

### Rule 8: Product Detail — Side by Side on Desktop

Mobile: image top, info below (stacked).
Desktop: image left (50%), info right (50%).

```tsx
<div className="flex flex-col md:flex-row md:gap-8 md:items-start">
  {/* Image section */}
  <div className="w-full md:w-1/2 md:sticky md:top-24">
    <div className="aspect-[3/4] max-h-[600px] relative rounded-lg overflow-hidden">
      <Image src={...} fill className="object-cover" />
    </div>
    {/* Thumbnails below image */}
    <div className="flex gap-2 mt-3">{thumbnails}</div>
  </div>
  
  {/* Info section */}
  <div className="w-full md:w-1/2 mt-6 md:mt-0">
    <h1>{name}</h1>
    <p>{price}</p>
    <p>{description}</p>
    {/* Color/size selectors */}
    {/* Add to cart button */}
  </div>
</div>
```

### Rule 9: Cart Page — Summary Sidebar on Desktop

Mobile: items stacked, summary below.
Desktop: items left (60%), summary sticky right (40%).

```tsx
<div className="flex flex-col lg:flex-row lg:gap-8">
  {/* Cart items */}
  <div className="flex-1 space-y-4">
    {items.map(item => <CartItem key={item.id} {...item} />)}
  </div>
  
  {/* Order summary: below on mobile, sticky sidebar on desktop */}
  <div className="mt-8 lg:mt-0 lg:w-[380px] lg:sticky lg:top-24">
    <OrderSummary />
  </div>
</div>
```

### Rule 10: Spacing Scale by Breakpoint

```tsx
// Section spacing
<section className="py-6 md:py-8 lg:py-12">

// Component gaps  
<div className="gap-4 md:gap-6 lg:gap-8">

// Page padding
<div className="px-4 md:px-6 lg:px-8">
```

| Spacing type | Mobile | md | lg |
|-------------|--------|----|----|
| Section vertical | `py-6` | `py-8` | `py-12` |
| Component gap | `gap-4` | `gap-6` | `gap-8` |
| Card padding | `p-3` | `p-4` | `p-5` |
| Page horizontal | `px-4` | `px-6` | `px-8` |

## Anti-Patterns (NEVER DO THESE)

| Anti-Pattern | Why It's Wrong | Correct Approach |
|-------------|---------------|-----------------|
| Product images filling full viewport width | Looks like a billboard, not a store | `max-h-[300px]` + `aspect-[3/4]` in grid |
| Keeping 2-col grid on desktop | Wastes 60% of screen space | `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` |
| Bottom nav visible on desktop | Mobile pattern on desktop = amateur | `md:hidden` + desktop top nav |
| Banner stretching to 1440px | Text crops, proportions break | `max-w-2xl mx-auto` or grid of 2 |
| Mobile header on desktop (just icons) | Missing navigation, search, branding | Separate `md:flex` desktop header |
| Full-width featured card | One product spanning 1200px looks absurd | `max-w-2xl` or side-by-side grid |
| Same font sizes on desktop | 14px text on 1440px = tiny and lost | Scale up: `text-sm md:text-base` |
| No hover states | Desktop has a mouse — use it | `hover:shadow-lg hover:scale-[1.02] transition` |
| Single column layout on desktop | Massive whitespace, poor density | Multi-column layouts |

## Desktop Enhancements (Add These)

Things that DON'T exist in mobile but SHOULD exist on desktop:

1. **Hover effects on cards**: `hover:shadow-lg hover:scale-[1.02] transition-all duration-200`
2. **Hover on buttons**: `hover:opacity-90 transition-opacity`
3. **Sticky header**: `sticky top-0 z-50 bg-white/95 backdrop-blur-sm`
4. **Sticky product info**: `md:sticky md:top-24` on product detail
5. **Wider search bar**: `hidden md:flex md:flex-1 md:max-w-md`
6. **Breadcrumbs**: `hidden md:flex` above page content
7. **Footer**: Full footer with columns on desktop, simplified on mobile

## Checklist Before Delivering

- [ ] `max-w-7xl mx-auto` on main content
- [ ] Product grid uses `md:grid-cols-3 lg:grid-cols-4`
- [ ] No product image taller than `400px` on desktop
- [ ] Bottom nav is `md:hidden`
- [ ] Desktop has proper top navigation
- [ ] Banners constrained (max-height or max-width)
- [ ] Featured/best-seller cards constrained (max-w or grid)
- [ ] Typography scales up at `md` and `lg`
- [ ] Hover states on interactive elements
- [ ] Cart has sidebar layout on `lg`
- [ ] Product detail has side-by-side layout on `md`
- [ ] No full-viewport images anywhere on desktop
- [ ] Spacing increases at breakpoints

## Commands

```bash
# Verify responsive at key breakpoints
browser_resize(375, 812)   # Mobile
browser_resize(768, 1024)  # Tablet
browser_resize(1440, 900)  # Desktop

# Quick check for anti-patterns in code
grep -r "w-full h-full" src/components/templates/ --include="*.tsx"  # Potential full-viewport images
grep -r "grid-cols-2\"" src/components/templates/ --include="*.tsx"  # Grids that might not expand
```

## Resources

- **Responsive design (desktop→mobile)**: See `ai/skills/responsive-design/SKILL.md`
- **Component patterns**: See `ai/skills/component-patterns/SKILL.md`
- **Design system**: See `ai/skills/design-system/SKILL.md`
