---
name: video-integration
description: >
  Premium video integration pattern for dark UI pages. Seamless blending with CSS mask-image so videos appear backgroundless — like animated transparent PNGs.
  Trigger: When integrating AI-generated videos (Kling, Seedance, etc.) into any page — landing, auth, dashboard, storefront.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Integrating AI-generated videos (from Kling, Seedance, DomoAI, etc.) into any page
- Any video that needs to blend seamlessly with a dark background
- Hero sections, auth panels, feature showcases, or any visual that uses video
- Replacing static images with animated video assets

## Critical Patterns

### 1. SEAMLESS BLENDING — The #1 Rule

Videos MUST appear to have NO background — like a transparent PNG but animated. The video should float naturally on the page, not look like a rectangular video player.

**USE**: CSS `mask-image` with radial gradient — this makes the edges physically transparent.

```css
-webkit-mask-image: radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%);
mask-image: radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%);
```

**NEVER USE**:
- `mix-blend-mode: lighten` — doesn't work when video background isn't pure black
- Overlay divs with `linear-gradient` — creates visible seams at edges
- `border-radius` or `border` on video containers — the mask handles blending
- `box-shadow` or `glow` around video containers — adds visible boundaries

### 2. SIZE — Videos Are the Visual Protagonist

Videos must be LARGE and prominent. Never small thumbnails or tiny windows.

| Context | Recommended Size |
|---------|-----------------|
| Auth panel (split screen 45%) | `max-h-[58vh]`, width `calc(100% - 40px)` |
| Hero section (full width) | `max-w-[520px]`, `w-full` |
| Feature showcase | `max-w-[480px]` minimum |
| Mobile | `max-w-[220px]`, `mx-auto` |

The video container should use `flex-1 min-h-0` to adapt to available space without causing overflow.

### 3. BACKGROUND COLOR MATCH

The page background and the video background MUST be the SAME exact color. Any difference creates a visible rectangle.

| Theme | Background Color |
|-------|-----------------|
| Ember Core (landing, auth) | `#0B0A0D` |
| Dashboard | TBD |

Use hardcoded hex values — NOT CSS variables — to guarantee exact match:
```css
background: #0B0A0D; /* NOT var(--ember-bg-deep) which might resolve differently */
```

### 4. VIDEO ELEMENT PROPERTIES

Every video element MUST have these attributes:

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
>
  <source src="/videos/{name}.mp4" type="video/mp4" />
</video>
```

- `autoPlay` + `muted` — required pair (browsers block autoplay with audio)
- `loop` — seamless repetition
- `playsInline` — prevents fullscreen on iOS
- `preload="auto"` — loads immediately for instant playback
- `object-fit: cover` — fills container without distortion

### 5. CONTAINER PATTERN

```tsx
<div
  className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden"
  style={{
    maxHeight: '58vh',
    WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)',
    maskImage: 'radial-gradient(ellipse 70% 70% at center, black 40%, transparent 100%)',
  }}
>
  <video autoPlay loop muted playsInline preload="auto"
    className="w-full h-full object-cover"
  >
    <source src="/videos/{name}.mp4" type="video/mp4" />
  </video>
</div>
```

### 6. WATERMARK REMOVAL

AI-generated videos often have watermarks (Kling, Runway, etc.). Remove them with ffmpeg BEFORE integrating:

```bash
# Crop bottom N pixels (watermark usually at bottom)
ffmpeg -i input.mp4 -vf "crop=WIDTH:HEIGHT-N:0:0" -c:v libx264 -crf 18 -an output.mp4
```

- Start with 50px crop, verify, add 1px if needed
- `-an` removes audio (not needed for background videos)
- `-crf 18` maintains quality
- Always verify the crop removed the entire watermark

### 7. MASK TUNING

Adjust the mask based on context:

| Parameter | What it controls | Tighter (more fade) | Looser (less fade) |
|-----------|-----------------|--------------------|--------------------|
| `ellipse 70% 70%` | Size of visible area | `60% 60%` | `80% 80%` |
| `black 40%` | Where fade starts | `30%` (fade sooner) | `55%` (fade later) |

Test in browser DevTools by editing the mask-image value live.

### 8. PAGE OVERFLOW — NEVER

When integrating a large video, the page MUST NOT overflow. The video adapts to available space, not the other way around.

```tsx
// Parent container
<div className="h-screen overflow-hidden">
  // Video container
  <div className="flex-1 min-h-0 max-h-[58vh]">
    // Video adapts to this space
  </div>
</div>
```

## Anti-Patterns

| DON'T | WHY | DO INSTEAD |
|-------|-----|------------|
| `mix-blend-mode: lighten` | Fails when video bg isn't pure black | `mask-image` radial gradient |
| Overlay `linear-gradient` divs | Visible seams at edges | `mask-image` on the container |
| `border-radius` on video | Creates hard circular/rounded edges | Let mask handle soft blend |
| Small video in a card | Looks like a thumbnail, not premium | Video as visual protagonist |
| `min-h-screen` on auth/video pages | Causes overflow | `h-screen overflow-hidden` |
| CSS variables for bg match | Can resolve to different values | Hardcoded hex `#0B0A0D` |
| Negative margins for spacing | Breaks flex layout | `gap-0` and minimal `pt-` |

## Canonical Example

**Auth panel split screen**: `src/app/(auth)/auth/components/VisualPanel.tsx`

This implementation demonstrates:
- Radial mask blending video with dark panel background
- Video as protagonist (58vh max height)
- flex-1 min-h-0 adaptive sizing
- No overflow on h-screen page
- Logo + video + text in flex column with gap-0

## Commands

```bash
# Crop watermark from AI video (adjust 51 to your needs)
ffmpeg -i input.mp4 -vf "crop=960:909:0:0" -c:v libx264 -crf 18 -an output.mp4

# Check video dimensions
ffprobe -v quiet -print_format json -show_streams input.mp4 | grep -E "width|height"

# Convert to WebM for smaller size (optional)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm
```
