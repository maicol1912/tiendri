"use client";

// Beauty Soft Template — StoreInfoShellRoute
// Client boundary. Wires navigation for the Info page.

import { useCallback } from "react";
import { StoreInfoPage } from "./StoreInfoPage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import type { StoreInfo } from "@/types/store";
import type { NavTab } from "../types";

interface StoreInfoShellRouteProps {
  store: StoreInfo;
}

export function StoreInfoShellRoute({ store }: StoreInfoShellRouteProps) {
  const nav = useTemplateNav();

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      if (tab === "home") nav.goHome();
      else if (tab === "cart") nav.goCart();
      else if (tab === "search") nav.goSearch();
    },
    [nav]
  );

  return (
    <StoreInfoPage
      store={store}
      onBack={nav.goHome}
      onTabChange={handleTabChange}
    />
  );
}
