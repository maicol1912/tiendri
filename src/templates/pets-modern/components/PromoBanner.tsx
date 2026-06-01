// Pet V3 Template — Promo Banner
// Green gradient rounded card with product image left, title + discount right.
// ZERO hardcoded colors — gradient via CSS variables.

import Image from "next/image";
import type { PromoBannerData } from "../types";

interface PromoBannerProps {
  banner: PromoBannerData;
}

export function PromoBanner({ banner }: PromoBannerProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[var(--t-radius-card)]"
      style={{
        background: `linear-gradient(106deg, var(--t-promo-banner-from) 1.5%, var(--t-promo-banner-to) 99%)`,
      }}
    >
      <div className="flex items-center h-[125px] md:h-[150px]">
        {/* Product image left */}
        <div className="relative w-[45%] h-full flex-shrink-0">
          <Image
            src={banner.image}
            alt={banner.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 45vw, 300px"
          />
        </div>

        {/* Text content right */}
        <div className="flex-1 px-4 md:px-6">
          <h3 className="text-[var(--t-promo-banner-text)] text-lg md:text-xl font-bold leading-tight">
            {banner.title}
          </h3>
          <p className="text-[var(--t-promo-banner-subtext)] text-sm md:text-base mt-1 font-medium">
            {banner.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
