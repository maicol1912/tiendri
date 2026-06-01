// Pet V3 Template — Category Card (Explore page)
// Square-ish card with pastel bg, centered image, label below.
// bgColor and borderColor are per-item data (intentional inline style).
// ZERO hardcoded colors for theme elements — all via CSS variables.

import Image from "next/image";
import type { PetCategory } from "../types";
import { hoverEffectClass } from "../utils/layout-classes";

interface CategoryCardProps {
  category: PetCategory;
  onClick?: () => void;
  layout?: {
    cardHoverEffect?: string;
  };
}

export function CategoryCard({ category, onClick, layout }: CategoryCardProps) {
  const hoverClass = hoverEffectClass(layout?.cardHoverEffect ?? "scale");

  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[var(--t-radius-category)] overflow-hidden border transition-all duration-200 group ${hoverClass}`}
      style={{
        backgroundColor: category.bgColor,
        borderColor: category.borderColor,
      }}
    >
      {/* Image area */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
        <div className="relative w-[110px] h-[110px] md:w-[120px] md:h-[120px]">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 110px, 120px"
          />
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-[var(--t-text-primary)] text-base font-medium tracking-[0.1px] pb-4">
        {category.name}
      </p>
    </button>
  );
}
