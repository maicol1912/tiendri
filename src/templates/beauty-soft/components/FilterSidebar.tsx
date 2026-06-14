"use client";

// Beauty Soft Template — Filter Sidebar
// Desktop: sticky left sidebar with collapsible filter groups.
// Mobile: bottom drawer overlay with soft slide-up animation.
// Visual only — all handlers come as props.
// ZERO hardcoded colors — all via var(--t-*).

import { useState } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import type { FilterGroup } from "../types";

interface FilterSidebarProps {
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  activeFilterCount: number;
  isOpen: boolean; // mobile drawer open
  onClose: () => void;
}

export function FilterSidebar({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearAll,
  activeFilterCount,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const filterContent = (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {filterGroups.map((group) => {
        const isCollapsed = collapsedGroups[group.id] ?? false;
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
                  fontFamily: "'Inter', var(--font-sans), sans-serif",
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
                      color: "var(--t-on-primary)",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                    aria-label={`${groupActive} filtros activos`}
                  >
                    {groupActive}
                  </span>
                )}
              </span>
              {/* Chevron — rotates when collapsed */}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{
                  color: "var(--t-muted)",
                  transition: "transform 200ms ease",
                  transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                  flexShrink: 0,
                }}
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Options */}
            {!isCollapsed && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
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
                      {/* Custom checkbox — soft rounded for beauty-soft aesthetic */}
                      <span
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "6px",
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
                              stroke="var(--t-on-primary)"
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
                          fontSize: "13px",
                          color: "var(--t-foreground)",
                          fontFamily: "'Inter', var(--font-sans), sans-serif",
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
                            fontFamily: "'Inter', var(--font-sans), sans-serif",
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

      {/* Limpiar filtros */}
      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          style={{
            marginTop: "4px",
            padding: "10px 16px",
            background: "transparent",
            border: "1.5px solid var(--t-border)",
            borderRadius: "20px",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--t-primary)",
            width: "100%",
            transition: "background 200ms ease",
            fontFamily: "'Inter', var(--font-sans), sans-serif",
          }}
        >
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: "256px",
          minWidth: "220px",
          flexShrink: 0,
          background: "var(--t-card)",
          border: "1px solid var(--t-border)",
          borderRadius: "20px",
          padding: "20px 16px",
          alignSelf: "flex-start",
          position: "sticky",
          top: "80px",
        }}
        aria-label="Filtros de productos"
      >
        {/* Sidebar header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
          }}
        >
          <SlidersHorizontal
            size={16}
            style={{ color: "var(--t-primary)", flexShrink: 0 }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "'Inter', var(--font-sans), sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--t-foreground)",
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
              background: "color-mix(in srgb, var(--t-foreground) 40%, transparent)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div
            style={{
              position: "relative",
              marginTop: "auto",
              background: "var(--t-card)",
              borderRadius: "20px 20px 0 0",
              padding: "12px 20px 32px",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "beautySoftSlideUp 200ms ease",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Filtros de productos"
          >
            {/* Drag handle */}
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
                  fontFamily: "'Inter', var(--font-sans), sans-serif",
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "var(--t-foreground)",
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
                  borderRadius: "50%",
                }}
                aria-label="Cerrar filtros"
              >
                <X size={20} style={{ color: "var(--t-foreground)" }} />
              </button>
            </div>

            {filterContent}
          </div>
        </div>
      )}

      <style>{`
        @keyframes beautySoftSlideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}
