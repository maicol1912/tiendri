"use client";

// Beauty Elegant Template — Search Bar
// Purple-tinted glassmorphic: search-bg + search-border tint. Rounded pill.

import { Search, ScanLine } from "lucide-react";

interface SearchBarProps {
  query?: string;
  placeholder?: string;
  onQueryChange?: (value: string) => void;
  onFocus?: () => void;
}

export function SearchBar({
  query = "",
  placeholder = "Buscar",
  onQueryChange,
  onFocus,
}: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{
        backgroundColor: "var(--t-search-bg)",
        border: "1px solid var(--t-search-border)",
        borderRadius: "13px",
      }}
    >
      <Search
        size={18}
        strokeWidth={1.75}
        color="var(--t-border-mid)"
        style={{ flexShrink: 0 }}
        aria-hidden="true"
      />

      <input
        type="search"
        placeholder={placeholder}
        aria-label="Buscar productos"
        value={query}
        onChange={(e) => onQueryChange?.(e.target.value)}
        onFocus={onFocus}
        className="flex-1 min-w-0 bg-transparent border-0 outline-none text-sm"
        style={{
          color: "var(--t-text-primary)",
          lineHeight: "20px",
        }}
      />

      <ScanLine
        size={18}
        strokeWidth={1.75}
        color="var(--t-border-mid)"
        style={{ flexShrink: 0, cursor: "pointer" }}
        aria-hidden="true"
      />
    </div>
  );
}
