import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { BottomNavSlotProps, BottomNavVariant } from "./types";

export const BOTTOM_NAV_REGISTRY: Record<BottomNavVariant, ComponentType<BottomNavSlotProps>> = {
  EDGE: dynamic(() => import("./EDGE")),
  FLOATING_PILL: dynamic(() => import("./FLOATING_PILL")),
  DOT_INDICATOR: dynamic(() => import("./DOT_INDICATOR")),
};

export type { BottomNavSlotProps, BottomNavVariant, NavTab } from "./types";
