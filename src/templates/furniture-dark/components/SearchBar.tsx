"use client";

// Furniture Dark — Search Bar
// Rounded pill with Urbanist font; dark surface background.
// All colors via var(--t-*). ZERO hardcoded colors.

import { Search, X } from "lucide-react";
import type { RefObject } from "react";

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  readOnly?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  onChange?: (value: string) => void;
  onClear?: () => void;
  onClick?: () => void;
}

export function SearchBar({
  value = "",
  placeholder = "Buscar",
  readOnly = false,
  inputRef,
  onChange,
  onClear,
  onClick,
}: SearchBarProps) {
  if (readOnly) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full flex items-center gap-2 px-5"
        style={{
          height: 48,
          borderRadius: "var(--t-radius-button)",
          backgroundColor: "var(--t-surface)",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
        aria-label="Buscar productos"
      >
        <Search
          size={16}
          strokeWidth={2}
          style={{ color: "var(--t-text-secondary)", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
            fontSize: "14px",
            fontWeight: 400,
            letterSpacing: "-0.42px",
            color: "var(--t-text-secondary)",
            flex: 1,
          }}
        >
          {placeholder}
        </span>
      </button>
    );
  }

  return (
    <div
      className="w-full flex items-center gap-2 px-5"
      style={{
        height: 48,
        borderRadius: "var(--t-radius-button)",
        backgroundColor: "var(--t-surface)",
        border: "1px solid var(--t-border)",
      }}
    >
      <Search
        size={16}
        strokeWidth={2}
        style={{ color: "var(--t-text-secondary)", flexShrink: 0 }}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none"
        style={{
          fontFamily: "var(--font-body, 'Urbanist', sans-serif)",
          fontSize: "14px",
          fontWeight: 400,
          letterSpacing: "-0.42px",
          color: "var(--t-text-primary)",
          border: "none",
        }}
        aria-label="Buscar productos"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0"
          style={{
            backgroundColor: "var(--t-border)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="Limpiar búsqueda"
        >
          <X size={12} strokeWidth={2.5} style={{ color: "var(--t-text-muted)" }} />
        </button>
      )}
    </div>
  );
}
