"use client";

// Furniture Dark — PromoCarousel
// Horizontal scroll with wheel deltaY×2.5 intercept
// Each card: banner image with gradient overlay + title + yellow CTA pill
// ALL colors via var(--t-*)

import { useRef } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import type { PromoCard } from "../types";

interface HeroBannerProps {
  cards: PromoCard[];
  onCardClick?: (card: PromoCard) => void;
}

export function HeroBanner({ cards, onCardClick }: HeroBannerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleWheel(e: React.WheelEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    e.preventDefault();
    el.scrollLeft += e.deltaY * 2.5;
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-none"
      onWheel={handleWheel}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      role="region"
      aria-label="Promociones destacadas"
    >
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="relative flex-shrink-0 rounded-[var(--t-radius-card)] overflow-hidden"
          style={{ width: "300px", height: "176px" }}
          onClick={() => onCardClick?.(card)}
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
              background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4">
            {card.tag && (
              <p
                className="text-[var(--t-text-summer-sale)] uppercase tracking-wider mb-1"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                }}
              >
                {card.tag}
              </p>
            )}
            <p
              className="text-[var(--t-text-primary)] leading-tight mb-3"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: "18px",
                fontWeight: 600,
                letterSpacing: "-0.54px",
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
                  color: "var(--t-button-text)",
                  letterSpacing: "-0.24px",
                }}
              >
                {card.ctaLabel ?? "Ver colección"}
              </span>
              <ChevronRight size={14} strokeWidth={2.5} style={{ color: "var(--t-button-text)" }} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
