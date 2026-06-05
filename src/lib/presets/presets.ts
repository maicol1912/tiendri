// Preset System — stylePresets constant
// The 8 built-in style presets for Tiendri V2.
// All presets are universal — available in all templates.
// Values are the single source of truth; see docs/preset-system.md Section 3.

import type { StylePreset } from "./preset-types";

export const stylePresets: StylePreset[] = [
  // ── 1. Minimalista ──────────────────────────────────────────────────────────
  // High-end boutique, studio, artisan brand.
  // Maximum breathing room. Ghost buttons, flat cards, subtle shadows.
  {
    id: "minimalista",
    name: "Minimalista",
    description: "Elegante y silencioso. El producto habla solo.",
    targetStores: ["Boutique", "Estudio", "Artesanías"],
    theme: {
      fontPair: "elegant",
      typography: {
        headingWeight: 700,
        headingScale: "xl",
        headingTracking: "-0.02em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "spacious",
      layout: {
        cardStyle: "flat",
        cardHoverEffect: "lift",
        cardImageRatio: "wide",
        animationLevel: "subtle",
        shadowStyle: "neutral",
        headerStyle: "centered",
        bannerHeight: "tall",
        buttonStyle: "ghost",
        badgeStyle: "pill",
        priceDisplay: "subtle",
      },
    },
  },

  // ── 2. Boutique ─────────────────────────────────────────────────────────────
  // Fashion, accessories, beauty.
  // Warm density, tactile card presentation, hue-tinted shadows.
  {
    id: "boutique",
    name: "Boutique",
    description: "Cálido y táctil. La marca es parte de la experiencia.",
    targetStores: ["Moda", "Accesorios", "Belleza"],
    theme: {
      fontPair: "warm",
      typography: {
        headingWeight: 600,
        headingScale: "lg",
        headingTracking: "-0.01em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "balanced",
      layout: {
        cardStyle: "elevated",
        cardHoverEffect: "lift",
        cardImageRatio: "portrait",
        animationLevel: "subtle",
        shadowStyle: "hue-tinted",
        headerStyle: "centered",
        bannerHeight: "normal",
        buttonStyle: "filled",
        badgeStyle: "pill",
        priceDisplay: "standard",
      },
    },
  },

  // ── 3. Directo ──────────────────────────────────────────────────────────────
  // Grocery, hardware, everyday goods.
  // Compact, functional, conversion-first. Default fallback preset.
  {
    id: "directo",
    name: "Directo",
    description: "Rápido y eficiente. Lo que el cliente necesita, al frente.",
    targetStores: ["Mercado", "Ferretería", "Consumo masivo"],
    theme: {
      fontPair: "functional",
      typography: {
        headingWeight: 700,
        headingScale: "md",
        headingTracking: "0em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "compact",
      layout: {
        cardStyle: "bordered",
        cardHoverEffect: "none",
        cardImageRatio: "square",
        animationLevel: "none",
        shadowStyle: "neutral",
        headerStyle: "standard",
        bannerHeight: "short",
        buttonStyle: "filled",
        badgeStyle: "square",
        priceDisplay: "prominent",
      },
    },
  },

  // ── 4. Editorial ────────────────────────────────────────────────────────────
  // Art prints, books, specialty food, collectibles.
  // Wide images, breathing text, magazine-like layout.
  {
    id: "editorial",
    name: "Editorial",
    description: "Amplio y narrativo. Tu tienda cuenta una historia.",
    targetStores: ["Arte", "Libros", "Gastronomía especial", "Coleccionables"],
    theme: {
      fontPair: "elegant",
      typography: {
        headingWeight: 400,
        headingScale: "2xl",
        headingTracking: "-0.03em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "spacious",
      layout: {
        cardStyle: "flat",
        cardHoverEffect: "scale",
        cardImageRatio: "wide",
        animationLevel: "subtle",
        shadowStyle: "neutral",
        headerStyle: "minimal",
        bannerHeight: "tall",
        buttonStyle: "outlined",
        badgeStyle: "pill",
        priceDisplay: "subtle",
      },
    },
  },

  // ── 5. Vibrante ─────────────────────────────────────────────────────────────
  // Youth fashion, sports, sneakers, pop culture.
  // Full animation, glow hover effects, brand-color intensity.
  {
    id: "vibrante",
    name: "Vibrante",
    description: "Energía pura. Cada píxel comunica movimiento.",
    targetStores: ["Moda juvenil", "Deportes", "Sneakers", "Cultura pop"],
    theme: {
      fontPair: "modern",
      typography: {
        headingWeight: 800,
        headingScale: "xl",
        headingTracking: "-0.02em",
        headingTransform: "uppercase",
      },
    },
    layout: {
      density: "balanced",
      layout: {
        cardStyle: "elevated",
        cardHoverEffect: "glow",
        cardImageRatio: "square",
        animationLevel: "full",
        shadowStyle: "hue-tinted",
        headerStyle: "standard",
        bannerHeight: "normal",
        buttonStyle: "filled",
        badgeStyle: "pill",
        priceDisplay: "prominent",
      },
    },
  },

  // ── 6. Técnico ──────────────────────────────────────────────────────────────
  // Electronics, tools, components, B2B.
  // Dense, information-forward. Spec sheets matter.
  {
    id: "tecnico",
    name: "Técnico",
    description: "Denso e informativo. Los datos venden solos.",
    targetStores: ["Electrónica", "Herramientas", "Componentes", "B2B"],
    theme: {
      fontPair: "functional",
      typography: {
        headingWeight: 600,
        headingScale: "md",
        headingTracking: "0em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "compact",
      layout: {
        cardStyle: "shadow",
        cardHoverEffect: "lift",
        cardImageRatio: "square",
        animationLevel: "subtle",
        shadowStyle: "neutral",
        headerStyle: "standard",
        bannerHeight: "short",
        buttonStyle: "filled",
        badgeStyle: "square",
        priceDisplay: "prominent",
      },
    },
  },

  // ── 7. Natural ──────────────────────────────────────────────────────────────
  // Plants, wellness, organic food, handmade goods.
  // Spacious, unhurried, earth-friendly aesthetics.
  {
    id: "natural",
    name: "Natural",
    description: "Tranquilo y orgánico. La calidez vende.",
    targetStores: ["Plantas", "Bienestar", "Orgánicos", "Artesanal"],
    theme: {
      fontPair: "warm",
      typography: {
        headingWeight: 500,
        headingScale: "lg",
        headingTracking: "0em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "spacious",
      layout: {
        cardStyle: "flat",
        cardHoverEffect: "scale",
        cardImageRatio: "portrait",
        animationLevel: "subtle",
        shadowStyle: "hue-tinted",
        headerStyle: "centered",
        bannerHeight: "normal",
        buttonStyle: "outlined",
        badgeStyle: "pill",
        priceDisplay: "standard",
      },
    },
  },

  // ── 8. Nocturno ─────────────────────────────────────────────────────────────
  // Music, night life, gaming, premium electronics.
  // Full animation, glow hover, dark-mode-native structural personality.
  // Note: pairs with a dark palette — does NOT auto-switch appearance mode.
  {
    id: "nocturno",
    name: "Nocturno",
    description: "Intenso y nocturno. Potencia el resplandor de tu paleta oscura.",
    targetStores: ["Música", "Gaming", "Vida nocturna", "Electrónica premium"],
    theme: {
      fontPair: "modern",
      typography: {
        headingWeight: 700,
        headingScale: "xl",
        headingTracking: "-0.02em",
        headingTransform: "none",
      },
    },
    layout: {
      density: "balanced",
      layout: {
        cardStyle: "elevated",
        cardHoverEffect: "glow",
        cardImageRatio: "square",
        animationLevel: "full",
        shadowStyle: "hue-tinted",
        headerStyle: "centered",
        bannerHeight: "tall",
        buttonStyle: "filled",
        badgeStyle: "pill",
        priceDisplay: "standard",
      },
    },
  },
];
