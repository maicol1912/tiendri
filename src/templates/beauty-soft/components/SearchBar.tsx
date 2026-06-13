"use client";

// Beauty Soft Template — Search Bar
// Rounded pill with search icon + input + separator + filter icon.
// ZERO hardcoded colors — all via var(--t-*).

interface SearchBarProps {
  query?: string;
  placeholder?: string;
  onQueryChange?: (value: string) => void;
  onFilterClick?: () => void;
  onFocus?: () => void;
}

export function SearchBar({
  query = "",
  placeholder = "Buscar productos...",
  onQueryChange,
  onFilterClick,
  onFocus,
}: SearchBarProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{
        backgroundColor: "var(--t-surface)",
        borderRadius: "var(--t-radius-button)",
      }}
    >
      {/* Search icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <circle cx="11" cy="11" r="8" stroke="var(--t-muted)" strokeWidth="1.75" />
        <path
          d="M21 21l-4.35-4.35"
          stroke="var(--t-muted)"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>

      {/* Search input */}
      <input
        type="search"
        placeholder={placeholder}
        aria-label="Buscar productos"
        value={query}
        onChange={(e) => onQueryChange?.(e.target.value)}
        onFocus={onFocus}
        className="flex-1 min-w-0 bg-transparent border-none outline-none text-[var(--t-foreground)]"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "15px",
          fontWeight: 400,
          lineHeight: "20px",
        }}
      />

      {/* Vertical separator */}
      <div
        style={{
          width: "1px",
          height: "20px",
          backgroundColor: "var(--t-border)",
          flexShrink: 0,
        }}
        aria-hidden="true"
      />

      {/* Filter icon */}
      <button
        type="button"
        aria-label="Filtrar"
        className="bg-transparent border-none p-0 cursor-pointer flex items-center justify-center flex-shrink-0"
        onClick={onFilterClick}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"
            stroke="var(--t-foreground)"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
          <line x1="1" y1="14" x2="7" y2="14" stroke="var(--t-foreground)" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="9" y1="8" x2="15" y2="8" stroke="var(--t-foreground)" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="17" y1="16" x2="23" y2="16" stroke="var(--t-foreground)" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
