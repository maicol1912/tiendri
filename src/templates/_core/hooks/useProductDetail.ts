"use client";

import { useState, useCallback } from "react";
import { useCart } from "@/templates/_core/cart";
import type { StorefrontProduct } from "@/types/domain/store";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface UseProductDetailReturn {
  selectedImageIndex: number;
  setSelectedImageIndex: (i: number) => void;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  isAdded: boolean;
  handleAddToCart: (
    product: StorefrontProduct,
    options?: {
      effectivePrice?: number;
      variantName?: string | null;
    }
  ) => void;
  // Accordion — for PDPs with expandable sections
  activeAccordion: string | null;
  toggleAccordion: (id: string) => void;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useProductDetail(): UseProductDetailReturn {
  const { addItem } = useCart();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const incrementQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const decrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  const handleAddToCart = useCallback(
    (
      product: StorefrontProduct,
      options?: {
        effectivePrice?: number;
        variantName?: string | null;
      }
    ) => {
      if (!product.inStock) return;

      addItem({
        productId: product.id,
        name: product.name,
        price: options?.effectivePrice ?? product.price,
        imageUrl: product.images[0]?.url ?? null,
        variantName: options?.variantName ?? null,
        quantity,
      });

      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    },
    [addItem, quantity]
  );

  const toggleAccordion = useCallback((id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  }, []);

  return {
    selectedImageIndex,
    setSelectedImageIndex,
    quantity,
    incrementQuantity,
    decrementQuantity,
    isAdded,
    handleAddToCart,
    activeAccordion,
    toggleAccordion,
  };
}
