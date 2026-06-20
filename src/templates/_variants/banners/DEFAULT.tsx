"use client";
import React, { memo } from "react";
import Image from "next/image";
import { getSectionField } from "@/templates/_core/sections/get-section-field";
import type { BannersSlotProps } from "./types";

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

const BannersDefault = memo(function BannersDefault({
  config,
  sectionConfig,
  onCtaClick,
}: BannersSlotProps) {
  const sectionTitle = getSectionField<string | undefined>(
    "title",
    sectionConfig,
    undefined,
    undefined
  );
  const sectionSubtitle = getSectionField<string | undefined>(
    "subtitle",
    sectionConfig,
    undefined,
    undefined
  );

  const content = config as unknown as {
    content?: BannersContent["banners"] & {
      banners?: BannersContent["banners"];
    };
  };

  const bannersRaw = content.content?.banners ?? content.content;
  const globalBanners = bannersRaw;

  // Wide banner — merge sectionConfig overrides
  const wideTitle = getSectionField<string | undefined>(
    "wideTitle",
    sectionConfig,
    globalBanners?.wide?.title,
    undefined
  );
  const wideTitleBold = getSectionField<string | undefined>(
    "wideTitleBold",
    sectionConfig,
    globalBanners?.wide?.titleBold,
    undefined
  );
  const wideDescription = getSectionField<string | undefined>(
    "wideDescription",
    sectionConfig,
    globalBanners?.wide?.description,
    undefined
  );
  const wideImage = getSectionField<string | undefined>(
    "wideImage",
    sectionConfig,
    globalBanners?.wide?.image,
    undefined
  );
  const wideCtaText = getSectionField<string | undefined>(
    "wideCtaText",
    sectionConfig,
    globalBanners?.wide?.ctaText,
    undefined
  );
  const wideBgColor = getSectionField<string | undefined>(
    "wideBgColor",
    sectionConfig,
    globalBanners?.wide?.bgColor,
    undefined
  );
  const wideTextColor = getSectionField<string | undefined>(
    "wideTextColor",
    sectionConfig,
    globalBanners?.wide?.textColor,
    undefined
  );

  // Tall banner — merge sectionConfig overrides
  const tallTitle = getSectionField<string | undefined>(
    "tallTitle",
    sectionConfig,
    globalBanners?.tall?.title,
    undefined
  );
  const tallTitleBold = getSectionField<string | undefined>(
    "tallTitleBold",
    sectionConfig,
    globalBanners?.tall?.titleBold,
    undefined
  );
  const tallDescription = getSectionField<string | undefined>(
    "tallDescription",
    sectionConfig,
    globalBanners?.tall?.description,
    undefined
  );
  const tallImage = getSectionField<string | undefined>(
    "tallImage",
    sectionConfig,
    globalBanners?.tall?.image,
    undefined
  );
  const tallCtaText = getSectionField<string | undefined>(
    "tallCtaText",
    sectionConfig,
    globalBanners?.tall?.ctaText,
    undefined
  );
  const tallBgColor = getSectionField<string | undefined>(
    "tallBgColor",
    sectionConfig,
    globalBanners?.tall?.bgColor,
    undefined
  );
  const tallTextColor = getSectionField<string | undefined>(
    "tallTextColor",
    sectionConfig,
    globalBanners?.tall?.textColor,
    undefined
  );

  // SmallLeft banner — merge sectionConfig overrides
  const smallLeftTitle = getSectionField<string | undefined>(
    "smallLeftTitle",
    sectionConfig,
    globalBanners?.smallLeft?.title,
    undefined
  );
  const smallLeftTitleBold = getSectionField<string | undefined>(
    "smallLeftTitleBold",
    sectionConfig,
    globalBanners?.smallLeft?.titleBold,
    undefined
  );
  const smallLeftDescription = getSectionField<string | undefined>(
    "smallLeftDescription",
    sectionConfig,
    globalBanners?.smallLeft?.description,
    undefined
  );
  const smallLeftImage = getSectionField<string | undefined>(
    "smallLeftImage",
    sectionConfig,
    globalBanners?.smallLeft?.image,
    undefined
  );
  const smallLeftCtaText = getSectionField<string | undefined>(
    "smallLeftCtaText",
    sectionConfig,
    globalBanners?.smallLeft?.ctaText,
    undefined
  );
  const smallLeftBgColor = getSectionField<string | undefined>(
    "smallLeftBgColor",
    sectionConfig,
    globalBanners?.smallLeft?.bgColor,
    undefined
  );
  const smallLeftTextColor = getSectionField<string | undefined>(
    "smallLeftTextColor",
    sectionConfig,
    globalBanners?.smallLeft?.textColor,
    undefined
  );

  // SmallRight banner — merge sectionConfig overrides
  const smallRightTitle = getSectionField<string | undefined>(
    "smallRightTitle",
    sectionConfig,
    globalBanners?.smallRight?.title,
    undefined
  );
  const smallRightTitleBold = getSectionField<string | undefined>(
    "smallRightTitleBold",
    sectionConfig,
    globalBanners?.smallRight?.titleBold,
    undefined
  );
  const smallRightDescription = getSectionField<string | undefined>(
    "smallRightDescription",
    sectionConfig,
    globalBanners?.smallRight?.description,
    undefined
  );
  const smallRightImage = getSectionField<string | undefined>(
    "smallRightImage",
    sectionConfig,
    globalBanners?.smallRight?.image,
    undefined
  );
  const smallRightCtaText = getSectionField<string | undefined>(
    "smallRightCtaText",
    sectionConfig,
    globalBanners?.smallRight?.ctaText,
    undefined
  );
  const smallRightBgColor = getSectionField<string | undefined>(
    "smallRightBgColor",
    sectionConfig,
    globalBanners?.smallRight?.bgColor,
    undefined
  );
  const smallRightTextColor = getSectionField<string | undefined>(
    "smallRightTextColor",
    sectionConfig,
    globalBanners?.smallRight?.textColor,
    undefined
  );

  // Construct merged banner objects — fall back to global when sectionConfig lacks all required fields
  const wide: BannerItem | undefined =
    wideTitle && wideImage && wideBgColor && wideDescription
      ? {
          title: wideTitle,
          titleBold: wideTitleBold,
          description: wideDescription,
          image: wideImage,
          ctaText: wideCtaText,
          bgColor: wideBgColor,
          textColor: wideTextColor,
        }
      : globalBanners?.wide;

  const tall: BannerItem | undefined =
    tallTitle && tallImage && tallBgColor && tallDescription
      ? {
          title: tallTitle,
          titleBold: tallTitleBold,
          description: tallDescription,
          image: tallImage,
          ctaText: tallCtaText,
          bgColor: tallBgColor,
          textColor: tallTextColor,
        }
      : globalBanners?.tall;

  const smallLeft: BannerItem | undefined =
    smallLeftTitle && smallLeftImage && smallLeftBgColor && smallLeftDescription
      ? {
          title: smallLeftTitle,
          titleBold: smallLeftTitleBold,
          description: smallLeftDescription,
          image: smallLeftImage,
          ctaText: smallLeftCtaText,
          bgColor: smallLeftBgColor,
          textColor: smallLeftTextColor,
        }
      : globalBanners?.smallLeft;

  const smallRight: BannerItem | undefined =
    smallRightTitle &&
    smallRightImage &&
    smallRightBgColor &&
    smallRightDescription
      ? {
          title: smallRightTitle,
          titleBold: smallRightTitleBold,
          description: smallRightDescription,
          image: smallRightImage,
          ctaText: smallRightCtaText,
          bgColor: smallRightBgColor,
          textColor: smallRightTextColor,
        }
      : globalBanners?.smallRight;

  if (!wide && !tall && !smallLeft && !smallRight) return null;

  const mobileBanners = [smallLeft, smallRight, wide, tall].filter(
    Boolean
  ) as BannerItem[];

  return (
    <section className="w-full" aria-label="Banners promocionales">
      {(sectionTitle || sectionSubtitle) && (
        <div className="text-center py-8 md:py-10 max-w-[92%] lg:max-w-[65%] mx-auto">
          {sectionTitle && (
            <h2
              className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2"
              style={{ color: "var(--t-foreground)" }}
            >
              {sectionTitle}
            </h2>
          )}
          {sectionSubtitle && (
            <p
              className="text-sm md:text-base"
              style={{ color: "var(--t-muted)" }}
            >
              {sectionSubtitle}
            </p>
          )}
        </div>
      )}
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
                <p
                  className="text-sm font-medium leading-6"
                  style={{ color: "var(--t-muted)" }}
                >
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
                      style={{
                        color: smallLeft.textColor ?? "var(--t-foreground)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {smallLeft.title}{" "}
                      {smallLeft.titleBold && (
                        <span className="font-bold">{smallLeft.titleBold}</span>
                      )}
                    </h3>
                    <p
                      className="text-sm font-medium leading-6"
                      style={{ color: "var(--t-muted)" }}
                    >
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
                      style={{
                        color: smallRight.textColor ?? "var(--t-foreground)",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {smallRight.title}{" "}
                      {smallRight.titleBold && (
                        <span className="font-semibold">
                          {smallRight.titleBold}
                        </span>
                      )}
                    </h3>
                    <p
                      className="text-sm font-medium leading-6"
                      style={{ color: "var(--t-muted)" }}
                    >
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
                style={{
                  color: tall.textColor ?? "var(--t-foreground)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {tall.title}{" "}
                {tall.titleBold && (
                  <span className="font-medium">{tall.titleBold}</span>
                )}
              </h2>
              <p
                className="text-sm font-medium leading-6"
                style={{ color: "var(--t-muted)" }}
              >
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
                style={{
                  color: banner.textColor ?? "var(--t-foreground)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {banner.title}{" "}
                {banner.titleBold && (
                  <span className="font-bold">{banner.titleBold}</span>
                )}
              </h3>
              <p
                className="text-sm font-medium leading-6 max-w-[280px]"
                style={{ color: "var(--t-muted)" }}
              >
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

export default BannersDefault;
