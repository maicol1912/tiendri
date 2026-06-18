"use client";
import React, { memo } from "react";
import Image from "next/image";
import type { SectionRendererProps } from "./types";

interface BannerItem {
  title: string;
  titleBold?: string;
  description: string;
  image: string;
  ctaText?: string;
  bgColor: string;
  textColor?: string;
}

interface BannersContent {
  banners?: {
    wide?: BannerItem;
    tall?: BannerItem;
    smallLeft?: BannerItem;
    smallRight?: BannerItem;
  };
}

export const BannersSection = memo(function BannersSection({
  config,
  onCtaClick,
}: SectionRendererProps) {
  const content = config as unknown as { content?: BannersContent["banners"] & { banners?: BannersContent["banners"] } };

  const bannersRaw = content.content?.banners ?? content.content;
  const wide = bannersRaw?.wide;
  const tall = bannersRaw?.tall;
  const smallLeft = bannersRaw?.smallLeft;
  const smallRight = bannersRaw?.smallRight;

  if (!wide && !tall && !smallLeft && !smallRight) return null;

  const mobileBanners = [smallLeft, smallRight, wide, tall].filter(Boolean) as BannerItem[];

  return (
    <section className="w-full" aria-label="Banners promocionales">
      {/* Desktop layout */}
      <div className="hidden lg:flex w-full">
        {/* Left column */}
        <div className="flex flex-col flex-1 min-w-0">
          {wide && (
            <article
              className="relative flex items-center h-[328px] overflow-hidden"
              style={{ backgroundColor: wide.bgColor }}
            >
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
              <div
                className="flex flex-col gap-4 pr-12 flex-1 min-w-0 max-w-[280px]"
                style={{ color: wide.textColor ?? "var(--t-foreground)" }}
              >
                <h2
                  className="text-[49px] font-medium leading-[48px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {wide.title}
                </h2>
                <p className="text-sm font-medium leading-6" style={{ color: "var(--t-muted)" }}>
                  {wide.description}
                </p>
              </div>
            </article>
          )}

          {(smallLeft || smallRight) && (
            <div className="flex h-[272px]">
              {smallLeft && (
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
                      style={{ color: smallLeft.textColor ?? "var(--t-foreground)", fontFamily: "var(--font-sans)" }}
                    >
                      {smallLeft.title}{" "}
                      {smallLeft.titleBold && (
                        <span className="font-bold">{smallLeft.titleBold}</span>
                      )}
                    </h3>
                    <p className="text-sm font-medium leading-6" style={{ color: "var(--t-muted)" }}>
                      {smallLeft.description}
                    </p>
                  </div>
                </article>
              )}

              {smallRight && (
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
                      style={{ color: smallRight.textColor ?? "var(--t-foreground)", fontFamily: "var(--font-sans)" }}
                    >
                      {smallRight.title}{" "}
                      {smallRight.titleBold && (
                        <span className="font-semibold">{smallRight.titleBold}</span>
                      )}
                    </h3>
                    <p className="text-sm font-medium leading-6" style={{ color: "var(--t-muted)" }}>
                      {smallRight.description}
                    </p>
                  </div>
                </article>
              )}
            </div>
          )}
        </div>

        {/* Right column — tall banner */}
        {tall && (
          <article
            className="relative flex flex-1 items-center overflow-hidden min-w-0 pl-14 py-11"
            style={{ backgroundColor: tall.bgColor }}
          >
            <div className="flex flex-col gap-4 max-w-[360px] z-10">
              <h2
                className="text-[64px] font-thin leading-[56px]"
                style={{ color: tall.textColor ?? "var(--t-foreground)", fontFamily: "var(--font-sans)" }}
              >
                {tall.title}{" "}
                {tall.titleBold && (
                  <span className="font-medium">{tall.titleBold}</span>
                )}
              </h2>
              <p className="text-sm font-medium leading-6" style={{ color: "var(--t-muted)" }}>
                {tall.description}
              </p>
              {tall.ctaText && (
                <button
                  type="button"
                  className="border bg-transparent rounded-md px-14 py-4 text-base font-medium cursor-pointer hover:opacity-80 transition-opacity self-start mt-2"
                  style={{
                    borderColor: "var(--t-primary)",
                    color: "var(--t-primary)",
                  }}
                  onClick={onCtaClick}
                >
                  {tall.ctaText}
                </button>
              )}
            </div>
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
        )}
      </div>

      {/* Mobile layout — stacked */}
      <div className="flex flex-col lg:hidden">
        {mobileBanners.map((banner, idx) => (
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
                style={{ color: banner.textColor ?? "var(--t-foreground)", fontFamily: "var(--font-sans)" }}
              >
                {banner.title}{" "}
                {banner.titleBold && (
                  <span className="font-bold">{banner.titleBold}</span>
                )}
              </h3>
              <p className="text-sm font-medium leading-6 max-w-[280px]" style={{ color: "var(--t-muted)" }}>
                {banner.description}
              </p>
              {banner.ctaText && (
                <button
                  type="button"
                  className="border bg-transparent rounded-md px-10 py-3 text-sm font-medium cursor-pointer mt-2"
                  style={{
                    color: banner.textColor ?? "var(--t-foreground)",
                    borderColor: banner.textColor ?? "var(--t-foreground)",
                  }}
                  onClick={onCtaClick}
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
});
