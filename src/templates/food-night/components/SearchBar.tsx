"use client";

// Food Night — Search Bar (mobile, below header)

import { Search, SlidersHorizontal } from "lucide-react";

interface SearchBarProps {
  onClick?: () => void;
  onFilterClick?: () => void;
}

export function SearchBar({ onClick, onFilterClick }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-2.5 px-4 flex-1 cursor-text"
        style={{
          backgroundColor: "transparent",
          border: "1px solid var(--t-border)",
          borderRadius: "var(--t-radius-category)",
          height: 44,
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label="Buscar platos"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick?.();
        }}
      >
        <Search
          size={16}
          strokeWidth={2}
          style={{ color: "var(--t-text-muted)", flexShrink: 0 }}
        />
        <span className="text-[13px] font-normal flex-1" style={{ color: "var(--t-text-muted)" }}>
          Buscar platos...
        </span>
      </div>

      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--t-radius-category)",
            backgroundColor: "transparent",
            border: "1px solid var(--t-border)",
            cursor: "pointer",
            color: "var(--t-text-primary)",
          }}
          aria-label="Filtros"
        >
          <SlidersHorizontal size={18} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}
