// Electronics Classic — Promo Banner
// Light bg, text left, product image right, CTA link.
// bgColor is content data (intentional exception to color rule).
// All theme colors via var(--t-*).

import Image from "next/image";
import type { PromoBanner as PromoBannerType } from "../types";

interface PromoBannerProps {
  promo: PromoBannerType;
  onCtaClick?: () => void;
}

export function PromoBanner({ promo, onCtaClick }: PromoBannerProps) {
  return (
    <section
      className="relative overflow-hidden rounded-[var(--t-radius-card)] md:rounded-xl"
      style={{ backgroundColor: promo.bgColor ?? "var(--t-section-bg)" }}
      aria-label={promo.headline}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10 px-6 py-8 md:px-10 md:py-12">
        {/* Text content — left */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--t-text-primary)] leading-tight mb-2">
            {promo.headline}
          </h2>
          {promo.subtext && (
            <p className="text-[var(--t-text-muted)] text-sm md:text-base mb-4">
              {promo.subtext}
            </p>
          )}
          <button
            onClick={onCtaClick}
            className="text-[var(--t-primary)] font-semibold text-sm md:text-base hover:underline transition-colors"
            aria-label={promo.ctaLabel}
          >
            {promo.ctaLabel}
          </button>
        </div>

        {/* Product image — right */}
        <div className="relative w-[200px] h-[200px] md:w-[280px] md:h-[280px] shrink-0">
          <Image
            src={promo.image}
            alt={promo.headline}
            fill
            sizes="280px"
            className="object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
