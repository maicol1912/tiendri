---
name: clone-website
description: >
  Reverse-engineer and rebuild any website as a pixel-perfect clone using agent-browser CLI for extraction and parallel builder agents.
  Trigger: When user wants to clone a website, replicate a page, or reverse-engineer a live site into Next.js components.
license: Apache-2.0
metadata:
  author: JCodesMore (adapted by maicol1912)
  version: "1.0"
---

# Clone Website

You are about to reverse-engineer and rebuild **$ARGUMENTS** as pixel-perfect clones.

When multiple URLs are provided, process them independently and in parallel where possible, while keeping each site's extraction artifacts isolated in dedicated folders (for example, `docs/research/<hostname>/`).

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you inspect each section of the page, you write a detailed specification to a file, then hand that file to a specialist builder agent with everything they need. Extraction and construction happen in parallel, but extraction is meticulous and produces auditable artifacts.

## Scope Defaults

The target is whatever page `$ARGUMENTS` resolves to. Clone exactly what's visible at that URL. Unless the user specifies otherwise, use these defaults:

- **Fidelity level:** Pixel-perfect — exact match in colors, spacing, typography, animations
- **In scope:** Visual layout and styling, component structure and interactions, responsive design, mock data for demo purposes
- **Out of scope:** Real backend / database, authentication, real-time features, SEO optimization, accessibility audit
- **Customization:** None — pure emulation

If the user provides additional instructions (specific fidelity level, customizations, extra context), honor those over the defaults.

## Pre-Flight

1. **Browser automation is required.** Verify `agent-browser` is installed:
   ```bash
   agent-browser --version
   ```
   If not installed:
   ```bash
   npm i -g agent-browser && agent-browser install
   ```
   Then verify Chrome is available:
   ```bash
   agent-browser doctor --quick
   ```
   This skill cannot work without `agent-browser`.
2. Parse `$ARGUMENTS` as one or more URLs. Normalize and validate each URL; if any are invalid, ask the user to correct them before proceeding. For each valid URL, open and verify it is accessible:
   ```bash
   agent-browser open <url>
   agent-browser wait --load networkidle
   ```
3. Verify the base project builds: `pnpm build`. The Next.js + shadcn/ui + Tailwind v4 scaffold should already be in place.
4. Create the output directories if they don't exist: `docs/research/`, `docs/research/components/`, `docs/design-references/`, `scripts/`. For multiple clones, also prepare per-site folders like `docs/research/<hostname>/` and `docs/design-references/<hostname>/`.
5. When working with multiple sites in one command, optionally confirm whether to run them in parallel (recommended, if resources allow) or sequentially to avoid overload.

## Guiding Principles

### 1. Completeness Beats Speed

Every builder agent must receive **everything** it needs to do its job perfectly: screenshot, exact CSS values, downloaded assets with local paths, real text content, component structure. If a builder has to guess anything — a color, a font size, a padding value — you have failed at extraction. Take the extra minute to extract one more property rather than shipping an incomplete brief.

### 2. Small Tasks, Perfect Results

When an agent gets "build the entire features section," it glosses over details — it approximates spacing, guesses font sizes, and produces something "close enough" but clearly wrong. When it gets a single focused component with exact CSS values, it nails it every time.

Look at each section and judge its complexity. A simple banner with a heading and a button? One agent. A complex section with 3 different card variants, each with unique hover states and internal layouts? One agent per card variant plus one for the section wrapper. When in doubt, make it smaller.

**Complexity budget rule:** If a builder prompt exceeds ~150 lines of spec content, the section is too complex for one agent. Break it into smaller pieces.

### 3. Real Content, Real Assets

Extract the actual text, images, videos, and SVGs from the live site. This is a clone, not a mockup. Use `element.textContent`, download every `<img>` and `<video>`, extract inline `<svg>` elements as React components. The only time you generate content is when something is clearly server-generated and unique per session.

**Layered assets matter.** A section that looks like one image is often multiple layers — a background watercolor/gradient, a foreground UI mockup PNG, an overlay icon. Inspect each container's full DOM tree and enumerate ALL `<img>` elements and background images within it, including absolutely-positioned overlays.

### 4. Foundation First

Nothing can be built until the foundation exists: global CSS with the target site's design tokens (colors, fonts, spacing), TypeScript types for the content structures, and global assets (fonts, favicons). This is sequential and non-negotiable. Everything after this can be parallel.

### 5. Extract How It Looks AND How It Behaves

A website is not a screenshot — it's a living thing. Elements move, change, appear, and disappear in response to scrolling, hovering, clicking, resizing, and time. If you only extract the static CSS of each element, your clone will look right in a screenshot but feel dead when someone actually uses it.

For every element, extract its **appearance** (exact computed CSS via `getComputedStyle()`) AND its **behavior** (what changes, what triggers the change, and how the transition happens). Not "it looks like 16px" — extract the actual computed value. Not "the nav changes on scroll" — document the exact trigger (scroll position, IntersectionObserver threshold, viewport intersection), the before and after states (both sets of CSS values), and the transition (duration, easing, CSS transition vs. JS-driven vs. CSS `animation-timeline`).

Examples of behaviors to watch for:
- A navbar that shrinks, changes background, or gains a shadow after scrolling past a threshold
- Elements that animate into view when they enter the viewport (fade-up, slide-in, stagger delays)
- Sections that snap into place on scroll (`scroll-snap-type`)
- Parallax layers that move at different rates than the scroll
- Hover states that animate (not just change — the transition duration and easing matter)
- Dropdowns, modals, accordions with enter/exit animations
- Scroll-driven progress indicators or opacity transitions
- Auto-playing carousels or cycling content
- Dark-to-light (or any theme) transitions between page sections
- **Tabbed/pill content that cycles** — buttons that switch visible card sets with transitions
- **Scroll-driven tab/accordion switching** — sidebars where the active item auto-changes as content scrolls past (IntersectionObserver, NOT click handlers)
- **Smooth scroll libraries** (Lenis, Locomotive Scroll) — check for `.lenis` class or scroll container wrappers

### 6. Identify the Interaction Model Before Building

Before writing any builder prompt for an interactive section, you must definitively answer: **Is this section driven by clicks, scrolls, hovers, time, or some combination?**

How to determine this:
1. **Don't click first.** Scroll through the section slowly and observe if things change on their own as you scroll.
2. If they do, it's scroll-driven. Extract the mechanism: `IntersectionObserver`, `scroll-snap`, `position: sticky`, `animation-timeline`, or JS scroll listeners.
3. If nothing changes on scroll, THEN click/hover to test for click/hover-driven interactivity.
4. Document the interaction model explicitly in the component spec: "INTERACTION MODEL: scroll-driven with IntersectionObserver" or "INTERACTION MODEL: click-to-switch with opacity transition."

### 7. Extract Every State, Not Just the Default

Many components have multiple visual states. You must extract ALL states, not just whatever is visible on page load.

For tabbed/stateful content:
- Click each tab/button via `agent-browser` (`agent-browser click @eN`)
- Extract the content, images, and card data for EACH state
- Record which content belongs to which state
- Note the transition animation between states

For scroll-dependent elements:
- Capture computed styles at scroll position 0 (initial state)
- Scroll past the trigger threshold and capture computed styles again (scrolled state)
- Diff the two to identify exactly which CSS properties change
- Record the transition CSS (duration, easing, properties)
- Record the exact trigger threshold

### 8. Spec Files Are the Source of Truth

Every component gets a specification file in `docs/research/components/` BEFORE any builder is dispatched. This file is the contract between your extraction work and the builder agent. The builder receives the spec file contents inline in its prompt.

### 9. Build Must Always Compile

Every builder agent must verify `npx tsc --noEmit` passes before finishing. After merging worktrees, you verify `pnpm build` passes. A broken build is never acceptable, even temporarily.

## Phase 1: Reconnaissance

Navigate to the target URL:
```bash
agent-browser open <url>
agent-browser wait --load networkidle
```

### Screenshots

Take **full-page screenshots** at desktop (1440px) and mobile (390px) viewports and save to `docs/design-references/`:

```bash
# Desktop (default viewport)
agent-browser screenshot --full docs/design-references/desktop-full.png

# Mobile viewport (390px)
agent-browser eval "window.resizeTo(390, 844)"
agent-browser wait --load networkidle
agent-browser screenshot --full docs/design-references/mobile-full.png
```

### Global Extraction

Extract these from the page before doing anything else:

**Fonts** — Inspect `<link>` tags for Google Fonts or self-hosted fonts. Check computed `font-family` on key elements. Document every family, weight, and style. Configure them in `src/app/layout.tsx` using `next/font/google` or `next/font/local`.

**Colors** — Extract the site's color palette from computed styles. Update `src/app/globals.css` with the target's actual colors as CSS variables.

**Favicons & Meta** — Download favicons, apple-touch-icons, OG images, webmanifest to `public/seo/`. Update `layout.tsx` metadata.

**Global UI patterns** — Identify any site-wide CSS or JS: custom scrollbar hiding, scroll-snap, global keyframe animations, backdrop filters, gradients, **smooth scroll libraries** (Lenis, Locomotive Scroll).

### Mandatory Interaction Sweep

A dedicated pass AFTER screenshots and BEFORE component work:

**Scroll sweep:** Scroll the page slowly from top to bottom via `agent-browser`. At each stop, take a snapshot and observe header changes, animate-in elements, auto-switching tabs, scroll-snap points, smooth scroll libraries:
```bash
agent-browser scroll down 500
agent-browser snapshot -i
# repeat until bottom of page
```

**Click sweep:** Use `agent-browser` to snapshot interactive elements and click each one. Record what happens for each:
```bash
agent-browser snapshot -i
agent-browser click @eN   # replace N with the element ref from snapshot
agent-browser wait --load networkidle
```

**Hover sweep:** Hover over every element that might have hover states. Record changes:
```bash
agent-browser hover @eN
```

**Responsive sweep:** Test at 1440px, 768px, and 390px. Note layout changes and breakpoints:
```bash
# 768px
agent-browser eval "window.resizeTo(768, 1024)"
agent-browser screenshot --full docs/design-references/tablet-full.png

# 390px
agent-browser eval "window.resizeTo(390, 844)"
agent-browser screenshot --full docs/design-references/mobile-sweep.png
```

Save all findings to `docs/research/BEHAVIORS.md`.

### Page Topology

Map every distinct section top to bottom. Document visual order, fixed/sticky overlays, page layout, dependencies, interaction models.

Save as `docs/research/PAGE_TOPOLOGY.md`.

## Phase 2: Foundation Build

Sequential — do directly (not delegated):

1. Update fonts in `layout.tsx`
2. Update `globals.css` with color tokens, spacing, keyframes, utilities, global scroll behaviors
3. Create TypeScript interfaces in `src/types/`
4. Extract SVG icons as React components in `src/components/icons.tsx`
5. Download global assets via Node.js script (`scripts/download-assets.mjs`) to `public/`
6. Verify: `pnpm build` passes

### Asset Discovery Script Pattern

Run via `agent-browser` to discover all assets:

```bash
cat <<'EOF' | agent-browser eval --stdin
JSON.stringify({
  images: [...document.querySelectorAll('img')].map(img => ({
    src: img.src || img.currentSrc,
    alt: img.alt,
    width: img.naturalWidth,
    height: img.naturalHeight,
    parentClasses: img.parentElement?.className,
    siblings: img.parentElement ? [...img.parentElement.querySelectorAll('img')].length : 0,
    position: getComputedStyle(img).position,
    zIndex: getComputedStyle(img).zIndex
  })),
  videos: [...document.querySelectorAll('video')].map(v => ({
    src: v.src || v.querySelector('source')?.src,
    poster: v.poster,
    autoplay: v.autoplay,
    loop: v.loop,
    muted: v.muted
  })),
  backgroundImages: [...document.querySelectorAll('*')].filter(el => {
    const bg = getComputedStyle(el).backgroundImage;
    return bg && bg !== 'none';
  }).map(el => ({
    url: getComputedStyle(el).backgroundImage,
    element: el.tagName + '.' + el.className?.split(' ')[0]
  })),
  svgCount: document.querySelectorAll('svg').length,
  fonts: [...new Set([...document.querySelectorAll('*')].slice(0, 200).map(el => getComputedStyle(el).fontFamily))],
  favicons: [...document.querySelectorAll('link[rel*="icon"]')].map(l => ({ href: l.href, sizes: l.sizes?.toString() }))
});
EOF
```

## Phase 3: Component Specification & Dispatch

Core loop for each section: **extract → write spec → dispatch builders**.

### Step 1: Extract

For each section via `agent-browser`:

1. **Screenshot** the section in isolation:
   ```bash
   agent-browser screenshot --full docs/design-references/<section-name>.png
   ```
2. **Extract CSS** using the per-component extraction script — run via `agent-browser`:

```bash
cat <<'EOF' | agent-browser eval --stdin
// Replace SELECTOR with the actual CSS selector
(function(selector) {
  const el = document.querySelector(selector);
  if (!el) return JSON.stringify({ error: 'Element not found: ' + selector });
  const props = [
    'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
    'textTransform','textDecoration','backgroundColor','background',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    'width','height','maxWidth','minWidth','maxHeight','minHeight',
    'display','flexDirection','justifyContent','alignItems','gap',
    'gridTemplateColumns','gridTemplateRows',
    'borderRadius','border','borderTop','borderBottom','borderLeft','borderRight',
    'boxShadow','overflow','overflowX','overflowY',
    'position','top','right','bottom','left','zIndex',
    'opacity','transform','transition','cursor',
    'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
    'whiteSpace','textOverflow','WebkitLineClamp'
  ];
  function extractStyles(element) {
    const cs = getComputedStyle(element);
    const styles = {};
    props.forEach(p => { const v = cs[p]; if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') styles[p] = v; });
    return styles;
  }
  function walk(element, depth) {
    if (depth > 4) return null;
    const children = [...element.children];
    return {
      tag: element.tagName.toLowerCase(),
      classes: element.className?.toString().split(' ').slice(0, 5).join(' '),
      text: element.childNodes.length === 1 && element.childNodes[0].nodeType === 3 ? element.textContent.trim().slice(0, 200) : null,
      styles: extractStyles(element),
      images: element.tagName === 'IMG' ? { src: element.src, alt: element.alt, naturalWidth: element.naturalWidth, naturalHeight: element.naturalHeight } : null,
      childCount: children.length,
      children: children.slice(0, 20).map(c => walk(c, depth + 1)).filter(Boolean)
    };
  }
  return JSON.stringify(walk(el, 0), null, 2);
})('SELECTOR');
EOF
```

3. **Extract multi-state styles** — capture both states and record the diff:

   **For scroll-triggered states:**
   ```bash
   # State A: capture at current scroll position
   cat <<'EOF' | agent-browser eval --stdin
   // extraction script for State A — replace SELECTOR
   (function(selector) { /* ... same extraction script ... */ })('SELECTOR');
   EOF

   # Trigger scroll
   agent-browser scroll down 500

   # State B: re-capture after scroll
   cat <<'EOF' | agent-browser eval --stdin
   // extraction script for State B
   (function(selector) { /* ... same extraction script ... */ })('SELECTOR');
   EOF
   ```

   **For click-triggered states:**
   ```bash
   agent-browser snapshot -i
   agent-browser click @eN   # click tab/button
   agent-browser wait --load networkidle
   # re-extract with the heredoc script above
   ```

   **For hover states:**
   ```bash
   agent-browser hover @eN
   # extract computed styles while hovered using the heredoc script above
   ```

4. **Extract real content** — all text, alt attributes, aria labels
5. **Identify assets** — which images/videos from `public/`, which icons
6. **Assess complexity** — count distinct sub-components

### Step 2: Write Component Spec File

Create spec in `docs/research/components/<component-name>.spec.md`:

```markdown
# <ComponentName> Specification

## Overview
- **Target file:** `src/components/<ComponentName>.tsx`
- **Screenshot:** `docs/design-references/<screenshot-name>.png`
- **Interaction model:** <static | click-driven | scroll-driven | time-driven>

## DOM Structure
<Element hierarchy description>

## Computed Styles (exact values from getComputedStyle)

### Container
- display: ...
- padding: ...

### <Child element>
- fontSize: ...
- color: ...

## States & Behaviors

### <Behavior name>
- **Trigger:** <exact mechanism>
- **State A:** <before values>
- **State B:** <after values>
- **Transition:** <transition CSS>
- **Implementation approach:** <technique>

### Hover states
- **<Element>:** <property>: <before> → <after>, transition: <value>

## Per-State Content (if applicable)

### State: "<name>"
- Title: "..."
- Cards: [{ title, description, image, link }, ...]

## Assets
- Background: `public/images/<file>.webp`
- Icons: <ArrowIcon>, <SearchIcon> from icons.tsx

## Text Content (verbatim)
<All text from live site>

## Responsive Behavior
- **Desktop (1440px):** <description>
- **Tablet (768px):** <changes>
- **Mobile (390px):** <changes>
- **Breakpoint:** ~<N>px
```

### Step 3: Dispatch Builders

Based on complexity:
- **Simple section** (1-2 sub-components): One builder agent
- **Complex section** (3+): One agent per sub-component + one for the wrapper

Every builder receives:
- Full spec file contents inline
- Screenshot path
- Shared component imports
- Target file path
- Instruction to verify `npx tsc --noEmit`
- Responsive breakpoint values

### Step 4: Merge

- Merge worktree branches into main
- Resolve conflicts
- Verify `pnpm build` after each merge

## Phase 4: Page Assembly

Wire everything in `src/app/page.tsx`:
- Import all section components
- Implement page-level layout from topology doc
- Connect content to props
- Implement page-level behaviors (scroll snap, animations, smooth scroll)
- Verify: `pnpm build` passes

## Phase 5: Visual QA Diff

1. Take side-by-side screenshots at desktop (1440px) and mobile (390px)
2. Compare section by section
3. For each discrepancy: check spec → re-extract if wrong → fix component
4. Test all interactive behaviors
5. Verify smooth scroll, transitions, animations

## Pre-Dispatch Checklist

Before dispatching ANY builder agent:
- [ ] Spec file written with ALL sections filled
- [ ] Every CSS value from `getComputedStyle()`, not estimated
- [ ] Interaction model identified and documented
- [ ] All states captured (for stateful components)
- [ ] Scroll triggers and transitions recorded (for scroll-driven)
- [ ] Hover before/after values recorded
- [ ] All images identified (including overlays)
- [ ] Responsive behavior documented (desktop + mobile)
- [ ] Text content verbatim from site
- [ ] Builder prompt under ~150 lines; split if over

## What NOT to Do

- **Don't build click-based tabs when the original is scroll-driven (or vice versa)**
- **Don't extract only the default state** — click every tab, scroll past every trigger
- **Don't miss overlay/layered images**
- **Don't build mockups for content that's actually videos/animations**
- **Don't approximate CSS classes** — extract exact computed values
- **Don't build everything in one monolithic commit**
- **Don't reference docs from builder prompts** — inline everything
- **Don't skip asset extraction**
- **Don't give a builder too much scope** — break complex sections
- **Don't bundle unrelated sections into one agent**
- **Don't skip responsive extraction**
- **Don't forget smooth scroll libraries**
- **Don't dispatch builders without a spec file**

## Completion

Report:
- Total sections built
- Total components created
- Total spec files written
- Total assets downloaded
- Build status (`pnpm build` result)
- Visual QA results
- Known gaps or limitations
