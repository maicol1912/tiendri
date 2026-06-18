import type { StorefrontProduct } from "@/types/store";

export interface ProductCardSlotProps {
  product: StorefrontProduct;
  currencySymbol: string;
  onClick?: (slug: string) => void;
  onAddToCart?: (productId: string) => void;
  // Style tokens pre-calculados por el engine desde style-maps
  buttonClass: string;
  badgeClass: string;
  priceConfig: { className: string; style?: Record<string, string> };
  cardBgClass: string;
  cardBorderClass: string;
  hoverFxClass: string;
  imageHoverClass: string;
  imageFitClass: string;
  /** BELOW_IMAGE-only: whether to show the "Comprar" CTA button. Defaults to true. */
  showAddToCart?: boolean;
}

export type ProductCardVariant =
  | "BELOW_IMAGE"
  | "OVERLAY_BOTTOM"
  | "OVERLAY_FULL"
  | "SIDE_BY_SIDE"
  | "WITH_DESCRIPTION";
