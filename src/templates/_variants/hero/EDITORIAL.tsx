"use client";

import { memo } from "react";
import { ArrowRight } from "lucide-react";
import type { HeroSlotProps } from "./types";

const Editorial = memo(function Editorial({
  subtitle,
  titleLight,
  titleBold,
  ctaText,
  onCtaClick,
}: HeroSlotProps) {
  return (
    <section
      className="w-full overflow-hidden"
      style={{ backgroundColor: "var(--t-background)" }}
      aria-labelledby="hero-editorial-heading"
    >
      <div
        className="px-5 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 pb-8 md:pb-10 lg:pb-12 max-w-7xl mx-auto"
        style={{ paddingTop: "var(--t-space-section, 3rem)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h1
              id="hero-editorial-heading"
              className="leading-none text-[48px] md:text-[64px] lg:text-[80px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 400,
                textTransform: "uppercase",
                letterSpacing: "2px",
                color: "var(--t-foreground)",
              }}
            >
              {titleLight}
            </h1>
            {titleBold && (
              <p
                className="leading-none text-[48px] md:text-[64px] lg:text-[80px]"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "var(--t-foreground)",
                }}
              >
                {titleBold}
              </p>
            )}
          </div>

          <div className="text-right pt-1 md:pt-2 shrink-0 ml-4">
            {subtitle.split(" ").map((word, i) => (
              <p
                key={i}
                className="text-base md:text-lg leading-snug"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  color: "var(--t-muted)",
                }}
              >
                {word}
              </p>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-3.5 cursor-pointer transition-opacity hover:opacity-80 border-none"
          style={{
            backgroundColor: "var(--t-secondary)",
            borderRadius: "var(--t-radius-button)",
          }}
          onClick={onCtaClick}
          aria-label={ctaText}
        >
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "1px",
              color: "var(--t-foreground)",
            }}
          >
            {ctaText}
          </span>
          <ArrowRight
            size={16}
            strokeWidth={2}
            style={{ color: "var(--t-foreground)" }}
          />
        </button>
      </div>
    </section>
  );
});

export default Editorial;
