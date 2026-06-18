"use client";

import { useCallback } from "react";
import { StoreInfoPage } from "@/templates/_shared/StoreInfoPage";
import { Header } from "./Header";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import type { StoreInfo } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();

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
          activeHref="/info"
          onNavLinkClick={handleNavLinkClick}
          onSearchClick={nav.goSearch}
          onCartClick={nav.goCart}
        />
      }
      onBack={nav.goHome}
    />
  );
}
