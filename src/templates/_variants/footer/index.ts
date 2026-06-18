import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { FooterSlotProps, FooterVariant } from "./types";

export const FOOTER_REGISTRY: Record<FooterVariant, ComponentType<FooterSlotProps>> = {
  COLUMNS: dynamic(() => import("./COLUMNS")),
  COMPACT: dynamic(() => import("./COMPACT")),
};

export type { FooterSlotProps, FooterVariant } from "./types";
