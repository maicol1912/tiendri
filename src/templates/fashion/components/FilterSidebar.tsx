"use client";

// Fashion Template — Filter Sidebar
// Desktop: static left sidebar. Mobile: bottom drawer overlay.
// Editorial fashion aesthetic — ZERO border radius, sharp edges.
// ZERO hardcoded colors — all via var(--t-*).

import { useState } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import type { FilterGroup } from "../types";

interface FilterSidebarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

function FilterContent({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
}: Omit<FilterSidebarProps, "isOpen" | "onClose">) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    () => Object.fromEntries(filters.map((g) => [g.id, g.expanded !== false]))
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const totalActive = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
    <>
      {/* Clear all button — shown when there are active filters */}
      {totalActive > 0 && (
        <div style={{ marginBottom: "16px" }}>
          <button
            type="button"
            onClick={onClearAll}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--t-border)",
              borderRadius: 0,
              background: "transparent",
              color: "var(--t-foreground)",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            Limpiar filtros ({totalActive})
          </button>
        </div>
      )}

      {/* Filter groups */}
      {filters.map((group) => {
        const isExpanded = expandedGroups[group.id] ?? true;
        const groupActive = (activeFilters[group.id] ?? []).length;

        return (
          <div
            key={group.id}
            style={{ borderBottom: "1px solid var(--t-border)" }}
          >
            {/* Group header / toggle */}
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "var(--t-foreground)",
                }}
              >
                {group.label}
                {groupActive > 0 && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "16px",
                      height: "16px",
                      borderRadius: "0",
                      background: "var(--t-foreground)",
                      color: "var(--t-background)",
                      fontSize: "9px",
                      fontWeight: 700,
                    }}
                  >
                    {groupActive}
                  </span>
                )}
              </span>
              {isExpanded ? (
                <ChevronUp
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--t-foreground)",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <ChevronDown
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "var(--t-foreground)",
                    flexShrink: 0,
                  }}
                />
              )}
            </button>

            {/* Group options */}
            {isExpanded && (
              <div style={{ paddingBottom: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {group.options.map((option) => {
                  const isChecked = (activeFilters[group.id] ?? []).includes(option.id);
                  return (
                    <label
                      key={option.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                    >
                      {/* Hidden native checkbox */}
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={(e) =>
                          onFilterChange(group.id, option.id, e.target.checked)
                        }
                      />
                      {/* Visual checkbox */}
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "14px",
                          height: "14px",
                          borderRadius: 0,
                          flexShrink: 0,
                          background: isChecked
                            ? "var(--t-foreground)"
                            : "transparent",
                          border: isChecked
                            ? "1.5px solid var(--t-foreground)"
                            : "1.5px solid var(--t-border)",
                        }}
                      >
                        {isChecked && (
                          <svg
                            width="8"
                            height="6"
                            viewBox="0 0 8 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 3L3 5L7 1"
                              stroke="var(--t-background)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      {/* Label */}
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "var(--t-foreground)",
                          flex: 1,
                        }}
                      >
                        {option.label}
                      </span>
                      {/* Count */}
                      {option.count !== undefined && (
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "var(--t-muted)",
                          }}
                        >
                          {option.count}
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
    </>
  );
}

export function FilterSidebar({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: "240px",
          minWidth: "200px",
          flexShrink: 0,
          background: "var(--t-card)",
          border: "1px solid var(--t-border)",
          borderRadius: 0,
          padding: "20px 16px",
          alignSelf: "flex-start",
          position: "sticky",
          top: "72px",
        }}
      >
        {/* Sidebar header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "20px",
          }}
        >
          <SlidersHorizontal
            style={{ width: "16px", height: "16px", color: "var(--t-foreground)" }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "var(--t-foreground)",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
            }}
          >
            Filtros
          </span>
        </div>

        <FilterContent
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onClearAll={onClearAll}
        />
      </aside>

      {/* ── Mobile bottom drawer ──────────────────────────────────────────────── */}
      {isOpen && (
        <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 50 }}>
          {/* Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              background: "var(--t-card)",
              padding: "0 20px 40px",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "slideUp 200ms ease",
            }}
          >
            {/* Drag handle */}
            <div
              style={{
                width: "32px",
                height: "3px",
                borderRadius: 0,
                background: "var(--t-border)",
                margin: "12px auto 16px",
              }}
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
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "var(--t-foreground)",
                }}
              >
                FILTROS
              </span>
              <button
                type="button"
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--t-foreground)",
                }}
                aria-label="Cerrar filtros"
              >
                <X style={{ width: "18px", height: "18px" }} />
              </button>
            </div>

            <FilterContent
              filters={filters}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              onClearAll={onClearAll}
            />
          </div>
        </div>
      )}

      {/* Slide-up keyframe animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
