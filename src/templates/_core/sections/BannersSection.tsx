"use client";
import { memo } from "react";
import { BANNERS_REGISTRY } from "@/templates/_variants/banners";
import type { BannersVariant } from "@/templates/_variants/banners";
import type { SectionRendererProps } from "./types";

export const BannersSection = memo(function BannersSection(props: SectionRendererProps) {
  const variant = (props.variant as BannersVariant | undefined) ?? "DEFAULT";
  const Component = BANNERS_REGISTRY[variant] ?? BANNERS_REGISTRY.DEFAULT;
  return <Component {...props} />;
});
