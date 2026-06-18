"use client";

// Furniture Dark — SearchShellRoute
// 300ms debounce; filters by name + description; navigation

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { SearchPage } from "./SearchPage";
import { mockStore, mockProducts } from "../mock/data";

export function SearchShellRoute() {
  const router = useRouter();
  const { totalItems } = useCart();
  const nav = useTemplateNav();

  const [rawQuery, setRawQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 300ms debounce
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(rawQuery);
    }, 300);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [rawQuery]);

  // Filter products by name + description
  const results =
    debouncedQuery.trim().length > 0
      ? mockProducts.filter((p) => {
          const q = debouncedQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            (p.description ?? "").toLowerCase().includes(q)
          );
        })
      : [];

  return (
    <SearchPage
      store={mockStore}
      query={rawQuery}
      results={results}
      cartItemCount={totalItems}
      onQueryChange={setRawQuery}
      onProductClick={(productId) => nav.goProduct(productId)}
      onBack={() => router.back()}
      onCartClick={nav.goCart}
      onNavLinkClick={(href) => {
        if (href === "/") nav.goHome();
        else if (href === "/catalogo") nav.goListing();
        else if (href === "/info") nav.goInfo();
      }}
      onBottomNavTab={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "cart") nav.goCart();
        else if (tab === "info") nav.goInfo();
      }}
    />
  );
}
