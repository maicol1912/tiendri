'use client';

import Image from 'next/image';
import type { HeroStaticProps } from './types';

export default function HeroContained({
  subtitle,
  titleLight,
  titleBold,
  description,
  ctaText,
  image,
  bgColor,
  onCtaClick,
}: HeroStaticProps) {
  return (
    <section
      className="overflow-hidden w-full"
      style={{ backgroundColor: bgColor }}
      aria-label="Hero promotion"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[160px] pt-10 pb-0 lg:py-0">
        <div className="flex flex-col gap-4 lg:gap-6 items-center lg:items-start text-center lg:text-left flex-1 min-w-0 lg:min-w-[400px] z-10">
          <p className="text-white/40 text-lg lg:text-[25px] font-semibold leading-8">
            {subtitle}
          </p>
          <h1 className="text-white leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
            <span className="text-4xl lg:text-[96px] font-thin lg:leading-[72px]">
              {titleLight}
            </span>
            <span className="text-4xl lg:text-[96px] font-semibold lg:leading-[72px]">
              {titleBold}
            </span>
          </h1>
          <p className="text-[var(--t-text-muted)] text-base lg:text-lg font-medium leading-6 whitespace-nowrap">
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

        {image && (
          <div className="relative w-full h-[300px] lg:w-[406px] lg:h-[632px] shrink-0 mt-6 lg:mt-0 overflow-hidden">
            <Image
              src={image}
              alt={`${titleLight ?? ''}${titleBold ?? ''}`}
              width={406}
              height={632}
              className="object-contain object-top w-full lg:w-[406px] h-[500px] lg:h-[632px]"
              sizes="(max-width: 1024px) 100vw, 406px"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}
