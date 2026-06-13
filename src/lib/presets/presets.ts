// Preset System — 13 archetype style presets for Tiendri V2
// Each preset is a named bundle of visual tokens that collectively produce
// a coherent aesthetic. Gene clusters (G1-G6) are annotated per preset.
// Rule-of-4-of-6: no two presets share more than 4 of 6 primary gene values.
// Polarization rule: each preset has ≥3 genes at extreme values.

import type { StylePreset } from "./preset-types";

export const stylePresets: StylePreset[] = [
  // ── 1. galeria ──────────────────────────────────────────────────────────────
  // G1: Monastic | G2: Whisper serif | G3: Gallery/museum | G4: Minimal float
  // G5: Subtle lines | G6: Gentle ease
  // Extremes: whisper-light font, monastic spacing, minimal float nav
  {
    id: "galeria",
    name: "Galería",
    description: "El producto como obra de arte. Silencio y luz.",
    targetStores: ["Joyería", "Boutique de diseño", "Arte"],
    typography: {
      fontPair: "whisper-light",
      headingWeight: 300,
      headingScale: "2xl",
      headingTracking: "-0.04em",
      headingTransform: "none",
      headingFontStyle: "italic",
      headingDecoration: "underline",
      bodyFontSize: "base",
      bodyLineHeight: "relaxed",
      displaySize: "2xl",
      cardTextAlign: "center",
    },
    layout: {
      density: "spacious",
      gridColumnsMobile: 1,
      gridColumnsDesktop: 2,
      containerMaxWidth: "narrow",
      cardImageRatio: "wide",
      cardPadding: "spacious",
      headerStyle: "minimal",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "flat",
      cardHover: "none",
      cardBorderTreatment: "none",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "grayscale-to-color",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "neutral",
      shadowElevation: "xs",
      transitionSpeed: "slow",
      transitionEasing: "ease-in-out",
    },
    color: {
      colorStrategy: "monotone",
      backgroundTreatment: "solid",
      cardBackground: "white",
      imageOverlayHover: "dark-scrim",
      accentDistribution: "minimal",
    },
    chrome: {
      buttonStyle: "ghost",
      badgeStyle: "square",
      priceDisplay: "standard",
      borderRadiusScale: "sharp",
      dividerStyle: "line",
    },
  },

  // ── 2. boutique-elegante ─────────────────────────────────────────────────────
  // G1: Editorial | G2: Editorial serif | G3: Lifestyle/context | G4: Centered elegant
  // G5: Subtle lines | G6: Smooth professional
  // Extremes: editorial spacing, centered nav, 2xl heading scale
  {
    id: "boutique-elegante",
    name: "Boutique Elegante",
    description: "Lujo accesible con calidez dorada. La marca es la experiencia.",
    targetStores: ["Moda femenina", "Beauty", "Accesorios"],
    typography: {
      fontPair: "elegant",
      headingWeight: 400,
      headingScale: "2xl",
      headingTracking: "-0.03em",
      headingTransform: "none",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "base",
      bodyLineHeight: "relaxed",
      displaySize: "xl",
      cardTextAlign: "center",
    },
    layout: {
      density: "spacious",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "medium",
      cardImageRatio: "portrait",
      cardPadding: "spacious",
      headerStyle: "centered",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "flat",
      cardHover: "scale",
      cardBorderTreatment: "none",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "brightness",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "hue-tinted",
      shadowElevation: "none",
      transitionSpeed: "normal",
      transitionEasing: "ease-in-out",
    },
    color: {
      colorStrategy: "accent-pop",
      backgroundTreatment: "solid",
      cardBackground: "white",
      imageOverlayHover: "color-tint",
      accentDistribution: "badges-and-buttons",
    },
    chrome: {
      buttonStyle: "outlined",
      badgeStyle: "pill",
      priceDisplay: "subtle",
      borderRadiusScale: "xs",
      dividerStyle: "line",
    },
  },

  // ── 3. mercado-popular ───────────────────────────────────────────────────────
  // G1: Market packed | G2: Bold statement | G3: Catalog/clean | G4: Standard functional
  // G5: Graphic bold | G6: Bounce playful
  // Extremes: packed density, bold graphic decoration, bounce motion
  {
    id: "mercado-popular",
    name: "Mercado Popular",
    description: "La energía del mercado en tu pantalla. Directo al producto.",
    targetStores: ["Abarrotes", "Variedades", "Supermercado"],
    typography: {
      fontPair: "functional",
      headingWeight: 900,
      headingScale: "md",
      headingTracking: "-0.01em",
      headingTransform: "uppercase",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "sm",
      bodyLineHeight: "tight",
      displaySize: "md",
      cardTextAlign: "left",
    },
    layout: {
      density: "compact",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 5,
      containerMaxWidth: "full",
      cardImageRatio: "square",
      cardPadding: "tight",
      headerStyle: "standard",
      bannerHeight: "short",
    },
    cards: {
      cardStyle: "bordered",
      cardHover: "lift",
      cardBorderTreatment: "none",
      imageFit: "contain",
      imageBorderRadius: "none",
      imageHoverEffect: "zoom",
    },
    effects: {
      animationLevel: "full",
      shadowStyle: "neutral",
      shadowElevation: "xs",
      transitionSpeed: "fast",
      transitionEasing: "spring",
    },
    color: {
      colorStrategy: "accent-pop",
      backgroundTreatment: "solid",
      cardBackground: "white",
      imageOverlayHover: "none",
      accentDistribution: "everywhere",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "square",
      priceDisplay: "prominent",
      borderRadiusScale: "sm",
      dividerStyle: "none",
    },
  },

  // ── 4. neon-night ────────────────────────────────────────────────────────────
  // G1: Balanced | G2: Bold statement | G3: Hero/dominant | G4: Bottom mobile-first
  // G5: Graphic bold | G6: Dramatic entrance
  // Differs from deportivo-energy: G4 bottom-mobile (not standard), G5 graphic-bold (not geometric)
  //   → shares only G1, G2, G3, G6 = 4/6 → passes rule-of-4-of-6 exactly
  // Extremes: bottom nav, dramatic entrance, glow hover, gradient background
  {
    id: "neon-night",
    name: "Neon Night",
    description: "La tienda que no duerme. Potencia y resplandor en cada píxel.",
    targetStores: ["Gaming", "Sneakers", "Vida nocturna"],
    typography: {
      fontPair: "modern",
      headingWeight: 800,
      headingScale: "xl",
      headingTracking: "-0.02em",
      headingTransform: "uppercase",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "base",
      bodyLineHeight: "normal",
      displaySize: "xl",
      cardTextAlign: "left",
    },
    layout: {
      density: "balanced",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "wide",
      cardImageRatio: "portrait",
      cardPadding: "tight",
      headerStyle: "minimal",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "elevated",
      cardHover: "glow",
      cardBorderTreatment: "top-accent",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "zoom",
    },
    effects: {
      animationLevel: "full",
      shadowStyle: "hue-tinted",
      shadowElevation: "xl",
      transitionSpeed: "fast",
      transitionEasing: "spring",
    },
    color: {
      colorStrategy: "accent-pop",
      backgroundTreatment: "subtle-gradient",
      cardBackground: "surface",
      imageOverlayHover: "color-tint",
      accentDistribution: "everywhere",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "square",
      priceDisplay: "prominent",
      borderRadiusScale: "sm",
      dividerStyle: "none",
    },
  },

  // ── 5. artesanal-rustico ──────────────────────────────────────────────────────
  // G1: Balanced | G2: Handcraft | G3: Lifestyle/context | G4: Standard functional
  // G5: Organic texture | G6: Gentle ease
  // Extremes: handcraft font, organic texture, warm relaxed body text
  {
    id: "artesanal-rustico",
    name: "Artesanal Rústico",
    description: "Hecho con manos colombianas. La historia detrás del producto.",
    targetStores: ["Artesanías", "Café especial", "Orgánicos"],
    typography: {
      fontPair: "handcraft-mix",
      headingWeight: 400,
      headingScale: "xl",
      headingTracking: "0.01em",
      headingTransform: "none",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "base",
      bodyLineHeight: "relaxed",
      displaySize: "lg",
      cardTextAlign: "left",
    },
    layout: {
      density: "balanced",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "medium",
      cardImageRatio: "portrait",
      cardPadding: "normal",
      headerStyle: "centered",
      bannerHeight: "normal",
    },
    cards: {
      cardStyle: "shadow",
      cardHover: "lift",
      cardBorderTreatment: "subtle",
      imageFit: "cover",
      imageBorderRadius: "rounded",
      imageHoverEffect: "brightness",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "hue-tinted",
      shadowElevation: "sm",
      transitionSpeed: "normal",
      transitionEasing: "ease",
    },
    color: {
      colorStrategy: "duotone",
      backgroundTreatment: "pattern",
      cardBackground: "white",
      imageOverlayHover: "none",
      accentDistribution: "badges-and-buttons",
    },
    chrome: {
      buttonStyle: "outlined",
      badgeStyle: "pill",
      priceDisplay: "standard",
      borderRadiusScale: "lg",
      dividerStyle: "dots",
    },
  },

  // ── 6. corporate-catalog ─────────────────────────────────────────────────────
  // G1: Dense catalog | G2: Clean sans | G3: Catalog/clean | G4: Sidebar browse
  // G5: None/zen | G6: Static/none
  // Extremes: sidebar nav, zero animation, zen decoration
  {
    id: "corporate-catalog",
    name: "Corporate Catalog",
    description: "Datos primero, decisión rápida. Catálogo profesional.",
    targetStores: ["Ferreterías", "B2B", "Repuestos"],
    typography: {
      fontPair: "functional",
      headingWeight: 700,
      headingScale: "md",
      headingTracking: "0em",
      headingTransform: "uppercase",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "sm",
      bodyLineHeight: "tight",
      displaySize: "md",
      cardTextAlign: "left",
    },
    layout: {
      density: "compact",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 4,
      containerMaxWidth: "full",
      cardImageRatio: "square",
      cardPadding: "tight",
      headerStyle: "standard",
      bannerHeight: "short",
    },
    cards: {
      cardStyle: "bordered",
      cardHover: "none",
      cardBorderTreatment: "none",
      imageFit: "contain",
      imageBorderRadius: "none",
      imageHoverEffect: "none",
    },
    effects: {
      animationLevel: "none",
      shadowStyle: "neutral",
      shadowElevation: "none",
      transitionSpeed: "instant",
      transitionEasing: "linear",
    },
    color: {
      colorStrategy: "monotone",
      backgroundTreatment: "solid",
      cardBackground: "white",
      imageOverlayHover: "none",
      accentDistribution: "buttons-only",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "square",
      priceDisplay: "prominent",
      borderRadiusScale: "xs",
      dividerStyle: "line",
    },
  },

  // ── 7. instagram-aesthetic ───────────────────────────────────────────────────
  // G1: Editorial | G2: Clean sans | G3: Lifestyle/context | G4: Bottom mobile-first
  // G5: None/zen | G6: Smooth professional
  // Differs from boutique-elegante: G4 bottom-mobile (not centered), G5 none/zen (not subtle-lines)
  //   → 2 genes differ from boutique → passes rule-of-4-of-6 (max 4 shared)
  // Extremes: bottom nav on mobile, pill radius extreme, zero decoration
  {
    id: "instagram-aesthetic",
    name: "Instagram Aesthetic",
    description: "Tu feed, tu tienda. Visual-first para la generación digital.",
    targetStores: ["Moda juvenil", "Accesorios trendy", "Lifestyle"],
    typography: {
      fontPair: "modern",
      headingWeight: 600,
      headingScale: "lg",
      headingTracking: "-0.02em",
      headingTransform: "none",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "base",
      bodyLineHeight: "relaxed",
      displaySize: "lg",
      cardTextAlign: "center",
    },
    layout: {
      density: "spacious",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "medium",
      cardImageRatio: "portrait",
      cardPadding: "none",
      headerStyle: "centered",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "flat",
      cardHover: "scale",
      cardBorderTreatment: "none",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "slide-up",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "neutral",
      shadowElevation: "none",
      transitionSpeed: "normal",
      transitionEasing: "ease-in-out",
    },
    color: {
      colorStrategy: "duotone",
      backgroundTreatment: "solid",
      cardBackground: "white",
      imageOverlayHover: "color-tint",
      accentDistribution: "minimal",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "pill",
      priceDisplay: "standard",
      borderRadiusScale: "pill",
      dividerStyle: "none",
    },
  },

  // ── 8. vintage-retro ─────────────────────────────────────────────────────────
  // G1: Balanced | G2: Editorial serif | G3: Gallery/museum | G4: Centered elegant
  // G5: Organic texture | G6: Gentle ease
  // Extremes: overline heading decoration, pattern background, italic heading style
  {
    id: "vintage-retro",
    name: "Vintage Retro",
    description: "El sabor de antes, el precio de hoy. Nostalgia con carácter.",
    targetStores: ["Ropa vintage", "Coleccionables", "Discos"],
    typography: {
      fontPair: "elegant",
      headingWeight: 700,
      headingScale: "lg",
      headingTracking: "-0.01em",
      headingTransform: "none",
      headingFontStyle: "italic",
      headingDecoration: "overline",
      bodyFontSize: "base",
      bodyLineHeight: "relaxed",
      displaySize: "lg",
      cardTextAlign: "center",
    },
    layout: {
      density: "balanced",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "medium",
      cardImageRatio: "square",
      cardPadding: "normal",
      headerStyle: "centered",
      bannerHeight: "normal",
    },
    cards: {
      cardStyle: "shadow",
      cardHover: "lift",
      cardBorderTreatment: "prominent",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "grayscale-to-color",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "hue-tinted",
      shadowElevation: "md",
      transitionSpeed: "slow",
      transitionEasing: "ease",
    },
    color: {
      colorStrategy: "duotone",
      backgroundTreatment: "pattern",
      cardBackground: "surface",
      imageOverlayHover: "dark-scrim",
      accentDistribution: "badges-and-buttons",
    },
    chrome: {
      buttonStyle: "outlined",
      badgeStyle: "square",
      priceDisplay: "standard",
      borderRadiusScale: "xs",
      dividerStyle: "dash",
    },
  },

  // ── 9. deportivo-energy ──────────────────────────────────────────────────────
  // G1: Balanced | G2: Loud display | G3: Hero/dominant | G4: Standard functional
  // G5: Geometric accent | G6: Dramatic entrance
  // Extremes: display-impact font, uppercase + weight 900, xl shadow elevation
  {
    id: "deportivo-energy",
    name: "Deportivo Energy",
    description: "Ponete las pilas. Velocidad, fuerza y color en cada scroll.",
    targetStores: ["Ropa deportiva", "Suplementos", "Equipamiento"],
    typography: {
      fontPair: "display-impact",
      headingWeight: 900,
      headingScale: "xl",
      headingTracking: "-0.03em",
      headingTransform: "uppercase",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "base",
      bodyLineHeight: "normal",
      displaySize: "2xl",
      cardTextAlign: "left",
    },
    layout: {
      density: "balanced",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "wide",
      cardImageRatio: "portrait",
      cardPadding: "tight",
      headerStyle: "standard",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "elevated",
      cardHover: "glow",
      cardBorderTreatment: "left-accent",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "zoom",
    },
    effects: {
      animationLevel: "full",
      shadowStyle: "hue-tinted",
      shadowElevation: "xl",
      transitionSpeed: "fast",
      transitionEasing: "spring",
    },
    color: {
      colorStrategy: "accent-pop",
      backgroundTreatment: "subtle-gradient",
      cardBackground: "white",
      imageOverlayHover: "dark-scrim",
      accentDistribution: "everywhere",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "square",
      priceDisplay: "prominent",
      borderRadiusScale: "md",
      dividerStyle: "none",
    },
  },

  // ── 10. tech-premium ─────────────────────────────────────────────────────────
  // G1: Balanced | G2: Clean sans | G3: Catalog/clean | G4: Minimal float
  // G5: Subtle lines | G6: Smooth professional
  // Extremes: mono-geometric font, sidebar-substitute minimal float, surface card bg
  {
    id: "tech-premium",
    name: "Tech Premium",
    description: "Potencia y sofisticación. El negro que vende tecnología.",
    targetStores: ["Electrónica", "Gadgets", "Computadores"],
    typography: {
      fontPair: "mono-geometric",
      headingWeight: 700,
      headingScale: "lg",
      headingTracking: "-0.02em",
      headingTransform: "none",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "sm",
      bodyLineHeight: "normal",
      displaySize: "lg",
      cardTextAlign: "left",
    },
    layout: {
      density: "balanced",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 4,
      containerMaxWidth: "wide",
      cardImageRatio: "square",
      cardPadding: "normal",
      headerStyle: "minimal",
      bannerHeight: "normal",
    },
    cards: {
      cardStyle: "shadow",
      cardHover: "lift",
      cardBorderTreatment: "subtle",
      imageFit: "contain",
      imageBorderRadius: "none",
      imageHoverEffect: "brightness",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "neutral",
      shadowElevation: "md",
      transitionSpeed: "normal",
      transitionEasing: "ease-in-out",
    },
    color: {
      colorStrategy: "accent-pop",
      backgroundTreatment: "solid",
      cardBackground: "surface",
      imageOverlayHover: "none",
      accentDistribution: "badges-and-buttons",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "square",
      priceDisplay: "prominent",
      borderRadiusScale: "md",
      dividerStyle: "line",
    },
  },

  // ── 11. tropical-vibrante ────────────────────────────────────────────────────
  // G1: Balanced | G2: Bold statement | G3: Lifestyle/context | G4: Standard functional
  // G5: Graphic bold | G6: Bounce playful
  // Extremes: gradient color strategy, accent everywhere, bounce motion
  {
    id: "tropical-vibrante",
    name: "Tropical Vibrante",
    description: "Colombia en colores. Alegría, sabor y vida en tu catálogo.",
    targetStores: ["Moda caribeña", "Artesanías coloridas", "Frutas tropicales"],
    typography: {
      fontPair: "warm",
      headingWeight: 700,
      headingScale: "xl",
      headingTracking: "-0.01em",
      headingTransform: "uppercase",
      headingFontStyle: "normal",
      headingDecoration: "none",
      bodyFontSize: "base",
      bodyLineHeight: "normal",
      displaySize: "xl",
      cardTextAlign: "left",
    },
    layout: {
      density: "balanced",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 3,
      containerMaxWidth: "wide",
      cardImageRatio: "portrait",
      cardPadding: "normal",
      headerStyle: "standard",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "elevated",
      cardHover: "lift",
      cardBorderTreatment: "top-accent",
      imageFit: "cover",
      imageBorderRadius: "rounded",
      imageHoverEffect: "zoom",
    },
    effects: {
      animationLevel: "full",
      shadowStyle: "hue-tinted",
      shadowElevation: "lg",
      transitionSpeed: "fast",
      transitionEasing: "spring",
    },
    color: {
      colorStrategy: "gradient",
      backgroundTreatment: "subtle-gradient",
      cardBackground: "white",
      imageOverlayHover: "color-tint",
      accentDistribution: "everywhere",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "pill",
      priceDisplay: "prominent",
      borderRadiusScale: "xl",
      dividerStyle: "none",
    },
  },

  // ── 12. pop-juvenil ──────────────────────────────────────────────────────────
  // G1: Dense catalog | G2: Loud display | G3: Hero/dominant | G4: Bottom mobile-first
  // G5: Graphic bold | G6: Dramatic entrance
  // Extremes: bottom nav, display-impact, compact density, pill radius
  {
    id: "pop-juvenil",
    name: "Pop Juvenil",
    description: "Rápido, brillante, tuyo. El catálogo que no necesita instrucciones.",
    targetStores: ["Cultura pop", "Stickers", "Merch"],
    typography: {
      fontPair: "display-impact",
      headingWeight: 900,
      headingScale: "lg",
      headingTracking: "0em",
      headingTransform: "uppercase",
      headingFontStyle: "normal",
      headingDecoration: "highlight",
      bodyFontSize: "sm",
      bodyLineHeight: "tight",
      displaySize: "xl",
      cardTextAlign: "center",
    },
    layout: {
      density: "compact",
      gridColumnsMobile: 2,
      gridColumnsDesktop: 4,
      containerMaxWidth: "full",
      cardImageRatio: "square",
      cardPadding: "tight",
      headerStyle: "standard",
      bannerHeight: "short",
    },
    cards: {
      cardStyle: "elevated",
      cardHover: "glow",
      cardBorderTreatment: "prominent",
      imageFit: "cover",
      imageBorderRadius: "same-as-card",
      imageHoverEffect: "zoom",
    },
    effects: {
      animationLevel: "full",
      shadowStyle: "hue-tinted",
      shadowElevation: "lg",
      transitionSpeed: "fast",
      transitionEasing: "spring",
    },
    color: {
      colorStrategy: "gradient",
      backgroundTreatment: "pattern",
      cardBackground: "white",
      imageOverlayHover: "color-tint",
      accentDistribution: "everywhere",
    },
    chrome: {
      buttonStyle: "filled",
      badgeStyle: "pill",
      priceDisplay: "prominent",
      borderRadiusScale: "pill",
      dividerStyle: "none",
    },
  },

  // ── 13. editorial-lujo ───────────────────────────────────────────────────────
  // G1: Editorial | G2: Whisper serif | G3: Lifestyle/context | G4: Minimal float
  // G5: Subtle lines | G6: Smooth professional
  // Differs from galeria: G1 editorial (not monastic), G3 lifestyle (not gallery),
  //   G6 smooth-professional (not gentle-ease) → 3 genes differ → passes rule-of-4-of-6
  // Extremes: whisper-light + body lg + loose line height, editorial spacing
  {
    id: "editorial-lujo",
    name: "Editorial Lujo",
    description: "La revista que podés comprar. Narrativa visual de alto nivel.",
    targetStores: ["Gastronomía especial", "Libros", "Arte y diseño"],
    typography: {
      fontPair: "whisper-light",
      headingWeight: 600,
      headingScale: "2xl",
      headingTracking: "-0.05em",
      headingTransform: "none",
      headingFontStyle: "normal",
      headingDecoration: "highlight",
      bodyFontSize: "lg",
      bodyLineHeight: "loose",
      displaySize: "2xl",
      cardTextAlign: "left",
    },
    layout: {
      density: "spacious",
      gridColumnsMobile: 1,
      gridColumnsDesktop: 2,
      containerMaxWidth: "narrow",
      cardImageRatio: "wide",
      cardPadding: "spacious",
      headerStyle: "minimal",
      bannerHeight: "tall",
    },
    cards: {
      cardStyle: "flat",
      cardHover: "scale",
      cardBorderTreatment: "left-accent",
      imageFit: "cover",
      imageBorderRadius: "none",
      imageHoverEffect: "slide-up",
    },
    effects: {
      animationLevel: "subtle",
      shadowStyle: "neutral",
      shadowElevation: "xs",
      transitionSpeed: "slow",
      transitionEasing: "ease-in-out",
    },
    color: {
      colorStrategy: "duotone",
      backgroundTreatment: "solid",
      cardBackground: "surface",
      imageOverlayHover: "dark-scrim",
      accentDistribution: "minimal",
    },
    chrome: {
      buttonStyle: "ghost",
      badgeStyle: "square",
      priceDisplay: "standard",
      borderRadiusScale: "sharp",
      dividerStyle: "dots",
    },
  },
];
