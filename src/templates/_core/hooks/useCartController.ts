"use client";

import { useCallback, useMemo } from "react";
import { useCart } from "@/templates/_core/cart";
import type { CartItem } from "@/types/domain/cart";

export interface CartController {
  items: CartItem[];
  totalPrice: number;
  itemCount: number;
  updateQuantity: (productId: string, delta: number, variantName?: string | null) => void;
  removeItem: (productId: string, variantName?: string | null) => void;
  clearCart: () => void;
}

export function useCartController(): CartController {
  const {
    items,
    totalItems,
    totalPrice,
    incrementItem,
    decrementItem,
    removeItem: cartRemoveItem,
    clearCart: cartClearCart,
  } = useCart();

  const updateQuantity = useCallback(
    (productId: string, delta: number, variantName?: string | null) => {
      if (delta > 0) {
        incrementItem(productId, variantName);
      } else if (delta < 0) {
        decrementItem(productId, variantName);
      }
    },
    [incrementItem, decrementItem]
  );

  const removeItem = useCallback(
    (productId: string, variantName?: string | null) => {
      cartRemoveItem(productId, variantName);
    },
    [cartRemoveItem]
  );

  const clearCart = useCallback(() => {
    cartClearCart();
  }, [cartClearCart]);

  const itemCount = useMemo(() => totalItems, [totalItems]);

  return {
    items,
    totalPrice,
    itemCount,
    updateQuantity,
    removeItem,
    clearCart,
  };
}
