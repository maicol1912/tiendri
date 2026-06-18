"use client";

// Furniture Dark — CartShellRoute
// Reads items from CartContext, handles all cart mutations + navigation

import { useCart } from "@/lib/cart";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { CartPage } from "./CartPage";
import { mockStore } from "../mock/data";

export function CartShellRoute() {
  const { items, totalItems, totalPrice, incrementItem, decrementItem, removeItem } = useCart();
  const nav = useTemplateNav();

  return (
    <CartPage
      store={mockStore}
      items={items}
      totalPrice={totalPrice}
      cartItemCount={totalItems}
      onIncrement={incrementItem}
      onDecrement={decrementItem}
      onRemove={removeItem}
      onCheckout={nav.goCheckout}
      onContinueShopping={nav.goListing}
      onSearchClick={nav.goSearch}
      onCartClick={() => {}}
      onNavLinkClick={(href) => {
        if (href === "/") nav.goHome();
        else if (href === "/catalogo") nav.goListing();
        else if (href === "/info") nav.goInfo();
      }}
      onBottomNavTab={(tab) => {
        if (tab === "home") nav.goHome();
        else if (tab === "search") nav.goSearch();
        else if (tab === "info") nav.goInfo();
      }}
    />
  );
}
