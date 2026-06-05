// Electronics Classic — Category Section
// Image bg with gradient overlay + label at bottom.
// All colors via var(--t-*) — ZERO hardcoded hex.

import Image from "next/image";
import type { StorefrontCategory } from "../types";

interface CategorySectionProps {
  category: StorefrontCategory;
  layout?: {
    cardStyle?: string;
    cardHoverEffect?: string;
  };
  onCategoryClick?: (categoryId: string) => void;
}

export function CategorySection({
  category,
  onCategoryClick,
}: CategorySectionProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-[var(--t-radius-card)] cursor-pointer hover:shadow-lg transition-all duration-200"
      style={{ backgroundColor: "var(--t-surface)" }}
      onClick={() => onCategoryClick?.(category.id)}
      aria-label={category.name}
    >
      {/* Category image */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        {category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: "var(--t-surface)" }}
          >
            <span className="text-[var(--t-text-muted)] text-sm">{category.name}</span>
          </div>
        )}
      </div>

      {/* Label overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
        <p className="text-white text-xs md:text-sm font-semibold text-center">
          {category.name}
        </p>
        {category.productCount !== undefined && (
          <p className="text-white/70 text-[10px] md:text-xs text-center mt-0.5">
            {category.productCount} productos
          </p>
        )}
      </div>
    </article>
  );
}
