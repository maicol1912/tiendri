// Beauty Soft Template — Store Header
// Sticky header: location pin circle + store name/address + avatar.
// Layout styles: standard (default), centered, minimal.
// ZERO hardcoded colors — all via var(--t-*).

import { MapPin } from "lucide-react";
import type { StoreInfo } from "@/types/store";

interface HeaderProps {
  store: StoreInfo;
  layout?: {
    headerStyle?: string;
  };
}

export function Header({ store, layout }: HeaderProps) {
  const style = layout?.headerStyle ?? "standard";

  if (style === "minimal") {
    return (
      <header className="sticky top-0 z-40 w-full bg-[var(--t-header-bg)]">
        <div className="max-w-7xl mx-auto flex items-center justify-center px-5 h-[60px]">
          <span
            className="font-semibold text-[var(--t-text-primary)] text-lg"
            style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
          >
            {store.name}
          </span>
        </div>
      </header>
    );
  }

  if (style === "centered") {
    return (
      <header className="sticky top-0 z-40 w-full bg-[var(--t-header-bg)]">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-5 h-[70px]">
          <span
            className="font-semibold text-[var(--t-text-primary)] text-lg"
            style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
          >
            {store.name}
          </span>
          {store.description && (
            <span className="text-xs text-[var(--t-text-muted)] truncate max-w-xs">
              {store.description}
            </span>
          )}
        </div>
      </header>
    );
  }

  // standard (default)
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--t-header-bg)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 h-[60px]">
        {/* Left: Location pin + store name */}
        <div className="flex items-center gap-[9px] flex-1 min-w-0">
          <div
            className="flex-shrink-0 w-10 h-10 rounded-[var(--t-radius-button)] flex items-center justify-center"
            style={{ backgroundColor: "var(--t-icon-pill-bg, var(--t-card-bg))" }}
            aria-hidden="true"
          >
            <MapPin size={20} strokeWidth={1.75} className="text-[var(--t-text-primary)]" />
          </div>

          <div className="flex flex-col min-w-0">
            <span
              className="truncate text-[17px] font-semibold text-[var(--t-text-primary)] leading-[22px] tracking-[-0.408px]"
              style={{ fontFamily: "var(--font-heading, var(--font-sans))" }}
            >
              {store.name}
            </span>
            {store.description && (
              <span className="truncate text-sm font-normal text-[var(--t-text-muted)] leading-[22px] tracking-[-0.408px]">
                {store.description}
              </span>
            )}
          </div>
        </div>

        {/* Right: Avatar */}
        <div className="flex items-center gap-[10px] flex-shrink-0">
          <div
            className="w-10 h-10 rounded-[var(--t-radius-button)] flex items-center justify-center overflow-hidden"
            style={{ backgroundColor: "var(--t-icon-pill-bg, var(--t-card-bg))" }}
          >
            {store.logo ? (
              <img
                src={store.logo}
                alt={store.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                  stroke="var(--t-text-muted)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="7" r="4" stroke="var(--t-text-muted)" strokeWidth="1.75" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
