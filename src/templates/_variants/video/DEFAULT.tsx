"use client";

import React, { memo } from "react";
import { VideoSection } from "@/templates/_core/sections/VideoSection";
import type { VideoSlotProps } from "./types";

const DEFAULT = memo(function DEFAULT({ config }: VideoSlotProps) {
  return <VideoSection config={config} />;
});

export default DEFAULT;
