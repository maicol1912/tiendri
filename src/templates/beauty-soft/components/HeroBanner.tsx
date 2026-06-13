// Beauty Soft Template — Hero Promotional Banner
// Rounded card: left text block (40%) + right image (60%) via flexbox.
// ZERO hardcoded colors — all via var(--t-*).

import type { HeroBannerData } from "../types";
import { bannerHeightClass } from "../utils/layout-classes";

interface HeroBannerProps {
  banner: HeroBannerData;
  onShopNow?: () => void;
  layout?: Record<string, unknown>;
}

export function HeroBanner({ banner, onShopNow }: HeroBannerProps) {
  const heightClass = bannerHeightClass("short");

  return (
    <div
      className="w-full overflow-hidden flex items-center"
      style={{
        backgroundColor: "var(--t-surface)",
        borderRadius: "var(--t-radius-card)",
        height: "clamp(120px, 15vw, 180px)",
      }}
    >
      {/* Left: Promo text — 35% width */}
      <div className="flex flex-col justify-center gap-1.5 w-[35%] shrink-0 px-5 md:px-8 py-3 h-full">
        {banner.title && (
          <p
            className="m-0 text-sm font-medium text-[var(--t-foreground)] leading-tight"
            style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
          >
            {banner.title}
          </p>
        )}

        {banner.discountText && (
          <p
            className="m-0 text-sm font-medium leading-tight"
            style={{
              color: "var(--t-primary)",
              fontFamily: "var(--font-heading, var(--font-sans))",
            }}
          >
            {banner.discountText}
          </p>
        )}

        <button
          type="button"
          className="flex items-center justify-center border-0 cursor-pointer self-start mt-1"
          style={{
            fontFamily: "var(--font-heading, var(--font-sans))",
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--t-on-primary)",
            backgroundColor: "var(--t-primary)",
            borderRadius: "var(--t-radius-button)",
            padding: "4px 14px",
            height: "28px",
            whiteSpace: "nowrap",
          }}
          onClick={onShopNow}
        >
          {banner.ctaText}
        </button>
      </div>

      {/* Right: Product image — 65% width, fills full height */}
      <div className="relative w-[65%] h-full shrink-0 overflow-hidden">
        {banner.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={banner.imageUrl}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Carousel dots — bottom center of the image column */}
        <div
          className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-[5px]"
          aria-hidden="true"
        >
          <span
            className="block"
            style={{
              width: "20px",
              height: "7px",
              borderRadius: "30px",
              backgroundColor: "var(--t-muted)",
            }}
          />
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block"
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "30px",
                backgroundColor: "var(--t-background)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
