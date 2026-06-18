import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { HeaderSlotProps, HeaderVariant } from "./types";

export const HEADER_REGISTRY: Record<HeaderVariant, ComponentType<HeaderSlotProps>> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
  GLASS: dynamic(() => import("./GLASS")),
  GREETING: dynamic(() => import("./GREETING")),
  GREETING_SIMPLE: dynamic(() => import("./GREETING_SIMPLE")),
  MINIMAL: dynamic(() => import("./MINIMAL")),
};

export type { HeaderSlotProps, HeaderVariant, NavLink } from "./types";
