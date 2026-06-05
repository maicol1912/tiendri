// Pet V3 Template — Category Section
// Rounded card with soft colored bg, pet image + label.
// bgColor is per-item data, not a theme token (intentional inline style).
// ZERO hardcoded colors for theme elements — all via CSS variables.

import Image from "next/image";
import type { PetType } from "../types";

interface CategorySectionProps {
  petType: PetType;
  onClick?: () => void;
}

export function CategorySection({ petType, onClick }: CategorySectionProps) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 w-[173px] md:w-full h-[81px] rounded-[var(--t-radius-card)] overflow-hidden flex items-center relative group transition-shadow duration-200 hover:shadow-md"
      style={{ backgroundColor: petType.bgColor }}
    >
      {/* Pet image */}
      <div className="relative w-[76px] h-[76px] flex-shrink-0 ml-2">
        <Image
          src={petType.image}
          alt={petType.label}
          fill
          className="object-cover"
          sizes="76px"
        />
      </div>

      {/* Label */}
      <span className="flex-1 text-right pr-4 text-[var(--t-text-secondary)] text-xl font-medium">
        {petType.label}
      </span>
    </button>
  );
}
