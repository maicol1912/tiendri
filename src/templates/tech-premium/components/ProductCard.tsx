// Tech Premium Template — Product Card Router
// Routes to the appropriate card layout based on structuralVariants.cardContentLayout.
// All style class computation happens here; layout components receive pre-computed props.

import type { StorefrontProduct } from "../types";
import type { TemplateLayoutConfig } from "@/types/templates";
import type { AddToCartStyle, CardBorderTreatment, ImageFit, ImageBorderRadius } from "@/types/templates/primitives";
import type { StructuralVariants } from "@/types/templates/structural-variants";

interface CardTokens {
  cardBorderTreatment?: CardBorderTreatment;
  imageFit?: ImageFit;
  imageBorderRadius?: ImageBorderRadius;
}
import { cardStyleClass } from "../utils/layout-classes";
import {
  BUTTON_STYLE_MAP,
  BADGE_STYLE_MAP,
  PRICE_DISPLAY_MAP,
  CARD_BORDER_MAP,
  IMAGE_FIT_MAP,
  IMAGE_HOVER_BEHAVIOR_MAP,
  HOVER_EFFECT_MAP,
} from "@/templates/_shared/style-maps";
import { CARD_LAYOUT_REGISTRY } from "@/templates/_shared/card-layouts";

interface ProductCardProps {
  product: StorefrontProduct;
  currencySymbol?: string;
  layout?: Partial<TemplateLayoutConfig>;
  structuralVariants?: StructuralVariants;
  cardTokens?: Partial<CardTokens>;
  addToCartStyle?: AddToCartStyle;
  onClick?: () => void;
  onAddToCart?: () => void;
}

export function ProductCard({
  product,
  currencySymbol = "$",
  layout,
  structuralVariants,
  cardTokens,
  addToCartStyle,
  onClick,
  onAddToCart,
}: ProductCardProps) {
  const cardContentLayout = structuralVariants?.cardContentLayout ?? "below-image";
  const LayoutComponent = CARD_LAYOUT_REGISTRY[cardContentLayout];

  const cardBgClass = cardStyleClass("flat");
  const hoverFxClass = HOVER_EFFECT_MAP["none"] ?? "";

  const buttonClass = BUTTON_STYLE_MAP["filled"];

  const badgeClass = BADGE_STYLE_MAP["pill"];

  const priceConfig = PRICE_DISPLAY_MAP["standard"];

  const cardBorderClass = CARD_BORDER_MAP[cardTokens?.cardBorderTreatment ?? "none"];
  const imageFitClass = IMAGE_FIT_MAP[cardTokens?.imageFit ?? "contain"];
  const imageHoverClass = IMAGE_HOVER_BEHAVIOR_MAP["none"];

  return (
    <LayoutComponent
      product={product}
      currencySymbol={currencySymbol}
      layout={layout ?? {}}
      addToCartStyle={addToCartStyle}
      onClick={onClick}
      onAddToCart={onAddToCart}
      buttonClass={buttonClass}
      badgeClass={badgeClass}
      priceConfig={priceConfig}
      cardBgClass={cardBgClass}
      cardBorderClass={cardBorderClass}
      hoverFxClass={hoverFxClass}
      imageHoverClass={imageHoverClass}
      imageFitClass={imageFitClass}
    />
  );
}
