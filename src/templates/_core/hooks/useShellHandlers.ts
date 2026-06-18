"use client";

import { useCallback } from "react";
import type { TemplateNav } from "@/templates/_shared/hooks/useTemplateNav";

export type NavTab = "home" | "cart" | "search" | "info";

export function useShellHandlers(nav: TemplateNav) {
  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
      else if (tab === "info") nav.goInfo();
    },
    [nav]
  );

  const handleNavLinkClick = useCallback(
    (href: string) => {
      if (href === "/listing" || href === "/catalogo") nav.goListing();
      else if (href === "/info") nav.goInfo();
      else nav.goHome();
    },
    [nav]
  );

  return { handleTabChange, handleNavLinkClick };
}
