import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";

export interface BestSellersSlotProps {
  bestSellers: BestSellerItem[];
  currencySymbol?: string;
  sectionConfig?: Record<string, unknown>;
}

export type BestSellersVariant = "DEFAULT";
