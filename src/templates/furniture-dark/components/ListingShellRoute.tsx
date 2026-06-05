"use client";

// Furniture Dark — ListingShellRoute
// Wishlist state + category filtering + navigation

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { ProductListingPage } from "./ProductListingPage";
import { mockStore, mockCategories, mockProducts, mockCategoryBanner } from "../mock/data";

export function ListingShellRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { totalItems } = useCart();

  const initialCategory = searchParams.get("category") ?? undefined;
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(initialCategory);

  // Filter products by category
  const filteredProducts = activeCategoryId
    ? mockProducts.filter((p) => p.categoryId === activeCategoryId)
    : mockProducts;

  function handleCategoryClick(categoryId: string) {
    const next = categoryId === activeCategoryId ? undefined : categoryId;
    setActiveCategoryId(next);
    if (next) {
      router.replace(`${TEMPLATE_BASE}/catalogo?category=${next}`);
    } else {
      router.replace(`${TEMPLATE_BASE}/catalogo`);
    }
  }

  return (
    <ProductListingPage
      store={mockStore}
      products={filteredProducts}
      categories={mockCategories}
      categoryBanner={mockCategoryBanner}
      activeCategoryId={activeCategoryId}
      cartItemCount={totalItems}
      onBack={() => router.push(TEMPLATE_BASE)}
      onCategoryClick={handleCategoryClick}
      onProductClick={(productId) =>
        router.push(`${TEMPLATE_BASE}/producto/${productId}`)
      }
      onSearchClick={() => router.push(`${TEMPLATE_BASE}/buscar`)}
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onBottomNavTab={(tab) => {
        if (tab === "home") router.push(TEMPLATE_BASE);
        else if (tab === "cart") router.push(`${TEMPLATE_BASE}/carrito`);
        else if (tab === "search") router.push(`${TEMPLATE_BASE}/buscar`);
        else if (tab === "info") router.push(`${TEMPLATE_BASE}/info`);
      }}
    />
  );
}
