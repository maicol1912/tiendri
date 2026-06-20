"use client";
import { memo } from "react";
import type { ProductGroupBanner as ProductGroupBannerType } from "@/types/templates/product-groups";

interface Props {
  banner: ProductGroupBannerType;
}

export const ProductGroupBanner = memo(function ProductGroupBanner({ banner }: Props) {
  if (!banner.url) return null;

  const aspectClass =
    banner.aspectRatio === "standard" ? "aspect-[16/9]" : "aspect-[21/9]";

  const isDecorative = !banner.alt;

  return (
    <div
      className="w-full overflow-hidden mb-6"
      style={{ borderRadius: "var(--t-radius-card)" }}
    >
      <div className={aspectClass}>
        <img
          src={banner.url}
          alt={banner.alt ?? ""}
          loading="lazy"
          className="w-full h-full object-cover"
          {...(isDecorative ? { "aria-hidden": "true", role: "presentation" } : {})}
        />
      </div>
    </div>
  );
});
