import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { BestSellersSlotProps, BestSellersVariant } from "./types";

export const BEST_SELLERS_REGISTRY: Record<BestSellersVariant, ComponentType<BestSellersSlotProps>> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
};

export type { BestSellersSlotProps, BestSellersVariant } from "./types";
