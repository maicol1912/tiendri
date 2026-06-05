"use client";

// Decor Warm Template — Hero Banner
// Full-width lifestyle image. Mobile: carousel with dot indicators.
// Desktop: 2 banners side by side.

import Image from "next/image";
import type { DecorWarmPromoSlide } from "../types";

interface HeroBannerProps {
  slides: DecorWarmPromoSlide[];
  activeSlide?: number;
  onSlideChange?: (index: number) => void;
}

export function HeroBanner({
  slides,
  activeSlide = 0,
  onSlideChange,
}: HeroBannerProps) {
  if (!slides.length) return null;

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* ── Desktop: 2-col grid ── */}
      <div className="hidden md:grid md:grid-cols-2 gap-4 items-center">
        {slides.map((slide, i) => (
          <div
            key={`${slide.heading}-${i}`}
            className="overflow-hidden rounded-[var(--t-radius-card)]"
            style={{ backgroundColor: "var(--t-peach)" }}
          >
            {slide.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slide.imageUrl}
                alt={slide.heading}
                className="w-full h-auto rounded-[var(--t-radius-card)]"
              />
            )}
          </div>
        ))}
      </div>

      {/* ── Mobile: carousel ── */}
      <div className="md:hidden">
        {(() => {
          const slide = slides[activeSlide] ?? slides[0];
          return (
            <div
              className="relative w-full overflow-hidden rounded-[var(--t-radius-card)]"
              style={{ aspectRatio: "393/132", backgroundColor: "var(--t-peach)" }}
            >
              {slide && slide.imageUrl && (
                <Image
                  src={slide.imageUrl}
                  alt={slide.heading}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              )}
            </div>
          );
        })()}

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div
            className="flex items-center justify-center gap-1.5 mt-3"
            aria-label="Indicadores de slide"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSlideChange?.(i)}
                style={{
                  width: 20,
                  height: 4,
                  borderRadius: 9999,
                  backgroundColor: i === activeSlide ? "var(--t-dark-mode)" : "var(--t-peach)",
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
    </div>
  );
}
