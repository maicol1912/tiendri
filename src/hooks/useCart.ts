"use client";

// TODO: Implement useCart hook
export function useCart() {
  // TODO: Return cart state and actions from CartContext
  return {
    items: [],
    addItem: (_item: unknown) => {},
    removeItem: (_id: string) => {},
    clearCart: () => {},
    total: 0,
  };
}
