"use client";

import { useCallback } from "react";
import { StoreInfoPage } from "@/templates/_shared/StoreInfoPage";
import { Header } from "./Header";
import { useTemplateNav } from "../../_shared/hooks/useTemplateNav";
import type { StoreInfo } from "../types";
import type { StoreInfo as SharedStoreInfo } from "@/types/store";

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

  const sharedStore: SharedStoreInfo = {
    name: store.name,
    slug: store.slug,
    logo: store.logo,
    whatsapp: store.whatsapp,
    social_links: store.social_links,
  };

  return (
    <StoreInfoPage
      store={sharedStore}
      header={
        <Header
          store={store}
          activeHref="/info"
          onSearchClick={nav.goSearch}
          onCartClick={nav.goCart}
          onNavLinkClick={handleNavLinkClick}
        />
      }
      onBack={nav.goHome}
    />
  );
}
