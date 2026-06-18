"use client";

// Search bar variant: INLINE
// Extracted from tech-premium SearchBar.
// Always-visible text input with search icon left. Gray card background, rounded-lg.

import { memo } from "react";
import { Search } from "lucide-react";
import type { SearchBarSlotProps } from "./types";

const InlineSearchBar = memo(function InlineSearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Buscar",
}: SearchBarSlotProps) {
  return (
    <div className="flex items-center gap-2 bg-[var(--t-card)] rounded-lg h-14 px-4 w-full">
      <Search className="w-5 h-5 text-[var(--t-muted)] shrink-0" aria-hidden="true" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
        className="bg-transparent text-sm font-medium text-[var(--t-foreground)] placeholder:text-[var(--t-muted)]/50 outline-none w-full"
        aria-label={placeholder}
      />
    </div>
  );
});

export default InlineSearchBar;
