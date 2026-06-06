"use client";

// Shared — FeaturedAnimated Card (from pets-classic)
// Glow ring on featured, hue-tinted shadow, animation levels.
// ZERO hardcoded colors — all via var(--t-*)

import { useState, useEffect } from "react";
import Image from "next/image";
import type { CardLayoutProps } from "./types";

function formatPrice(price: number, symbol: string): string {
  return `${symbol}${new Intl.NumberFormat("en-US").format(price)}`;
}

function getRestingShadow(featured: boolean): string {
  if (featured) return "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.10)";
  return "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)";
}

function getHoverShadow(): string {
  return "0 8px 28px rgba(var(--t-primary-rgb), 0.16), 0 2px 8px rgba(0,0,0,0.08)";
}

export default function FeaturedAnimated({
  product,
  currencySymbol,
  badgeClass,
  priceConfig,
  onClick,
}: CardLayoutProps) {
  const primaryImage = product.images[0]?.url ?? null;
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;

  const featured = (product as { featured?: boolean }).featured ?? false;

  const [canHover, setCanHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const featuredRing = featured ? ", 0 0 0 2px var(--t-primary)" : "";
  let currentShadow = getRestingShadow(featured) + featuredRing;
  if (isHovered && canHover) {
    currentShadow = getHoverShadow() + featuredRing;
  }

  let currentTransform = "scale(1)";
  if (!reducedMotion) {
    if (isPressed) {
      currentTransform = "scale(0.97)";
    } else if (isHovered && canHover) {
      currentTransform = "scale(1.02)";
    }
  }

  return (
    <article
      className="max-w-sm w-full mx-auto relative flex flex-col cursor-pointer"
      style={{
        borderRadius: "var(--t-radius-card)",
        border: "1px solid var(--t-border)",
        overflow: "hidden",
        boxShadow: currentShadow,
        transform: currentTransform,
        transition: !reducedMotion ? "transform 160ms ease-out, box-shadow 160ms ease-out" : undefined,
        willChange: "transform",
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
        className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center"
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

        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.75)" }}
          >
            <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--t-text-muted)" }}>
              Agotado
            </span>
          </div>
        )}

        {hasDiscount && product.originalPrice != null && (
          <span
            className={`absolute top-2 right-2 px-2 py-0.5 ${badgeClass}`}
            style={{
              backgroundColor: "var(--t-badge-bg)",
              color: "var(--t-badge-text)",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.02em",
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}
          >
            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Info area */}
      <div
        className="flex flex-col gap-1 pt-2"
        style={{
          paddingLeft: "var(--t-space-card, 0.75rem)",
          paddingRight: "var(--t-space-card, 0.75rem)",
          paddingBottom: "var(--t-space-card, 1rem)",
        }}
      >
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
          <span
            className={priceConfig.className}
            style={{ ...(priceConfig.style ?? {}), fontWeight: 800 }}
          >
            {formatPrice(product.price, currencySymbol)}
          </span>
          {hasDiscount && product.originalPrice != null && (
            <span style={{ fontSize: "11px", color: "var(--t-text-muted)", textDecoration: "line-through" }}>
              {formatPrice(product.originalPrice, currencySymbol)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
