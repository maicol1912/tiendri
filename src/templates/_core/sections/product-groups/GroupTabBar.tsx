"use client";
import React, { memo, useRef, useCallback } from "react";
import type { ProductGroup } from "@/types/templates/product-groups";

interface GroupTabBarProps {
  groups: ProductGroup[];
  activeGroupId: string;
  onGroupChange: (groupId: string) => void;
}

export const GroupTabBar = memo(function GroupTabBar({
  groups,
  activeGroupId,
  onGroupChange,
}: GroupTabBarProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = groups.findIndex((g) => g.id === activeGroupId);
      let nextIndex: number | null = null;

      switch (e.key) {
        case "ArrowRight":
          nextIndex = (currentIndex + 1) % groups.length;
          break;
        case "ArrowLeft":
          nextIndex = (currentIndex - 1 + groups.length) % groups.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = groups.length - 1;
          break;
        case "Enter":
        case " ": {
          const focused = document.activeElement;
          const focusedIndex = buttonRefs.current.findIndex(
            (ref) => ref === focused,
          );
          if (focusedIndex !== -1) {
            e.preventDefault();
            onGroupChange(groups[focusedIndex].id);
          }
          return;
        }
        default:
          return;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        buttonRefs.current[nextIndex]?.focus();
        onGroupChange(groups[nextIndex].id);
      }
    },
    [groups, activeGroupId, onGroupChange],
  );

  return (
    <div
      className="flex gap-6 overflow-x-auto"
      role="tablist"
      aria-label="Filtrar productos por grupo"
      onKeyDown={handleKeyDown}
    >
      {groups.map((group, i) => {
        const isActive = group.id === activeGroupId;
        return (
          <button
            key={group.id}
            ref={(el) => {
              buttonRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`group-panel-${group.id}`}
            id={`group-tab-${group.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onGroupChange(group.id)}
            style={{
              color: isActive ? "var(--t-foreground)" : "var(--t-muted)",
              fontWeight: isActive ? 600 : 400,
              fontSize: "0.95rem",
              paddingBottom: "0.5rem",
              paddingTop: 0,
              paddingLeft: 0,
              paddingRight: 0,
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              borderBottomWidth: "2px",
              borderBottomStyle: "solid",
              borderBottomColor: isActive ? "var(--t-foreground)" : "transparent",
              background: "none",
              cursor: "pointer",
            }}
          >
            {group.name}
          </button>
        );
      })}
    </div>
  );
});
