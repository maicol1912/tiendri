'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { HeroCarouselProps } from './types';

export default function HeroPromoCarousel({ cards, onCardClick }: HeroCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      el.scrollLeft += e.deltaY * 2.5;
    };

    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto px-5 pb-2 scrollbar-none"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
      role="region"
      aria-label="Promociones destacadas"
    >
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="relative flex-shrink-0 rounded-[var(--t-radius-card)] overflow-hidden"
          style={{ width: '300px', height: '176px' }}
          onClick={() => onCardClick?.(card.id)}
          aria-label={card.title}
        >
          {card.image && (
            <Image
              src={card.image}
              alt={card.title}
              fill
              sizes="300px"
              className="object-cover"
              priority
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)',
            }}
          />

          <div className="absolute inset-0 flex flex-col justify-end p-4">
            {card.tag && (
              <p
                className="text-[var(--t-text-summer-sale)] uppercase tracking-wider mb-1"
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                }}
              >
                {card.tag}
              </p>
            )}
            <p
              className="text-[var(--t-text-primary)] leading-tight mb-3"
              style={{
                fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.54px',
              }}
            >
              {card.title}
            </p>

            <div
              className="self-start flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--t-radius-button)]"
              style={{ backgroundColor: 'var(--t-primary)' }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--t-button-text)',
                  letterSpacing: '-0.24px',
                }}
              >
                {card.ctaLabel ?? 'Ver colección'}
              </span>
              <ChevronRight size={14} strokeWidth={2.5} style={{ color: 'var(--t-button-text)' }} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
