---
name: gpt-image-motionsite
description: >
  Genera prompts de alta calidad para GPT Image 2 orientados a piezas gráficas tipo motionsite — hero sections, backgrounds, product showcases, 3D illustrations, editorial layouts.
  Trigger: Cuando se necesite crear prompts para GPT Image 2, generar piezas gráficas web, diseñar assets para landing pages, crear ilustraciones 3D clay/cartoon, o producir material visual tipo motionsite.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# GPT Image 2 — Prompts para Piezas Motionsite

Esta skill es de uso exclusivo de **Steve** (AI Content Specialist). Carga esta skill cuando Valentina haya definido el concepto visual y necesites traducirlo a prompts listos para pegar en ChatGPT.

---

## Cuándo Usar Esta Skill

- Crear el visual principal de un hero section
- Generar ilustraciones 3D clay/cartoon (style signature de Tiendri)
- Producir backgrounds y texturas para secciones
- Crear piezas de marketing para landing pages
- Generar assets editoriales con contexto LATAM
- Ilustraciones isométricas de concepto tecnológico
- Sets de íconos con estilo visual consistente

**No usás esta skill cuando:** la pieza final la construye Camilo en código (glassmorphism, gradientes CSS, overlays), o cuando se trata de screenshots reales del producto (eso no es IA).

---

## Arquitectura de un Prompt

Todo prompt de calidad sigue esta estructura. El orden importa: GPT Image 2 da más peso a lo que aparece primero.

```
[SUJETO] + [ESTILO] + [COMPOSICIÓN] + [ILUMINACIÓN] + [CÁMARA] + [COLORES] + [MOOD] + [DETALLES] + [NEGATIVO]
```

### Desglose de cada elemento

| Elemento | Qué incluir | Ejemplo bueno | Ejemplo malo |
|----------|-------------|---------------|--------------|
| **SUJETO** | Qué es el objeto exacto — sin ambigüedad | `A 3D cartoon shopping bag, rounded handles, sealed top` | `A bag` |
| **ESTILO** | Referencia de render conocida | `Pixar-style clay illustration, matte finish, no specular highlights` | `3D style` |
| **COMPOSICIÓN** | Posición, ángulo, espacio en blanco | `Slightly tilted 12 degrees, centered with 30% padding all sides, floating` | `Centered` |
| **ILUMINACIÓN** | Fuente, dirección, color | `Single overhead key light, red rim light from lower-right at 20% intensity` | `Well lit` |
| **CÁMARA** | Distancia, perspectiva, profundidad | `Slight low-angle shot, shallow depth of field, f/2.8 equivalent` | `Camera angle` |
| **COLORES** | HEX exactos para cada parte del objeto | `Body #1C1A22, handles #B91C1C, interior cream #F5F0E8` | `Dark colors with red accents` |
| **MOOD** | Una o dos palabras que definen el tono | `Premium, minimal, restrained` | `Cool looking` |
| **DETALLES** | Textura de superficie, materiales, acabados | `Soft matte clay surface with very subtle subsurface scattering` | `Looks nice` |
| **NEGATIVO** | Qué NO querés en la imagen | `No text, no watermarks, no glossy plastic, no lens flare` | (omitido) |

### Regla de longitud

- **Mínimo:** 4 oraciones + línea de colores + línea de negativo
- **Máximo:** 8 oraciones — si excedés esto, el modelo empieza a ignorar partes
- **Nunca:** usar bullet points dentro del prompt — GPT Image 2 los lee como texto literal

---

## Categorías con Templates

### Categoría 1 — Hero Section / Banner Full-Width

**Cuándo usarlo:** visual principal de una landing page, banner de campaña, encabezado de sección importante.

**Objetivo:** impacto visual inmediato, espacio para texto superpuesto en código, fondo oscuro que se integre con la paleta Ember Core.

**Template:**

```
[DESCRIPCIÓN DEL ELEMENTO VISUAL PRINCIPAL — objeto, escena o composición abstracta], [MATERIALES Y TEXTURAS ESPECÍFICAS].
Asymmetric composition with [POSICIÓN DEL ELEMENTO: left/right/bottom] placement, leaving [PORCENTAJE: 40-60]% of [LADO: left/right] side as clean dark space for text overlay.
[ILUMINACIÓN: e.g. Single dramatic key light from upper-left, deep red rim light (#B91C1C) tracing the contours, volumetric light rays at 10% opacity].
[MOOD: e.g. Cinematic, tense, premium, editorial].

Background: solid dark #0B0A0D
Colors: [COLOR HEX DE CADA PARTE]
No text. No watermarks. No lens flare. No generic gradients.
Aspect ratio: 16:9
```

**Variables a completar:**
- `[ELEMENTO VISUAL]` — el objeto, forma abstracta o escena
- `[MATERIALES]` — matte, brushed metal, frosted glass, clay
- `[PORCENTAJE y LADO]` — cuánto espacio dejás libre para el titular
- `[ILUMINACIÓN]` — siempre especificar dirección y color del rim light
- `[MOOD]` — 1-2 palabras que definen el tono emocional

**Ejemplo completamente resuelto:**

```
A sleek dark smartphone floating at a 15-degree tilt, its screen emitting a soft ember-red glow (#B91C1C) that illuminates the surrounding darkness. The device has a brushed dark titanium finish (#1C1C1E), rounded corners, minimal bezel. Asymmetric composition with the phone placed right-center, leaving 55% of the left side as clean dark space for headline and CTA.
Single dramatic key light from upper-left at 70% intensity, deep red rim light tracing the left edge of the phone at 30% intensity, no ambient fill — hard directional shadows.
Cinematic, premium, restrained.

Background: solid dark #0B0A0D
Colors: phone body #1C1C1E, screen glow #B91C1C at 60% opacity, rim light #B91C1C
No text. No watermarks. No lens flare. No UI visible on screen.
Aspect ratio: 16:9
```

**Ratio recomendado:** 16:9 (1792×1024 en GPT Image 2)

---

### Categoría 2 — Ilustración 3D Clay/Cartoon (ESTILO SIGNATURE DE TIENDRI)

**Cuándo usarlo:** íconos de steps, decoración de secciones, empty states, error pages, ilustraciones de features. Esta es la identidad visual más fuerte de Tiendri — tratala con cuidado.

**El look que queremos:** Pixar-quality 3D, matte clay finish, rounded everywhere, soft key shadow, red rim glow. NO brilloso. NO realista. NO texturizado. NO texto.

**Template:**

```
A cute stylized 3D cartoon [OBJETO ESPECÍFICO — nunca "thing" o "item"], [DESCRIPCIÓN DE FORMA: rounded edges, compact proportions, simplified silhouette].
[COLOR DEL CUERPO: e.g. Light cream #F5F0E8 / Dark clay #1C1A22] body with [COLOR DE ACENTO #B91C1C] accent details on [PARTES ESPECÍFICAS: wheels, handle, strap, buttons].
Smooth matte clay surface with very soft subsurface scattering, no specular highlights, no glossy finish.
[ÁNGULO: Slightly tilted 12-15 degrees / Top-down 20 degrees / 3/4 view], floating with a soft directional shadow directly beneath.
Overhead key light, soft red rim light (#B91C1C) tracing the accent parts at 25% intensity.

Background: solid dark #0B0A0D
Style: 3D cartoon clay illustration, Pixar-quality render, clean, minimal, premium
Colors: body [HEX], accents #B91C1C on [partes]
No text. No watermarks. No glossy plastic. No realistic textures. No reflections.
Aspect ratio: 1:1
```

**Variables a completar:**
- `[OBJETO ESPECÍFICO]` — "shopping cart with mesh sides and rubber wheels", no "cart"
- `[FORMA]` — describir proporciones: "compact and squat, roughly cubic form"
- `[COLOR DEL CUERPO]` — usar #F5F0E8 para objetos claros, #1C1A22 para oscuros
- `[PARTES CON ACENTO]` — ser específico: "wheels, axle caps, and the top handle bar"
- `[ÁNGULO]` — preferir 3/4 view para la mayoría, top-down para íconos

**Ejemplos completamente resueltos:**

**Store icon (ícono de tienda):**
```
A cute stylized 3D cartoon storefront building, compact and squat with rounded corners, a small awning, and a tiny display window. Light cream #F5F0E8 walls with deep red #B91C1C awning and door frame. Smooth matte clay surface, no specular highlights, no glossy finish. Slightly tilted 12 degrees, floating with a soft directional shadow directly beneath. Single overhead key light, soft red rim light (#B91C1C) tracing the awning edges at 25% intensity.

Background: solid dark #0B0A0D
Style: 3D cartoon clay illustration, Pixar-quality render, clean, minimal, premium
Colors: walls #F5F0E8, awning and door #B91C1C, window frame #1C1A22
No text. No watermarks. No glossy plastic. No signs or logos on the building.
Aspect ratio: 1:1
```

**WhatsApp/orders icon (ícono de pedidos):**
```
A cute stylized 3D cartoon speech bubble with a rounded tail pointing lower-left, compact oval form. Light cream #F5F0E8 body with a small checkmark detail in deep red #B91C1C on its surface. Smooth matte clay surface, very soft subsurface scattering, absolutely no specular highlights. Tilted 10 degrees, floating with a soft shadow beneath. Overhead key light, red rim light tracing the tail edge at 20% intensity.

Background: solid dark #0B0A0D
Style: 3D cartoon clay illustration, Pixar-quality render, minimal, premium
Colors: body #F5F0E8, checkmark accent #B91C1C
No text inside bubble. No watermarks. No glossy plastic.
Aspect ratio: 1:1
```

**Rocket icon (ícono de lanzamiento/crecimiento):**
```
A cute stylized 3D cartoon rocket, compact cylindrical body with rounded nose cone and two small stubby fins. White body #FFFFFF with deep red #B91C1C stripe around the mid-section and red fin tips. Smooth matte clay surface, no specular highlights. Tilted 15 degrees, nose pointing upper-right, floating with a subtle red flame trail visible below the nozzle. Overhead key light, red rim light tracing the stripe and fins at 30% intensity.

Background: solid dark #0B0A0D
Style: 3D cartoon clay illustration, Pixar-quality render, clean, premium
Colors: body #FFFFFF, stripe and fins #B91C1C, flame #B91C1C fading to transparent
No text. No watermarks. No glossy plastic. No realistic fire.
Aspect ratio: 1:1
```

**Ratio recomendado:** 1:1 (1024×1024) para íconos. 16:9 si va en hero.

**Checklist de calidad pre-entrega para 3D Clay:**
- [ ] ¿El acabado es matte? Si se ve brilloso/plástico → iterá con "absolutely no specular highlights, chalky matte finish"
- [ ] ¿Los acentos rojos están en partes específicas, no en todo el objeto?
- [ ] ¿El objeto flota con sombra suave debajo?
- [ ] ¿El fondo es exactamente #0B0A0D, sin gradientes?
- [ ] ¿No hay texto ni logos en el objeto?
- [ ] ¿Las proporciones son estilizadas (no fotorrealistas)?

---

### Categoría 3 — Product Showcase

**Cuándo usarlo:** sección de features, pricing tiers, comparaciones, cualquier contexto donde un objeto físico o digital debe verse premium y deseable.

**Objetivo:** el objeto debe verse como en una campaña publicitaria de Apple o Sony — iluminación dramática, materiales tangibles, fondo oscuro puro.

**Template:**

```
Premium [TIPO: studio product photograph / product render] of [OBJETO ESPECÍFICO con material: brushed titanium card, matte ceramic box, polished crystal orb], centered on pure dark background.
[MATERIAL DESCRIPTION: e.g. The surface shows fine brushed grain lines catching the key light, edges catch a secondary red light].
Single key light from [DIRECCIÓN: upper-left / upper-right] creating dramatic directional shadow. [COLOR: Deep red #B91C1C] rim light tracing [BORDES ESPECÍFICOS: the top edge and left side] at [INTENSIDAD: 35]% intensity.
[PROFUNDIDAD: Extremely shallow depth of field, the front face sharp and the far edges slightly soft].
Premium, exclusive, desirable.

Background: solid dark #0B0A0D, pure black shadow zone on right/bottom
Style: premium dark studio product photography, dramatic lighting, cinematic
Colors: object [HEX], rim light #B91C1C, shadow pure black
No text. No watermarks. No environment reflections. No other objects in frame.
Aspect ratio: 1:1
```

**Ejemplo resuelto (plan card de pricing):**

```
Premium studio product render of a sleek dark physical card, slightly thicker than a credit card, matte obsidian surface (#0F0F12) with a subtle diamond-pattern micro-texture visible only under raking light. The card is centered and slightly elevated, casting a long shadow on the surface below.
Single key light from upper-left at 65% intensity, revealing the micro-texture across the top half. Deep red rim light (#B91C1C) tracing the top edge and left side at 40% intensity, creating a razor-thin line of color.
Extremely shallow depth of field, the front corner of the card tack-sharp and the far corners softly blurred.
Premium, exclusive, restrained.

Background: solid dark #0B0A0D, pure black shadow beneath the card
Style: premium dark product photography, studio lighting, editorial
Colors: card surface #0F0F12, micro-texture highlights #1E1E2A, rim light #B91C1C
No text. No logos. No watermarks. No reflections from environment.
Aspect ratio: 1:1
```

**Ratio recomendado:** 1:1 para cards, 16:9 para banners de features.

---

### Categoría 4 — Background / Textura de Sección

**Cuándo usarlo:** fondo de una sección que Camilo va a superponer con contenido. La imagen NO debe ser el protagonista — es el escenario.

**Regla de oro:** si la imagen distrae del contenido que va encima, está mal. Debe ser SUTIL.

**Template:**

```
Abstract dark [TIPO DE TEXTURA: noise pattern / geometric mesh / subtle grain / layered depth field], extremely low contrast, barely perceptible.
[COMPOSICIÓN: e.g. Centered vignette with the texture concentrated in the upper third, fading to pure black at the bottom].
[COLOR: The texture picks up very faint traces of deep red #B91C1C only at the absolute top edge].
No focal point, no subject, no depth of field.

Background: solid dark #0B0A0D
Style: abstract texture, photographic noise, subtle, non-distracting
Colors: base #0B0A0D, texture at maximum 8% lighter (#181620), accent traces #B91C1C at 5% opacity
No objects. No gradients with color. No text. No watermarks.
Aspect ratio: 16:9
```

**Tipos de textura y cuándo usarlos:**

| Tipo | Cuándo | Intensidad |
|------|--------|-----------|
| `photographic noise / film grain` | Cualquier sección oscura que necesita profundidad | Muy baja (3-8%) |
| `geometric hexagonal mesh` | Secciones tech, features, integraciones | Baja (5-12%), solo bordes |
| `organic cloud-like dark nebula` | Hero, secciones de impacto emocional | Media (10-20%), en bordes |
| `diagonal grid lines` | Secciones de datos, pricing, tablas | Muy baja (4-8%) |

**Ejemplo resuelto:**

```
Abstract dark photographic film grain texture, very fine and uniform, extremely low contrast barely distinguishable from solid black. Slight vignette concentrated at the four corners fading toward the center. At the very top edge, an almost imperceptible blush of deep red (#B91C1C) at approximately 6% opacity, as if a light source exists far above the frame.
No focal point. No objects. No defined shapes. No gradient transitions.

Background: solid dark #0B0A0D
Style: abstract texture, fine film grain, non-distracting, ambient
Colors: base #0B0A0D, grain #121018 at 5% contrast delta, top edge trace #B91C1C 6% opacity
No objects. No shapes. No gradients with color. No text. No watermarks.
Aspect ratio: 16:9
```

**Ratio recomendado:** 16:9. Generá a 1792×1024 y Camilo la usa como `background-image` con `opacity: 0.4-0.7`.

---

### Categoría 5 — Editorial / Lifestyle LATAM

**Cuándo usarlo:** testimonials, secciones de caso de éxito, about, marketing con personas reales, contexto humano del producto.

**Regla crítica de autenticidad:** el resultado no puede verse como una foto de stock. Si tiene "stock photo energy" → iterá.

**Template:**

```
Editorial lifestyle photograph of [DESCRIPCIÓN ESPECÍFICA: age 28, Colombian woman with natural curly dark hair pulled back, wearing an olive linen blouse], [ACCIÓN ESPECÍFICA Y NATURAL: leaning over a wooden table showing her phone screen to a friend, mid-conversation, not posing].
[SETTING ESPECÍFICO: A small Colombian café, worn wooden furniture, exposed brick wall with local art, afternoon sunlight streaming through a side window].
[ILUMINACIÓN: Warm afternoon side lighting, natural and uncontrolled, slight lens exposure variation].
Shallow depth of field, background softly blurred, subject occupies right 40% of frame, large negative space on left.
Authentic, warm, unstaged.

Style: editorial lifestyle photography, Latin American context, reportage aesthetic
Colors: warm earth tones, natural skin tones, no color grading filter
No text. No watermarks. No posed smiles. No stock photo aesthetic.
Aspect ratio: 16:9
```

**Reglas LATAM obligatorias (aplican a TODOS los editoriales):**

1. **Rostros:** mestizo, afrocolombianas, indígenas — mix de tonos de piel. NUNCA foto caucásica homogénea
2. **Settings:** café con tinto, tienda de barrio, centro comercial colombiano, plaza de mercado, calle con fachadas coloridas — NUNCA suburbio norteamericano
3. **Dispositivos:** Android (Samsung, Motorola, Xiaomi) — puede incluir iPhone pero no exclusivamente
4. **Ropa:** casual aspiracional — jeans, camisetas, blusas de lino, tenis — NUNCA traje corporativo
5. **Expresiones:** genuinas, en movimiento, en conversación — NUNCA sonrisa perfecta frontal a cámara
6. **Edad:** 25-45 años (demografía objetivo de Tiendri)
7. **Cuerpos:** diversidad real — NUNCA solo cuerpos de modelo fitness
8. **Precios visibles:** en COP ($49.900) si la pantalla del teléfono es visible

**Anti-AI checklist específico para editoriales:**
- [ ] ¿La piel tiene textura natural (poros, imperfecciones sutiles)?
- [ ] ¿Las manos son naturales? Si están visibles, ¿tienen los dedos correctos?
- [ ] ¿La composición es asimétrica?
- [ ] ¿La iluminación tiene dirección clara (no flat)?
- [ ] ¿Los ojos tienen vida (no glassy/muertos)?
- [ ] ¿Se ve como foto de magazín o como foto de stock? Tiene que ser magazín.

---

### Categoría 6 — Isométrica / Tech Illustration

**Cuándo usarlo:** diagramas de arquitectura, flujos de cómo funciona el producto, features técnicas, onboarding steps con concepto más abstracto.

**El look:** flat isométrico limpio, sin sombras dramáticas, colores de la paleta, líneas geométricas precisas.

**Template:**

```
Isometric illustration of [ESCENA: e.g. a small digital storefront connected to multiple smartphones via dotted lines, each phone showing an order notification].
[ELEMENTOS: nombre y color de cada elemento — store icon in dark clay #1C1A22, connection lines in red #B91C1C, phone icons in medium gray #2A2832].
True 30-degree isometric perspective, all elements aligned to the same grid. Flat colors, no gradients, minimal shading (only cast shadows on the ground plane).
[DENSIDAD: Sparse, only 3-4 elements with generous spacing / Medium density, interconnected system].

Background: solid dark #0B0A0D
Style: isometric technical illustration, flat design, clean geometry, vector-like precision
Colors: [HEX de cada elemento], connecting lines #B91C1C, shadow #050407
No text. No labels. No watermarks. No perspective distortion. No hand-drawn feel.
Aspect ratio: 16:9
```

**Error más común:** mezclar perspectiva isométrica con perspectiva normal. Si algún elemento no está en el mismo grid de 30 grados → iterá con "all elements must align to the EXACT SAME 30-degree isometric grid, no exceptions".

**Ejemplo resuelto:**

```
Isometric illustration of a compact digital commerce scene: a small dark storefront building (left foreground), three dotted connection lines extending from it to three smartphones (right, center-right, upper-right), each phone displaying a green notification badge.
Store in dark clay #1C1A22 with a tiny red awning #B91C1C. Connection lines dotted red #B91C1C. Smartphones in medium dark gray #2A2832 with small red badges. Ground plane extremely subtle, gray at 15% opacity.
True 30-degree isometric perspective, all elements share the same vanishing points. Flat colors with only cast shadows on the ground plane.
Sparse composition, 40% of the frame is negative space (upper-left and lower-right).

Background: solid dark #0B0A0D
Style: isometric technical illustration, flat design, clean geometry, vector precision
Colors: store #1C1A22, awning #B91C1C, phones #2A2832, connection lines #B91C1C, badges #B91C1C
No text. No labels. No watermarks. Strict isometric grid only.
Aspect ratio: 16:9
```

**Ratio recomendado:** 16:9 para escenas completas. 1:1 para íconos isométricos individuales.

---

### Categoría 7 — Set de Íconos / Elementos Consistentes

**Cuándo usarlo:** cuando necesitás MÚLTIPLES imágenes que deben verse como un set cohesivo (3 íconos de steps, 4 íconos de features, etc.).

**El desafío:** GPT Image 2 no tiene memoria entre prompts. Cada imagen es independiente. Para mantener consistencia:

**Protocolo de set:**

1. **Generá el primer ícono** con un prompt completo y detallado
2. **Evaluá el resultado** — si no quedó bien, iterá ANTES de continuar
3. **Una vez conforme con el primero,** usá este template para los siguientes:

```
[PROMPT COMPLETO DEL ÍCONO NUEVO, idéntico en estructura al primero]

IMPORTANT: This image must visually match a specific reference style:
- Same lighting setup: overhead key light, red rim at 25% intensity
- Same camera angle: [ÁNGULO DEL PRIMERO — copialo exactamente]
- Same finish: matte clay, absolutely no specular highlights
- Same background: solid dark #0B0A0D
- Same scale: the object occupies approximately 60% of the frame
- Same color palette: body [COLOR DEL PRIMERO], accents #B91C1C

Aspect ratio: 1:1
```

4. **Si hay diferencias visuales entre íconos:** regenerá los que no matchean en la MISMA sesión de ChatGPT, haciendo referencia a los anteriores: "Generate this exactly matching the previous image's lighting, camera angle, and finish."

**Ejemplo de prompt para segundo ícono de un set:**

```
A cute stylized 3D cartoon shopping cart, compact form with mesh side panels and two rubber wheels. Dark clay #1C1A22 body with deep red #B91C1C wheel accents and a red handle bar. Smooth matte clay surface, no specular highlights. Slightly tilted 12 degrees (same angle as previous), floating with a soft directional shadow directly beneath.

IMPORTANT: This image must visually match a specific reference style:
- Same lighting: overhead key light, red rim at 25% intensity
- Same camera angle: slightly tilted 12 degrees, 3/4 view
- Same finish: matte clay, absolutely no specular highlights
- Same background: solid dark #0B0A0D
- Same scale: object occupies approximately 60% of the frame
- Same color palette: dark clay body, red #B91C1C accents

No text. No watermarks. No glossy plastic.
Aspect ratio: 1:1
```

---

## Guía de Aspect Ratios

| Caso de Uso | Ratio | Tamaño en GPT Image 2 | Cuándo |
|-------------|-------|----------------------|--------|
| Hero banner / landing hero | 16:9 | 1792×1024 | Secciones hero de landing, banners full-width |
| Íconos / product cards / social | 1:1 | 1024×1024 | Íconos, cards de features, redes sociales |
| Mobile hero / stories | 9:16 | 1024×1792 | Versión mobile del hero, Instagram stories |
| Product showcase / catalog | 4:5 | — | Showcase de productos individuales |
| Section background | 16:9 | 1792×1024 | Siempre — se adapta con CSS |

**Cómo especificarlo en el prompt:** siempre terminar el prompt con `Aspect ratio: 16:9` (o el ratio que corresponda). GPT Image 2 respeta esta instrucción cuando está al final.

---

## Consistencia Visual en un Serie

Cuando generás múltiples imágenes para el mismo proyecto (mismo lanzamiento, misma sección), estas reglas mantienen coherencia:

### Reglas de Consistencia

**1. Misma sesión de ChatGPT**
Siempre generá todas las imágenes de un set en la misma sesión. GPT Image 2 tiene memoria de conversación — puede referenciar lo generado antes. Empezar una nueva sesión rompe la consistencia.

**2. Iluminación anclada**
Define la iluminación en el primer prompt y copiala exactamente en los siguientes:
```
[Setup de iluminación que se repite:]
Single overhead key light at 65% intensity, deep red rim light (#B91C1C) tracing [BORDES RELEVANTES] at 25% intensity, no fill light, hard directional shadow.
```

**3. Cámara anclada**
Define el ángulo y copialo:
- 3D clay íconos: `slightly tilted 12 degrees, 3/4 view, object centered`
- Product renders: `centered, slight low-angle, shallow depth of field`
- Isométrico: `true 30-degree isometric, top-right vanishing point`

**4. Colores con HEX siempre**
Nunca escribas "red" o "dark". Siempre `#B91C1C` o `#0B0A0D`. Un número hexadecimal es una instrucción; un nombre de color es una sugerencia.

**5. Fondo siempre solid dark**
`Background: solid dark #0B0A0D` — esta línea va en TODOS los prompts de Tiendri. Sin excepciones. Si Camilo necesita el asset sobre fondo claro, lo ajustamos post-generación con `mix-blend-mode`.

### Cómo Referenciar Ember Core en Prompts

**Paleta Ember Core:**
- Fondo principal: `#0B0A0D` — siempre como background
- Rojo acento: `#B91C1C` — rim lights, detalles, íconos de acento
- Clay oscuro: `#1C1A22` — cuerpos de objetos 3D oscuros
- Crema: `#F5F0E8` — cuerpos de objetos 3D claros
- Gris medio: `#2A2832` — elementos secundarios

**Combinaciones aprobadas:**

| Objeto | Cuerpo | Acento | Rim light |
|--------|--------|--------|-----------|
| Ícono oscuro | `#1C1A22` | `#B91C1C` | `#B91C1C` a 25% |
| Ícono claro | `#F5F0E8` | `#B91C1C` | `#B91C1C` a 20% |
| Product render | material natural | `#B91C1C` | `#B91C1C` a 35-40% |
| Background | `#0B0A0D` | `#B91C1C` a 5-8% | — |

**Keywords de mood que matchean Tiendri:** `premium`, `restrained`, `dark`, `minimal`, `precise`, `editorial`, `cinematic`, `tech`, `professional`

**Keywords PROHIBIDAS en prompts de Tiendri:** `playful`, `colorful`, `bright`, `fun`, `cheerful`, `childish`, `busy`, `cluttered`, `neon`, `rainbow`, `pastels`

---

## Anti-Patrones: Cómo Evitar Output Genérico de IA

Los modelos de imágenes tienen tendencias fuertes. Estos son los patterns que producen resultados que "se notan que son de IA" y cómo contrarrestarlos:

### Patrones a Evitar Activamente

| Anti-patrón | Por qué ocurre | Cómo evitarlo |
|-------------|----------------|---------------|
| **Gradiente genérico azul-púrpura** | El modelo los genera por defecto en temas "tech" | `No generic color gradients. Background: solid dark #0B0A0D only.` |
| **Superficies demasiado lisas y brillosas** | Default del modelo para objetos 3D | `Absolutely no specular highlights. Chalky matte finish.` |
| **Composición perfectamente simétrica** | El modelo tiende al equilibrio | Especificar explícitamente `asymmetric composition, [objeto] offset to [lado]` |
| **Lens flare en todas partes** | Asociado con "premium" para el modelo | `No lens flare. No light leaks.` — siempre en el negativo |
| **Glow de neón en todo** | Default para temas "dark tech" | `No neon glow. Single precise rim light at [%] intensity.` |
| **Texto ilegible en el objeto** | GPT Image 2 intenta escribir texto cuando se lo pedís | NUNCA pedir texto en la imagen. Siempre `No text in image.` |
| **Smiles perfectos y poses corporativas** | Stock photo aesthetic del modelo | `Candid, mid-movement, not posed. Natural asymmetric expression.` |
| **Fondo genérico blureado** | Default cuando no especificás | Siempre especificar el background exacto con HEX |
| **Manos con dedos incorrectos** | El modelo falla en manos complejas | Evitar manos en primer plano. Si son necesarias: `crop below shoulders` o `hands not visible` |
| **Iluminación flat sin sombras** | Default del modelo es iluminación suave pareja | Especificar siempre `single key light from [dirección], hard directional shadow` |

### El Negativo Prompt — Siempre Incluirlo

Siempre cerrar el prompt con una línea de negativos específica. No pongas todos los negativos posibles — solo los relevantes para el tipo de imagen:

**Para 3D clay:** `No text. No watermarks. No glossy plastic. No specular highlights. No realistic textures. No text on the object.`

**Para editoriales:** `No text. No watermarks. No posed smiles. No stock photo aesthetic. No US/European suburban settings. No all-white cast.`

**Para product renders:** `No text. No watermarks. No environment reflections. No lens flare. No multiple light sources. No white background.`

**Para backgrounds:** `No objects. No shapes. No text. No watermarks. No colored gradients. No focal point.`

---

## Protocolo de Iteración

### Cuántas iteraciones esperar

| Categoría | Iteraciones típicas | Máximo antes de cambiar enfoque |
|-----------|--------------------|---------------------------------|
| 3D Clay | 2-3 | 4 — si en 4 no funciona, simplificá el objeto |
| Product Render | 1-2 | 3 |
| Hero / Editorial | 3-4 | 5 — los editoriales son los más difíciles |
| Background/Textura | 1 | 2 |
| Isométrico | 2-4 | 5 — la perspectiva exacta es difícil de controlar |

### Proceso de Iteración

**Round 1 — Prompt base:**
Generá con el template de la categoría. Evaluá contra el checklist anti-AI.

**Round 2 — Identificar qué falla:**
Identificá el problema específico — NO regeneres con el mismo prompt esperando resultado diferente. El problema más común y su fix:

| Problema | Fix en el prompt |
|----------|-----------------|
| Demasiado brilloso | Agregar `chalky matte finish, zero specularity` |
| Composición centrada | Agregar `asymmetric, [objeto] placed [posición] with [%] negative space on [lado]` |
| Fondo con gradiente | `Background: pure solid #0B0A0D with zero variation, no gradients at all` |
| Iluminación flat | `Single hard key light from upper-left only, no fill lights, strong directional shadow` |
| Parece stock photo | `Editorial reportage aesthetic, candid moment, documentary photography style` |
| Perspectiva isométrica incorrecta | `Strict true isometric projection, 30-degree elevation angle, parallel projection lines` |

**Round 3 — Refinar:**
Incorporá los fixes del round 2 y mantenés todo lo que sí funcionó del prompt anterior.

**Si en Round 3 sigue fallando:**
No iterés más con el mismo enfoque. Probá:
- Cambiar el objeto a una versión más simple
- Cambiar la categoría (ej: de editorial a 3D clay)
- Reportá al CTO con los 3 intentos documentados

### Lockear fórmulas exitosas

Cuando un prompt produce exactamente lo que necesitás, lo guardás como template:

```
ai/prompts/images/
├── clay-icons/
│   ├── store-icon-v1.md     # Fórmula que funcionó
│   ├── cart-icon-v1.md
│   └── rocket-icon-v1.md
├── hero-visuals/
│   ├── phone-hero-v1.md
│   └── abstract-hero-v1.md
└── backgrounds/
    └── grain-texture-v1.md
```

Formato de archivo guardado:

```markdown
# [nombre-del-asset]

## Prompt final (copy-paste ready)
[prompt completo]

## Por qué funciona
- [Key insight 1]
- [Key insight 2]

## Parámetros críticos (no modificar)
- [parámetro que hace que funcione]

## Variables seguras de cambiar
- [qué podés cambiar sin romper el estilo]
```

---

## Workflow Completo de Steve

**Antes de empezar:** leer `ai/skills/design-system/` para confirmar los tokens actuales de Ember Core.

**Paso 1 — Recibir brief de Valentina**
Valentina entrega el concepto: qué se muestra, qué comunica, qué sección de la página. Steve NO decide esto.

**Paso 2 — Definir categoría**
Elegir entre las 7 categorías de arriba. Si dudás, preguntale al CTO.

**Paso 3 — Seleccionar template**
Copiar el template de la categoría correspondiente.

**Paso 4 — Completar variables**
Llenar todos los `[BRACKETS]` con valores específicos. Nunca dejar un bracket vacío o genérico.

**Paso 5 — Agregar negativo prompt**
Añadir la línea de negativos específica para el tipo de imagen.

**Paso 6 — Verificar colores**
Confirmar que todos los colores tienen HEX. Buscar en el texto "red", "dark", "white" sin HEX y reemplazarlos.

**Paso 7 — Generar en ChatGPT**
Pegar el prompt completo. Generar 4 variaciones si la interfaz lo permite.

**Paso 8 — Evaluar contra checklist anti-AI**
Revisar la tabla de anti-patrones. Identificar qué no funciona si algo falla.

**Paso 9 — Iterar si es necesario**
Máximo 3 rounds. Ver protocolo de iteración arriba.

**Paso 10 — Guardar prompt exitoso**
Guardar en `ai/prompts/images/[categoría]/[nombre]-v1.md`. El CTO decide si el asset se promueve a `public/`.

---

## Recursos

- Design system y tokens actuales: `ai/skills/design-system/SKILL.md`
- Categorías generales de imagen (7 estilos): `ai/skills/graphic-design/SKILL.md`
- Pipeline completo Valentina → Steve → CTO → Camilo: `ai/skills/ai-asset-pipeline/SKILL.md`
- Prompts ya guardados y probados: `ai/prompts/images/` (se crea al primer asset exitoso)
