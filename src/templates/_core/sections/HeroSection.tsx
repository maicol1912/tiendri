"use client";
import React, { memo } from "react";
import { HERO_REGISTRY } from "@/templates/_variants/hero";
import type { SectionRendererProps } from "./types";
import { getSectionField } from "./get-section-field";

export const HeroSection = memo(function HeroSection({
  store,
  variants,
  heroData,
  onCtaClick,
  heroConstrained,
  heroDesktopOnly,
  heroCompact,
  heroFeaturedCount,
  sectionConfig,
}: SectionRendererProps) {
  const HeroComponent = HERO_REGISTRY[variants.hero];

  const textAlignment = getSectionField("textAlignment", sectionConfig, undefined, "center" as const);
  const fontFamily = getSectionField<string | undefined>("fontFamily", sectionConfig, undefined, undefined);

  const hero = {
    subtitle: heroData?.subtitle ?? "",
    titleLight: heroData?.titleLight ?? store.name,
    titleBold: heroData?.titleBold ?? "",
    description: heroData?.description ?? store.description ?? "",
    ctaText: heroData?.ctaText ?? "Ver catálogo",
    image: heroData?.image ?? store.logo ?? "",
    bgColor: "var(--t-background)",
    onCtaClick,
    hideCta: heroFeaturedCount !== undefined && heroFeaturedCount > 0,
    compact: heroCompact,
    secondCtaText: heroData?.secondCtaText,
  };

  const sectionClassName = [
    heroConstrained ? "max-w-[92%] lg:max-w-[65%] mx-auto pt-4" : "",
    heroDesktopOnly ? "hidden md:block" : "",
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const sectionStyle: React.CSSProperties = {
    textAlign: textAlignment,
    ...(fontFamily !== undefined ? { fontFamily } : {}),
  };

  return (
    <section aria-label="Banner principal" className={sectionClassName} style={sectionStyle}>
      <HeroComponent {...hero} />
    </section>
  );
});
