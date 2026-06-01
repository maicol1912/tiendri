// Pet V3 Template — Layout Class Mappings
// Static Tailwind class maps for all configurable layout options.
// ALL classes must be written out in full so Tailwind's JIT scanner
// can detect them without any dynamic string construction.

// -- Card style ---------------------------------------------------------------
export function cardStyleClass(style: string): string {
  const map: Record<string, string> = {
    flat: "bg-[var(--t-card-bg)]",
    shadow: "bg-[var(--t-card-bg)] shadow-md",
    bordered: "bg-[var(--t-card-bg)] border border-[var(--t-border)]",
    elevated: "bg-[var(--t-section-bg)] shadow-lg",
  };
  return map[style] ?? map["bordered"]!;
}

// -- Hover effect -------------------------------------------------------------
export function hoverEffectClass(effect: string): string {
  const map: Record<string, string> = {
    none: "",
    lift: "transition-transform duration-200 hover:-translate-y-1",
    scale: "transition-transform duration-200 hover:scale-[1.03]",
    glow: "transition-shadow duration-200 hover:shadow-lg hover:shadow-[var(--t-primary)]/20",
  };
  return map[effect] ?? map["none"]!;
}

// -- Card image aspect ratio --------------------------------------------------
export function imageRatioClass(ratio: string): string {
  const map: Record<string, string> = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    wide: "aspect-[4/3]",
  };
  return map[ratio] ?? map["square"]!;
}

// -- Product tab styles -------------------------------------------------------
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
        "text-[var(--t-category-active-text)] bg-[var(--t-primary)]/20 border border-[var(--t-primary)] rounded-[var(--t-radius-button)]",
      inactive:
        "text-[var(--t-text-primary)] bg-[var(--t-card-bg)] border border-[var(--t-border)] rounded-[var(--t-radius-button)] hover:border-[var(--t-primary)]/50",
    },
    bordered: {
      active:
        "text-[var(--t-tab-active)] border border-[var(--t-primary)] rounded-md px-4",
      inactive:
        "text-[var(--t-text-muted)] border border-transparent rounded-md px-4 hover:border-[var(--t-border)]",
    },
  };
  const styles = map[style] ?? map["pills"]!;
  return isActive ? styles.active : styles.inactive;
}

// -- Banner height (desktop) --------------------------------------------------
export function bannerHeightClass(height: string): string {
  const map: Record<string, string> = {
    short: "h-[100px] lg:h-[120px]",
    normal: "h-[125px] md:h-[150px]",
    tall: "h-[160px] lg:h-[200px]",
  };
  return map[height] ?? map["normal"]!;
}
