// Electronics Classic — Hero Banner
// Full-width image with overlay card on the right (desktop) / centered (mobile).
// All colors via var(--t-*).

import Image from "next/image";
import type { HeroBanner } from "../types";
import { bannerHeightClass } from "../utils/layout-classes";

interface HeroSectionProps {
  banner: HeroBanner;
  layout?: { bannerHeight?: string };
  onCtaClick?: () => void;
}

export function HeroSection({
  banner,
  layout,
  onCtaClick,
}: HeroSectionProps) {
  const heightClass = bannerHeightClass(layout?.bannerHeight ?? "normal");

  return (
    <section className="relative w-full overflow-hidden" aria-label="Banner principal">
      <div className={`relative w-full ${heightClass}`}>
        <Image
          src={banner.image}
          alt={banner.headline}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay card */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-end md:items-start md:top-[71px] md:right-[200px] px-4 md:px-0">
          <div
            className="px-5 py-5 md:px-6 md:py-6 max-w-[300px] md:w-[278px] shadow-lg rounded-[var(--t-radius-card)]"
            style={{ backgroundColor: "var(--t-card-bg)" }}
          >
            <h1
              className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[var(--t-text-primary)] leading-tight mb-3"
            >
              {banner.headline}
            </h1>
            <p className="text-[var(--t-text-muted)] text-xs md:text-sm leading-relaxed mb-4">
              {banner.subtext}
            </p>
            <button
              onClick={onCtaClick}
              className="text-[var(--t-primary)] font-semibold text-sm hover:underline transition-colors"
              aria-label={banner.ctaLabel}
            >
              {banner.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
