"use client";

// Hero variant: TEXT_ONLY
// Centered text layout with no image. Responsive display font via CSS var.

import { memo } from "react";
import type { HeroSlotProps } from "./types";

const TextOnly = memo(function TextOnly({
  subtitle,
  titleLight,
  titleBold,
  description,
  ctaText,
  bgColor,
  onCtaClick,
}: HeroSlotProps) {
  return (
    <section
      className="overflow-hidden w-full"
      style={{ backgroundColor: bgColor }}
      aria-label="Hero promotion"
    >
      <div className="flex flex-col items-center justify-center text-center px-6 lg:px-[160px] py-16 lg:py-24 gap-6">
        <p className="text-[var(--t-muted)] text-lg lg:text-[25px] font-semibold leading-8">
          {subtitle}
        </p>
        <h1
          className="text-[var(--t-foreground)] leading-tight"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize:
              "var(--t-type-display-size, clamp(3rem, 8vw, 7rem))",
          }}
        >
          <span className="font-thin">{titleLight}</span>
          <span className="font-semibold">{titleBold}</span>
        </h1>
        <p className="text-[var(--t-muted)] text-base lg:text-lg font-medium leading-6 max-w-xl">
          {description}
        </p>
        <button
          type="button"
          className="border border-[var(--t-foreground)] text-[var(--t-foreground)] bg-transparent rounded-md px-10 lg:px-14 py-3 lg:py-4 text-base font-medium cursor-pointer hover:opacity-90 transition-opacity mt-2"
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
});

export default TextOnly;
