// Tech Premium Template — Popular Product Banner Card
// Figma: tall card with product image top (rotated/artistic placement),
// title 33px light, description 14px gray, "Shop Now" bordered button bottom.
// Desktop: 4 equal cards in a row. Mobile: full-width stacked.
// Visual only — handler comes as prop.

import Image from "next/image";
import type { PopularProduct } from "../types";

interface PopularProductCardProps {
  product: PopularProduct;
  onClick?: () => void;
}

export function PopularProductCard({
  product,
  onClick,
}: PopularProductCardProps) {
  const bgLower = product.bgColor.toLowerCase();
  const isLight =
    bgLower === "#ffffff" ||
    bgLower === "#f9f9f9" ||
    bgLower === "#eaeaea" ||
    bgLower === "#ededed" ||
    bgLower === "#f6f6f6" ||
    bgLower === "#fafafa";

  const textColor = isLight ? "#000000" : "#FFFFFF";
  const borderColor = isLight ? "#000000" : "#FFFFFF";

  return (
    <article
      className="relative flex flex-col items-start gap-6 overflow-hidden px-8 pt-[376px] lg:pt-[376px] pb-14 min-w-0 flex-1"
      style={{ backgroundColor: product.bgColor }}
    >
      {/* Product image — positioned at top */}
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

      {/* Text + CTA */}
      <div className="flex flex-col gap-4 items-start relative z-10 w-full">
        <h3
          className="text-[28px] lg:text-[33px] font-light leading-[48px]"
          style={{ color: textColor }}
        >
          {product.title}
        </h3>
        <p className="text-[var(--t-text-muted)] text-sm font-medium leading-6 max-w-full">
          {product.description}
        </p>
        <button
          type="button"
          className="rounded-md px-14 py-4 text-base font-medium bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            border: `1px solid ${borderColor}`,
            color: textColor,
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
