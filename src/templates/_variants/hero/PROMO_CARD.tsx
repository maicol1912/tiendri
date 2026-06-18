"use client";

import { memo } from "react";
import type { HeroSlotProps } from "./types";

const PromoCard = memo(function PromoCard({
  subtitle,
  titleBold,
  ctaText,
  image,
  onCtaClick,
}: HeroSlotProps) {
  return (
    <section aria-label="Banner promocional">
      <div
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: "var(--t-radius-card)",
          minHeight: "clamp(320px, 45vw, 520px)",
          backgroundColor: "var(--t-card)",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Gradient overlay — bottom-to-top for text readability */}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background: image
              ? "linear-gradient(to top, color-mix(in srgb, var(--t-card) 90%, transparent) 0%, color-mix(in srgb, var(--t-card) 50%, transparent) 45%, transparent 100%)"
              : "linear-gradient(135deg, color-mix(in srgb, var(--t-card) 98%, transparent) 0%, color-mix(in srgb, var(--t-card) 85%, transparent) 100%)",
          }}
        />

        {/* Decorative warm glow blob — top right, only when no image */}
        {!image && (
          <div
            className="absolute top-0 right-0 pointer-events-none"
            aria-hidden="true"
            style={{
              width: "55%",
              height: "70%",
              backgroundColor: "var(--t-primary)",
              opacity: 0.15,
              filter: "blur(60px)",
              borderRadius: "50%",
            }}
          />
        )}

        {/* Content anchored at bottom-left */}
        <div
          className="relative z-10 flex flex-col gap-2 md:gap-3"
          style={{
            padding: "clamp(20px, 3.5vw, 36px)",
            maxWidth: "560px",
          }}
        >
          {subtitle && (
            <p
              className="m-0 font-bold uppercase tracking-widest"
              style={{
                color: "var(--t-accent, var(--t-primary))",
                fontSize: "11px",
                letterSpacing: "0.12em",
              }}
            >
              {subtitle}
            </p>
          )}

          <h2
            className="m-0 font-extrabold leading-tight"
            style={{
              color: "var(--t-foreground)",
              fontSize: "clamp(20px, 4vw, 36px)",
              fontFamily: "var(--font-heading, var(--font-sans))",
              letterSpacing: "-0.02em",
            }}
          >
            {titleBold}
          </h2>

          <button
            type="button"
            className="self-start border-0 cursor-pointer"
            style={{
              fontFamily: "var(--font-heading, var(--font-sans))",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--t-on-primary)",
              backgroundColor: "var(--t-primary)",
              borderRadius: "var(--t-radius-button)",
              padding: "8px 22px",
              height: "38px",
              whiteSpace: "nowrap",
              marginTop: "4px",
            }}
            onClick={onCtaClick}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </section>
  );
});

export default PromoCard;
