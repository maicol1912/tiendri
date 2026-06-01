// Electronics Classic — Feature Cards
// 3-column grid on desktop, horizontal scroll on mobile.
// Each card: bg-color + title left + image right.
// All colors via var(--t-*). Note: bgColor is content data, not theme — intentional exception.

import Image from "next/image";
import type { FeatureCard } from "../types";

interface FeatureCardsProps {
  cards: FeatureCard[];
  onCardClick?: (cardId: string) => void;
}

export function FeatureCards({ cards, onCardClick }: FeatureCardsProps) {
  return (
    <section className="py-6 md:py-8" aria-label="Categorías destacadas">
      {/* Mobile: horizontal scroll (no CSS snap — uses wheel handler per tiendri-rules.md) */}
      {/* Desktop: 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card) => (
          <article
            key={card.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200 rounded-[var(--t-radius-card)]"
            style={{ backgroundColor: card.bgColor ?? "var(--t-surface)" }}
            onClick={() => onCardClick?.(card.id)}
            aria-label={card.title}
          >
            <div className="flex items-center justify-between p-4 md:p-5 h-[140px] md:h-[160px]">
              {/* Title */}
              <h3
                className="text-lg md:text-xl font-bold text-[var(--t-text-primary)] leading-tight max-w-[50%]"
              >
                {card.title}
              </h3>
              {/* Image */}
              <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] shrink-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="120px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
