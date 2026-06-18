import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { HeaderSlotProps, HeaderVariant } from "./types";

export const HEADER_REGISTRY: Record<HeaderVariant, ComponentType<HeaderSlotProps>> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
  GLASS: dynamic(() => import("./GLASS")),
  GREETING: dynamic(() => import("./GREETING")),   // TODO: extract from decor-warm in Phase 5
  MINIMAL: dynamic(() => import("./MINIMAL")),      // TODO: implement minimal variant in Phase 5
};

export type { HeaderSlotProps, HeaderVariant, NavLink } from "./types";
