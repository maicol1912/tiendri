import React, { memo } from "react";
import { BestSellersSection } from "./BestSellersSection";
import type { BestSellerItem } from "./BestSellersSection";
import type { SectionRendererProps } from "./types";

export const BestSellersSectionAdapter = memo(function BestSellersSectionAdapter({
  bestSellers,
  currencySymbol,
}: SectionRendererProps) {
  if (!bestSellers || bestSellers.length === 0) return null;

  return (
    <BestSellersSection
      bestSellers={bestSellers as BestSellerItem[]}
      currencySymbol={currencySymbol}
    />
  );
});
