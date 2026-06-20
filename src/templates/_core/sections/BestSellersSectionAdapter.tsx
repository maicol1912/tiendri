import { memo } from "react";
import { BEST_SELLERS_REGISTRY } from "@/templates/_variants/best-sellers";
import type { BestSellersVariant } from "@/templates/_variants/best-sellers";
import type { SectionRendererProps } from "./types";

export const BestSellersSectionAdapter = memo(function BestSellersSectionAdapter(props: SectionRendererProps) {
  if (!props.bestSellers || props.bestSellers.length === 0) return null;
  const variant = (props.variant as BestSellersVariant | undefined) ?? "DEFAULT";
  const Component = BEST_SELLERS_REGISTRY[variant] ?? BEST_SELLERS_REGISTRY.DEFAULT;
  return <Component {...props} bestSellers={props.bestSellers} />;
});
