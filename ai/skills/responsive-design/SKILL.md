---
name: responsive-design
description: >
  Premium responsive design patterns that preserve maximum content from desktop. Elegant mobile — never stripped-down.
  Trigger: When implementing responsive layouts, mobile adaptations, or reviewing responsive behavior of any component.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Making any desktop layout work on mobile (360-412px)
- Reviewing responsive behavior of existing components
- Building new components that need to work across breakpoints
- Converting desktop patterns (tables, grids, split screens) to mobile

## Core Philosophy

**PRESERVE EVERYTHING.** Mobile users deserve the same content as desktop users. The goal is to REORGANIZE content for the smaller screen, not to REMOVE it. Hide elements ONLY when they physically cannot fit — and even then, find a creative alternative first.

The result must be elegant, beautiful, and premium — not a stripped-down "mobile version".

## Critical Patterns

### 1. CARDS — Carousel, Never Stack

When desktop shows 3+ cards side by side, mobile uses a **horizontal carousel with scroll-snap**, NOT vertical stacking.

```tsx
{/* Desktop: grid */}
{/* Mobile: horizontal scroll with snap */}
<div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-6">
  <div className="min-w-[75vw] snap-center flex-shrink-0 md:min-w-0">
    {/* Card content */}
  </div>
</div>
```

**Requirements:**
- Each card: `min-w-[75vw]` (shows peek of next card)
- Scroll-snap: `snap-x snap-mandatory` + `snap-center`
- Hide scrollbar: `scrollbar-width: none`
- Dots indicator below (active = ember red pill, inactive = gray dot)
- Auto-scroll every 3s, pause on touch for 5s
- Optional: `IntersectionObserver` or scroll event for active dot sync

### 2. TABLES — Collapsible Lists, Never Remove

Desktop tables become mobile-friendly lists:

```tsx
{/* Desktop: table grid */}
<div className="hidden md:block">
  <table>...</table>
</div>

{/* Mobile: collapsible list */}
<div className="block md:hidden">
  {features.map(f => (
    <div className="flex items-center justify-between py-3 border-b">
      <span>{f.name}</span>
      <div className="flex gap-4">
        <FeatureIndicator plan="free" value={f.free} />
        <FeatureIndicator plan="pro" value={f.pro} />
        <FeatureIndicator plan="business" value={f.business} />
      </div>
    </div>
  ))}
</div>
```

### 3. SPLIT SCREENS — Single Column + Glassmorphism

Desktop split screens (50/50 or 55/45) collapse to single column with the form in a glassmorphism card:

```tsx
{/* Desktop: split */}
<div className="hidden md:flex">
  <div style={{ width: '55%' }}>{form}</div>
  <div style={{ width: '45%' }}>{visual}</div>
</div>

{/* Mobile: centered card */}
<div className="flex md:hidden items-center justify-center min-h-screen">
  <div className="glassmorphism-card max-w-[420px] w-full mx-4">
    {form}
  </div>
</div>
```

The visual panel hides on mobile (`hidden md:flex`). The toggle links move into the form.

### 4. TIMELINE/STEPPER — Icons Above Cards

Desktop: icons on the left, cards on the right (horizontal).
Mobile: icons CENTERED ABOVE each card (vertical stack).

```tsx
<div className="flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6">
  {/* Icon - always visible, smaller on mobile */}
  <div className="flex w-auto md:w-40 items-center justify-center">
    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full">
      <Image ... className="w-16 h-16 md:w-[100px] md:h-[100px]" />
    </div>
  </div>
  {/* Card */}
  <div className="flex-1">{card}</div>
</div>
```

Timeline line: visible on both mobile and desktop, positioned with `left-1/2 -translate-x-1/2 md:left-[80px] md:translate-x-0`.

### 5. FONT SIZES — clamp() with Proper Minimums

| Element | clamp() | 360px result | 1024px+ result |
|---------|---------|-------------|----------------|
| Hero H1 | `clamp(36px, 10vw, 80px)` | 36px | 80px |
| Section H2 | `clamp(28px, 4.5vw, 52px)` | 28px | 52px |
| CTA H2 | `clamp(32px, 8vw, 72px)` | 32px | 72px |
| Body | `16px` (no clamp) | 16px | 16px |

**NEVER** let a heading go below 28px on mobile.

### 6. TOUCH TARGETS — Minimum 48px

Every interactive element must have at least 48px touch target:
- Buttons: `py-3` minimum
- Links in navigation: `py-3`
- Toggle switches, checkboxes: 48x48 minimum
- Close buttons: 48x48 minimum

### 7. BUTTONS — Full Width on Mobile

```tsx
<button className="w-full sm:w-auto px-7 sm:px-10 py-3">
  CTA Text
</button>
```

### 8. METRICS/STATS — Reduce Padding, Not Content

When metrics (5 min | $0 | 0%) are too wide for mobile:
- Reduce padding: `pr-4 sm:pr-6 md:pr-10`
- Reduce separator margins: `mr-4 sm:mr-6 md:mr-10`
- Reduce value size: `text-xl sm:text-2xl`
- Reduce label size: `text-[10px] sm:text-xs`
- **NEVER remove a metric** — just make it fit

### 9. CAROUSELS — Auto-scroll + Manual

Auto-scroll carousels must support BOTH auto-scroll AND manual swipe:
- Use `requestAnimationFrame` + `scrollLeft` (not CSS animation — blocks swipe)
- Pause auto-scroll on `touchstart` for 3-5 seconds
- Pause on `mouseenter` (desktop)
- Resume automatically after pause
- Items duplicated for seamless loop (if marquee style)

### 10. PAGES WITHOUT OVERFLOW

Pages designed as `h-screen` (auth, onboarding) MUST stay `h-screen overflow-hidden` on mobile:
- Content adapts with `flex-1 min-h-0`
- Form panel gets `overflow-y-auto` for internal scroll if needed
- Videos use `max-h-[50-58vh]` as safety net
- **NEVER let content push past the viewport**

### 11. VIDEOS — Adaptive Size

```tsx
<div className="flex-1 min-h-0 max-h-[58vh] w-full">
  <video className="w-full h-full object-cover" ... />
</div>
```

On mobile: `max-w-[220px] mx-auto` for hero videos, `max-h-[300px]` for inline videos.

### 12. NAVBAR — Hamburger Menu

- Logo: smaller on mobile (`h-20 sm:h-28`)
- Nav links: `hidden md:flex`
- CTA button: `hidden sm:inline-flex` (inside hamburger menu on mobile)
- Hamburger: `md:hidden`
- Menu links: `py-3` for 48px touch targets

## Anti-Patterns

| DON'T | WHY | DO INSTEAD |
|-------|-----|------------|
| Hide content on mobile | Users miss information | Reorganize into carousel or collapsible |
| Stack 3+ cards vertically | Creates endless scroll | Horizontal carousel with scroll-snap |
| Use tiny fonts (<14px body) | Illegible on mobile | `clamp()` with proper minimums |
| Break visual hierarchy | Confuses users | Maintain heading > subheading > body order |
| Remove animations entirely | Loses premium feel | Simplify (fade instead of parallax) |
| `min-h-screen` on fixed pages | Causes overflow | `h-screen overflow-hidden` |
| Fixed video sizes | Overflow or tiny | `flex-1 min-h-0` adaptive |
| Negative margins for spacing | Breaks flex layout | Use gap/padding correctly |
| `transition-all` | Animates unwanted properties | Transition specific properties |

## Breakpoints Reference

| Breakpoint | Width | Device |
|-----------|-------|--------|
| Default (mobile) | 0-639px | Android gama media (360-412px) |
| `sm` | 640px+ | Large phones, small tablets |
| `md` | 768px+ | Tablets, small laptops |
| `lg` | 1024px+ | Laptops, desktops |
| `xl` | 1280px+ | Large desktops |

**Design for 360px FIRST**, then scale up.

## Commands

```bash
# Take mobile screenshot with agent-browser
# (from within Claude Code agent)
browser_resize(375, 812)
browser_navigate("http://localhost:3000")
browser_take_screenshot(fullPage=true)

# Take desktop screenshot
browser_resize(1440, 900)
browser_take_screenshot(fullPage=true)
```

## Resources

- **Video integration**: See `ai/skills/video-integration/SKILL.md`
- **Design system**: See `ai/skills/design-system/SKILL.md`
- **Immersive UI**: See `ai/skills/immersive-ui/SKILL.md`
