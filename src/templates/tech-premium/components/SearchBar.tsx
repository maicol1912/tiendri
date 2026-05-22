// Tech Premium Template — Search Bar
// Figma: gray bg (#F5F5F5), rounded-lg, search icon left, placeholder text.
// Visual only — no state, handlers come as props.

import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

export function SearchBar({
  placeholder = "Buscar",
  value = "",
  onChange,
  onFocus,
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-[var(--t-search-bg)] rounded-lg h-14 px-4 w-full">
      <Search className="w-5 h-5 text-[var(--t-text-muted)] shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        className="bg-transparent text-sm font-medium text-[var(--t-text-muted)] placeholder:text-[var(--t-text-muted)]/50 outline-none w-full"
        aria-label={placeholder}
      />
    </div>
  );
}
