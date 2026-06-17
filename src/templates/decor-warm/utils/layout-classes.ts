// Decor Warm Template — Layout Class Mappings
// Static Tailwind class maps for all configurable layout options.

// ── Card style ────────────────────────────────────────────────────────────────
export function cardStyleClass(style: string): string {
  const map: Record<string, string> = {
    flat: "bg-[var(--t-card)]",
    shadow: "bg-[var(--t-card)] shadow-md",
    bordered: "bg-[var(--t-background)] border border-[var(--t-border)]",
    elevated: "bg-[var(--t-background)] shadow-lg",
  };
  return map[style] ?? map["flat"]!;
}

// ── Hover effect ──────────────────────────────────────────────────────────────
export function hoverEffectClass(effect: string): string {
  const map: Record<string, string> = {
    none: "",
    lift: "transition-transform duration-200 hover:-translate-y-1",
    scale: "transition-transform duration-200 hover:scale-[1.03]",
    glow: "transition-shadow duration-200 hover:shadow-lg hover:shadow-[var(--t-primary)]/20",
  };
  return map[effect] ?? map["none"]!;
}

// ── Card image aspect ratio ───────────────────────────────────────────────────
export function imageRatioClass(ratio: string): string {
  const map: Record<string, string> = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
  };
  return map[ratio] ?? map["square"]!;
}

// ── Banner height ─────────────────────────────────────────────────────────────
export function bannerHeightClass(height: string): string {
  const map: Record<string, string> = {
    short: "h-[100px]",
    normal: "h-[132px] md:h-[200px]",
    tall: "h-[180px] md:h-[260px]",
  };
  return map[height] ?? map["normal"]!;
}
