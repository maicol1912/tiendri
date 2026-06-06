// Shared — GradientPromo Hero (from pets-modern)
// Green gradient rounded card with product image left, title + subtitle right.
// ZERO hardcoded colors — gradient via CSS variables.

import Image from "next/image";
import type { HeroStaticProps } from "./types";

export default function GradientPromo({
  titleBold,
  description,
  image,
  onCtaClick,
}: HeroStaticProps) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[var(--t-radius-card)]"
      style={{
        background: `linear-gradient(106deg, var(--t-promo-banner-from) 1.5%, var(--t-promo-banner-to) 99%)`,
      }}
    >
      <div className="flex items-center h-[125px] md:h-[150px]">
        {/* Product image left */}
        {image && (
          <div className="relative w-[45%] h-full flex-shrink-0">
            <Image
              src={image}
              alt={titleBold ?? "Promoción"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 45vw, 300px"
            />
          </div>
        )}

        {/* Text content right */}
        <div className="flex-1 px-4 md:px-6">
          {titleBold && (
            <h3 className="text-[var(--t-promo-banner-text)] text-lg md:text-xl font-bold leading-tight">
              {titleBold}
            </h3>
          )}
          {description && (
            <p className="text-[var(--t-promo-banner-subtext)] text-sm md:text-base mt-1 font-medium">
              {description}
            </p>
          )}
          {onCtaClick && (
            <button
              type="button"
              className="mt-2 text-xs font-medium text-[var(--t-promo-banner-text)] underline"
              onClick={onCtaClick}
            >
              Ver más
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
