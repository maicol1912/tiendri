"use client";

import { memo } from "react";
import type { HeroSlotProps } from "./types";

const CardSplit = memo(function CardSplit({
  subtitle,
  titleLight,
  titleBold,
  description,
  ctaText,
  image,
  onCtaClick,
}: HeroSlotProps) {
  // Eyebrow: store name (titleLight) takes priority; fallback to subtitle
  const eyebrow = titleLight || subtitle;
  // Grey descriptor text: subtitle if titleLight is used as eyebrow, else description
  const descriptorText = titleLight ? subtitle : description;

  return (
    <div
      className="w-full"
      role="banner"
      aria-label="Banner promocional"
    >
    <div
      className="overflow-hidden relative"
      style={{
        borderRadius: "var(--t-radius-card)",
        background: "var(--t-card)",
        minHeight: "clamp(120px, 16vw, 160px)",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* Left panel — solid primary background, ~45% width */}
      <div
        className="relative z-10 flex flex-col justify-center gap-1 md:gap-1.5 p-3 md:p-4 lg:p-6"
        style={{
          width: "45%",
          backgroundColor: "var(--t-primary)",
        }}
      >
        {eyebrow && (
          <p
            className="m-0 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "color-mix(in srgb, var(--t-on-primary) 70%, transparent)" }}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className="m-0 font-bold leading-tight text-sm md:text-base lg:text-xl"
          style={{
            color: "var(--t-on-primary)",
            fontFamily: "var(--font-heading, var(--font-sans))",
          }}
        >
          {titleBold}
        </h2>

        {descriptorText && (
          <p
            className="m-0 text-xs leading-snug hidden sm:block"
            style={{ color: "color-mix(in srgb, var(--t-on-primary) 80%, transparent)" }}
          >
            {descriptorText}
          </p>
        )}

        <button
          type="button"
          className="self-start border-0 bg-transparent cursor-pointer p-0"
          style={{
            fontFamily: "var(--font-heading, var(--font-sans))",
            fontSize: "clamp(11px, 2.5vw, 14px)",
            fontWeight: 500,
            color: "var(--t-on-primary)",
            opacity: 0.9,
            whiteSpace: "nowrap",
            marginTop: "4px",
          }}
          onClick={onCtaClick}
        >
          {ctaText} &gt;
        </button>
      </div>

      {/* Right image/placeholder — flex-1 (~55%) */}
      <div
        className="relative flex-1 overflow-hidden"
        aria-hidden="true"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, color-mix(in srgb, var(--t-primary) 35%, transparent) 0%, color-mix(in srgb, var(--t-primary) 15%, transparent) 50%, transparent 100%)",
            }}
          >
            <div
              className="absolute"
              style={{
                top: "10%",
                right: "15%",
                width: "clamp(60px, 8vw, 90px)",
                height: "clamp(60px, 8vw, 90px)",
                borderRadius: "50%",
                backgroundColor: "color-mix(in srgb, var(--t-primary) 25%, transparent)",
                filter: "blur(16px)",
              }}
            />
            <div
              className="absolute"
              style={{
                bottom: "15%",
                right: "30%",
                width: "clamp(40px, 5vw, 60px)",
                height: "clamp(40px, 5vw, 60px)",
                borderRadius: "50%",
                backgroundColor: "color-mix(in srgb, var(--t-primary) 20%, transparent)",
                filter: "blur(10px)",
              }}
            />
            <svg
              className="absolute"
              style={{ top: "20%", right: "20%", opacity: 0.35 }}
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="var(--t-primary)"
              aria-hidden="true"
            >
              <path d="M12 2l1.5 6.5L20 12l-6.5 1.5L12 22l-1.5-6.5L4 12l6.5-1.5L12 2z" />
            </svg>
            <svg
              className="absolute"
              style={{ bottom: "25%", right: "12%", opacity: 0.25 }}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="var(--t-primary)"
              aria-hidden="true"
            >
              <path d="M12 2l1.5 6.5L20 12l-6.5 1.5L12 22l-1.5-6.5L4 12l6.5-1.5L12 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Glassmorphic inner border overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          borderRadius: "var(--t-radius-card)",
          border: "1px solid var(--t-border-light, var(--t-border))",
        }}
      />
    </div>
    </div>
  );
});

export default CardSplit;
