"use client";

// Core hook — centralizes search query state with 300ms debounce.
// Used across template SearchShellRoute / SearchPage components.
//
// Filters products by name and description (case-insensitive).
// searchResults is empty when query is blank — callers decide what to show
// when there is no active query (popular searches, recommendations, etc.).

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import type { StorefrontProduct } from "@/types/domain/store";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UseSearchControllerReturn {
  /** Raw value bound to the search input. */
  searchQuery: string;
  /** Stable setter — update input value with this. */
  setSearchQuery: (q: string) => void;
  /** Clears query and all derived state. */
  clearSearch: () => void;
  /** True while waiting for the debounce to settle after the last keystroke. */
  isSearching: boolean;
  /**
   * Products that match the debounced query.
   * Empty array when `searchQuery` is blank (not "no results" — just no query).
   */
  searchResults: StorefrontProduct[];
  /** Convenience — equals `searchResults.length`. */
  resultCount: number;
  /** True when query is non-empty and results came back empty. */
  hasNoResults: boolean;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useSearchController(
  products: StorefrontProduct[]
): UseSearchControllerReturn {
  const [searchQuery, setSearchQueryRaw] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Debounce effect ────────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const trimmed = searchQuery.trim();

    if (trimmed.length === 0) {
      setDebouncedQuery("");
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    timerRef.current = setTimeout(() => {
      setDebouncedQuery(trimmed);
      setIsSearching(false);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery]);

  // ── Derived search results ─────────────────────────────────────────────────
  const searchResults = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    if (!q) return [];

    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.description ?? "").toLowerCase().includes(q)
    );
  }, [products, debouncedQuery]);

  const resultCount = searchResults.length;

  const hasNoResults =
    searchQuery.trim().length > 0 && !isSearching && resultCount === 0;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const setSearchQuery = useCallback((q: string) => {
    setSearchQueryRaw(q);
  }, []);

  const clearSearch = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setSearchQueryRaw("");
    setDebouncedQuery("");
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    clearSearch,
    isSearching,
    searchResults,
    resultCount,
    hasNoResults,
  };
}
