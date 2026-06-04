"use client";

// Decor Warm Template — WishlistShellRoute
// Client boundary. Manages wishlist state in localStorage.
// Key: tc_decor_warm_wishlist_{slug}

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { WishlistPage } from "./WishlistPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { DecorWarmWishlistItem } from "../types";
import type { StoreInfo } from "@/types/store";

const WISHLIST_KEY_PREFIX = "tc_decor_warm_wishlist_";

interface WishlistShellRouteProps {
  store: StoreInfo;
  currencySymbol?: string;
}

export function WishlistShellRoute({ store: _store, currencySymbol = "$" }: WishlistShellRouteProps) {
  const nav = useTemplateNav();
  const params = useParams();
  const slug = (params["slug"] as string | undefined) ?? "preview";
  const wishlistKey = `${WISHLIST_KEY_PREFIX}${slug}`;

  const [items, setItems] = useState<DecorWarmWishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(wishlistKey);
      if (raw) {
        const parsed = JSON.parse(raw) as DecorWarmWishlistItem[];
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      // Invalid JSON — start fresh
    }
    setHydrated(true);
  }, [wishlistKey]);

  // Persist on change (skip initial render)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(wishlistKey, JSON.stringify(items));
    } catch {
      // Storage unavailable
    }
  }, [items, wishlistKey, hydrated]);

  const handleRemove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  return (
    <WishlistPage
      items={items}
      currencySymbol={currencySymbol}
      onBack={nav.goHome}
      onRemove={handleRemove}
      onProductClick={(id) => nav.goProduct(id)}
      onAddMore={nav.goListing}
    />
  );
}
