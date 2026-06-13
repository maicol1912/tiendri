"use client";

// Fashion Template — Filter Sidebar
// Desktop-only filter panel (hidden lg:block).
// Has local state for expand/collapse, so requires "use client".

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Category } from "../types";

interface FilterSidebarProps {
  categories: Category[];
  selectedCategoryId?: string | null;
  selectedSizes?: string[];
  onCategoryChange?: (id: string | null) => void;
  onSizeToggle?: (size: string) => void;
}

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterGroup({ title, children, defaultOpen = true }: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--t-border)]">
      <button
        type="button"
        className="w-full flex items-center justify-between py-4 transition-opacity hover:opacity-60 bg-transparent border-none cursor-pointer"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span
          className="text-[11px] font-medium uppercase tracking-wider text-[var(--t-foreground)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {title}
        </span>
        {open ? (
          <ChevronUp size={14} strokeWidth={1.5} className="text-[var(--t-foreground)]" />
        ) : (
          <ChevronDown size={14} strokeWidth={1.5} className="text-[var(--t-foreground)]" />
        )}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  );
}

export function FilterSidebar({
  categories,
  selectedCategoryId = null,
  selectedSizes = [],
  onCategoryChange,
  onSizeToggle,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-56 flex-shrink-0">
      <div className="pb-3 mb-2 border-b border-[var(--t-primary)]">
        <h3
          className="text-base font-bold uppercase tracking-wider text-[var(--t-foreground)]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          FILTROS
        </h3>
      </div>

      <FilterGroup title="Categoría">
        <div className="flex flex-col gap-1">
          {[{ id: null, name: "Todos", slug: "", icon: "" }, ...categories].map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id ?? "all"}
                type="button"
                className="text-left py-1 transition-opacity hover:opacity-60 bg-transparent border-none cursor-pointer"
                onClick={() => onCategoryChange?.(cat.id)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? "var(--t-foreground)"
                    : "var(--t-muted)",
                  textDecoration: isActive ? "underline" : "none",
                  textUnderlineOffset: "3px",
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Talla">
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                aria-pressed={isSelected}
                className="px-3 py-1.5 transition-colors cursor-pointer"
                onClick={() => onSizeToggle?.(size)}
                style={{
                  backgroundColor: isSelected
                    ? "var(--t-button-bg)"
                    : "transparent",
                  color: isSelected
                    ? "var(--t-button-text)"
                    : "var(--t-foreground)",
                  border: isSelected
                    ? "1px solid var(--t-primary)"
                    : "1px solid var(--t-border)",
                  borderRadius: "var(--t-radius-button)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterGroup>
    </aside>
  );
}
