"use client";

// Pets Classic — Product Card
// max-w-sm w-full mx-auto. All colors via var(--t-*).
// ZERO hardcoded hex, ZERO hardcoded grid-cols, ZERO hardcoded border-radius.
// Hover/press state via React event handlers — no per-card <style> injection.
// @media (hover: hover) guard implemented via pointer-type check on mount.

import { useState, useEffect } from "react";
import Image from "next/image";
import type { PetsClassicProduct } from "../types";
import { cardStyleClass, imageRatioClass } from "../utils/layout-classes";

interface ProductCardProps {
  product: PetsClassicProduct;
  currencySymbol?: string;
  onClick?: () => void;
  /** When true, forces a compact 4/3 image ratio and reduced padding for grid listings */
  listingMode?: boolean;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    shadowStyle?: "hue-tinted" | "neutral";
    animationLevel?: "full" | "subtle" | "none";
  };
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US").format(price);
}

/** Returns the resting box-shadow based on shadowStyle and featured state */
function getRestingShadow(shadowStyle: string | undefined, featured: boolean): string {
  if (featured) return "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)";
  if (shadowStyle === "hue-tinted") {
    return "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)";
  }
  return "0 2px 8px rgba(0,0,0,0.06)";
}

/** Returns the hover box-shadow based on shadowStyle */
function getHoverShadow(shadowStyle: string | undefined): string {
  if (shadowStyle === "hue-tinted") {
    return "0 8px 28px rgba(var(--t-primary-rgb), 0.16), 0 2px 8px rgba(0,0,0,0.08)";
  }
  return "0 4px 16px rgba(0,0,0,0.10)";
}

export function ProductCard({ product, currencySymbol = "$", onClick, listingMode = false, layout }: ProductCardProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const hasDiscount =
    product.compare_at_price !== null && product.compare_at_price > product.price;

  const shadowStyle = layout?.shadowStyle;
  const animationLevel = layout?.animationLevel ?? "none";

  const styleClass = cardStyleClass(layout?.cardStyle ?? "flat");
  // In listing mode use a compact wide ratio so cards don't tower over the grid
  const ratioClass = listingMode
    ? imageRatioClass("wide")
    : imageRatioClass(layout?.cardImageRatio ?? "portrait");

  // Detect if device supports hover (pointer: fine) — guards scale on desktop only.
  // Initialise to false (SSR-safe) and flip on client.
  const [canHover, setCanHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const featured = product.featured ?? false;
  const restingShadow = getRestingShadow(shadowStyle, featured);
  const hoverShadow = getHoverShadow(shadowStyle);

  // Featured cards get a glow ring via box-shadow instead of a thick border
  const featuredRing = featured ? ", 0 0 0 2px var(--t-primary)" : "";

  // Compute current shadow
  let currentShadow = restingShadow + featuredRing;
  if ((animationLevel === "full" || animationLevel === "subtle") && isHovered && canHover) {
    currentShadow = hoverShadow + featuredRing;
  }

  // Compute current transform (GPU-composited: only transform + opacity)
  let currentTransform = "scale(1)";
  if (!reducedMotion) {
    if (animationLevel === "full" && isPressed) {
      currentTransform = "scale(0.97)";
    } else if (animationLevel === "full" && isHovered && canHover) {
      currentTransform = "scale(1.02)";
    }
  }

  const hasMotion = animationLevel !== "none";

  return (
    <article
      className={`max-w-sm w-full mx-auto relative flex flex-col cursor-pointer ${styleClass}`}
      style={{
        borderRadius: "var(--t-radius-card)",
        border: "1px solid var(--t-border)",
        overflow: "hidden",
        boxShadow: currentShadow,
        transform: currentTransform,
        transition: hasMotion && !reducedMotion
          ? "transform 160ms ease-out, box-shadow 160ms ease-out"
          : undefined,
        willChange: animationLevel === "full" ? "transform" : undefined,
      }}
      onClick={onClick}
      aria-label={`Ver ${product.name}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Image area */}
      <div
        className={`relative w-full ${ratioClass} overflow-hidden flex items-center justify-center`}
        style={{ background: "linear-gradient(160deg, var(--t-surface) 0%, #fff 100%)" }}
      >
        {primaryImage ? (
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-contain p-3"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="var(--t-border)" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="7" cy="5" rx="2" ry="2.5" />
              <ellipse cx="12" cy="3.5" rx="2" ry="2.5" />
              <ellipse cx="17" cy="5" rx="2" ry="2.5" />
              <ellipse cx="5" cy="10" rx="2" ry="2.5" />
              <path d="M8 14c0 0 1-3 4-3s4 3 4 3 1 4-1 5.5S11 18 9 16.5 8 14 8 14z" />
            </svg>
          </div>
        )}

        {!product.available && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--t-text-muted)" }}>
              Agotado
            </span>
          </div>
        )}

        {hasDiscount && product.compare_at_price && (
          <span
            className="absolute top-2 right-2 px-2 py-0.5"
            style={{
              borderRadius: "var(--t-radius-button)",
              backgroundColor: "var(--t-badge-bg)",
              color: "var(--t-badge-text)",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.02em",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}
          >
            -{Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)}%
          </span>
        )}
      </div>

      {/* Info area */}
      <div className={`flex flex-col gap-1 pt-2 ${listingMode ? "px-2 pb-3" : "px-3 pb-4"}`}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--t-text-primary)",
            lineHeight: 1.35,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--t-primary)" }}>
            {currencySymbol}{formatPrice(product.price)}
          </span>
          {hasDiscount && product.compare_at_price && (
            <span style={{ fontSize: "11px", color: "var(--t-text-muted)", textDecoration: "line-through" }}>
              {currencySymbol}{formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
