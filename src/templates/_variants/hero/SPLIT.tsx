"use client";

// Hero variant: SPLIT
// Image left half, text right half — equal split.
// Mobile: image top, text below.

import { memo } from "react";
import Image from "next/image";
import type { HeroSlotProps } from "./types";

const Split = memo(function Split({
  subtitle,
  titleLight,
  titleBold,
  description,
  ctaText,
  image,
  bgColor,
  onCtaClick,
}: HeroSlotProps) {
  return (
    <section
      className="overflow-hidden w-full"
      style={{ backgroundColor: bgColor }}
      aria-label="Hero promotion"
    >
      <div className="flex flex-col lg:flex-row min-h-[400px] lg:min-h-[500px]">
        <div className="relative w-full h-[260px] lg:w-1/2 lg:h-auto shrink-0 overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={`${titleLight}${titleBold}`}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}
        </div>
        <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start justify-center text-center lg:text-left w-full lg:w-1/2 px-6 lg:px-16 py-8 lg:py-0">
          <p className="text-[var(--t-muted)] text-lg lg:text-[25px] font-semibold leading-8">
            {subtitle}
          </p>
          <h1
            className="text-[var(--t-foreground)] leading-tight"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span className="text-4xl lg:text-[96px] font-thin lg:leading-[72px]">
              {titleLight}
            </span>
            <span className="text-4xl lg:text-[96px] font-semibold lg:leading-[72px]">
              {titleBold}
            </span>
          </h1>
          <p className="text-[var(--t-muted)] text-base lg:text-lg font-medium leading-6">
            {description}
          </p>
          {ctaText && (
            <button
              type="button"
              className="border border-[var(--t-foreground)] text-[var(--t-foreground)] bg-transparent rounded-md px-10 lg:px-14 py-3 lg:py-4 text-base font-medium cursor-pointer hover:opacity-90 transition-opacity mt-2"
              onClick={onCtaClick}
            >
              {ctaText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
});

export default Split;
