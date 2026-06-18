import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { HeroSlotProps, HeroVariant } from "./types";

export const HERO_REGISTRY: Record<HeroVariant, ComponentType<HeroSlotProps>> = {
  FULL_BLEED: dynamic(() => import("./FULL_BLEED")),
  CONTAINED: dynamic(() => import("./CONTAINED")),
  SPLIT: dynamic(() => import("./SPLIT")),
  TEXT_ONLY: dynamic(() => import("./TEXT_ONLY")),
  CAROUSEL: dynamic(() => import("./CAROUSEL")),
};

export type { HeroSlotProps, HeroVariant } from "./types";
