import type { TemplateLayoutConfig } from '@/types/templates';
import type { StorefrontProduct } from '@/types/store';
import type { AddToCartStyle } from '@/types/templates/primitives';

export interface CardLayoutProps {
  product: StorefrontProduct;
  currencySymbol: string;
  layout: Partial<TemplateLayoutConfig>;
  addToCartStyle?: AddToCartStyle;
  onClick?: () => void;
  onAddToCart?: () => void;
  buttonClass: string;
  badgeClass: string;
  priceConfig: { className: string; style?: Record<string, string> };
  cardBgClass: string;
  cardBorderClass: string;
  hoverFxClass: string;
  imageHoverClass: string;
  imageFitClass: string;
}
