"use client";

// Furniture Dark Template — Filter Sidebar
// Desktop: static left sidebar with collapsible filter groups.
// Mobile: bottom drawer overlay with drag handle indicator.
// Visual only — handlers come as props.
// ZERO hardcoded colors — all via var(--t-*).
// CRITICAL: sidebar bg = var(--t-secondary) — NOT var(--t-card) which is LIGHT in this theme.

import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { FilterGroup } from "../types";

interface FilterSidebarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const filterContent = (
    <div className="flex flex-col gap-1">
      {filters.map((group) => {
        const isCollapsed = collapsedGroups[group.id] ?? group.isCollapsed ?? false;
        const groupActive = (activeFilters[group.id] ?? []).length;

        return (
          <div
            key={group.id}
            style={{
              borderBottom: "1px solid var(--t-border)",
              paddingBottom: "12px",
              marginBottom: "12px",
            }}
          >
            {/* Group header */}
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              aria-expanded={!isCollapsed}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                padding: "8px 0",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--t-foreground)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                {group.label}
                {groupActive > 0 && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      background: "var(--t-primary)",
                      color: "var(--t-background)",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                    aria-label={`${groupActive} filtros activos`}
                  >
                    {groupActive}
                  </span>
                )}
              </span>
              {isCollapsed ? (
                <ChevronDown
                  className="w-4 h-4"
                  style={{ color: "var(--t-muted)" }}
                  aria-hidden="true"
                />
              ) : (
                <ChevronUp
                  className="w-4 h-4"
                  style={{ color: "var(--t-muted)" }}
                  aria-hidden="true"
                />
              )}
            </button>

            {/* Options */}
            {!isCollapsed && (
              <div className="flex flex-col gap-2 mt-2">
                {group.options.map((opt) => {
                  const isChecked = (activeFilters[group.id] ?? []).includes(opt.id);
                  return (
                    <label
                      key={opt.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "2px 0",
                      }}
                    >
                      {/* Custom checkbox */}
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "4px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: isChecked ? "var(--t-primary)" : "transparent",
                          border: isChecked
                            ? "1.5px solid var(--t-primary)"
                            : "1.5px solid var(--t-border)",
                          transition: "background 200ms ease, border-color 200ms ease",
                        }}
                        aria-hidden="true"
                      >
                        {isChecked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="var(--t-background)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          onFilterChange(group.id, opt.id, e.target.checked)
                        }
                        className="sr-only"
                        aria-label={opt.label}
                      />
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "var(--t-foreground)",
                          flex: 1,
                        }}
                      >
                        {opt.label}
                      </span>
                      {opt.count !== undefined && (
                        <span
                          style={{
                            fontSize: "11px",
                            color: "var(--t-muted)",
                          }}
                        >
                          ({opt.count})
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Clear all button */}
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          style={{
            marginTop: "4px",
            padding: "10px 16px",
            background: "transparent",
            border: "1.5px solid var(--t-border)",
            borderRadius: "var(--t-radius-category, 28px)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--t-primary)",
            width: "100%",
            transition: "background 200ms ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: static sidebar */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: "256px",
          minWidth: "220px",
          flexShrink: 0,
          background: "var(--t-secondary)",
          border: "1px solid var(--t-border)",
          borderRadius: "12px",
          padding: "20px 16px",
          alignSelf: "flex-start",
          position: "sticky",
          top: "80px",
        }}
        aria-label="Filtros de productos"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <SlidersHorizontal
            className="w-4 h-4"
            style={{ color: "var(--t-primary)" }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--t-foreground)",
              letterSpacing: "-0.02em",
            }}
          >
            Filtros
          </span>
        </div>
        {filterContent}
      </aside>

      {/* Mobile: bottom drawer overlay */}
      {isOpen && (
        <div
          className="lg:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            style={{
              position: "relative",
              marginTop: "auto",
              background: "var(--t-secondary)",
              borderRadius: "20px 20px 0 0",
              padding: "12px 20px 32px",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "slideUp 200ms ease",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Filtros de productos"
          >
            {/* Drag handle indicator */}
            <div
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "2px",
                background: "var(--t-border)",
                margin: "0 auto 16px",
              }}
              aria-hidden="true"
            />

            {/* Drawer header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--t-foreground)",
                  letterSpacing: "-0.02em",
                }}
              >
                Filtros
              </span>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" style={{ color: "var(--t-foreground)" }} />
              </button>
            </div>

            {filterContent}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
