import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { EditorialSlotProps, EditorialVariant } from "./types";

export const EDITORIAL_REGISTRY: Record<EditorialVariant, ComponentType<EditorialSlotProps>> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
};

export type { EditorialSlotProps, EditorialVariant } from "./types";
