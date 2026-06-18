// _core/pages/style-tokens.ts
// Helper para extraer y resolver style tokens desde ResolvedStoreConfig.
// Los campos de estilo como buttonStyle, badgeStyle, etc. no están en el tipo
// TemplateLayoutConfig compartido (que pertenece a la capa base), pero los templates
// los incluyen via sus props de layout local. Acá los accedemos con un cast seguro.

import {
  BUTTON_STYLE_MAP,
  BADGE_STYLE_MAP,
  PRICE_DISPLAY_MAP,
  CARD_STYLE_MAP,
  HOVER_EFFECT_MAP,
  IMAGE_FIT_MAP,
  IMAGE_HOVER_BEHAVIOR_MAP,
  CARD_BORDER_MAP,
} from "@/templates/_shared/style-maps";
import type {
  ButtonStyle,
  BadgeStyle,
  PriceDisplay,
  CardStyle,
  HoverEffect,
  ImageFit,
  ImageHoverEffect,
  CardBorderTreatment,
} from "@/types/templates";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";

// Tipo extendido del layout que incluye los campos de estilo que los templates
// pueden definir pero que no pertenecen al TemplateLayoutConfig base.
interface ExtendedLayout {
  buttonStyle?: ButtonStyle;
  badgeStyle?: BadgeStyle;
  priceDisplay?: PriceDisplay;
  cardStyle?: CardStyle;
  cardHoverEffect?: HoverEffect;
  imageFit?: ImageFit;
  imageHoverEffect?: ImageHoverEffect;
  cardBorderTreatment?: CardBorderTreatment;
}

export interface ResolvedStyleTokens {
  buttonClass: string;
  badgeClass: string;
  priceConfig: { className: string; style?: Record<string, string> };
  cardBgClass: string;
  hoverFxClass: string;
  imageFitClass: string;
  imageHoverClass: string;
  cardBorderClass: string;
}

/**
 * Extrae y resuelve style tokens desde ResolvedStoreConfig + style-maps.
 * Usa defaults seguros cuando los campos no están definidos en el config.
 */
export function resolveStyleTokens(config: ResolvedStoreConfig): ResolvedStyleTokens {
  // Cast seguro — los templates extienden layout con campos de estilo ad-hoc.
  const layout = config.layout as unknown as ExtendedLayout | undefined;

  return {
    buttonClass: BUTTON_STYLE_MAP[layout?.buttonStyle ?? "filled"],
    badgeClass: BADGE_STYLE_MAP[layout?.badgeStyle ?? "pill"],
    priceConfig: PRICE_DISPLAY_MAP[layout?.priceDisplay ?? "standard"],
    cardBgClass: CARD_STYLE_MAP[layout?.cardStyle ?? "flat"],
    hoverFxClass: HOVER_EFFECT_MAP[layout?.cardHoverEffect ?? "none"],
    imageFitClass: IMAGE_FIT_MAP[layout?.imageFit ?? "cover"],
    imageHoverClass: IMAGE_HOVER_BEHAVIOR_MAP[layout?.imageHoverEffect ?? "none"],
    cardBorderClass: CARD_BORDER_MAP[layout?.cardBorderTreatment ?? "none"],
  };
}
