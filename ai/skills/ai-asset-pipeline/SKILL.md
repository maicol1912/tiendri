---
name: ai-asset-pipeline
description: >
  Complete workflow for generating AI visual assets (images and videos) for Tiendri.
  Trigger: When generating any visual asset with AI — product mockups, hero visuals, auth videos, marketing images, keyframes for video.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Generating images with GPT Image 2 for the landing, auth, or any page
- Creating video animations from keyframe images (Kling, Seedance, DomoAI)
- Producing 3D clay icons, product mockups, or branded visuals
- Any visual asset that will be integrated into the codebase

## Critical Patterns

### 1. THE PIPELINE — Who Does What

| Step | Agent | What they do | What they DON'T do |
|------|-------|-------------|-------------------|
| 1. Concept | **Valentina** | Defines visual direction, describes what to show, what it communicates, style, anti-AI checklist | Does NOT write prompts |
| 2. Prompts | **Steve** | Writes prompts for GPT Image 2 (images) and Kling/Seedance (video) | Does NOT decide visual direction |
| 3. Generate | **CTO** | Generates assets in external tools, iterates, selects best results | — |
| 4. Integrate | **Camilo** | Integrates assets into code, applies video-integration skill for videos | Does NOT generate assets |

**NEVER skip steps.** Valentina does NOT write prompts. Steve does NOT decide what to show. Camilo does NOT generate images.

### 2. IMAGE PROMPTS — GPT Image 2 Format

Steve's proven format:

```
A [style] [object description], [specific details].
[Composition and positioning].
[Lighting description].
[Material/texture details].

Background: solid dark #0B0A0D
Style: [3D cartoon clay / flat vector / hyper-realistic / etc.]
Colors: [specific hex colors for each element]
No text. No watermarks.
Aspect ratio: [1:1 / 16:9 / 9:16]
```

**Rules:**
- 4-6 sentences, direct and specific
- ALWAYS specify hex colors (#B91C1C, not "red")
- ALWAYS specify background color
- ALWAYS end with "No text. No watermarks."
- Describe EACH part of the object separately (not "red accents" but "red wheel accents, red tag on collar")
- Generate at least 4 variations, pick the best

### 3. VIDEO STRATEGY — Keyframes First

**NEVER try to describe an entire video in one prompt.** Instead:

1. **Generate individual keyframes as static images** (GPT Image 2)
   - Each keyframe = one moment in the story
   - All keyframes must have: same camera angle, same lighting, same style, same background
2. **Then animate between keyframes** using video tools
3. Typical video needs 3-5 keyframes

### 4. VIDEO PROMPTS — Kling / Seedance / DomoAI

**Kling (start + end frame):**
```
[Physical movement description between start and end frame].
[Specific verbs: falls, bounces, compresses, morphs, launches, scatters].
Static camera. Dark background. Smooth cinematic motion.
```

**DomoAI (between each pair of frames):**
- Short prompts (1-3 sentences) between each frame pair
- Only describe MOVEMENT, not objects (the model sees the images)
- End each with "Static camera, dark background."

**Seedance (multi-frame, max 4000 chars):**
- All @references grouped at the start
- Numbered segments with → arrows between frames
- Style block at the end as global config

### 5. FREE TOOLS TABLE

| Tool | Free Tier | Best For |
|------|-----------|----------|
| **GPT Image 2** (ChatGPT) | Included with ChatGPT | Images: mockups, icons, keyframes |
| **Kling AI** (klingai.com) | 66 credits/day | Video: start+end frame, 5s clips |
| **DomoAI** (domoai.app) | Free, no login | Video: 2-8 frames, interpolation |
| **Seedance 2.0** (Dreamina) | ~66-80 credits/day | Video: multi-frame, up to 15s |
| **Runway** (runwayml.com) | 125 credits total | Video: Gen-3 start+end frame |

### 6. WATERMARK REMOVAL

```bash
# Check video dimensions first
ffprobe -v quiet -print_format json -show_streams input.mp4 | grep -E "width|height"

# Crop bottom N pixels (watermark usually at bottom)
ffmpeg -i input.mp4 -vf "crop=WIDTH:(HEIGHT-N):0:0" -c:v libx264 -crf 18 -an output.mp4

# Start with 50px, verify, add 1px if trace remains
```

### 7. ASSET NAMING & LOCATION

| Stage | Location | Naming |
|-------|----------|--------|
| Keyframe images (draft) | `tmp/resources/` | `KF1-descripcion.png`, `KF2-descripcion.png` |
| Video prompts (draft) | `tmp/` | `{feature}-video-{tool}-prompts.md` |
| Final video | `public/videos/` | `{feature}-{descripcion}.mp4` |
| Final images (icons) | `public/images/icons/` | `{descripcion}.png` |

**All drafts go to `tmp/`.** Only the CTO promotes to final location.

### 8. CONSISTENCY RULES

- Generate all keyframes in the SAME ChatGPT session (keeps style consistent)
- If one keyframe looks different → regenerate in the same session referencing "same style as previous"
- All assets for Ember Core: background #0B0A0D, accents #B91C1C, clay 3D style
- Verify glow intensity is consistent across all keyframes

## Anti-Patterns

| DON'T | DO INSTEAD |
|-------|------------|
| Valentina writes image prompts | Valentina describes concept → Steve writes prompt |
| Steve decides visual direction | Steve asks Valentina or follows her brief |
| One prompt for entire video | Generate keyframes first, animate between them |
| Skip iterations | Generate 4+ variations, pick best |
| Use same prompt for Kling and Seedance | Adapt format to each tool's strengths |
| Save drafts in public/ or src/ | Always tmp/ first, CTO promotes |
| Generic color descriptions ("red") | Exact hex codes (#B91C1C) |

## Commands

```bash
# Crop watermark
ffmpeg -i input.mp4 -vf "crop=960:909:0:0" -c:v libx264 -crf 18 -an output.mp4

# Check dimensions
ffprobe -v quiet -print_format json -show_streams input.mp4 | grep -E "width|height"

# Convert to WebM (smaller)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an output.webm
```

## Resources

- **Video integration**: See `ai/skills/video-integration/SKILL.md` for how to integrate videos into pages
- **Design system**: See `ai/skills/design-system/SKILL.md` for Ember Core colors and tokens
- **Steve's agent**: See `ai/agents/ai-content-specialist.md` for proven prompt formats
