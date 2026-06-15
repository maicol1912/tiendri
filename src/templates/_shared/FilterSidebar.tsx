"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react";
import type { FilterGroup } from "@/types/templates/filter";

interface FilterSidebarProps {
  filterGroups: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const KEYFRAME_ID = "__shared-filter-sidebar-keyframes__";

const KEYFRAME_CSS = `
@keyframes sharedFilterSlideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
`;

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(KEYFRAME_ID)) return;
  const style = document.createElement("style");
  style.id = KEYFRAME_ID;
  style.textContent = KEYFRAME_CSS;
  document.head.appendChild(style);
}

function FilterContent({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearAll,
}: Omit<FilterSidebarProps, "isOpen" | "onClose">) {
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        filterGroups.map((g) => [g.id, g.isCollapsed ?? false])
      )
  );

  const toggleGroup = (groupId: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  return (
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
                  fontFamily: "var(--font-sans, Inter, sans-serif)",
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
                      color: "var(--t-on-primary, #fff)",
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
                  style={{ color: "var(--t-muted)", flexShrink: 0 }}
                  aria-hidden="true"
                />
              ) : (
                <ChevronUp
                  className="w-4 h-4"
                  style={{ color: "var(--t-muted)", flexShrink: 0 }}
                  aria-hidden="true"
                />
              )}
            </button>

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
                              stroke="var(--t-on-primary, #fff)"
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
                          fontFamily: "var(--font-sans, Inter, sans-serif)",
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
                            fontFamily: "var(--font-sans, Inter, sans-serif)",
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

      {activeFilterCount > 0 && (
        <button
          type="button"
          onClick={onClearAll}
          style={{
            marginTop: "4px",
            padding: "10px 16px",
            background: "transparent",
            border: "1.5px solid var(--t-border)",
            borderRadius: "var(--t-radius-card, 16px)",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--t-primary)",
            width: "100%",
            transition: "background 200ms ease",
            fontFamily: "var(--font-sans, Inter, sans-serif)",
          }}
        >
          Limpiar filtros ({activeFilterCount})
        </button>
      )}
    </div>
  );
}

export function FilterSidebar({
  filterGroups,
  activeFilters,
  onFilterChange,
  onClearAll,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  useEffect(() => {
    injectKeyframes();
  }, []);

  return (
    <>
      <aside
        className="hidden lg:flex flex-col"
        style={{
          width: "280px",
          minWidth: "220px",
          flexShrink: 0,
          background: "var(--t-card)",
          border: "1px solid var(--t-border)",
          borderRadius: "var(--t-radius-card, 16px)",
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
            style={{ color: "var(--t-primary)", flexShrink: 0 }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: "var(--font-sans, Inter, sans-serif)",
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--t-foreground)",
            }}
          >
            Filtros
          </span>
        </div>
        <FilterContent
          filterGroups={filterGroups}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          onClearAll={onClearAll}
        />
      </aside>

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
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            style={{
              position: "relative",
              marginTop: "auto",
              background: "var(--t-card)",
              borderRadius: "20px 20px 0 0",
              padding: "12px 20px 32px",
              maxHeight: "85vh",
              overflowY: "auto",
              animation: "sharedFilterSlideUp 200ms ease",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Filtros de productos"
          >
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
                  fontFamily: "var(--font-sans, Inter, sans-serif)",
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
                }}
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" style={{ color: "var(--t-foreground)" }} />
              </button>
            </div>

            <FilterContent
              filterGroups={filterGroups}
              activeFilters={activeFilters}
              onFilterChange={onFilterChange}
              onClearAll={onClearAll}
            />

            <button
              type="button"
              onClick={onClose}
              style={{
                marginTop: "8px",
                padding: "12px 16px",
                background: "var(--t-primary)",
                border: "none",
                borderRadius: "var(--t-radius-card, 16px)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--t-on-primary, #fff)",
                width: "100%",
                fontFamily: "var(--font-sans, Inter, sans-serif)",
              }}
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
