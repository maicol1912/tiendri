import type { StorefrontProduct } from "@/types/domain/store";

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
  /** Tailwind class for the card image aspect ratio (e.g. "aspect-square", "aspect-[3/4]"). */
  aspectRatioClass?: string;
  /** BELOW_IMAGE-only: whether to show the "Comprar" CTA button. Defaults to true. */
  showAddToCart?: boolean;
  /** Whether to show the discount percentage badge over the image. Defaults to true. */
  showDiscountBadge?: boolean;
  /** Whether to show the strikethrough original price. Defaults to true. */
  showOriginalPrice?: boolean;
  /** Whether to show star rating (★ x.x) next to the price. Defaults to false. */
  showRating?: boolean;
}

export type ProductCardVariant =
  | "BELOW_IMAGE"
  | "OVERLAY_BOTTOM"
  | "OVERLAY_FULL"
  | "SIDE_BY_SIDE"
  | "WITH_DESCRIPTION";
