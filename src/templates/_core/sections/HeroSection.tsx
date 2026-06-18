"use client";
import React, { memo } from "react";
import { HERO_REGISTRY } from "@/templates/_variants/hero";
import type { SectionRendererProps } from "./types";

export const HeroSection = memo(function HeroSection({
  store,
  variants,
  heroData,
  onCtaClick,
}: SectionRendererProps) {
  const HeroComponent = HERO_REGISTRY[variants.hero];
  const hero = {
    subtitle: heroData?.subtitle ?? "",
    titleLight: heroData?.titleLight ?? store.name,
    titleBold: heroData?.titleBold ?? "",
    description: heroData?.description ?? store.description ?? "",
    ctaText: heroData?.ctaText ?? "Ver catálogo",
    image: heroData?.image ?? store.logo ?? "",
    bgColor: "var(--t-background)",
    onCtaClick,
  };
  return (
    <section aria-label="Banner principal">
      <HeroComponent {...hero} />
    </section>
  );
});
