// Furniture Dark Template — Layout Class Mappings
// Static Tailwind class maps for all configurable layout options.

export function cardStyleClass(style: string): string {
  const map: Record<string, string> = {
    flat: "bg-[var(--t-card)]",
    shadow: "bg-[var(--t-card)] shadow-md",
    bordered: "bg-[var(--t-background)] border border-[var(--t-border)]",
    elevated: "bg-[var(--t-background)] shadow-lg",
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
    portrait: "aspect-[4/5]",
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
  };
  return map[ratio] ?? map["square"]!;
}

export function tabStyleClasses(style: string, isActive: boolean): string {
  const map: Record<string, { active: string; inactive: string }> = {
    underline: {
      active: "text-[var(--t-primary)] border-b-2 border-[var(--t-primary)]",
      inactive: "text-[var(--t-muted)] border-b-2 border-transparent hover:text-[var(--t-primary)]/60",
    },
    pills: {
      active: "text-[var(--t-on-primary)] bg-[var(--t-primary)] rounded-full px-4",
      inactive: "text-[var(--t-muted)] bg-transparent rounded-full px-4 hover:bg-[var(--t-card)]",
    },
    bordered: {
      active: "text-[var(--t-primary)] border border-[var(--t-primary)] rounded-md px-4",
      inactive: "text-[var(--t-muted)] border border-transparent rounded-md px-4 hover:border-[var(--t-border)]",
    },
  };
  const styles = map[style] ?? map["underline"]!;
  return isActive ? styles.active : styles.inactive;
}

export function bannerHeightClass(height: string): string {
  const map: Record<string, string> = {
    short: "h-[200px] lg:h-[300px]",
    normal: "h-[176px] lg:h-[280px]",
    tall: "h-[240px] lg:h-[360px]",
  };
  return map[height] ?? map["normal"]!;
}
