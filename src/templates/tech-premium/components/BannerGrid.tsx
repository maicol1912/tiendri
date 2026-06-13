// Tech Premium Template — Banner Grid (secondary banners below hero)
// Figma desktop layout:
//   Left column (50%): PlayStation 5 (wide, 328px h) on top,
//     then two squares (AirPods Max on #EDEDED, Vision Pro on #353535) side by side (272px h each).
//   Right column (50%): Macbook Air tall banner (#EDEDED, 600px h).
// Mobile: full-width stacked vertically.
// Visual only — no state.

import Image from "next/image";
import type { BannerGrid as BannerGridData } from "../types";

interface BannerGridProps {
  banners: BannerGridData;
  onBannerClick?: (title: string) => void;
}

export function BannerGrid({ banners, onBannerClick }: BannerGridProps) {
  const { wide, tall, smallLeft, smallRight } = banners;

  return (
    <section className="w-full" aria-label="Featured products">
      {/* ── Desktop layout ── */}
      <div className="hidden lg:flex w-full">
        {/* Left column */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Wide banner — PlayStation 5 */}
          <article
            className="relative flex items-center h-[328px] overflow-hidden"
            style={{ backgroundColor: wide.bgColor }}
          >
            {/* Image left */}
            <div className="relative w-[55%] h-full shrink-0">
              <Image
                src={wide.image}
                alt={wide.title}
                fill
                className="object-cover object-center"
                sizes="40vw"
                loading="lazy"
              />
            </div>
            {/* Text right */}
            <div
              className="flex flex-col gap-4 pr-12 flex-1 min-w-0 max-w-[280px]"
              style={{ color: wide.textColor ?? "#000" }}
            >
              <h2
                className="text-[49px] font-medium leading-[48px]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {wide.title}
              </h2>
              <p className="text-[var(--t-muted)] text-sm font-medium leading-6">
                {wide.description}
              </p>
            </div>
          </article>

          {/* Two small squares side by side */}
          <div className="flex h-[272px]">
            {/* AirPods Max */}
            <article
              className="relative flex-1 flex items-center overflow-hidden"
              style={{ backgroundColor: smallLeft.bgColor }}
            >
              <div className="absolute left-[-70px] top-0 bottom-0 w-[55%]">
                <Image
                  src={smallLeft.image}
                  alt={smallLeft.title}
                  fill
                  className="object-contain object-left"
                  sizes="20vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 pr-8 flex-1 min-w-0 max-w-[168px] ml-auto">
                <h3
                  className="text-[29px] font-normal leading-10"
                  style={{ color: smallLeft.textColor ?? "#000", fontFamily: "var(--font-sans)" }}
                >
                  {smallLeft.title}{" "}
                  {smallLeft.titleBold && (
                    <span className="font-bold">{smallLeft.titleBold}</span>
                  )}
                </h3>
                <p className="text-[var(--t-muted)] text-sm font-medium leading-6">
                  {smallLeft.description}
                </p>
              </div>
            </article>

            {/* Vision Pro */}
            <article
              className="relative flex-1 flex items-center overflow-hidden"
              style={{ backgroundColor: smallRight.bgColor }}
            >
              <div className="relative w-[38%] h-full shrink-0">
                <Image
                  src={smallRight.image}
                  alt={smallRight.title}
                  fill
                  className="object-contain object-center"
                  sizes="20vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-2 pr-8 flex-1 min-w-0 max-w-[176px]">
                <h3
                  className="text-[29px] font-normal leading-10"
                  style={{ color: smallRight.textColor ?? "#fff", fontFamily: "var(--font-sans)" }}
                >
                  {smallRight.title}{" "}
                  {smallRight.titleBold && (
                    <span className="font-semibold">{smallRight.titleBold}</span>
                  )}
                </h3>
                <p className="text-[var(--t-muted)] text-sm font-medium leading-6">
                  {smallRight.description}
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Right column — Macbook Air tall banner */}
        <article
          className="relative flex flex-1 items-center overflow-hidden min-w-0 pl-14 py-11"
          style={{ backgroundColor: tall.bgColor }}
        >
          <div className="flex flex-col gap-4 max-w-[360px] z-10">
            <h2
              className="text-[64px] font-thin leading-[56px]"
              style={{ color: tall.textColor ?? "#000", fontFamily: "var(--font-sans)" }}
            >
              {tall.title}{" "}
              {tall.titleBold && (
                <span className="font-medium">{tall.titleBold}</span>
              )}
            </h2>
            <p className="text-[var(--t-muted)] text-sm font-medium leading-6">
              {tall.description}
            </p>
            {tall.ctaText && (
              <button
                type="button"
                className="border border-[var(--t-primary)] text-[var(--t-primary)] bg-transparent rounded-md px-14 py-4 text-base font-medium cursor-pointer hover:bg-[var(--t-primary)]/5 transition-colors self-start mt-2"
                onClick={() => onBannerClick?.(tall.title)}
              >
                {tall.ctaText}
              </button>
            )}
          </div>
          {/* Macbook image — fills right half, overflows edge */}
          <div className="absolute right-[-40px] top-0 bottom-0 w-[55%]">
            <Image
              src={tall.image}
              alt={`${tall.title}${tall.titleBold ? ` ${tall.titleBold}` : ""}`}
              fill
              className="object-contain object-right"
              sizes="40vw"
              loading="lazy"
            />
          </div>
        </article>
      </div>

      {/* ── Mobile layout — stacked ── */}
      <div className="flex flex-col lg:hidden">
        {[smallLeft, smallRight, wide, tall].map((banner, idx) => (
          <article
            key={`${banner.title}-${idx}`}
            className="relative flex flex-col items-center gap-4 p-6 min-h-[280px] overflow-hidden"
            style={{ backgroundColor: banner.bgColor }}
          >
            <div className="relative w-full h-[180px]">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-contain"
                sizes="100vw"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <h3
                className="text-2xl font-normal leading-8"
                style={{ color: banner.textColor ?? "#000", fontFamily: "var(--font-sans)" }}
              >
                {banner.title}{" "}
                {banner.titleBold && (
                  <span className="font-bold">{banner.titleBold}</span>
                )}
              </h3>
              <p className="text-[var(--t-muted)] text-sm font-medium leading-6 max-w-[280px]">
                {banner.description}
              </p>
              {banner.ctaText && (
                <button
                  type="button"
                  className="border border-current bg-transparent rounded-md px-10 py-3 text-sm font-medium cursor-pointer mt-2"
                  style={{ color: banner.textColor ?? "#000" }}
                  onClick={() => onBannerClick?.(banner.title)}
                >
                  {banner.ctaText}
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
