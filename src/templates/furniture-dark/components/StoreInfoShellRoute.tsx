"use client";

import { useCallback } from "react";
import { StoreInfoPage } from "@/templates/_shared/StoreInfoPage";
import { Header } from "./Header";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { mockStore } from "../mock/data";
import type { StoreInfo } from "@/types/store";

export function StoreInfoShellRoute() {
  const nav = useTemplateNav();

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/") nav.goHome();
      else if (href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
    },
    [nav]
  );

  const sharedStore: StoreInfo = mockStore;

  return (
    <StoreInfoPage
      store={sharedStore}
      header={
        <Header
          store={mockStore}
          activeHref="/info"
          onSearchClick={nav.goSearch}
          onCartClick={nav.goCart}
          onNavLinkClick={handleNavLinkClick}
        />
      }
    />
  );
}
