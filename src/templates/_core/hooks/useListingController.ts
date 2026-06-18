"use client";

// Core hook — centralizes filter, search, sort, and pagination logic
// used across all template ListingShellRoute components.
//
// Filter shape: Record<string, string[]>  (canonical — beauty-elegant / decor-warm pattern)
// Supports built-in filter groups: category, price, rating, availability
// Sorting: recent | price-asc | price-desc | name-asc | name-desc | rating

import { useState, useMemo, useCallback } from "react";
import type { StorefrontProduct } from "@/types/store";

// ── Types ─────────────────────────────────────────────────────────────────────

export type SortOption =
  | "recent"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "rating";

export interface UseListingControllerOptions {
  initialSort?: SortOption;
  /** When provided, enables pagination and `paginatedProducts`. */
  pageSize?: number;
}

export interface UseListingControllerReturn {
  // ── Derived output ──────────────────────────────────────────────────────────
  /** All products after filters + search + sort applied — never paginated. */
  filteredProducts: StorefrontProduct[];
  // ── Search ──────────────────────────────────────────────────────────────────
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // ── Sort ────────────────────────────────────────────────────────────────────
  sortOption: SortOption;
  setSortOption: (s: SortOption) => void;
  // ── Filters ─────────────────────────────────────────────────────────────────
  activeFilters: Record<string, string[]>;
  /** Total number of individually selected filter options across all groups. */
  activeFilterCount: number;
  handleFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  /** Resets filters, search query, and sort back to initial values. */
  handleClearAll: () => void;
  // ── Pagination (only meaningful when pageSize is defined) ───────────────────
  currentPage: number;
  setCurrentPage: (p: number) => void;
  totalPages: number;
  /** Slice of `filteredProducts` for the current page. Equals `filteredProducts` when pageSize is undefined. */
  paginatedProducts: StorefrontProduct[];
}

// ── Price range matcher (built-in) ────────────────────────────────────────────
// Recognises the price-range option IDs used across templates.
// Templates can pass any custom group IDs — those are just ignored here and
// require the `activeFilters` record to be interpreted by the template itself
// via a custom priceRangeMatcher. For the built-in ranges, a heuristic order
// is used: numeric suffix after "-" for the boundary check.

function matchesPriceRange(price: number, rangeId: string): boolean {
  // beauty-elegant ranges
  if (rangeId === "under-80k") return price < 80_000;
  if (rangeId === "80k-120k") return price >= 80_000 && price < 120_000;
  if (rangeId === "120k-180k") return price >= 120_000 && price < 180_000;
  if (rangeId === "over-180k") return price >= 180_000;
  // decor-warm ranges
  if (rangeId === "under-500k") return price < 500_000;
  if (rangeId === "500k-1m") return price >= 500_000 && price <= 1_000_000;
  if (rangeId === "1m-2m") return price > 1_000_000 && price <= 2_000_000;
  if (rangeId === "over-2m") return price > 2_000_000;
  // tech-premium ranges (USD-ish values)
  if (rangeId === "under-200") return price < 200;
  if (rangeId === "200-500") return price >= 200 && price <= 500;
  if (rangeId === "500-1000") return price >= 500 && price <= 1_000;
  if (rangeId === "over-1000") return price > 1_000;
  return false;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useListingController(
  products: StorefrontProduct[],
  options?: UseListingControllerOptions
): UseListingControllerReturn {
  const initialSort = options?.initialSort ?? "recent";
  const pageSize = options?.pageSize;

  // ── State ──────────────────────────────────────────────────────────────────
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [currentPage, setCurrentPage] = useState(1);

  // ── filteredProducts — single-pass, all predicates ─────────────────────────
  const filteredProducts = useMemo(() => {
    const hasCategory = (activeFilters.category?.length ?? 0) > 0;
    const hasPrice = (activeFilters.price?.length ?? 0) > 0;
    const hasRating = (activeFilters.rating?.length ?? 0) > 0;
    const hasAvailability = (activeFilters.availability?.length ?? 0) > 0;
    const trimmedQuery = searchQuery.trim().toLowerCase();
    const hasSearch = trimmedQuery.length > 0;

    // Early exit: no filters applied, just sort
    const noFilters = !hasCategory && !hasPrice && !hasRating && !hasAvailability && !hasSearch;

    // Build result — single pass when filters are present
    let result: StorefrontProduct[];

    if (noFilters) {
      result = products;
    } else {
      // Use Sets for O(1) membership checks on filter values
      const categorySet = hasCategory ? new Set(activeFilters.category) : null;
      const priceRanges = hasPrice ? activeFilters.price : null;
      const ratingFilters = hasRating ? activeFilters.rating : null;
      const availabilitySet = hasAvailability ? new Set(activeFilters.availability) : null;

      result = products.filter((p) => {
        // Category filter
        if (categorySet !== null && !categorySet.has(p.categoryId ?? "")) {
          return false;
        }

        // Price filter — any matching range passes
        if (priceRanges !== null) {
          const priceMatch = priceRanges.some((range) => matchesPriceRange(p.price, range));
          if (!priceMatch) return false;
        }

        // Rating filter — OR logic: passes if any threshold is met
        if (ratingFilters !== null) {
          const r = p.rating ?? 0;
          const ratingMatch =
            (ratingFilters.includes("4-plus") && r >= 4) ||
            (ratingFilters.includes("3-plus") && r >= 3) ||
            (ratingFilters.includes("4plus") && r >= 4) ||
            (ratingFilters.includes("3plus") && r >= 3);
          if (!ratingMatch) return false;
        }

        // Availability filter — OR logic between in-stock / out-of-stock values
        if (availabilitySet !== null) {
          const wantsInStock =
            availabilitySet.has("in-stock") || availabilitySet.has("available");
          const wantsOutOfStock = availabilitySet.has("out-of-stock");
          if (wantsInStock && !wantsOutOfStock && !p.inStock) return false;
          if (wantsOutOfStock && !wantsInStock && p.inStock) return false;
        }

        // Search query — matches name, description, subtitle, specs
        if (hasSearch) {
          const nameMatch = p.name.toLowerCase().includes(trimmedQuery);
          if (!nameMatch) {
            const descMatch = (p.description ?? "").toLowerCase().includes(trimmedQuery);
            if (!descMatch) {
              const subtitleMatch = (p.subtitle ?? "").toLowerCase().includes(trimmedQuery);
              if (!subtitleMatch) {
                const specsMatch = p.specs?.some((s) => s.toLowerCase().includes(trimmedQuery)) ?? false;
                if (!specsMatch) return false;
              }
            }
          }
        }

        return true;
      });
    }

    // ── Sort (toSorted — immutable copy) ───────────────────────────────────
    switch (sortOption) {
      case "price-asc":
        return result.toSorted((a, b) => a.price - b.price);
      case "price-desc":
        return result.toSorted((a, b) => b.price - a.price);
      case "name-asc":
        return result.toSorted((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return result.toSorted((a, b) => b.name.localeCompare(a.name));
      case "rating":
        return result.toSorted((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "recent":
      default:
        // "recent" = keep original insertion order
        return noFilters ? [...result] : result;
    }
  }, [products, activeFilters, searchQuery, sortOption]);

  // ── Active filter count ────────────────────────────────────────────────────
  const activeFilterCount = useMemo(
    () => Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0),
    [activeFilters]
  );

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = useMemo(() => {
    if (!pageSize) return 1;
    return Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  }, [filteredProducts.length, pageSize]);

  const paginatedProducts = useMemo(() => {
    if (!pageSize) return filteredProducts;
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage, pageSize]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFilterChange = useCallback(
    (groupId: string, optionId: string, checked: boolean) => {
      setActiveFilters((prev) => {
        const current = prev[groupId] ?? [];
        if (checked) {
          return { ...prev, [groupId]: [...current, optionId] };
        }
        const next = current.filter((id) => id !== optionId);
        if (next.length === 0) {
          // Remove the key entirely when no options remain selected
          const { [groupId]: _removed, ...rest } = prev;
          return rest;
        }
        return { ...prev, [groupId]: next };
      });
      // Reset to page 1 whenever a filter changes
      setCurrentPage(1);
    },
    []
  );

  const handleClearAll = useCallback(() => {
    setActiveFilters({});
    setSearchQuery("");
    setSortOption(initialSort);
    setCurrentPage(1);
  }, [initialSort]);

  // Reset to page 1 when search or sort changes
  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
  }, []);

  const handleSetSortOption = useCallback((s: SortOption) => {
    setSortOption(s);
    setCurrentPage(1);
  }, []);

  return {
    filteredProducts,
    searchQuery,
    setSearchQuery: handleSetSearchQuery,
    sortOption,
    setSortOption: handleSetSortOption,
    activeFilters,
    activeFilterCount,
    handleFilterChange,
    handleClearAll,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedProducts,
  };
}
