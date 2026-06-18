import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { CategoryNavSlotProps, CategoryNavVariant } from "./types";

export const CATEGORY_NAV_REGISTRY: Record<CategoryNavVariant, ComponentType<CategoryNavSlotProps>> = {
  CHIPS: dynamic(() => import("./CHIPS")),
  GRID: dynamic(() => import("./GRID")),
  HORIZONTAL_SCROLL: dynamic(() => import("./HORIZONTAL_SCROLL")),
  TABS: dynamic(() => import("./TABS")),
  COLUMNAR: dynamic(() => import("./COLUMNAR")),
};

export type { CategoryNavSlotProps, CategoryNavVariant } from "./types";
