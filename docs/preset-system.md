# Sistema de Presets de Estilo — Referencia Técnica Completa

> Fuente de verdad para el sistema de presets tal como fue implementado.
> Leer `docs/template-system.md` antes si no estás familiarizado con la arquitectura de templates.

---

## Tabla de contenidos

1. [Qué es un preset](#1-qué-es-un-preset)
2. [Arquitectura y flujo de datos](#2-arquitectura-y-flujo-de-datos)
3. [Los 13 presets](#3-los-13-presets)
4. [Tipo StylePreset — 6 sub-objetos](#4-tipo-stylepreset--6-sub-objetos)
5. [Tipos primitivos](#5-tipos-primitivos)
6. [DEFAULT_PRESET_VALUES](#6-default_preset_values)
7. [buildCssVars — 5 builders composables](#7-buildcssvars--5-builders-composables)
8. [Sistema de gene clusters](#8-sistema-de-gene-clusters)
9. [Guardrails — combinaciones prohibidas y dependencias](#9-guardrails--combinaciones-prohibidas-y-dependencias)
10. [Cómo agregar un nuevo preset](#10-cómo-agregar-un-nuevo-preset)

---

## 1. Qué es un preset

Un **preset de estilo** es una personalidad visual completa para una tienda. Es un bundle nombrado de tokens visuales que colectivamente producen un carácter estético coherente — compacto y directo, espacioso y editorial, vibrante y expresivo, etc.

Los presets **no reemplazan el sistema de paletas de colores**. Un merchant elige una paleta para colores y por separado elige un preset para personalidad. Los dos sistemas se componen: podés tener el preset "Galería" con cualquiera de las paletas de color disponibles.

### Invariante fundamental: los presets son universales

Los 13 presets están disponibles en todos los templates. Un preset es un patch de `StoreCustomization` — escribe sobre la capa de overrides del merchant, nunca sobre el `config.ts` del template.

---

## 2. Arquitectura y flujo de datos

```
Merchant selecciona preset
        |
        v
applyPreset(presetId, current: StoreCustomization) → StoreCustomization
        |
        | Escribe todos los campos de los 6 sub-objetos del preset
        |
        v
localStorage("tiendri_demo-store_customization")
        |
        v
resolveTemplateConfig(templateConfig, storeCustomization)
        | Shallow-merge; reenvía theme y layoutDensity
        |
        v
ResolvedStoreConfig
        |
        v
buildCssVars(resolvedConfig)
        | 5 builders composables
        |
        v
CSS custom properties en .template-scope
        |
        +-- --t-{color-key}            (colores)
        +-- --t-radius-*               (radio)
        +-- --font-body / --font-heading
        +-- --t-type-*                 (tipografía)
        +-- --t-space-*                (espaciado/densidad)
        +-- --t-fx-*                   (efectos y movimiento)
        +-- --t-grid-cols-*            (grid)
        +-- --t-container-max
        +-- --t-card-bg-mode
        |
        v
Componentes leen tokens vía CSS vars + decisiones estructurales vía props
```

### Archivos del sistema

```
src/lib/presets/
├── preset-types.ts      — StylePreset + 6 sub-interfaces + GeneClusterValues
├── presets.ts           — stylePresets: StylePreset[] — los 13 presets
├── preset-defaults.ts   — DEFAULT_PRESET_VALUES
├── guardrails.ts        — FORBIDDEN_COMBINATIONS (10) + DEPENDENCY_RULES (14)
└── apply-preset.ts      — applyPreset(presetId, current) → StoreCustomization

src/lib/
└── buildCssVars.ts      — 5 builders composables → CSS vars dict
```

---

## 3. Los 13 presets

| # | ID | Nombre | Densidad | Tipografía | Target stores |
|---|---|---|---|---|---|
| 1 | `galeria` | Galería | spacious | whisper-light | Joyería, boutique de diseño, arte |
| 2 | `boutique-elegante` | Boutique Elegante | spacious | elegant | Moda femenina, beauty, accesorios |
| 3 | `mercado-popular` | Mercado Popular | compact | functional | Abarrotes, variedades, supermercado |
| 4 | `neon-night` | Neon Night | balanced | modern | Gaming, sneakers, vida nocturna |
| 5 | `artesanal-rustico` | Artesanal Rústico | balanced | handcraft-mix | Artesanías, café especial, orgánicos |
| 6 | `corporate-catalog` | Corporate Catalog | compact | functional | Ferreterías, B2B, repuestos |
| 7 | `instagram-aesthetic` | Instagram Aesthetic | spacious | modern | Moda juvenil, accesorios trendy, lifestyle |
| 8 | `vintage-retro` | Vintage Retro | balanced | elegant | Ropa vintage, coleccionables, discos |
| 9 | `deportivo-energy` | Deportivo Energy | balanced | display-impact | Ropa deportiva, suplementos, equipamiento |
| 10 | `tech-premium` | Tech Premium | balanced | mono-geometric | Electrónica, gadgets, computadores |
| 11 | `tropical-vibrante` | Tropical Vibrante | balanced | warm | Moda caribeña, artesanías coloridas, frutas |
| 12 | `pop-juvenil` | Pop Juvenil | compact | display-impact | Cultura pop, stickers, merch |
| 13 | `editorial-lujo` | Editorial Lujo | spacious | whisper-light | Gastronomía especial, libros, arte y diseño |

### Gene clusters por preset

Cada preset tiene 6 genes anotados. La regla-de-4-de-6 garantiza que no dos presets compartan más de 4 de los 6 valores principales de genes — esto evita duplicación de personalidades.

| ID | G1 spatialArchitecture | G2 typographyPersonality | G3 imagePhilosophy | G4 navigationArchitecture | G5 decorationStrategy | G6 motionPersonality |
|---|---|---|---|---|---|---|
| `galeria` | monastic | whisper-serif | gallery-museum | minimal-float | subtle-lines | gentle-ease |
| `boutique-elegante` | editorial | editorial-serif | lifestyle-context | centered-elegant | subtle-lines | smooth-professional |
| `mercado-popular` | market-packed | bold-statement | catalog-clean | standard-functional | graphic-bold | bounce-playful |
| `neon-night` | balanced | bold-statement | hero-dominant | bottom-mobile-first | graphic-bold | dramatic-entrance |
| `artesanal-rustico` | balanced | handcraft | lifestyle-context | standard-functional | organic-texture | gentle-ease |
| `corporate-catalog` | dense-catalog | clean-sans | catalog-clean | sidebar-browse | none-zen | static-none |
| `instagram-aesthetic` | editorial | clean-sans | lifestyle-context | bottom-mobile-first | none-zen | smooth-professional |
| `vintage-retro` | balanced | editorial-serif | gallery-museum | centered-elegant | organic-texture | gentle-ease |
| `deportivo-energy` | balanced | loud-display | hero-dominant | standard-functional | geometric-accent | dramatic-entrance |
| `tech-premium` | balanced | clean-sans | catalog-clean | minimal-float | subtle-lines | smooth-professional |
| `tropical-vibrante` | balanced | bold-statement | lifestyle-context | standard-functional | graphic-bold | bounce-playful |
| `pop-juvenil` | dense-catalog | loud-display | hero-dominant | bottom-mobile-first | graphic-bold | dramatic-entrance |
| `editorial-lujo` | editorial | whisper-serif | lifestyle-context | minimal-float | subtle-lines | smooth-professional |

---

## 4. Tipo StylePreset — 6 sub-objetos

Definido en `src/lib/presets/preset-types.ts`. Un `StylePreset` tiene 46 propiedades distribuidas en 6 sub-objetos:

```typescript
export interface StylePreset {
  id: string;
  name: string;
  description: string;
  targetStores: string[];
  genes?: GeneClusterValues;
  typography: TypographyTokens;   // 11 propiedades
  layout: LayoutTokens;           //  8 propiedades
  cards: CardTokens;              //  6 propiedades
  effects: EffectTokens;          //  5 propiedades
  color: ColorTokens;             //  5 propiedades
  chrome: ChromeTokens;           //  5 propiedades
}
```

### Sub-objeto 1: `typography` (TypographyTokens)

| Campo | Tipo | Descripción |
|---|---|---|
| `fontPair` | `FontPairKey` | Clave de la pareja tipográfica |
| `headingWeight` | `number` | Peso del encabezado (300–900) |
| `headingScale` | `HeadingScale` | Escala del encabezado ("md" \| "lg" \| "xl" \| "2xl") |
| `headingTracking` | `string` | Letter-spacing del encabezado (ej: "-0.02em") |
| `headingTransform` | `"none" \| "uppercase"` | Text-transform del encabezado |
| `headingFontStyle` | `"normal" \| "italic"` | Estilo de fuente del encabezado |
| `headingDecoration` | `HeadingDecoration` | Decoración del encabezado |
| `bodyFontSize` | `BodyFontSize` | Tamaño del cuerpo de texto |
| `bodyLineHeight` | `BodyLineHeight` | Altura de línea del cuerpo |
| `displaySize` | `DisplaySize` | Tamaño del display hero |
| `cardTextAlign` | `CardTextAlign` | Alineación de texto en tarjetas |

### Sub-objeto 2: `layout` (LayoutTokens)

| Campo | Tipo | Descripción |
|---|---|---|
| `density` | `DensityPreset` | Nivel de densidad de espaciado |
| `gridColumnsMobile` | `GridColumnsMobile` | Columnas en móvil (1 o 2) |
| `gridColumnsDesktop` | `GridColumnsDesktop` | Columnas en desktop (2–5) |
| `containerMaxWidth` | `ContainerMaxWidth` | Ancho máximo del contenedor |
| `cardImageRatio` | `CardImageRatio` | Proporción de imagen en tarjeta |
| `cardPadding` | `CardPadding` | Padding interno de tarjeta |
| `headerStyle` | `HeaderStyle` | Estilo del header |
| `bannerHeight` | `BannerHeight` | Altura del banner principal |

### Sub-objeto 3: `cards` (CardTokens)

| Campo | Tipo | Descripción |
|---|---|---|
| `cardStyle` | `CardStyle` | Estilo visual de la tarjeta |
| `cardHover` | `CardHover` | Efecto hover de la tarjeta |
| `cardBorderTreatment` | `CardBorderTreatment` | Tratamiento del borde de la tarjeta |
| `imageFit` | `ImageFit` | Cómo ajusta la imagen dentro de la tarjeta |
| `imageBorderRadius` | `ImageBorderRadius` | Radio de borde de la imagen |
| `imageHoverEffect` | `ImageHoverEffect` | Efecto hover sobre la imagen |

### Sub-objeto 4: `effects` (EffectTokens)

| Campo | Tipo | Descripción |
|---|---|---|
| `animationLevel` | `AnimationLevel` | Nivel de animaciones (none/subtle/full) |
| `shadowStyle` | `ShadowStyle` | Estilo de sombras (neutral/hue-tinted) |
| `shadowElevation` | `ShadowElevation` | Elevación de sombra (none/xs/sm/md/lg/xl) |
| `transitionSpeed` | `TransitionSpeed` | Velocidad de transiciones |
| `transitionEasing` | `TransitionEasing` | Curva de aceleración |

### Sub-objeto 5: `color` (ColorTokens)

| Campo | Tipo | Descripción |
|---|---|---|
| `colorStrategy` | `ColorStrategy` | Estrategia de color (monotone/duotone/accent-pop/gradient) |
| `backgroundTreatment` | `BackgroundTreatment` | Tratamiento del fondo |
| `cardBackground` | `CardBackground` | Color de fondo de tarjeta |
| `imageOverlayHover` | `ImageOverlayHover` | Overlay al hacer hover sobre imagen |
| `accentDistribution` | `AccentDistribution` | Dónde se aplica el color de acento |

### Sub-objeto 6: `chrome` (ChromeTokens)

| Campo | Tipo | Descripción |
|---|---|---|
| `buttonStyle` | `ButtonStyle` | Estilo de botones (filled/outlined/ghost) |
| `badgeStyle` | `BadgeStyle` | Forma de badges (pill/square) |
| `priceDisplay` | `PriceDisplay` | Prominencia del precio (prominent/standard/subtle) |
| `borderRadiusScale` | `BorderRadiusScale` | Escala global de radio de bordes |
| `dividerStyle` | `DividerStyle` | Estilo de separadores |

---

## 5. Tipos primitivos

Definidos en `src/types/templates/primitives.ts`. Todos los valores de los 6 sub-objetos usan estos tipos:

| Tipo | Valores |
|---|---|
| `FontPairKey` | `"modern"` \| `"warm"` \| `"elegant"` \| `"functional"` \| `"mono-geometric"` \| `"display-impact"` \| `"whisper-light"` \| `"handcraft-mix"` |
| `DensityLevel` / `DensityPreset` | `"compact"` \| `"balanced"` \| `"spacious"` |
| `CardStyle` | `"flat"` \| `"shadow"` \| `"bordered"` \| `"elevated"` |
| `CardHover` / `HoverEffect` | `"none"` \| `"lift"` \| `"scale"` \| `"glow"` |
| `CardImageRatio` / `ImageRatio` | `"square"` \| `"portrait"` \| `"wide"` |
| `AnimationLevel` | `"none"` \| `"subtle"` \| `"full"` |
| `ShadowStyle` | `"neutral"` \| `"hue-tinted"` |
| `ShadowElevation` | `"none"` \| `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` |
| `TransitionSpeed` | `"instant"` \| `"fast"` \| `"normal"` \| `"slow"` \| `"very-slow"` |
| `TransitionEasing` | `"linear"` \| `"ease"` \| `"ease-in-out"` \| `"spring"` |
| `ButtonStyle` | `"filled"` \| `"outlined"` \| `"ghost"` |
| `BadgeStyle` | `"pill"` \| `"square"` |
| `PriceDisplay` | `"prominent"` \| `"standard"` \| `"subtle"` |
| `BorderRadiusScale` | `"sharp"` \| `"xs"` \| `"sm"` \| `"md"` \| `"lg"` \| `"xl"` \| `"pill"` |
| `CardBackground` | `"white"` \| `"surface"` \| `"transparent"` \| `"primary-tint"` |
| `ColorStrategy` | `"monotone"` \| `"duotone"` \| `"accent-pop"` \| `"gradient"` |
| `BackgroundTreatment` | `"solid"` \| `"subtle-gradient"` \| `"pattern"` |
| `AccentDistribution` | `"buttons-only"` \| `"badges-and-buttons"` \| `"everywhere"` \| `"minimal"` |
| `HeadingDecoration` | `"none"` \| `"underline"` \| `"overline"` \| `"highlight"` |
| `BodyFontSize` | `"sm"` \| `"base"` \| `"lg"` |
| `BodyLineHeight` | `"tight"` \| `"normal"` \| `"relaxed"` \| `"loose"` |
| `DisplaySize` | `"md"` \| `"lg"` \| `"xl"` \| `"2xl"` |
| `HeadingScale` | `"md"` \| `"lg"` \| `"xl"` \| `"2xl"` |
| `CardPadding` | `"none"` \| `"tight"` \| `"normal"` \| `"spacious"` |
| `ContainerMaxWidth` | `"narrow"` \| `"medium"` \| `"wide"` \| `"full"` |
| `ImageFit` | `"cover"` \| `"contain"` |
| `ImageBorderRadius` | `"same-as-card"` \| `"none"` \| `"rounded"` \| `"circle"` |
| `ImageHoverEffect` | `"none"` \| `"zoom"` \| `"slide-up"` \| `"grayscale-to-color"` \| `"brightness"` |
| `CardBorderTreatment` | `"none"` \| `"subtle"` \| `"prominent"` \| `"left-accent"` \| `"top-accent"` |
| `DividerStyle` | `"none"` \| `"line"` \| `"dots"` \| `"dash"` |
| `GridColumnsMobile` | `1` \| `2` |
| `GridColumnsDesktop` | `2` \| `3` \| `4` \| `5` |

---

## 6. DEFAULT_PRESET_VALUES

Definido en `src/lib/presets/preset-defaults.ts`. Es el fallback para cada campo cuando un preset no especifica un valor. También lo usa `buildCssVars` para resolver valores de los 5 builders cuando `config.*` es `undefined`.

| Sub-objeto | Valores por defecto |
|---|---|
| `typography` | fontPair: "modern", headingWeight: 600, headingScale: "lg", headingTracking: "-0.01em", headingTransform: "none", bodyFontSize: "base", bodyLineHeight: "normal", displaySize: "lg", cardTextAlign: "left" |
| `layout` | density: "balanced", gridColumnsMobile: 2, gridColumnsDesktop: 3, containerMaxWidth: "medium", cardImageRatio: "square", cardPadding: "normal", headerStyle: "standard", bannerHeight: "normal" |
| `cards` | cardStyle: "elevated", cardHover: "lift", cardBorderTreatment: "none", imageFit: "cover", imageBorderRadius: "same-as-card", imageHoverEffect: "zoom" |
| `effects` | animationLevel: "subtle", shadowStyle: "neutral", shadowElevation: "sm", transitionSpeed: "normal", transitionEasing: "ease" |
| `color` | colorStrategy: "accent-pop", backgroundTreatment: "solid", cardBackground: "white", imageOverlayHover: "none", accentDistribution: "badges-and-buttons" |
| `chrome` | buttonStyle: "filled", badgeStyle: "pill", priceDisplay: "standard", borderRadiusScale: "md", dividerStyle: "none" |

---

## 7. buildCssVars — 5 builders composables

Definido en `src/lib/buildCssVars.ts`. Toma un `ResolvedStoreConfig` y devuelve un `Record<string, string>` de CSS custom properties listo para usar como `style` prop.

La función principal llama a 5 builders especializados:

### Builder 1: `buildEffectVars(effects)` → `--t-fx-*`

Convierte `EffectTokens` en tokens de movimiento e interacción.

| CSS var | Fuente |
|---|---|
| `--t-fx-duration` | `TRANSITION_SPEED_MAP[transitionSpeed]` |
| `--t-fx-easing` | `TRANSITION_EASING_MAP[transitionEasing]` |
| `--t-fx-hover-scale` | `ANIMATION_HOVER_SCALE[animationLevel]` |
| `--t-fx-hover-lift` | `ANIMATION_HOVER_LIFT[animationLevel]` |
| `--t-fx-hover-glow-spread` | `ANIMATION_HOVER_GLOW_SPREAD[animationLevel]` |
| `--t-fx-hover-glow-opacity` | `ANIMATION_HOVER_GLOW_OPACITY[animationLevel]` |
| `--t-fx-enter-distance` | `ANIMATION_ENTER_DISTANCE[animationLevel]` |
| `--t-fx-enter-duration` | `ANIMATION_ENTER_DURATION[animationLevel]` |
| `--t-shadow-scale` | `SHADOW_ELEVATION_MAP[shadowElevation]` |

### Builder 2: `buildTypographyExtendedVars(typography)` → `--t-type-*`

Convierte `TypographyTokens` en tokens de tipografía extendida.

| CSS var | Fuente |
|---|---|
| `--t-type-body-size` | `BODY_FONT_SIZE_MAP[bodyFontSize]` |
| `--t-type-body-line-height` | `BODY_LINE_HEIGHT_MAP[bodyLineHeight]` |
| `--t-type-body-weight` | `"400"` (fijo) |
| `--t-type-display-size` | `DISPLAY_SIZE_MAP[displaySize]` |
| `--t-type-display-weight` | `headingWeight` |
| `--t-type-display-tracking` | `headingTracking` |
| `--t-type-heading-style` | `headingFontStyle` |
| `--t-type-paragraph-max-width` | `"65ch"` (fijo) |
| `--t-type-card-align` | `cardTextAlign` |

Además, cuando `config.theme?.typography` está presente, `buildCssVars` emite directamente:

| CSS var | Fuente |
|---|---|
| `--t-type-heading-weight` | `typography.headingWeight` |
| `--t-type-heading-size` | scaleMap[typography.headingScale] (md→1.5rem, lg→2rem, xl→2.5rem, 2xl→3.5rem) |
| `--t-type-heading-tracking` | `typography.headingTracking` |
| `--t-type-heading-transform` | `typography.headingTransform` |

### Builder 3: `buildCardVars(cards, borderRadiusScale)` → `--t-radius-*`, `--t-card-padding`

Convierte `CardTokens` + `BorderRadiusScale` en tokens de tarjeta.

| CSS var | Fuente |
|---|---|
| `--t-radius-base` | `BORDER_RADIUS_SCALE_MAP[borderRadiusScale]` |
| `--t-radius-sm` | `calc(var(--t-radius-base) * 0.5)` |
| `--t-radius-lg` | `calc(var(--t-radius-base) * 2)` o `9999px` si pill |
| `--t-radius-image` | `IMAGE_BORDER_RADIUS_MAP[imageBorderRadius]` |
| `--t-card-padding` | `CARD_PADDING_MAP[cardPadding]` |

### Builder 4: `buildLayoutVars(layout)` → `--t-grid-cols-*`, `--t-container-max`, `--t-image-fit`

Convierte `LayoutTokens` en tokens de layout.

| CSS var | Fuente |
|---|---|
| `--t-grid-cols-mobile` | `gridColumnsMobile` |
| `--t-grid-cols-desktop` | `gridColumnsDesktop` |
| `--t-container-max` | `CONTAINER_MAX_WIDTH_MAP[containerMaxWidth]` |
| `--t-image-fit` | `IMAGE_FIT_VAR_MAP[imageFit]` |

### Builder 5: `buildColorVars(color)` → `--t-card-bg-mode`

Convierte `ColorTokens` en el modo de fondo de tarjeta.

| CSS var | Fuente |
|---|---|
| `--t-card-bg-mode` | `CARD_BACKGROUND_MAP[cardBackground]` |

### Tokens de densidad/espaciado (emitidos directamente)

El builder de densidad no es una función separada — está inline en `buildCssVars`. Lee `config.layoutDensity` y emite:

| Densidad | `--t-space-section` | `--t-space-card` | `--t-space-item` | `--t-space-gap` |
|---|---|---|---|---|
| `"compact"` | `2rem` | `0.75rem` | `0.5rem` | `0.75rem` |
| `"balanced"` | `3rem` | `1rem` | `0.75rem` | `1rem` |
| `"spacious"` | `5rem` | `1.5rem` | `1rem` | `1.5rem` |

### Tokens de color (emitidos directamente)

- Todos los campos en `config.colors` se emiten como `--t-{kebab-case-key}` (ej: `cardBg` → `--t-card-bg`).
- `config.colors.primary` genera también `--t-primary-rgb` como `"R, G, B"` para `rgba(var(--t-primary-rgb), 0.10)`.
- Todos los campos en `config.radius` se emiten como `--t-radius-{key}`.
- Fonts: `--font-body`, `--font-sans`, `--font-heading`, `--template-heading-font`.

---

## 8. Sistema de gene clusters

Cada preset declara 6 genes en el sub-objeto `genes: GeneClusterValues`:

```typescript
export interface GeneClusterValues {
  spatialArchitecture: string;    // G1: qué tan denso/abierto
  typographyPersonality: string;  // G2: personalidad tipográfica
  imagePhilosophy: string;        // G3: rol de las imágenes
  navigationArchitecture: string; // G4: patrón de navegación
  decorationStrategy: string;     // G5: decoración y ornamentación
  motionPersonality: string;      // G6: comportamiento del movimiento
}
```

### Regla-de-4-de-6

No dos presets pueden compartir más de 4 de los 6 valores principales de genes. Esto garantiza que cada preset tenga una personalidad distinguible de todos los demás.

### Regla de polarización

Cada preset debe tener al menos 3 genes con valores extremos (no valores medios/neutros). Esto evita presets "beige" sin carácter.

---

## 9. Guardrails — combinaciones prohibidas y dependencias

Definidos en `src/lib/presets/guardrails.ts`.

### 10 combinaciones prohibidas (FORBIDDEN_COMBINATIONS)

| ID | Campos afectados | Descripción | Mensaje |
|---|---|---|---|
| `flat-no-shadow` | `cards.cardStyle` + `effects.shadowElevation` | Tarjeta plana no puede tener sombra elevada (solo "none" o "xs") | "Combinación no permitida: tarjeta plana no puede tener sombra elevada." |
| `overlay-needs-cover` | `cards.cardContentLayout` + `cards.imageFit` | Overlay de card requiere imageFit "cover" | "Combinación no permitida: overlay de tarjeta requiere imageFit 'cover', no 'contain'." |
| `no-uppercase-italic` | `typography.headingTransform` + `typography.headingFontStyle` | Uppercase + italic se ve mal en español | "Combinación no permitida: títulos en mayúsculas e itálica se ven mal en español." |
| `radius-consistency` | `chrome.borderRadiusScale` + `chrome.badgeStyle` | Bordes "sharp" son incompatibles con badges redondeados | "Combinación no permitida: escala de bordes 'sharp' no es compatible con badges redondeados." |
| `pattern-bg-noise` | `color.backgroundTreatment` + `color.cardBackground` | Fondo de patrón + tarjeta transparente genera ruido visual | "Combinación no permitida: fondo con patrón y tarjetas transparentes generan ruido visual." |
| `slow-full-animation` | `effects.transitionSpeed` + `effects.animationLevel` | Velocidad "very-slow" + animación "full" hace la tienda difícil de usar | "Combinación no permitida: velocidad muy lenta con animaciones completas hace la tienda difícil de usar." |
| `ghost-no-price` | `chrome.buttonStyle` + `chrome.priceDisplay` | Botón ghost + precio subtle elimina el CTA | "Combinación no permitida: botón fantasma y precio sutil eliminan el llamado a la acción." |
| `sidebyside-needs-single-col` | `cards.cardContentLayout` + `layout.gridColumnsMobile` | Layout lado a lado requiere 1 columna en móvil | "Combinación no permitida: tarjeta lado a lado requiere 1 columna en móvil." |
| `lineheight-density-conflict` | `typography.bodyLineHeight` + `layout.density` | Interlineado "loose" + densidad "compact" es inconsistente | "Combinación no permitida: interlineado suelto y densidad compacta generan inconsistencia visual." |
| `circle-wide-distortion` | `cards.imageBorderRadius` + `layout.cardImageRatio` | Imagen circular + proporción wide produce distorsión | "Combinación no permitida: imagen circular con proporción ancha produce distorsión." |

### 14 reglas de dependencia (DEPENDENCY_RULES)

Se dividen en reglas **hard** (deshabilitan controles) y **soft** (muestran advertencias).

#### Hard rules (6)

| ID | Trigger | Campo afectado | Valores permitidos |
|---|---|---|---|
| `flat-limits-elevation` | `cards.cardStyle === "flat"` | `effects.shadowElevation` | `["none", "xs"]` |
| `overlay-forces-cover` | `cards.cardContentLayout === "overlay-*"` | `cards.imageFit` | `["cover"]` |
| `no-animation-no-hover` | `effects.animationLevel === "none"` | `cards.cardHover` | `["none"]` |
| `sidebyside-mobile-cols` | `cards.cardContentLayout === "side-by-side"` | `layout.gridColumnsMobile` | `["1"]` |
| `instant-speed-hides-easing` | `effects.transitionSpeed === "instant"` | `effects.transitionEasing` | `[]` (deshabilitado) |
| `text-only-hero-hides-banner` | `layout.heroVariant === "text-only"` | `layout.bannerHeight` | `[]` (deshabilitado) |

#### Soft rules (8)

| ID | Trigger | Campo afectado | Recomendación |
|---|---|---|---|
| `sharp-radius-image-hint` | `chrome.borderRadiusScale === "sharp"` | `cards.imageBorderRadius` | `["none", "same-as-card"]` |
| `pill-radius-badge-hint` | `chrome.borderRadiusScale === "pill"` | `chrome.badgeStyle` | `["pill"]` |
| `pattern-bg-card-hint` | `color.backgroundTreatment === "pattern"` | `color.cardBackground` | `["white", "surface"]` |
| `highlight-heading-normal` | `typography.headingDecoration === "highlight"` | `typography.headingFontStyle` | `["normal"]` |
| `monotone-accent-hint` | `color.colorStrategy === "monotone"` | `color.accentDistribution` | `["minimal", "buttons-only"]` |
| `on-hover-only-needs-animation` | `chrome.addToCartStyle === "on-hover-only"` | `effects.animationLevel` | `["subtle", "full"]` |
| `loose-lineheight-density-hint` | `typography.bodyLineHeight === "loose"` | `layout.density` | `["balanced", "spacious"]` |
| `circle-image-square-ratio` | `cards.imageBorderRadius === "circle"` | `layout.cardImageRatio` | `["square"]` |

---

## 10. Cómo agregar un nuevo preset

### Paso 1: Verificar unicidad de genes

Antes de definir el preset, listar los 6 genes y verificar que no comparta más de 4 valores con ningún preset existente (ver tabla de gene clusters en sección 3). Si hay violación, cambiar al menos 2 genes.

### Paso 2: Verificar que no viola guardrails

Revisar las 10 `FORBIDDEN_COMBINATIONS` en `src/lib/presets/guardrails.ts`. El check de cada combinación es una función `check(preset)` que podés ejecutar manualmente contra el objeto de tu nuevo preset antes de agregarlo.

### Paso 3: Agregar el preset a `stylePresets`

En `src/lib/presets/presets.ts`, agregar el nuevo objeto al array `stylePresets`:

```typescript
{
  id: "mi-nuevo-preset",        // kebab-case, único
  name: "Mi Nuevo Preset",      // nombre visible al merchant
  description: "Una línea que describe la personalidad.",
  targetStores: ["Tipo A", "Tipo B"],
  genes: {
    spatialArchitecture: "...",
    typographyPersonality: "...",
    imagePhilosophy: "...",
    navigationArchitecture: "...",
    decorationStrategy: "...",
    motionPersonality: "...",
  },
  typography: { /* TypographyTokens */ },
  layout: { /* LayoutTokens */ },
  cards: { /* CardTokens */ },
  effects: { /* EffectTokens */ },
  color: { /* ColorTokens */ },
  chrome: { /* ChromeTokens */ },
}
```

Todos los campos son opcionales en `StylePreset` (tienen `?`). Los campos omitidos se resuelven con `DEFAULT_PRESET_VALUES` en `buildCssVars`.

### Paso 4: Verificar tipos

```bash
npx tsc --noEmit
```

TypeScript verificará que todos los valores usados existen en los tipos union correspondientes.

### Paso 5: (Opcional) Agregar a un vibe

Si el preset corresponde a una categoría de vibes del onboarding, agregarlo en `src/lib/onboarding/vibe-preset-map.ts` al array `presetIds` del vibe correspondiente.

---

_Última actualización: 2026-06-06_
_Basado en: `src/lib/presets/presets.ts`, `preset-types.ts`, `preset-defaults.ts`, `guardrails.ts`, `src/lib/buildCssVars.ts`, `src/types/templates/primitives.ts`_
