"use client";

import { useCallback } from "react";
import { StoreInfoPage } from "@/templates/_shared/StoreInfoPage";
import { Header } from "./Header";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import { useCart } from "@/lib/cart";
import type { StoreInfo } from "@/types/store";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();
  const { totalItems } = useCart();

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      header={
        <Header
          store={store}
          cartItemCount={totalItems}
          activeHref="/info"
          onNavLinkClick={handleNavLinkClick}
          onCartClick={nav.goCart}
          onSearchClick={nav.goSearch}
        />
      }
      onBack={nav.goHome}
    />
  );
}
