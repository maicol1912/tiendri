import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { HeroSlotProps, HeroVariant } from "./types";

export const HERO_REGISTRY: Record<HeroVariant, ComponentType<HeroSlotProps>> = {
  FULL_BLEED: dynamic(() => import("./FULL_BLEED")),
  CONTAINED: dynamic(() => import("./CONTAINED")),
  SPLIT: dynamic(() => import("./SPLIT")),
  TEXT_ONLY: dynamic(() => import("./TEXT_ONLY")),
  CAROUSEL: dynamic(() => import("./CAROUSEL")),
  CARD_SPLIT: dynamic(() => import("./CARD_SPLIT")),
  EDITORIAL: dynamic(() => import("./EDITORIAL")),
  PROMO_STRIP: dynamic(() => import("./PROMO_STRIP")),
  PROMO_CARD: dynamic(() => import("./PROMO_CARD")),
};

export type { HeroSlotProps, HeroVariant } from "./types";
