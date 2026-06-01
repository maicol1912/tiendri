"use client";

// Electronics Classic — Search Shell Route
// "use client" — 300ms debounce + autofocus search input.
// Suggestion chips from config.popularSearches.

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { ProductCard } from "./ProductCard";
import { gridColsClass } from "../utils/grid-classes";
import type { ElectronicsClassicConfig } from "../config";
import { mockProducts, mockStore } from "../mock/data";

interface SearchShellRouteProps {
  initialQuery?: string;
}

export function SearchShellRoute({ initialQuery = "" }: SearchShellRouteProps) {
  const router = useRouter();
  const { config } = useLayoutConfig<ElectronicsClassicConfig>();
  const { totalItems: cartCount } = useCart();

  const [inputValue, setInputValue] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  // Autofocus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 300ms debounce
  useEffect(() => {
    const timer = setTimeout(() => setQuery(inputValue.trim()), 300);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setQuery("");
    inputRef.current?.focus();
  }, []);

  const layout = config.layout as Record<string, string> | undefined;
  const grid = config.grid as Record<string, { mobile: number; desktop: number }> | undefined;
  const searchGrid = grid?.search ?? { mobile: 2, desktop: 4 };

  const rawPopularSearches = (config as unknown as { popularSearches?: readonly string[] }).popularSearches;
  const popularSearches: string[] = rawPopularSearches ? [...rawPopularSearches] : [
    "Audífonos",
    "Parlante",
    "Laptop",
    "TV",
    "Cámara",
  ];

  // Filter products
  const results =
    query.length > 0
      ? mockProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category?.toLowerCase().includes(query.toLowerCase()) ||
            p.description?.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--t-background)" }}>
      <Header
        store={mockStore}
        cartCount={cartCount}
        layout={layout}
        onNavigate={(path: string) => router.push(path)}
        onSearchSubmit={(q: string) => setInputValue(q)}
        onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-24 md:pb-12">
        {/* Search bar */}
        <div className="py-6">
          <div
            className="flex items-center gap-2 px-4 rounded-[var(--t-radius-button)] border"
            style={{
              backgroundColor: "var(--t-search-bg)",
              borderColor: "var(--t-surface)",
            }}
          >
            <Search className="w-5 h-5 shrink-0" style={{ color: "var(--t-text-muted)" }} aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              className="flex-1 py-3 text-sm outline-none bg-transparent"
              style={{ color: "var(--t-text-primary)" }}
            />
            {inputValue && (
              <button
                onClick={handleClear}
                aria-label="Limpiar búsqueda"
                className="p-1 hover:opacity-70 transition-opacity"
              >
                <X className="w-4 h-4" style={{ color: "var(--t-text-muted)" }} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Popular suggestion chips (shown when no query) */}
        {query.length === 0 && (
          <div>
            <p className="text-sm font-semibold text-[var(--t-text-secondary)] mb-3">
              Búsquedas populares
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInputValue(chip)}
                  className="px-4 py-1.5 text-sm rounded-full border transition-colors hover:opacity-80"
                  style={{
                    borderColor: "var(--t-surface)",
                    backgroundColor: "var(--t-card-bg)",
                    color: "var(--t-text-secondary)",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query.length > 0 && (
          <div>
            <p className="text-sm text-[var(--t-text-muted)] mb-4">
              {results.length === 0
                ? `Sin resultados para "${query}"`
                : `${results.length} resultado${results.length !== 1 ? "s" : ""} para "${query}"`}
            </p>

            {results.length > 0 ? (
              <div
                className={`grid gap-4 ${gridColsClass(searchGrid.mobile, searchGrid.desktop)}`}
              >
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    layout={layout}
                    onProductClick={(id) =>
                      router.push(`${TEMPLATE_BASE}/producto/${id}`)
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <Search className="w-12 h-12" style={{ color: "var(--t-surface)" }} aria-hidden="true" />
                <p className="text-[var(--t-text-muted)] text-sm text-center">
                  Intenta con otras palabras o navega por nuestro{" "}
                  <button
                    onClick={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
                    className="text-[var(--t-primary)] underline"
                  >
                    catálogo
                  </button>
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer store={mockStore} layout={layout} />
      <BottomNav cartCount={cartCount} onNavigate={(path: string) => router.push(path)} />
    </div>
  );
}
