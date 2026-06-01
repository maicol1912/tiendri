"use client";

// Electronics Classic — Listing Shell Route
// "use client" — manages filter, sort, pagination state.
// Reads config from useLayoutConfig().

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { ListingPage } from "./ListingPage";
import type { ElectronicsClassicConfig } from "../config";
import { mockProducts, mockCategories, mockStore } from "../mock/data";
import type { SortOption } from "../types";

interface ListingShellRouteProps {
  initialCategory?: string;
}

export function ListingShellRoute({ initialCategory }: ListingShellRouteProps) {
  const router = useRouter();
  const { config } = useLayoutConfig<ElectronicsClassicConfig>();
  const { totalItems: cartCount } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory ?? null
  );
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortOption>("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const layout = config.layout as Record<string, string> | undefined;
  const grid = config.grid as Record<string, { mobile: number; desktop: number }> | undefined;

  return (
    <ListingPage
      store={mockStore}
      categories={mockCategories}
      products={mockProducts}
      cartCount={cartCount}
      selectedCategory={selectedCategory}
      minRating={minRating}
      sort={sort}
      currentPage={currentPage}
      isFilterDrawerOpen={isFilterDrawerOpen}
      layout={layout}
      grid={grid}
      onNavigate={(path) => router.push(path)}
      onSearchSubmit={(q) =>
        router.push(`${TEMPLATE_BASE}/buscar?q=${encodeURIComponent(q)}`)
      }
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onCategorySelect={setSelectedCategory}
      onRatingChange={setMinRating}
      onSortChange={setSort}
      onPageChange={setCurrentPage}
      onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
      onCloseFilterDrawer={() => setIsFilterDrawerOpen(false)}
      onProductClick={(id) => router.push(`${TEMPLATE_BASE}/producto/${id}`)}
    />
  );
}
