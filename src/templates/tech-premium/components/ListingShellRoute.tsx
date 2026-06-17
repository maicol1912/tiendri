"use client";

// Tech Premium — ListingShellRoute
// URL-router version of ListingShell.
// Uses useTemplateNav() for navigation and useLayoutConfig() for config.
// Rendered at /template/tech-premium/catalogo

import { useState, useCallback } from "react";
import { ProductListingPage } from "./ProductListingPage";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { TechPremiumConfig } from "../config";
import type { StoreInfo, StorefrontProduct, FilterGroup, NavTab } from "../types";

interface ListingShellRouteProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  filters?: FilterGroup[];
  currencySymbol?: string;
}

export function ListingShellRoute({
  store,
  products,
  filters: initialFilters = [],
  currencySymbol = "$",
}: ListingShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems, addItem } = useCart();
  const { config } = useLayoutConfig<TechPremiumConfig>();

  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [filters, setFilters] = useState<FilterGroup[]>(initialFilters);
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc" | "recent">("default");

  const activeFilters = filters.reduce<Record<string, string[]>>((acc, group) => {
    const checked = group.options.filter((o) => o.checked).map((o) => o.id);
    if (checked.length > 0) acc[group.id] = checked;
    return acc;
  }, {});

  const activeFilterCount = Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);

  const filteredProducts = products.filter((p) => {
    if (activeFilters.brand) {
      const nameLower = p.name.toLowerCase();
      if (!activeFilters.brand.some((b) => nameLower.includes(b))) return false;
    }
    if (activeFilters.price) {
      const matchesPrice = activeFilters.price.some((range) => {
        if (range === "under-200") return p.price < 200;
        if (range === "200-500") return p.price >= 200 && p.price <= 500;
        if (range === "500-1000") return p.price >= 500 && p.price <= 1000;
        if (range === "over-1000") return p.price > 1000;
        return true;
      });
      if (!matchesPrice) return false;
    }
    if (activeFilters.category) {
      const catId = p.categoryId ?? "";
      const catMap: Record<string, string[]> = {
        phones: ["cat-01"],
        watches: ["cat-02"],
        cameras: ["cat-03"],
        headphones: ["cat-04"],
      };
      if (!activeFilters.category.some((c) => catMap[c]?.includes(catId))) return false;
    }
    if (activeFilters.rating) {
      if (activeFilters.rating.includes("4plus") && (p.rating ?? 0) < 4) return false;
      if (activeFilters.rating.includes("3plus") && (p.rating ?? 0) < 3) return false;
    }
    if (activeFilters.availability) {
      const wantsInStock = activeFilters.availability.includes("in-stock");
      const wantsOutOfStock = activeFilters.availability.includes("out-of-stock");
      if (wantsInStock && !wantsOutOfStock && !p.inStock) return false;
      if (wantsOutOfStock && !wantsInStock && p.inStock) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "recent": return (b.id > a.id ? 1 : -1);
      default: return 0;
    }
  });

  const SORT_LABELS: Record<typeof sortOption, string> = {
    default: "Por calificación",
    "price-asc": "Precio: menor a mayor",
    "price-desc": "Precio: mayor a menor",
    recent: "Más recientes",
  };

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        variantName: null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, addItem]
  );

  const handleFilterToggle = useCallback((groupId: string) => {
    setFilters((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, expanded: !g.expanded } : g
      )
    );
  }, []);

  const handleFilterCheck = useCallback((groupId: string, optionId: string) => {
    setFilters((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) =>
                o.id === optionId ? { ...o, checked: !o.checked } : o
              ),
            }
          : g
      )
    );
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters((prev) =>
      prev.map((g) => ({
        ...g,
        options: g.options.map((o) => ({ ...o, checked: false })),
      }))
    );
    setSortOption("default");
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((option: typeof sortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  }, []);

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "search") nav.goSearch();
      else if (tab === "cart") nav.goCart();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing") {
        nav.goListing();
      } else if (href === "/" || href === "#home") {
        nav.goHome();
      } else {
        nav.goHome();
      }
    },
    [nav]
  );

  return (
    <ProductListingPage
      store={store}
      products={sortedProducts}
      navLinks={config.content?.navLinks ?? []}
      activeHref="/listing"
      footerServices={config.content?.footerServices ?? []}
      footerAssistance={config.content?.footerAssistance ?? []}
      grid={config.grid}
      filters={filters}
      totalProducts={sortedProducts.length}
      currentPage={currentPage}
      totalPages={Math.ceil(sortedProducts.length / 9) || 1}
      activeTab="home"
      cartItemCount={totalItems}
      currencySymbol={currencySymbol}
      isFilterDrawerOpen={isFilterDrawerOpen}
      sortOption={sortOption}
      sortLabel={SORT_LABELS[sortOption]}
      activeFilterCount={activeFilterCount}
      onSearchClick={nav.goSearch}
      onCartClick={nav.goCart}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
      onPageChange={(page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      onFilterToggle={handleFilterToggle}
      onFilterCheck={handleFilterCheck}
      onFilterDrawerToggle={() => setIsFilterDrawerOpen((prev) => !prev)}
      onClearFilters={handleClearFilters}
      onSortChange={handleSortChange}
      onTabChange={handleTabChange}
      onNavLinkClick={handleNavLinkClick}
    />
  );
}
