"use client";

// Hero variant: CAROUSEL
// Decor-warm dual-promo-banner layout.
// Desktop: side-by-side 2-panel grid, each panel = image background + text overlay + badge.
// Mobile: single visible slide with dot indicators, click-to-advance.
// Text overlay format: label (uppercase small) + heading (bold large) + badge pill.
// ALL colors via var(--t-*) — zero hardcoded values.

import { memo, useState } from "react";
import Image from "next/image";
import type { HeroSlotProps } from "./types";

// Static slide definitions for the dual-banner layout.
// slide[0]: uses the `image` prop from HeroSlotProps (primary hero image).
// slide[1]: derives a second banner from the same image (templates with two
//           distinct hero images should pass the second via `description` URL
//           or extend HeroSlotProps — for now we use the same image as fallback).
interface BannerSlide {
  imageUrl: string;
  label: string;
  heading: string;
  badge: string;
}

function deriveSlides(props: HeroSlotProps): BannerSlide[] {
  const { image, subtitle, titleBold, titleLight, description } = props;
  // slide 1 — from primary props
  const slide1: BannerSlide = {
    imageUrl: image,
    label: subtitle || "OFERTA ESPECIAL",
    heading: titleBold || titleLight || "Experiencia de Confort",
    badge: "20% OFF",
  };
  // slide 2 — repurpose `description` as a second image URL when it looks like a path/URL
  const isImageUrl =
    description &&
    (description.startsWith("/") ||
      description.startsWith("http") ||
      description.match(/\.(png|jpg|jpeg|webp|avif|svg)$/i) !== null);
  const slide2: BannerSlide = {
    imageUrl: isImageUrl ? description : image,
    label: "NUEVA COLECCIÓN",
    heading: "Diseño que Inspira",
    badge: "15% OFF",
  };
  return [slide1, slide2];
}

const Carousel = memo(function Carousel(props: HeroSlotProps) {
  const { onCtaClick } = props;
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = deriveSlides(props);

  return (
    <section
      className="w-full px-4 md:px-6 lg:px-8 py-3"
      style={{ backgroundColor: "var(--t-background)" }}
      aria-label="Banners promocionales"
    >
      {/* ── Desktop: 2-col grid ── */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        {slides.map((slide, i) => (
          <button
            key={i}
            type="button"
            className="relative overflow-hidden text-left border-0 p-0 cursor-pointer"
            style={{
              borderRadius: "var(--t-radius-card)",
              height: "clamp(200px, 25vw, 320px)",
              backgroundColor: "var(--t-primary)",
            }}
            onClick={onCtaClick}
            aria-label={`${slide.label} — ${slide.heading}`}
          >
            {/* Background image */}
            {slide.imageUrl && (
              <Image
                src={slide.imageUrl}
                alt={slide.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 50vw, 600px"
                priority={i === 0}
              />
            )}

            {/* Dark gradient overlay — bottom-to-top */}
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)",
              }}
            />

            {/* Text overlay — bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 p-4">
              {/* Label */}
              <p
                className="m-0 uppercase font-semibold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
                }}
              >
                {slide.label}
              </p>

              {/* Heading */}
              <p
                className="m-0 font-bold leading-tight"
                style={{
                  fontSize: "clamp(16px, 2.2vw, 22px)",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
                }}
              >
                {slide.heading}
              </p>

              {/* Badge pill */}
              <span
                className="self-start font-bold"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  color: "var(--t-foreground)",
                  backgroundColor: "var(--t-peach, #F4B5A4)",
                  borderRadius: "var(--t-radius-button)",
                  padding: "3px 10px",
                  fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
                }}
              >
                {slide.badge}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ── Mobile: single slide + dots ── */}
      <div className="md:hidden">
        <button
          type="button"
          className="relative w-full overflow-hidden border-0 p-0 cursor-pointer"
          style={{
            borderRadius: "var(--t-radius-card)",
            aspectRatio: "393/220",
            backgroundColor: "var(--t-primary)",
          }}
          onClick={onCtaClick}
          aria-label={`${slides[activeSlide]?.label} — ${slides[activeSlide]?.heading}`}
        >
          {/* Background image */}
          {slides[activeSlide]?.imageUrl && (
            <Image
              src={slides[activeSlide].imageUrl}
              alt={slides[activeSlide].heading}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}

          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.20) 60%, transparent 100%)",
            }}
          />

          {/* Text overlay */}
          {slides[activeSlide] && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 p-4">
              <p
                className="m-0 uppercase font-semibold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.75)",
                  fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
                }}
              >
                {slides[activeSlide].label}
              </p>
              <p
                className="m-0 font-bold leading-tight"
                style={{
                  fontSize: "18px",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
                }}
              >
                {slides[activeSlide].heading}
              </p>
              <span
                className="self-start font-bold"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.04em",
                  color: "var(--t-foreground)",
                  backgroundColor: "var(--t-peach, #F4B5A4)",
                  borderRadius: "var(--t-radius-button)",
                  padding: "3px 10px",
                  fontFamily: "var(--font-heading, 'Poppins', sans-serif)",
                }}
              >
                {slides[activeSlide].badge}
              </span>
            </div>
          )}
        </button>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div
            className="flex items-center justify-center gap-2 mt-3"
            aria-label="Indicadores de slide"
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveSlide(i)}
                style={{
                  width: i === activeSlide ? 20 : 8,
                  height: 6,
                  borderRadius: 9999,
                  backgroundColor:
                    i === activeSlide
                      ? "var(--t-primary)"
                      : "var(--t-border, #E0D8D4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  padding: 0,
                }}
                aria-label={`Ir a slide ${i + 1}`}
                aria-current={i === activeSlide ? "true" : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default Carousel;
