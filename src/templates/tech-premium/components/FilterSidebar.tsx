// Tech Premium Template — Filter Sidebar
// Desktop: static left sidebar with collapsible filter groups.
// Mobile: bottom drawer overlay.
// Visual only — handlers come as props.

import { ChevronUp, ChevronDown, Search, X } from "lucide-react";
import type { FilterGroup } from "../types";

interface FilterSidebarProps {
  filters: FilterGroup[];
  onFilterToggle?: (groupId: string) => void;
  onFilterCheck?: (groupId: string, optionId: string) => void;
  /** Mobile drawer state */
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({
  filters,
  onFilterToggle,
  onFilterCheck,
  isOpen = false,
  onClose,
}: FilterSidebarProps) {
  const filterContent = (
    <div className="flex flex-col gap-6 w-full">
      {filters.map((group) => (
        <div key={group.id} className="flex flex-col gap-4">
          {/* Group header */}
          <button
            type="button"
            className="flex items-center justify-between py-3 border-b border-[var(--t-border)]/50 bg-transparent border-x-0 border-t-0 cursor-pointer p-0 w-full"
            onClick={() => onFilterToggle?.(group.id)}
            aria-expanded={group.expanded}
          >
            <span className="text-lg font-medium text-black tracking-[0.54px]">
              {group.label}
            </span>
            {group.expanded ? (
              <ChevronUp className="w-6 h-6 text-black" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-6 h-6 text-black" aria-hidden="true" />
            )}
          </button>

          {/* Expanded content */}
          {group.expanded && (
            <div className="flex flex-col gap-4">
              {/* Search within filter (only for Brand) */}
              {group.id === "brand" && (
                <div className="bg-[var(--t-search-bg)] rounded-lg flex items-center gap-2 px-4 py-2">
                  <Search className="w-6 h-6 text-[var(--t-text-muted)] opacity-50" aria-hidden="true" />
                  <span className="text-sm font-medium text-[var(--t-text-muted)] opacity-50">Buscar</span>
                </div>
              )}

              {/* Options */}
              <div className="flex flex-col gap-2">
                {group.options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-0 text-left"
                    onClick={() => onFilterCheck?.(group.id, opt.id)}
                    aria-pressed={opt.checked}
                  >
                    {/* Custom checkbox */}
                    <div
                      className={`w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0 ${
                        opt.checked
                          ? "bg-[var(--t-primary)]"
                          : "border border-[var(--t-border-mid)]"
                      }`}
                      aria-hidden="true"
                    >
                      {opt.checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-[15px] font-medium text-black">{opt.label}</span>
                    {opt.count !== undefined && (
                      <span className="text-xs text-[var(--t-text-muted)] ml-0.5">{opt.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop: static sidebar */}
      <div className="hidden lg:flex flex-col gap-6 max-w-[256px] min-w-[220px] shrink-0">
        {filterContent}
      </div>

      {/* Mobile: drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer from bottom */}
          <div className="relative mt-auto bg-white rounded-t-2xl px-4 py-6 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-black">Filtros</h3>
              <button
                type="button"
                className="p-0 bg-transparent border-none cursor-pointer"
                onClick={onClose}
                aria-label="Cerrar filtros"
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}
