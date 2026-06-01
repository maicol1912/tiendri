// Pet V3 Template — Trending Card
// Image card with title + subtitle below. Horizontal scroll on mobile.
// ZERO hardcoded colors — all via CSS variables.

import Image from "next/image";
import type { TrendingItem } from "../types";
import { hoverEffectClass } from "../utils/layout-classes";

interface TrendingCardProps {
  item: TrendingItem;
  layout?: {
    cardHoverEffect?: string;
  };
}

export function TrendingCard({ item, layout }: TrendingCardProps) {
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "scale");

  return (
    <div className={`flex-shrink-0 w-[173px] md:w-full group cursor-pointer ${hoverClass}`}>
      {/* Image */}
      <div className="relative w-full aspect-square rounded-[var(--t-radius-card)] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 173px, 250px"
        />
      </div>

      {/* Text */}
      <div className="mt-2 px-0.5">
        <p className="text-[var(--t-text-primary)] text-sm md:text-base font-medium leading-tight tracking-[0.1px] line-clamp-2">
          {item.title}
        </p>
        <p className="text-[var(--t-text-muted)] text-xs md:text-sm font-medium mt-0.5">
          {item.subtitle}
        </p>
      </div>
    </div>
  );
}
