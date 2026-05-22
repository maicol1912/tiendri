// Tech Premium Template — Layout Class Mappings
// Static Tailwind class maps for all configurable layout options.
// ALL classes must be written out in full so Tailwind's JIT scanner
// can detect them without any dynamic string construction.

// ── Card style ────────────────────────────────────────────────────────────────
// "flat" reproduces the original Figma design (bg-[var(--t-card-bg)], no shadow).
export function cardStyleClass(style: string): string {
  const map: Record<string, string> = {
    flat: "bg-[var(--t-card-bg)]",
    shadow: "bg-[var(--t-card-bg)] shadow-md",
    bordered: "bg-white border border-[var(--t-border)]",
    elevated: "bg-white shadow-lg",
  };
  return map[style] ?? map["flat"]!;
}

// ── Hover effect ──────────────────────────────────────────────────────────────
// "none" → no extra classes (original behaviour).
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
// "square" matches the original 1:1 fixed-size image container.
export function imageRatioClass(ratio: string): string {
  const map: Record<string, string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[4/3]",
  };
  return map[ratio] ?? map["square"]!;
}

// ── Product tab styles ────────────────────────────────────────────────────────
// "underline" reproduces the original Figma tab style exactly.
export function tabStyleClasses(
  style: string,
  isActive: boolean,
): string {
  const map: Record<string, { active: string; inactive: string }> = {
    underline: {
      active:
        "text-[var(--t-tab-active)] border-b-2 border-[var(--t-primary)]",
      inactive:
        "text-[var(--t-text-muted)] border-b-2 border-transparent hover:text-[var(--t-primary)]/60",
    },
    pills: {
      active:
        "text-[var(--t-button-text)] bg-[var(--t-primary)] rounded-full px-4",
      inactive:
        "text-[var(--t-text-muted)] bg-transparent rounded-full px-4 hover:bg-[var(--t-surface)]",
    },
    bordered: {
      active:
        "text-[var(--t-tab-active)] border border-[var(--t-primary)] rounded-md px-4",
      inactive:
        "text-[var(--t-text-muted)] border border-transparent rounded-md px-4 hover:border-[var(--t-border)]",
    },
  };
  const styles = map[style] ?? map["underline"]!;
  return isActive ? styles.active : styles.inactive;
}

// ── Banner height (desktop) ───────────────────────────────────────────────────
// "normal" → h-[448px] matches the original Figma desktop summer-sale banner.
export function bannerHeightClass(height: string): string {
  const map: Record<string, string> = {
    short: "h-[200px] lg:h-[300px]",
    normal: "h-[300px] lg:h-[448px]",
    tall: "h-[400px] lg:h-[560px]",
  };
  return map[height] ?? map["normal"]!;
}
