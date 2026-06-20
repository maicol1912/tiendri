import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { VideoSlotProps, VideoVariant } from "./types";

export const VIDEO_REGISTRY: Record<VideoVariant, ComponentType<VideoSlotProps>> = {
  DEFAULT: dynamic(() => import("./DEFAULT")),
};

export type { VideoSlotProps, VideoVariant } from "./types";
