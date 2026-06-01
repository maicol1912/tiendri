"use client";

// Furniture Dark — CartShellRoute
// Reads items from CartContext, handles all cart mutations + navigation

import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { CartPage } from "./CartPage";
import { mockStore } from "../mock/data";

export function CartShellRoute() {
  const router = useRouter();
  const { items, totalItems, totalPrice, incrementItem, decrementItem, removeItem } = useCart();

  return (
    <CartPage
      store={mockStore}
      items={items}
      totalPrice={totalPrice}
      cartItemCount={totalItems}
      onIncrement={incrementItem}
      onDecrement={decrementItem}
      onRemove={removeItem}
      onCheckout={() => router.push(`${TEMPLATE_BASE}/checkout`)}
      onContinueShopping={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
      onSearchClick={() => router.push(`${TEMPLATE_BASE}/buscar`)}
      onCartClick={() => {}}
      onBottomNavTab={(tab) => {
        if (tab === "home") router.push(TEMPLATE_BASE);
        else if (tab === "wishlist") router.push(`${TEMPLATE_BASE}/catalogo`);
      }}
    />
  );
}
