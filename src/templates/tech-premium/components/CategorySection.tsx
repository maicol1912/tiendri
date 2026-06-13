// Tech Premium Template — Category Section
// Figma: #EDEDED bg, rounded-[15px], 160x128 desktop, 100x100 mobile, icon 48px + label below.
// Categories: Phones, Smart Watches, Cameras, Headphones, Computers, Gaming.
// Visual only — handler comes as prop.

import {
  Smartphone,
  Watch,
  Camera,
  Headphones,
  Monitor,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "../types";

const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone,
  Phone: Smartphone,
  Phones: Smartphone,
  Watch,
  "Smart Watches": Watch,
  SmartWatch: Watch,
  Camera,
  Cameras: Camera,
  Headphones,
  Monitor,
  Computer: Monitor,
  Computers: Monitor,
  Gamepad2,
  Gaming: Gamepad2,
};

interface CategorySectionProps {
  category: Category;
  isActive?: boolean;
  onClick?: () => void;
}

export function CategorySection({
  category,
  isActive = false,
  onClick,
}: CategorySectionProps) {
  const Icon = ICON_MAP[category.icon] ?? ICON_MAP[category.name] ?? Smartphone;

  return (
    <button
      type="button"
      className={`flex flex-col items-center justify-center gap-2 rounded-[var(--t-radius-category)] cursor-pointer border-none transition-colors shrink-0
        w-[100px] h-[100px] lg:w-[160px] lg:h-[128px]
        ${isActive ? "bg-[var(--t-primary)] text-[var(--t-on-primary)]" : "bg-[var(--t-card)] text-[var(--t-primary)] hover:bg-[var(--t-border)]"}`}
      onClick={onClick}
      aria-label={category.name}
      aria-pressed={isActive}
    >
      <Icon className="w-8 h-8 lg:w-12 lg:h-12" strokeWidth={1.5} />
      <span className="text-xs lg:text-base font-medium leading-6 text-center whitespace-nowrap">
        {category.name}
      </span>
    </button>
  );
}
