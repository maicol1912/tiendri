// Pet V3 Template — Search Bar
// Rounded search bar with search icon + placeholder.
// ZERO hardcoded colors — all via CSS variables.

import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onSearchClick?: () => void;
  onChange?: (value: string) => void;
  readOnly?: boolean;
}

export function SearchBar({
  value,
  placeholder = "Buscar producto o marca",
  onSearchClick,
  onChange,
  readOnly = false,
}: SearchBarProps) {
  return (
    <div
      className="relative w-full cursor-pointer"
      onClick={readOnly ? onSearchClick : undefined}
      role={readOnly ? "button" : undefined}
      tabIndex={readOnly ? 0 : undefined}
    >
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[var(--t-text-muted)]" />
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        readOnly={readOnly}
        className="w-full h-[52px] bg-[var(--t-search-bg)] rounded-[var(--t-radius-button)] pl-11 pr-4 text-sm text-[var(--t-text-primary)] placeholder:text-[var(--t-text-muted)] font-medium outline-none focus:ring-2 focus:ring-[var(--t-primary)]/30 transition-shadow"
      />
    </div>
  );
}
