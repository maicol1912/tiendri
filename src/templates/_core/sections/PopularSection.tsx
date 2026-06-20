"use client";
import { memo } from "react";
import { POPULAR_REGISTRY } from "@/templates/_variants/popular";
import type { PopularVariant } from "@/templates/_variants/popular";
import type { SectionRendererProps } from "./types";

export const PopularSection = memo(function PopularSection(props: SectionRendererProps) {
  const variant = (props.variant as PopularVariant | undefined) ?? "DEFAULT";
  const Component = POPULAR_REGISTRY[variant] ?? POPULAR_REGISTRY.DEFAULT;
  return <Component {...props} />;
});
