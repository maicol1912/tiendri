import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { BannersSlotProps, BannersVariant } from "./types";

export const BANNERS_REGISTRY: Record<
  BannersVariant,
  ComponentType<BannersSlotProps>
> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
};

export type { BannersSlotProps, BannersVariant } from "./types";
