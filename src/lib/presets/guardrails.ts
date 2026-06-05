import type { StylePreset } from "./preset-types";

export interface ForbiddenCombination {
  id: string;
  description: string;
  fields: string[];
  check: (preset: Partial<StylePreset>) => boolean;
  message: string;
}

export interface DependencyRule {
  id: string;
  description: string;
  triggerField: string;
  triggerValue: string | string[];
  affectedField: string;
  type: "hard" | "soft";
  allowedValues?: string[];
  warningMessage?: string;
  check: (preset: Partial<StylePreset>) => boolean;
}

export const FORBIDDEN_COMBINATIONS: ForbiddenCombination[] = [
  {
    id: "flat-no-shadow",
    description: "Tarjeta plana con sombra elevada",
    fields: ["cards.cardStyle", "effects.shadowElevation"],
    check: (p) => {
      const cardStyle = p.cards?.cardStyle;
      const elevation = p.effects?.shadowElevation;
      return cardStyle === "flat" && elevation !== undefined && !["none", "xs"].includes(elevation);
    },
    message: "Combinación no permitida: tarjeta plana no puede tener sombra elevada.",
  },
  {
    id: "overlay-needs-cover",
    description: "Overlay de card requiere imageFit cover",
    fields: ["cards.cardContentLayout", "cards.imageFit"],
    check: (p) => {
      const layout = (p as Partial<StylePreset & { cards: { cardContentLayout?: string } }>).cards;
      const cardContentLayout = (layout as { cardContentLayout?: string } | undefined)?.cardContentLayout;
      const imageFit = p.cards?.imageFit;
      return (
        (cardContentLayout === "overlay-bottom" || cardContentLayout === "overlay-full") &&
        imageFit === "contain"
      );
    },
    message: "Combinación no permitida: overlay de tarjeta requiere imageFit 'cover', no 'contain'.",
  },
  {
    id: "no-uppercase-italic",
    description: "Mayúsculas + itálica terrible en español",
    fields: ["typography.headingTransform", "typography.headingFontStyle"],
    check: (p) =>
      p.typography?.headingTransform === "uppercase" &&
      p.typography?.headingFontStyle === "italic",
    message: "Combinación no permitida: títulos en mayúsculas e itálica se ven mal en español.",
  },
  {
    id: "radius-consistency",
    description: "Bordes afilados con badges pill",
    fields: ["chrome.borderRadiusScale", "chrome.badgeStyle"],
    check: (p) =>
      p.chrome?.borderRadiusScale === "sharp" && p.chrome?.badgeStyle === "pill",
    message: "Combinación no permitida: escala de bordes 'sharp' no es compatible con badges redondeados.",
  },
  {
    id: "pattern-bg-noise",
    description: "Fondo con patrón y tarjetas transparentes",
    fields: ["color.backgroundTreatment", "color.cardBackground"],
    check: (p) =>
      p.color?.backgroundTreatment === "pattern" && p.color?.cardBackground === "transparent",
    message: "Combinación no permitida: fondo con patrón y tarjetas transparentes generan ruido visual.",
  },
  {
    id: "slow-full-animation",
    description: "Animación muy lenta con nivel completo",
    fields: ["effects.transitionSpeed", "effects.animationLevel"],
    check: (p) =>
      p.effects?.transitionSpeed === "very-slow" && p.effects?.animationLevel === "full",
    message: "Combinación no permitida: velocidad muy lenta con animaciones completas hace la tienda difícil de usar.",
  },
  {
    id: "ghost-no-price",
    description: "Botón fantasma con precio sutil",
    fields: ["chrome.buttonStyle", "chrome.priceDisplay"],
    check: (p) =>
      p.chrome?.buttonStyle === "ghost" && p.chrome?.priceDisplay === "subtle",
    message: "Combinación no permitida: botón fantasma y precio sutil eliminan el llamado a la acción.",
  },
  {
    id: "sidebyside-needs-single-col",
    description: "Layout lado a lado requiere 1 columna en móvil",
    fields: ["cards.cardContentLayout", "layout.gridColumnsMobile"],
    check: (p) => {
      const cardContentLayout = (p as Partial<StylePreset & { cards: { cardContentLayout?: string } }>)
        .cards as { cardContentLayout?: string } | undefined;
      const layout = cardContentLayout?.cardContentLayout;
      const gridColumnsMobile = p.layout?.gridColumnsMobile;
      return layout === "side-by-side" && gridColumnsMobile !== undefined && gridColumnsMobile !== 1;
    },
    message: "Combinación no permitida: tarjeta lado a lado requiere 1 columna en móvil.",
  },
  {
    id: "lineheight-density-conflict",
    description: "Interlineado suelto con densidad compacta",
    fields: ["typography.bodyLineHeight", "layout.density"],
    check: (p) =>
      p.typography?.bodyLineHeight === "loose" && p.layout?.density === "compact",
    message: "Combinación no permitida: interlineado suelto y densidad compacta generan inconsistencia visual.",
  },
  {
    id: "circle-wide-distortion",
    description: "Imagen circular con proporción wide",
    fields: ["cards.imageBorderRadius", "layout.cardImageRatio"],
    check: (p) =>
      p.cards?.imageBorderRadius === "circle" && p.layout?.cardImageRatio === "wide",
    message: "Combinación no permitida: imagen circular con proporción ancha produce distorsión.",
  },
];

export const DEPENDENCY_RULES: DependencyRule[] = [
  // ── Hard rules (disable controls) ────────────────────────────────────────────
  {
    id: "flat-limits-elevation",
    description: "Tarjeta plana restringe elevación de sombra",
    triggerField: "cards.cardStyle",
    triggerValue: "flat",
    affectedField: "effects.shadowElevation",
    type: "hard",
    allowedValues: ["none", "xs"],
    check: (p) => p.cards?.cardStyle === "flat",
  },
  {
    id: "overlay-forces-cover",
    description: "Overlay de tarjeta fuerza imageFit a cover",
    triggerField: "cards.cardContentLayout",
    triggerValue: ["overlay-bottom", "overlay-full"],
    affectedField: "cards.imageFit",
    type: "hard",
    allowedValues: ["cover"],
    check: (p) => {
      const c = p.cards as (typeof p.cards & { cardContentLayout?: string }) | undefined;
      return c?.cardContentLayout === "overlay-bottom" || c?.cardContentLayout === "overlay-full";
    },
  },
  {
    id: "no-animation-no-hover",
    description: "Sin animaciones deshabilita efectos hover",
    triggerField: "effects.animationLevel",
    triggerValue: "none",
    affectedField: "cards.cardHover",
    type: "hard",
    allowedValues: ["none"],
    check: (p) => p.effects?.animationLevel === "none",
  },
  {
    id: "sidebyside-mobile-cols",
    description: "Lado a lado requiere 1 columna en móvil",
    triggerField: "cards.cardContentLayout",
    triggerValue: "side-by-side",
    affectedField: "layout.gridColumnsMobile",
    type: "hard",
    allowedValues: ["1"],
    check: (p) => {
      const c = p.cards as (typeof p.cards & { cardContentLayout?: string }) | undefined;
      return c?.cardContentLayout === "side-by-side";
    },
  },
  {
    id: "instant-speed-hides-easing",
    description: "Velocidad instantánea hace irrelevante el easing",
    triggerField: "effects.transitionSpeed",
    triggerValue: "instant",
    affectedField: "effects.transitionEasing",
    type: "hard",
    allowedValues: [],
    check: (p) => p.effects?.transitionSpeed === "instant",
  },
  {
    id: "text-only-hero-hides-banner",
    description: "Héroe texto-only hace irrelevante la altura del banner",
    triggerField: "layout.heroVariant",
    triggerValue: "text-only",
    affectedField: "layout.bannerHeight",
    type: "hard",
    allowedValues: [],
    check: (p) => {
      const l = p.layout as (typeof p.layout & { heroVariant?: string }) | undefined;
      return l?.heroVariant === "text-only";
    },
  },

  // ── Soft rules (show warning) ─────────────────────────────────────────────────
  {
    id: "sharp-radius-image-hint",
    description: "Bordes afilados recomiendan imagen sin radio",
    triggerField: "chrome.borderRadiusScale",
    triggerValue: "sharp",
    affectedField: "cards.imageBorderRadius",
    type: "soft",
    allowedValues: ["none", "same-as-card"],
    warningMessage: "Se recomienda usar imagen sin bordes redondeados con escala 'sharp'.",
    check: (p) => p.chrome?.borderRadiusScale === "sharp",
  },
  {
    id: "pill-radius-badge-hint",
    description: "Bordes pill recomiendan badge pill",
    triggerField: "chrome.borderRadiusScale",
    triggerValue: "pill",
    affectedField: "chrome.badgeStyle",
    type: "soft",
    allowedValues: ["pill"],
    warningMessage: "Se recomienda usar badge 'pill' con bordes redondeados.",
    check: (p) => p.chrome?.borderRadiusScale === "pill",
  },
  {
    id: "pattern-bg-card-hint",
    description: "Fondo con patrón recomienda tarjeta blanca o superficie",
    triggerField: "color.backgroundTreatment",
    triggerValue: "pattern",
    affectedField: "color.cardBackground",
    type: "soft",
    allowedValues: ["white", "surface"],
    warningMessage: "Con fondo de patrón se recomienda tarjeta blanca o de superficie.",
    check: (p) => p.color?.backgroundTreatment === "pattern",
  },
  {
    id: "highlight-heading-normal",
    description: "Decoración highlight recomienda estilo normal",
    triggerField: "typography.headingDecoration",
    triggerValue: "highlight",
    affectedField: "typography.headingFontStyle",
    type: "soft",
    allowedValues: ["normal"],
    warningMessage: "Con decoración 'highlight' se recomienda estilo de fuente normal.",
    check: (p) => p.typography?.headingDecoration === "highlight",
  },
  {
    id: "monotone-accent-hint",
    description: "Estrategia monotone recomienda acento mínimo",
    triggerField: "color.colorStrategy",
    triggerValue: "monotone",
    affectedField: "color.accentDistribution",
    type: "soft",
    allowedValues: ["minimal", "buttons-only"],
    warningMessage: "Con estrategia monotone se recomienda distribución de acento mínima o solo botones.",
    check: (p) => p.color?.colorStrategy === "monotone",
  },
  {
    id: "on-hover-only-needs-animation",
    description: "Agregar al carrito on-hover requiere animaciones",
    triggerField: "chrome.addToCartStyle",
    triggerValue: "on-hover-only",
    affectedField: "effects.animationLevel",
    type: "soft",
    allowedValues: ["subtle", "full"],
    warningMessage: "El botón 'al pasar el cursor' requiere animaciones habilitadas para funcionar bien.",
    check: (p) => {
      const c = p.chrome as (typeof p.chrome & { addToCartStyle?: string }) | undefined;
      return c?.addToCartStyle === "on-hover-only";
    },
  },
  {
    id: "loose-lineheight-density-hint",
    description: "Interlineado suelto recomienda densidad no compacta",
    triggerField: "typography.bodyLineHeight",
    triggerValue: "loose",
    affectedField: "layout.density",
    type: "soft",
    allowedValues: ["balanced", "spacious"],
    warningMessage: "Con interlineado suelto se recomienda no usar densidad compacta.",
    check: (p) => p.typography?.bodyLineHeight === "loose",
  },
  {
    id: "circle-image-square-ratio",
    description: "Imagen circular recomienda proporción cuadrada",
    triggerField: "cards.imageBorderRadius",
    triggerValue: "circle",
    affectedField: "layout.cardImageRatio",
    type: "soft",
    allowedValues: ["square"],
    warningMessage: "Con imagen circular se recomienda proporción cuadrada para evitar distorsión.",
    check: (p) => p.cards?.imageBorderRadius === "circle",
  },
];
