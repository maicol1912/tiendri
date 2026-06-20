import { memo } from "react";
import { VIDEO_REGISTRY } from "@/templates/_variants/video";
import type { VideoVariant } from "@/templates/_variants/video";
import type { SectionRendererProps } from "./types";

export const VideoSectionAdapter = memo(function VideoSectionAdapter(props: SectionRendererProps) {
  const variant = (props.variant as VideoVariant | undefined) ?? "DEFAULT";
  const Component = VIDEO_REGISTRY[variant] ?? VIDEO_REGISTRY.DEFAULT;
  return <Component {...props} />;
});
