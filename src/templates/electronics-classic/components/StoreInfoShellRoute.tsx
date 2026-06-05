"use client";

// Electronics Classic — Store Info Shell Route
// Client boundary. Wires navigation and mock data into StoreInfoPage.

import { useCart } from "../context/CartContext";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { StoreInfoPage } from "./StoreInfoPage";
import { mockStore } from "../mock/data";

export function StoreInfoShellRoute() {
  const { totalItems: cartCount } = useCart();
  const nav = useTemplateNav();

  return (
    <StoreInfoPage
      store={mockStore}
      cartCount={cartCount}
      onNavigate={(path) => {
        if (path.includes("/info")) nav.goInfo();
        else if (path.includes("/carrito")) nav.goCart();
        else if (path.includes("/buscar")) nav.goSearch();
        else nav.goHome();
      }}
      onSearchSubmit={(q) => nav.goSearch()}
      onCartClick={nav.goCart}
    />
  );
}
