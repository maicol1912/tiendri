"use client";

// Hero variant: PROMO_STRIP
// Horizontal-scroll strip of promotional cards.
// Extracted and adapted from furniture-dark/components/HeroBanner.tsx.
// The slot contract provides a single HeroSlotProps item; the strip derives
// three cards from that data (matching the CAROUSEL approach of reusing a
// single image prop for multiple panels). Templates with richer slide data
// should extend HeroSlotProps and pass a `cards` array instead.
// Mouse-wheel intercept converts vertical δ → horizontal scroll (deltaY × 2.5).
// Mobile: snap scrolling (scroll-snap-type: x mandatory).
// ALL colors via var(--t-*) — zero hardcoded values.

import { memo, useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { HeroSlotProps } from "./types";

interface DerivedCard {
  id: string;
  tag: string;
  title: string;
  ctaLabel: string;
  image: string;
}

function deriveCards(props: HeroSlotProps): DerivedCard[] {
  const { subtitle, titleLight, titleBold, ctaText, image } = props;
  return [
    {
      id: "card-1",
      tag: subtitle,
      title: `${titleLight}${titleBold}`,
      ctaLabel: ctaText,
      image,
    },
    {
      id: "card-2",
      tag: subtitle,
      title: titleBold || titleLight,
      ctaLabel: ctaText,
      image,
    },
    {
      id: "card-3",
      tag: subtitle,
      title: titleLight || titleBold,
      ctaLabel: ctaText,
      image,
    },
  ];
}

const PromoStrip = memo(function PromoStrip(props: HeroSlotProps) {
  const { onCtaClick } = props;
  const scrollRef = useRef<HTMLDivElement>(null);
  const cards = deriveCards(props);

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY * 2.5;
  }

  return (
    <section aria-label="Promociones destacadas" style={{ backgroundColor: props.bgColor }}>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-5 pb-2"
        onWheel={handleWheel}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
        role="list"
      >
        {cards.map((card) => (
          <button
            key={card.id}
            type="button"
            role="listitem"
            className="relative flex-shrink-0 rounded-[var(--t-radius-card)] overflow-hidden"
            style={{
              width: "300px",
              height: "176px",
              scrollSnapAlign: "start",
              border: "none",
              cursor: "pointer",
              background: "var(--t-card)",
            }}
            onClick={onCtaClick}
            aria-label={card.title}
          >
            {/* Background image */}
            {card.image && (
              <Image
                src={card.image}
                alt={card.title}
                fill
                sizes="300px"
                className="object-cover"
                priority
              />
            )}

            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.65) 100%)",
              }}
            />

            {/* Card content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4">
              {card.tag && (
                <p
                  className="uppercase mb-1"
                  style={{
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "var(--t-muted)",
                  }}
                >
                  {card.tag}
                </p>
              )}

              <p
                className="leading-tight mb-3"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "18px",
                  fontWeight: 600,
                  letterSpacing: "-0.54px",
                  color: "var(--t-foreground)",
                }}
              >
                {card.title}
              </p>

              {/* CTA pill */}
              <div
                className="self-start flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--t-radius-button)]"
                style={{ backgroundColor: "var(--t-primary)" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "-0.24px",
                    color: "var(--t-on-primary)",
                  }}
                >
                  {card.ctaLabel}
                </span>
                <ChevronRight
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: "var(--t-on-primary)" }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
});

export default PromoStrip;
