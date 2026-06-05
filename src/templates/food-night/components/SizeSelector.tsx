"use client";

// Food Night — Size Selector (circular buttons)

import type { SizeOption } from "../types";

interface SizeSelectorProps {
  options: SizeOption[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  label?: string;
}

export function SizeSelector({
  options,
  selectedId = null,
  onSelect,
  label = "Elegir tamaño",
}: SizeSelectorProps) {
  if (options.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <span
        className="text-[14px] font-semibold"
        style={{ color: "var(--t-text-primary)" }}
      >
        {label}
      </span>

      <div className="flex items-center gap-3 flex-wrap" role="radiogroup" aria-label={label}>
        {options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect?.(option.id)}
              role="radio"
              aria-checked={isSelected}
              aria-label={`Tamaño ${option.label}`}
              className="flex items-center justify-center flex-shrink-0 text-[12px] font-semibold transition-colors"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                backgroundColor: isSelected ? "var(--t-category-active-bg)" : "transparent",
                border: isSelected
                  ? "2px solid var(--t-category-active-bg)"
                  : "1.5px solid var(--t-border)",
                color: isSelected ? "var(--t-category-active-text)" : "var(--t-text-primary)",
                cursor: "pointer",
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
