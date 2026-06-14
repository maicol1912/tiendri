"use client";

// Furniture Light — ListingShellRoute
// Rendered at /template/furniture-light/catalogo

import { useState, useCallback, useMemo } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { FurnitureLightConfig } from "../config";
import type {
  FurnitureProduct,
  FurnitureCategory,
  FurnitureStoreInfo,
  FurnitureNavTab,
  FurnitureLightFilterGroup,
  FurnitureLightSortOption,
} from "../types";

interface ListingShellRouteProps {
  store: FurnitureStoreInfo;
  products: FurnitureProduct[];
  categories?: FurnitureCategory[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  products,
  categories = [],
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<FurnitureLightConfig>();

  const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());

  // ── Filter / search / sort state ──────────────────────────────────────────────
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<FurnitureLightSortOption>("recent");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // ── Filter groups ─────────────────────────────────────────────────────────────
  const filterGroups = useMemo<FurnitureLightFilterGroup[]>(() => {
    // Category counts from products
    const categoryCounts: Record<string, number> = {};
    for (const p of products) {
      if (p.categoryId) {
        categoryCounts[p.categoryId] = (categoryCounts[p.categoryId] ?? 0) + 1;
      }
    }

    const categoryOptions = categories.map((cat) => ({
      id: cat.id,
      label: cat.name,
      count: categoryCounts[cat.id] ?? 0,
    }));

    return [
      {
        id: "category",
        label: "Categoría",
        options: categoryOptions,
      },
      {
        id: "price",
        label: "Precio",
        options: [
          { id: "under-100", label: "Menos de $100" },
          { id: "100-200", label: "$100 – $200" },
          { id: "200-300", label: "$200 – $300" },
          { id: "over-300", label: "Más de $300" },
        ],
      },
      {
        id: "rating",
        label: "Valoración",
        options: [
          { id: "4-plus", label: "4 estrellas o más" },
          { id: "3-plus", label: "3 estrellas o más" },
        ],
      },
      {
        id: "availability",
        label: "Disponibilidad",
        options: [
          { id: "available", label: "Disponible" },
          { id: "unavailable", label: "Agotado" },
        ],
      },
    ];
  }, [products, categories]);

  // ── Filtered products ─────────────────────────────────────────────────────────
  const filteredProducts = useMemo<FurnitureProduct[]>(() => {
    return products.filter((p) => {
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description?.toLowerCase().includes(q) ?? false;
        if (!nameMatch && !descMatch) return false;
      }

      // Category filter
      const categoryFilters = activeFilters["category"] ?? [];
      if (categoryFilters.length > 0) {
        if (!p.categoryId || !categoryFilters.includes(p.categoryId)) return false;
      }

      // Price filter
      const priceFilters = activeFilters["price"] ?? [];
      if (priceFilters.length > 0) {
        const price = p.price;
        const priceMatch = priceFilters.some((pf) => {
          if (pf === "under-100") return price < 100;
          if (pf === "100-200") return price >= 100 && price <= 200;
          if (pf === "200-300") return price > 200 && price <= 300;
          if (pf === "over-300") return price > 300;
          return false;
        });
        if (!priceMatch) return false;
      }

      // Rating filter
      const ratingFilters = activeFilters["rating"] ?? [];
      if (ratingFilters.length > 0) {
        const rating = p.rating ?? 0;
        const ratingMatch = ratingFilters.some((rf) => {
          if (rf === "4-plus") return rating >= 4;
          if (rf === "3-plus") return rating >= 3;
          return false;
        });
        if (!ratingMatch) return false;
      }

      // Availability filter
      const availFilters = activeFilters["availability"] ?? [];
      if (availFilters.length > 0) {
        const isAvailable = p.available === true;
        const availMatch = availFilters.some((af) => {
          if (af === "available") return isAvailable;
          if (af === "unavailable") return !isAvailable;
          return false;
        });
        if (!availMatch) return false;
      }

      return true;
    });
  }, [products, activeFilters, searchQuery]);

  // ── Sorted products ───────────────────────────────────────────────────────────
  const sortedProducts = useMemo<FurnitureProduct[]>(() => {
    const arr = [...filteredProducts];
    if (sortOption === "price-asc") {
      arr.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      arr.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    // 'recent' keeps original order
    return arr;
  }, [filteredProducts, sortOption]);

  // ── Enriched with wishlist ────────────────────────────────────────────────────
  const enrichedProducts = sortedProducts.map((p) => ({
    ...p,
    inWishlist: wishlistedIds.has(p.id),
  }));

  // ── Handlers ──────────────────────────────────────────────────────────────────
  const handleFilterChange = useCallback((groupId: string, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[groupId] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [groupId]: next };
    });
  }, []);

  const handleClearAll = useCallback(() => {
    setActiveFilters({});
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const handleSortChange = useCallback((s: FurnitureLightSortOption) => {
    setSortOption(s);
  }, []);

  const handleFilterDrawerToggle = useCallback(() => {
    setIsFilterDrawerOpen((prev) => !prev);
  }, []);

  const handleFilterDrawerClose = useCallback(() => {
    setIsFilterDrawerOpen(false);
  }, []);

  const handleWishlistToggle = useCallback((productId: string) => {
    setWishlistedIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || product.available === false) return;
      addItem({
        productId: product.id,
        variantName: product.colorVariant ?? null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, addItem]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const handleTabChange = useCallback(
    (tab: FurnitureNavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
    },
    [nav]
  );

  return (
    <ProductListingPage
      store={store}
      navLinks={config.content?.navLinks ?? []}
      products={enrichedProducts}
      categories={categories}
      layout={config.layout}
      grid={config.grid}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      filterGroups={filterGroups}
      activeFilters={activeFilters}
      searchQuery={searchQuery}
      sortOption={sortOption}
      isFilterDrawerOpen={isFilterDrawerOpen}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onNavLinkClick={handleNavLinkClick}
      onProductClick={(id) => nav.goProduct(id)}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      onTabChange={handleTabChange}
      onFilterChange={handleFilterChange}
      onClearAll={handleClearAll}
      onSearchChange={handleSearchChange}
      onSortChange={handleSortChange}
      onFilterDrawerToggle={handleFilterDrawerToggle}
      onFilterDrawerClose={handleFilterDrawerClose}
    />
  );
}
