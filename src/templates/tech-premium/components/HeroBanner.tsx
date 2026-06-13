// Tech Premium Template — Hero Banner
// Figma desktop: full-width dark bg (#211C24), subtitle "Pro.Beyond.",
// large title (96px, thin + semibold), description, "Shop Now" bordered button,
// phone image right side. Desktop: px-[160px], flex row.
// Mobile: stacked, centered text, image below.
// Visual only — handlers come as props.

import Image from "next/image";
import type { HeroBannerData } from "../types";
import type { HeroVariant } from "@/types/templates/primitives";

interface HeroBannerProps {
  data: HeroBannerData;
  heroVariant?: HeroVariant;
  onCtaClick?: () => void;
}

export function HeroBanner({ data, heroVariant = "contained", onCtaClick }: HeroBannerProps) {
  const { subtitle, titleLight, titleBold, description, ctaText, image, bgColor } = data;

  if (heroVariant === "full-bleed") {
    return (
      <section
        className="overflow-hidden w-full relative"
        style={{ backgroundColor: bgColor }}
        aria-label="Hero promotion"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between pt-10 pb-0 lg:py-0">
          <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start text-center lg:text-left flex-1 min-w-0 px-6 lg:px-16 z-10">
            <p className="text-white/40 text-lg lg:text-[25px] font-semibold leading-8">
              {subtitle}
            </p>
            <h1 className="text-white leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
              <span className="text-4xl lg:text-[96px] font-thin lg:leading-[72px]">
                {titleLight}
              </span>
              <span className="text-4xl lg:text-[96px] font-semibold lg:leading-[72px]">
                {titleBold}
              </span>
            </h1>
            <p className="text-[var(--t-muted)] text-base lg:text-lg font-medium leading-6 whitespace-nowrap">
              {description}
            </p>
            <button
              type="button"
              className="border border-white text-white bg-transparent rounded-md px-10 lg:px-14 py-3 lg:py-4 text-base font-medium cursor-pointer hover:bg-white/10 transition-colors mt-2"
              onClick={onCtaClick}
            >
              {ctaText}
            </button>
          </div>
          <div className="relative w-full h-[300px] lg:w-[50%] lg:h-[632px] shrink-0 mt-6 lg:mt-0 overflow-hidden">
            <Image
              src={image}
              alt={`${titleLight}${titleBold}`}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </section>
    );
  }

  if (heroVariant === "split") {
    return (
      <section
        className="overflow-hidden w-full"
        style={{ backgroundColor: bgColor }}
        aria-label="Hero promotion"
      >
        <div className="flex flex-col lg:flex-row min-h-[400px] lg:min-h-[500px]">
          {/* Image — left half on desktop, top on mobile */}
          <div className="relative w-full h-[260px] lg:w-1/2 lg:h-auto shrink-0 overflow-hidden">
            <Image
              src={image}
              alt={`${titleLight}${titleBold}`}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          {/* Text — right half on desktop, bottom on mobile */}
          <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start justify-center text-center lg:text-left w-full lg:w-1/2 px-6 lg:px-16 py-8 lg:py-0">
            <p className="text-white/40 text-lg lg:text-[25px] font-semibold leading-8">
              {subtitle}
            </p>
            <h1 className="text-white leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
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
            <button
              type="button"
              className="border border-white text-white bg-transparent rounded-md px-10 lg:px-14 py-3 lg:py-4 text-base font-medium cursor-pointer hover:bg-white/10 transition-colors mt-2"
              onClick={onCtaClick}
            >
              {ctaText}
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (heroVariant === "text-only") {
    return (
      <section
        className="overflow-hidden w-full"
        style={{ backgroundColor: bgColor }}
        aria-label="Hero promotion"
      >
        <div className="flex flex-col items-center justify-center text-center px-6 lg:px-[160px] py-16 lg:py-24 gap-6">
          <p className="text-white/40 text-lg lg:text-[25px] font-semibold leading-8">
            {subtitle}
          </p>
          <h1
            className="text-white leading-tight"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "var(--t-type-display-size, clamp(3rem, 8vw, 7rem))",
            }}
          >
            <span className="font-thin">{titleLight}</span>
            <span className="font-semibold">{titleBold}</span>
          </h1>
          <p className="text-[var(--t-muted)] text-base lg:text-lg font-medium leading-6 max-w-xl">
            {description}
          </p>
          <button
            type="button"
            className="border border-white text-white bg-transparent rounded-md px-10 lg:px-14 py-3 lg:py-4 text-base font-medium cursor-pointer hover:bg-white/10 transition-colors mt-2"
            onClick={onCtaClick}
          >
            {ctaText}
          </button>
        </div>
      </section>
    );
  }

  // contained — default, identical to original
  return (
    <section
      className="overflow-hidden w-full"
      style={{ backgroundColor: bgColor }}
      aria-label="Hero promotion"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[160px] pt-10 pb-0 lg:py-0">
        {/* Text content */}
        <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start text-center lg:text-left flex-1 min-w-0 lg:min-w-[400px] z-10">
          <p className="text-white/40 text-lg lg:text-[25px] font-semibold leading-8">
            {subtitle}
          </p>
          <h1 className="text-white leading-tight" style={{ fontFamily: "var(--font-sans)" }}>
            <span className="text-4xl lg:text-[96px] font-thin lg:leading-[72px]">
              {titleLight}
            </span>
            <span className="text-4xl lg:text-[96px] font-semibold lg:leading-[72px]">
              {titleBold}
            </span>
          </h1>
          <p className="text-[var(--t-muted)] text-base lg:text-lg font-medium leading-6 whitespace-nowrap">
            {description}
          </p>
          <button
            type="button"
            className="border border-white text-white bg-transparent rounded-md px-10 lg:px-14 py-3 lg:py-4 text-base font-medium cursor-pointer hover:bg-white/10 transition-colors mt-2"
            onClick={onCtaClick}
          >
            {ctaText}
          </button>
        </div>

        {/* Hero image — mobile: cropped at bottom, desktop: fully visible */}
        <div className="relative w-full h-[300px] lg:w-[406px] lg:h-[632px] shrink-0 mt-6 lg:mt-0 overflow-hidden">
          <Image
            src={image}
            alt={`${titleLight}${titleBold}`}
            width={406}
            height={632}
            className="object-contain object-top w-full lg:w-[406px] h-[500px] lg:h-[632px]"
            sizes="(max-width: 1024px) 100vw, 406px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
