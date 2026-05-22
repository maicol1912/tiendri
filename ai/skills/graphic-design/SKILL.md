---
name: graphic-design
description: >
  Comprehensive guide for generating premium professional images across 7 styles — from lifestyle photography to 3D clay renders.
  Trigger: When proposing, designing, or generating ANY visual asset for the platform — landing, auth, dashboard, storefront, marketing, social media.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Valentina is proposing what type of image to use in any section
- Steve needs to write a prompt for GPT Image 2
- Deciding between photography, illustration, 3D, or mockup for a specific context
- Creating marketing assets, social media content, or brand visuals
- Any visual decision beyond code/UI

## The 7 Image Categories

### 1. LIFESTYLE PHOTOGRAPHY

**What it is:** Real people in authentic settings — shopping, working, eating, celebrating. Warm editorial feel. Shows the HUMAN side of the product.

**Best for:** Hero sections, testimonials, about pages, social media, marketing campaigns, email headers.

**Colombian/LATAM context rules:**
- Diverse people: mestizo, afro-colombiano, indigenous features. NOT US/European stock faces.
- Local settings: centros comerciales colombianos, calles con fachadas coloridas, cafés con tinto, tiendas de barrio, plazas de mercado.
- Clothing: casual but aspirational — jeans, camisetas, blazers informales. NOT corporate suits.
- Devices: Android phones (Samsung, Xiaomi), NOT iPhones exclusively.
- Expressions: genuine warmth, laughter, connection. NOT posed corporate smiles.

**Prompt structure for GPT Image 2:**
```
Editorial lifestyle photograph of [PEOPLE DESCRIPTION: age, ethnicity, clothing] in [SETTING: Colombian mall, street market, café].
[ACTION: browsing phone, receiving package, showing screen to friend].
[LIGHTING: warm natural light / golden hour / soft indoor ambient].
Shallow depth of field, bokeh background, warm color grading.

Style: editorial lifestyle photography, authentic, warm, Latin American context
Colors: warm tones, natural skin tones, [brand accent if needed]
No text. No watermarks. No logos.
Aspect ratio: [16:9 for hero / 1:1 for social / 4:5 for stories]
```

**Anti-patterns:**
- NO plastic/glossy skin (AI giveaway)
- NO perfect symmetrical poses
- NO US-centric settings (NYC streets, suburban houses)
- NO all-white or all-blonde people
- NO corporate stock feel (handshake photos, pointing at screens)

**Example prompt:**
```
Editorial lifestyle photograph of two young Colombian women in their late 20s, one with curly dark hair wearing a rust-colored sweater, the other with straight black hair in an olive green blouse, walking through a modern Colombian shopping mall laughing together while carrying shopping bags. Warm ambient mall lighting from above, storefronts softly blurred in the background. Shallow depth of field. Authentic joy, natural movement, not posed.

Style: editorial lifestyle photography, warm, authentic Latin American context
Colors: warm earth tones, natural skin tones, soft golden highlights
No text. No watermarks. No logos.
Aspect ratio: 16:9
```

---

### 2. PRODUCT MOCKUPS

**What it is:** Phones, laptops, or tablets showing the app/product UI. The device IS the subject.

**Best for:** How it works sections, feature showcases, app store screenshots, onboarding, landing hero (alongside text).

**Rules:**
- Device color: DARK (black, space gray, graphite). Never white/silver on dark backgrounds.
- Screen content: actual product UI or realistic representation of it.
- Background: matches page background exactly (e.g., #0B0A0D for Ember Core).
- When integrating: use `mix-blend-mode: lighten` or `mask-image` to blend with page.
- Angle: slight tilt (5-8 degrees) for dynamism, or frontal for clarity.

**Prompt structure:**
```
A modern dark smartphone mockup, [DEVICE DESCRIPTION], [ANGLE].
Screen shows [UI DESCRIPTION: what's on screen, layout, colors].
[GLOW/LIGHTING: ember red glow behind, soft ambient from top-left].

Background: solid dark #0B0A0D
Style: clean dark UI mockup, premium product render, tech aesthetic
Colors: device #1A1A1A, screen [UI colors], glow [accent color]
No text. No watermarks.
Aspect ratio: 1:1
```

**Anti-patterns:**
- NO white/bright device frames on dark pages
- NO generic placeholder screens ("Lorem ipsum" text)
- NO floating at extreme angles (45+ degrees)
- NO multiple devices overlapping chaotically

**Example prompt:**
```
A modern dark smartphone mockup, generic Android device with rounded corners and minimal bezel, dark graphite body (#1A1A1A), tilted 6 degrees clockwise. Screen shows a dark mobile store catalog with 4 product thumbnails, prices in COP format, and a green WhatsApp floating button at bottom. Behind the device a soft ember red glow (#B91C1C) at 15% opacity.

Background: solid dark #0B0A0D
Style: clean dark UI mockup, product render, premium tech aesthetic
Colors: device #1A1A1A, screen dark UI with red #B91C1C accents
No text. No watermarks.
Aspect ratio: 1:1
```

---

### 3. 3D CLAY / CARTOON

**What it is:** Pixar-style 3D objects with matte clay finish, rounded edges, soft shadows. Playful but premium.

**Best for:** Icons, step indicators, decorative elements, video keyframes, loading states, empty states, error illustrations.

**Rules:**
- Material: matte clay, NOT glossy plastic
- Colors: white/cream body with brand accent details (#B91C1C red)
- Background: always dark (#0B0A0D) for Ember Core context
- Lighting: overhead key light with red rim light on edges
- Style reference: the HowItWorks icons (store, share, orders)

**Prompt structure:**
```
A cute stylized 3D cartoon [OBJECT], clean and modern design.
[BODY COLOR] body with [ACCENT COLOR] accent details on [SPECIFIC PARTS].
Smooth rounded shapes, soft shadows, like a Pixar-style render.
[ANGLE: slightly tilted / top-down / 3/4 view], floating with subtle shadow beneath.

Background: solid dark #0B0A0D
Style: 3D cartoon clay illustration, clean, minimal, premium
Colors: [body color] body, [accent] #B91C1C accents on [parts]
No text. No watermarks.
Aspect ratio: [1:1 for icons / 16:9 for hero]
```

**Anti-patterns:**
- NO glossy/shiny plastic finish
- NO complex textures (wood grain, fabric weave)
- NO realistic proportions — keep it stylized
- NO text ON the objects (text in AI always looks bad)

**Example prompt:**
```
A cute stylized 3D cartoon shopping cart, clean and modern design. Dark clay body (#1C1A22) with red accent details on the wheels and handle (#B91C1C). Smooth rounded shapes, soft shadows, like a Pixar-style render. Slightly tilted angle, floating with a subtle red glow beneath.

Background: solid dark #0B0A0D
Style: 3D cartoon clay illustration, clean, minimal, premium
Colors: dark clay body, red #B91C1C accents on wheels and handle
No text. No watermarks.
Aspect ratio: 1:1
```

---

### 4. EDITORIAL / BRAND

**What it is:** Clean graphic compositions with space for typography, geometric shapes, brand colors. Think magazine covers, event banners, campaign headers.

**Best for:** Hero banners, social media covers, email headers, blog post headers, promotional banners, ad creatives.

**Rules:**
- Leave negative space for text overlay (at least 40% of the image)
- Use brand colors as dominant palette
- Geometric shapes (circles, lines, grids) as compositional elements
- Can combine with product mockups or lifestyle photography
- Asymmetric layouts preferred over centered

**Prompt structure:**
```
Clean editorial composition with [GEOMETRIC ELEMENTS: circles, diagonal lines, grid].
[SUBJECT if any: product mockup, person silhouette, abstract shape].
Large area of [NEGATIVE SPACE POSITION: left / top / right] for text overlay.
[COLOR PALETTE: brand colors with hex].

Style: editorial graphic design, magazine-quality, clean typography space
Colors: [primary], [secondary], [accent], [background]
No text. No watermarks.
Aspect ratio: [16:9 for banner / 1:1 for social / 9:16 for stories]
```

**Anti-patterns:**
- NO text in the image (add text in code/design tool)
- NO centered-everything compositions (asymmetry is more premium)
- NO more than 3 colors
- NO generic gradient backgrounds without purpose

---

### 5. UI SCREENSHOTS

**What it is:** Polished screenshots of the actual product UI, enhanced with device frames, shadows, callout annotations, and professional presentation.

**Best for:** Feature sections, comparison tables, documentation, app store listings, press kits.

**Rules:**
- Use REAL screenshots from the running app (not AI-generated UI)
- Add device frame mockup in post-production (Figma, browser frame)
- Add subtle drop shadow for depth
- Optional: annotate with callouts pointing to key features
- Dark mode screenshots for Ember Core pages

**This category is NOT generated with AI** — it's real screenshots enhanced with design tools. Steve doesn't write prompts for this. Camilo takes the screenshot, Valentina adds polish.

**Anti-patterns:**
- NO AI-generated fake UI (text will be wrong, layout will be off)
- NO screenshots with personal data visible
- NO screenshots with debug tools or dev mode indicators

---

### 6. ISOMETRIC ILLUSTRATIONS

**What it is:** Technical-looking illustrations with isometric perspective (30-degree angle). Geometric, structured, modern.

**Best for:** Architecture diagrams, feature explanations, process flows, technical documentation, how-it-works for complex features.

**Rules:**
- Consistent 30-degree isometric grid
- Flat colors with minimal shading
- Brand color palette only
- Can include simplified UI elements (cards, buttons, screens)
- Clean lines, no hand-drawn feel

**Prompt structure:**
```
Isometric illustration of [SCENE: workspace, data flow, connected devices].
[ELEMENTS: simplified screens, cards, arrows, icons].
Consistent 30-degree isometric perspective. Flat colors with minimal shading.

Background: solid dark #0B0A0D
Style: isometric technical illustration, flat colors, clean geometry, modern
Colors: [brand colors], [accent for highlights]
No text. No watermarks.
Aspect ratio: 16:9
```

**Anti-patterns:**
- NO realistic textures (it's flat illustration, not 3D)
- NO perspective distortion (must be true isometric)
- NO too many elements (cluttered = confusing)
- NO mixing isometric with non-isometric elements

---

### 7. DARK PRODUCT RENDERS

**What it is:** Premium product photography on dark backgrounds with dramatic lighting — colored rim lights, volumetric glow, cinematic shadows. The object looks expensive.

**Best for:** Feature highlights, pricing section accents, premium plan visuals, individual product showcases, header backgrounds.

**Rules:**
- Background: pure dark (#0B0A0D or #000000)
- Lighting: one key light + colored rim light (ember red for Tiendri)
- Material: the object should look tangible — metal, glass, matte finish
- Composition: centered or rule-of-thirds, generous negative space
- Mood: premium, exclusive, high-end

**Prompt structure:**
```
Premium product render of [OBJECT] on pure dark background.
[MATERIAL DESCRIPTION: brushed aluminum, matte ceramic, crystal glass].
Single key light from [DIRECTION], [COLORED] rim light tracing edges.
Dramatic shadows, cinematic depth of field. The object looks expensive and tangible.

Background: solid dark #0B0A0D
Style: premium dark product photography, studio lighting, cinematic
Colors: object [material colors], rim light [accent #B91C1C], shadow pure black
No text. No watermarks.
Aspect ratio: 1:1
```

**Anti-patterns:**
- NO bright or white backgrounds
- NO flat even lighting (needs dramatic shadows)
- NO multiple competing light sources
- NO cluttered compositions (one hero object)

**Example prompt:**
```
Premium product render of a sealed dark clay package with red ribbon and wax seal, floating on pure dark background #0B0A0D. Matte dark clay material with subtle surface texture. Single key light from upper-left creating dramatic shadow on right side. Deep red rim light (#B91C1C) tracing the edges of the ribbon and seal. Cinematic shallow depth of field.

Background: solid dark #0B0A0D
Style: premium dark product photography, studio lighting, cinematic
Colors: dark clay #1C1A22, red ribbon and seal #B91C1C, rim light red
No text. No watermarks.
Aspect ratio: 1:1
```

---

## Decision Matrix — Which Style for Which Context

| Page / Section | Primary Style | Secondary Style | Why |
|---------------|--------------|----------------|-----|
| **Landing Hero** | Editorial/Brand OR Lifestyle | Product Mockup | Hero needs emotional impact + space for headline |
| **How It Works** | 3D Clay/Cartoon | Product Mockup | Icons need to be playful and recognizable at small size |
| **Showcase** | UI Screenshots | Product Mockup | Show real product, not illustrations |
| **Pricing** | 3D Clay/Cartoon | Dark Product Render | Decorative accents, not heavy imagery |
| **Testimonials** | Lifestyle Photography | — | Real people = trust and relatability |
| **Auth (login/register)** | Dark Product Render | 3D Clay/Cartoon | Premium feel, video-friendly (keyframes) |
| **Dashboard empty states** | 3D Clay/Cartoon | Isometric | Friendly, not intimidating |
| **Onboarding** | Product Mockup | Lifestyle | Show what they're building + who they are |
| **Blog / Content** | Editorial/Brand | Lifestyle | Professional headers with text space |
| **Social Media** | Lifestyle + Editorial | Product Mockup | Authentic + branded |
| **Error pages (404, 500)** | 3D Clay/Cartoon | — | Lighten the mood |
| **Email marketing** | Lifestyle | Editorial/Brand | Personal connection + brand consistency |

## Colombian / LATAM Context Rules (ALL categories)

These rules apply to ANY image that includes people, settings, or cultural context:

1. **People diversity**: mestizo, afro-colombiano, indigenous. Mix of skin tones. NOT all-white or all-European faces.
2. **Settings**: Colombian malls (Centro Comercial), tiendas de barrio, calles con fachadas coloridas, cafes. NOT US suburbs or European cities.
3. **Devices**: Android phones (Samsung, Motorola, Xiaomi). Include iPhone but NOT exclusively.
4. **Currency**: Prices in COP ($49.900) when visible. NOT USD.
5. **Clothing**: casual colombiano — jeans, camisetas, blusas, tenis. NOT formal corporate.
6. **Food/drink**: tinto, empanadas, arepas, jugo de lulo. NOT Starbucks or burgers.
7. **Age range**: 25-45 (Tiendri's target demographic).
8. **Body types**: diverse. NOT only slim/fit models.
9. **Names**: Colombian names (Laura, Carlos, Ana, Diego). NOT John, Emma, Michael.

## Anti-AI Aesthetic Rules (ALL categories)

Every generated image MUST pass these checks:

| Check | What to look for | If it fails |
|-------|-----------------|-------------|
| **Skin texture** | Plastic, waxy, or poreless skin | Add "natural skin texture with pores and imperfections" to prompt |
| **Hands** | Wrong number of fingers, fused hands | Regenerate or crop hands out |
| **Symmetry** | Perfectly symmetrical face or composition | Add "slight natural asymmetry" to prompt |
| **Gradients** | Generic blue-to-purple gradient with no purpose | Remove gradient or use brand colors only |
| **Eyes** | Glassy, dead, or mismatched eyes | Regenerate |
| **Text** | Any text in the image is garbled | Never request text in AI images — add in post |
| **Lighting** | Flat, shadowless, evenly lit | Specify directional lighting in prompt |
| **Background** | Generic blur that looks AI-generated | Specify concrete background details |
| **Composition** | Perfectly centered everything | Use rule-of-thirds or asymmetric layout |
| **Clothing patterns** | Fabric patterns that melt or repeat wrongly | Use solid colors or simple patterns |

## Resources

- **AI Asset Pipeline**: See `ai/skills/ai-asset-pipeline/SKILL.md` for the generation workflow
- **Video Integration**: See `ai/skills/video-integration/SKILL.md` for integrating video assets
- **Design System**: See `ai/skills/design-system/SKILL.md` for Ember Core tokens
- **Steve's formats**: See `ai/agents/ai-content-specialist.md` for proven prompt structures
