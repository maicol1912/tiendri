"use client";

// Pets Classic — Hero Banner
// Mobile: single slide + dots. Desktop: 2 slides side by side.
// Card layout: left 50% text, right 50% large image.

import Image from "next/image";
import type { PromoSlide } from "../types";

interface HeroBannerProps {
  slides: PromoSlide[];
  activeIndex: number;
  onDotClick?: (index: number) => void;
}

function Slide({ slide }: { slide: PromoSlide }) {
  return (
    <div
      className="relative overflow-hidden flex-shrink-0"
      style={{
        borderRadius: "var(--t-radius-card)",
        height: 220,
      }}
    >
      {/* Full background image */}
      {slide.imageUrl && (
        <Image
          src={slide.imageUrl}
          alt={slide.headline}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}

      {/* Left overlay — semi-transparent bg with text */}
      <div
        className="absolute inset-y-0 left-0 w-[60%] flex flex-col justify-center px-6 py-5 z-10"
        style={{ background: `linear-gradient(to right, ${slide.bgColor}DD 50%, ${slide.bgColor}00 100%)` }}
      >
        {slide.badge && (
          <span
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: "var(--t-primary)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            {slide.badge}
          </span>
        )}
        <p style={{ fontSize: "22px", fontWeight: 800, color: "var(--t-text-primary)", lineHeight: 1.15, marginBottom: 4 }}>
          {slide.headline}
        </p>
        {slide.subtext && (
          <p style={{ fontSize: "12px", fontWeight: 400, color: "var(--t-text-secondary)", lineHeight: 1.4 }}>
            {slide.subtext}
          </p>
        )}
        {slide.ctaText && (
          <button
            type="button"
            className="mt-3 self-start px-4 py-1.5"
            style={{
              borderRadius: 9999,
              backgroundColor: "var(--t-primary)",
              color: "var(--t-button-text)",
              fontSize: "11px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
          >
            {slide.ctaText}
          </button>
        )}
      </div>
    </div>
  );
}

export function HeroBanner({ slides, activeIndex, onDotClick }: HeroBannerProps) {
  if (!slides.length) return null;

  return (
    <div className="w-full">
      {/* Mobile: single slide */}
      <div className="relative lg:hidden">
        <Slide slide={slides[activeIndex]!} />

        {slides.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onDotClick?.(i)}
                aria-label={`Ir a promoción ${i + 1}`}
                aria-current={i === activeIndex ? "true" : undefined}
                style={{
                  width: i === activeIndex ? 16 : 6,
                  height: 6,
                  borderRadius: 9999,
                  backgroundColor:
                    i === activeIndex ? "var(--t-primary)" : "var(--t-border)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.2s ease, background-color 0.2s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: 2 slides side by side */}
      <div className="hidden lg:grid grid-cols-2 gap-4">
        {slides.slice(0, 2).map((slide, i) => (
          <Slide key={i} slide={slide} />
        ))}
      </div>
    </div>
  );
}
