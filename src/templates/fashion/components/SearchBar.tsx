"use client";

// Fashion Template — Search Bar
// bg-[var(--t-search-bg)] sharp edges (0px radius), search icon left.
// Has local state (input value), so requires "use client".

import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
}

export function SearchBar({
  value = "",
  onChange,
  onFocus,
  placeholder = "Buscar",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 px-3 h-10 bg-[var(--t-search-bg)] rounded-[var(--t-radius-button)]">
      <Search
        size={16}
        strokeWidth={1.5}
        className="text-[var(--t-foreground)]/50 flex-shrink-0"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none min-w-0 text-[var(--t-foreground)] placeholder:text-[var(--t-foreground)]/40"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "13px",
          fontWeight: 400,
        }}
        aria-label={placeholder}
      />
    </div>
  );
}
