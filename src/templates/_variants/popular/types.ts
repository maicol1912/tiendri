import type { StorefrontProduct } from "@/types/domain/store";

export type PopularVariant = "DEFAULT";

export interface PopularSlotProps {
  products: StorefrontProduct[];
  sectionConfig?: Record<string, unknown>;
  currencySymbol: string;
  onProductClick: (slug: string) => void;
}
