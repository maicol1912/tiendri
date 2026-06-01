// Tech Premium Template — Popular Product Banner Card
// Figma: tall card with product image top (rotated/artistic placement),
// title 33px light, description 14px gray, "Shop Now" bordered button bottom.
// Desktop: 4 equal cards in a row. Mobile: full-width stacked.
// Visual only — handler comes as prop.
//
// Colors: fully palette-driven via dedicated CSS vars.
// Background: --t-popular-bg0 to --t-popular-bg3 (solid flat progression, no gradients).
// Text: --t-popular-text-0 to --t-popular-text-3 (per-card, handles light + dark palettes).
// Each palette defines its own 4-step progression for perfect harmony.

import Image from "next/image";
import type { PopularProduct } from "../types";

// Solid color progression: dedicated per-palette tokens for each card slot.
// No gradients, no color-mix — each card has a flat, solid background color
// tuned by the palette designer for perfect harmony.
const cardVariants = [
  'var(--t-popular-bg0)',  // card 0: lightest
  'var(--t-popular-bg1)',  // card 1: light-medium
  'var(--t-popular-bg2)',  // card 2: medium
  'var(--t-popular-bg3)',  // card 3: darkest
] as const;

// Per-card text color tokens — each palette defines 4 explicit values.
// Light palettes: dark text on cards 0-2, light text on card 3.
// Dark palettes: light text on all 4 cards.
// No index-based heuristic needed — the palette is the source of truth.
const textVariants = [
  "var(--t-popular-text-0)", // card 0
  "var(--t-popular-text-1)", // card 1
  "var(--t-popular-text-2)", // card 2
  "var(--t-popular-text-3)", // card 3
] as const;

interface PopularProductCardProps {
  product: PopularProduct;
  index?: number;
  onClick?: () => void;
}

export function PopularProductCard({
  product,
  index = 0,
  onClick,
}: PopularProductCardProps) {
  const safeIndex = index % cardVariants.length;
  const cardBg = cardVariants[safeIndex];
  const textColor = textVariants[safeIndex];
  return (
    <article
      className="relative flex flex-col items-start gap-6 overflow-hidden px-8 pt-[376px] lg:pt-[376px] pb-14 min-w-0 flex-1 border-r border-[var(--t-border)] last:border-r-0"
      style={{
        backgroundColor: cardBg,
      }}
    >
      {/* Product image — positioned at top, sits directly on the solid card background */}
      <div className="absolute top-0 left-0 w-full h-[320px] lg:h-[360px]">
        <Image
          src={product.image}
          alt={`${product.title} imagen promocional`}
          fill
          className="object-contain object-bottom"
          sizes="(max-width: 1024px) 100vw, 360px"
          loading="lazy"
        />
      </div>

      {/* Text + CTA — color driven by per-palette popularText tokens */}
      <div className="flex flex-col gap-4 items-start relative z-10 w-full">
        <h3
          className="text-[28px] lg:text-[33px] font-light leading-[48px]"
          style={{ color: textColor }}
        >
          {product.title}
        </h3>
        <p
          className="text-sm font-medium leading-6 max-w-full opacity-75"
          style={{ color: textColor }}
        >
          {product.description}
        </p>
        <button
          type="button"
          className="rounded-md px-14 py-4 text-base font-medium bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
          style={{
            color: textColor,
            borderColor: textColor,
            borderWidth: "1px",
            borderStyle: "solid",
          }}
          onClick={onClick}
          aria-label={`${product.ctaText} — ${product.title}`}
        >
          {product.ctaText}
        </button>
      </div>
    </article>
  );
}
