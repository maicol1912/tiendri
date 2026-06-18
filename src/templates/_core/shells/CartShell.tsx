"use client";

// _core/shells/CartShell.tsx
// Client boundary para la ruta del carrito.
// Gestiona operaciones de carrito y navegación; delega render a CoreCartPage.

import { useCallback } from "react";
import { CoreCartPage } from "@/templates/_core/pages/CoreCartPage";
import { useCartController } from "@/templates/_core/hooks/useCartController";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";

export interface CartShellProps {
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
}

export function CartShell({
  config,
  currencySymbol = "$",
}: CartShellProps) {
  const nav = useTemplateNav();
  const { items, totalPrice, updateQuantity, removeItem } = useCartController();

  const handleCheckout = useCallback(() => nav.goCheckout(), [nav]);
  const handleContinueShopping = useCallback(() => nav.goListing(), [nav]);

  return (
    <CoreCartPage
      config={config}
      items={items}
      totalPrice={totalPrice}
      currencySymbol={currencySymbol}
      updateQuantity={updateQuantity}
      removeItem={removeItem}
      onCheckout={handleCheckout}
      onContinueShopping={handleContinueShopping}
    />
  );
}
