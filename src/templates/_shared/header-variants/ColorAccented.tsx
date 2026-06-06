"use client";

// Shared — ColorAccented Header (from decor-warm)
// Greeting text (peach accent) + store subtitle. Search icon circle (peach).
// Standard: greeting left, search icon right. Sticky top.
// ZERO hardcoded colors — all via var(--t-*)

import { Search } from "lucide-react";
import type { HeaderProps } from "./types";

interface ColorAccentedProps extends HeaderProps {
  greeting?: string;
}

export default function ColorAccented({
  store,
  greeting,
  onSearchClick,
}: ColorAccentedProps) {
  const displayGreeting = greeting ?? `Hola, Bienvenido`;

  return (
    <header
      className="sticky top-0 z-40 w-full"
      style={{ backgroundColor: "var(--t-header-bg)" }}
    >
      <div className="flex items-center px-4 md:px-6 lg:px-8 h-16 w-full max-w-7xl mx-auto">

        {/* Greeting + subtitle — left */}
        <div className="flex flex-col justify-center min-w-0 flex-1">
          <span
            style={{
              color: "var(--t-peach)",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            {displayGreeting}
          </span>
          <span
            style={{
              color: "var(--t-dark-mode)",
              fontFamily: "'League Spartan', sans-serif",
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {store.description ?? "Espacios que transmiten alegría"}
          </span>
        </div>

        {/* Search icon circle — right */}
        <button
          type="button"
          className="flex items-center justify-center ml-3 flex-shrink-0"
          style={{
            width: 31,
            height: 31,
            borderRadius: "var(--t-radius-category)",
            backgroundColor: "var(--t-peach)",
            border: "none",
            cursor: "pointer",
          }}
          onClick={onSearchClick}
          aria-label="Buscar productos"
        >
          <Search size={14} strokeWidth={2} style={{ color: "#FFFFFF" }} />
        </button>

      </div>
    </header>
  );
}
