"use client";

// Electronics Classic — Cart Shell Route
// "use client" — wired to CartContext for CRUD operations.

import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { CartPage } from "./CartPage";
import type { ElectronicsClassicConfig } from "../config";
import { mockStore } from "../mock/data";

export function CartShellRoute() {
  const router = useRouter();
  const { config } = useLayoutConfig<ElectronicsClassicConfig>();
  const { items: cartItems, totalItems: cartCount, removeItem, incrementItem, decrementItem } = useCart();

  // CartPage uses onQuantityChange(productId, newQty).
  // We implement it by removing + re-adding with new quantity.
  const updateQuantity = (productId: string, newQty: number) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (!item) return;
    if (newQty <= 0) {
      removeItem(productId);
      return;
    }
    const diff = newQty - item.quantity;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) incrementItem(productId);
    } else {
      for (let i = 0; i < Math.abs(diff); i++) decrementItem(productId);
    }
  };

  const layout = config.layout as Record<string, string> | undefined;

  return (
    <CartPage
      store={mockStore}
      items={cartItems}
      cartCount={cartCount}
      layout={layout}
      onNavigate={(path) => router.push(path)}
      onSearchSubmit={(q) =>
        router.push(`${TEMPLATE_BASE}/buscar?q=${encodeURIComponent(q)}`)
      }
      onCartClick={() => {}}
      onQuantityChange={(id, qty) => updateQuantity(id, qty)}
      onRemove={removeItem}
      onCheckout={() => router.push(`${TEMPLATE_BASE}/checkout`)}
      onContinueShopping={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
    />
  );
}
