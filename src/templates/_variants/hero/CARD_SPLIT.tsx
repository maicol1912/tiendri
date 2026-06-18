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
      className="w-full max-w-[92%] lg:max-w-[65%] mx-auto"
      role="banner"
      aria-label="Banner promocional"
    >
    <div
      className="overflow-hidden relative"
      style={{
        borderRadius: "var(--t-radius-card)",
        background: "linear-gradient(135deg, var(--t-card) 0%, var(--t-card) 100%)",
        minHeight: "clamp(100px, 12vw, 145px)",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      {/* Radial glow blob — top right */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          width: "55%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 80% 30%, color-mix(in srgb, var(--t-primary) 18%, transparent) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Left text block — 55% width */}
      <div
        className="relative z-10 flex flex-col justify-center gap-1 md:gap-1.5 p-4 lg:p-6"
        style={{ width: "55%" }}
      >
        {eyebrow && (
          <p
            className="m-0 text-xs font-semibold uppercase tracking-wider"
            style={{ color: "var(--t-primary)" }}
          >
            {eyebrow}
          </p>
        )}

        <h2
          className="m-0 font-bold leading-tight text-lg lg:text-xl"
          style={{
            color: "var(--t-foreground)",
            fontFamily: "var(--font-heading, var(--font-sans))",
          }}
        >
          {titleBold}
        </h2>

        {descriptorText && (
          <p
            className="m-0 text-xs leading-snug"
            style={{ color: "var(--t-muted)" }}
          >
            {descriptorText}
          </p>
        )}

        <button
          type="button"
          className="self-start border-0 cursor-pointer rounded-full px-5 py-2"
          style={{
            fontFamily: "var(--font-heading, var(--font-sans))",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--t-on-primary)",
            backgroundColor: "var(--t-primary)",
            whiteSpace: "nowrap",
            marginTop: "4px",
          }}
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>

      {/* Right image/placeholder — flex-1 (~45%) */}
      <div
        className="relative flex-1 overflow-hidden"
        aria-hidden="true"
        style={{ minHeight: "140px" }}
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
