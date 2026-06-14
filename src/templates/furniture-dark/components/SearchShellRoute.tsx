"use client";

// Furniture Dark — SearchShellRoute
// 300ms debounce; filters by name + description; navigation

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { SearchPage } from "./SearchPage";
import { mockStore, mockProducts } from "../mock/data";

export function SearchShellRoute() {
  const router = useRouter();
  const { totalItems } = useCart();

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
      onProductClick={(productId) =>
        router.push(`${TEMPLATE_BASE}/producto/${productId}`)
      }
      onBack={() => router.back()}
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onNavLinkClick={(href) => {
        if (href === "/") router.push(TEMPLATE_BASE);
        else if (href === "/catalogo") router.push(`${TEMPLATE_BASE}/catalogo`);
        else if (href === "/info") router.push(`${TEMPLATE_BASE}/info`);
      }}
      onBottomNavTab={(tab) => {
        if (tab === "home") router.push(TEMPLATE_BASE);
        else if (tab === "cart") router.push(`${TEMPLATE_BASE}/carrito`);
        else if (tab === "info") router.push(`${TEMPLATE_BASE}/info`);
      }}
    />
  );
}
