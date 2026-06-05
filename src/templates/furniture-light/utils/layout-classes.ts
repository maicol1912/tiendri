// Furniture Light — Layout Class Mappings

export function cardStyleClass(style: string): string {
  const map: Record<string, string> = {
    flat: "bg-[var(--t-card-bg)]",
    shadow: "bg-[var(--t-card-bg)] shadow-md",
    bordered: "bg-[var(--t-section-bg)] border border-[var(--t-border)]",
    elevated: "bg-[var(--t-section-bg)] shadow-lg",
  };
  return map[style] ?? map["flat"]!;
}

export function hoverEffectClass(effect: string): string {
  const map: Record<string, string> = {
    none: "",
    lift: "transition-transform duration-200 hover:-translate-y-1",
    scale: "transition-transform duration-200 hover:scale-[1.03]",
    glow: "transition-shadow duration-200 hover:shadow-lg hover:shadow-[var(--t-primary)]/20",
  };
  return map[effect] ?? map["none"]!;
}

export function imageRatioClass(ratio: string): string {
  const map: Record<string, string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[4/3]",
  };
  return map[ratio] ?? map["square"]!;
}
