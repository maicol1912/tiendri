import React, { memo } from "react";
import { VideoSection } from "./VideoSection";
import type { SectionRendererProps } from "./types";

export const VideoSectionAdapter = memo(function VideoSectionAdapter({
  config,
}: SectionRendererProps) {
  return <VideoSection config={config} />;
});
