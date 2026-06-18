"use client";

// Hero variant: CAROUSEL
// Mobile: single slide with dot indicators and click-to-advance.
// Desktop: side-by-side dual panel layout.
// Extracted and adapted from decor-warm/components/HeroBanner.tsx.
// The slot contract uses a single `image` prop; a second placeholder panel
// mirrors the primary image on desktop for the two-panel effect.

import { memo, useState } from "react";
import Image from "next/image";
import type { HeroSlotProps } from "./types";

const SLIDE_COUNT = 2;

const Carousel = memo(function Carousel({
  subtitle,
  titleLight,
  titleBold,
  description,
  ctaText,
  image,
  bgColor,
  onCtaClick,
}: HeroSlotProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Both panels show the same image. Templates with richer slide data
  // should extend HeroSlotProps and pass a `slides` array instead.
  const panels = [image, image];

  return (
    <section
      className="w-full px-4 md:px-6 lg:px-8"
      style={{ backgroundColor: bgColor }}
      aria-label="Hero promotion"
    >
      {/* ── Desktop: 2-col grid ── */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 items-center">
        {panels.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-[var(--t-radius-card)]"
            style={{ backgroundColor: "var(--t-primary)" }}
          >
            <div className="relative w-full aspect-[393/132] lg:aspect-auto lg:h-[320px]">
              <Image
                src={src}
                alt={i === 0 ? `${titleLight}${titleBold}` : description}
                fill
                className="object-cover rounded-[var(--t-radius-card)]"
                sizes="(max-width: 1024px) 50vw, 600px"
                priority={i === 0}
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Mobile: single slide + dots ── */}
      <div className="md:hidden">
        <div
          className="relative w-full overflow-hidden rounded-[var(--t-radius-card)]"
          style={{
            aspectRatio: "393/132",
            backgroundColor: "var(--t-primary)",
          }}
        >
          <Image
            src={panels[activeSlide] ?? image}
            alt={`${titleLight}${titleBold}`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Dot indicators */}
        {SLIDE_COUNT > 1 && (
          <div
            className="flex items-center justify-center gap-1.5 mt-3"
            aria-label="Indicadores de slide"
          >
            {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                style={{
                  width: 20,
                  height: 4,
                  borderRadius: 9999,
                  backgroundColor:
                    i === activeSlide
                      ? "var(--t-dark-mode)"
                      : "var(--t-primary)",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                  padding: 0,
                }}
                aria-label={`Ir a slide ${i + 1}`}
                aria-current={i === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA row — visible on both breakpoints */}
      <div className="flex flex-col items-center text-center gap-4 py-8">
        <p className="text-white/40 text-lg font-semibold leading-8">{subtitle}</p>
        <h1
          className="text-white leading-tight"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <span className="text-3xl lg:text-[72px] font-thin">{titleLight}</span>
          <span className="text-3xl lg:text-[72px] font-semibold">{titleBold}</span>
        </h1>
        <p className="text-[var(--t-muted)] text-base lg:text-lg font-medium leading-6 max-w-xl">
          {description}
        </p>
        <button
          type="button"
          className="border border-white text-white bg-transparent rounded-md px-10 py-3 text-base font-medium cursor-pointer hover:bg-white/10 transition-colors"
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>
    </section>
  );
});

export default Carousel;
