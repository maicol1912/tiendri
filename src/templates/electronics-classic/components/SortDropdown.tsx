// Electronics Classic — Sort Dropdown
// Select element with 5 sort options in Spanish.
// All colors via var(--t-*). ZERO hardcoded hex.

import type { SortOption } from "../types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: "latest", label: "Más recientes" },
  { value: "price-low", label: "Precio: menor a mayor" },
  { value: "price-high", label: "Precio: mayor a menor" },
  { value: "name-asc", label: "Nombre: A – Z" },
  { value: "name-desc", label: "Nombre: Z – A" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-select"
        className="text-sm text-[var(--t-text-muted)] whitespace-nowrap"
      >
        Ordenar por:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="text-sm py-1.5 px-3 border rounded-[var(--t-radius-button)] outline-none cursor-pointer"
        style={{
          borderColor: "var(--t-surface)",
          backgroundColor: "var(--t-card-bg)",
          color: "var(--t-text-primary)",
        }}
        aria-label="Ordenar productos"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
