// Shared Template Utilities — Image Class Mappings
// ALL classes must be written out in full so Tailwind's JIT scanner
// can detect them without any dynamic string construction.

// ── Card image aspect ratio ───────────────────────────────────────────────────
// "square" is the most common default (1:1).
export function imageRatioClass(ratio: string): string {
  const map: Record<string, string> = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
  };
  return map[ratio] ?? map["square"]!;
}
