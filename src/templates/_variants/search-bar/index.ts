import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { SearchBarSlotProps, SearchBarVariant } from "./types";

export const SEARCH_BAR_REGISTRY: Record<SearchBarVariant, ComponentType<SearchBarSlotProps>> = {
  INLINE: dynamic(() => import("./INLINE")),
  ICON_TRIGGER: dynamic(() => import("./ICON_TRIGGER")), // TODO: implement glassmorphic pill in Phase 5
};

export type { SearchBarSlotProps, SearchBarVariant } from "./types";
