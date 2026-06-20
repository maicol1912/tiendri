import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { PopularSlotProps, PopularVariant } from "./types";

export const POPULAR_REGISTRY: Record<PopularVariant, ComponentType<PopularSlotProps>> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
};

export type { PopularSlotProps, PopularVariant } from "./types";
