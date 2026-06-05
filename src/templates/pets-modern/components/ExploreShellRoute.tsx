"use client";

// Pets Modern Template — Explore Shell Route
// Wraps ExplorePage with active tab state + navigation.

import { useState, useCallback } from "react";
import { ExplorePage } from "./ExplorePage";
import { useTemplateNav } from "../hooks/useTemplateNav";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import type { PetsModernConfig } from "../config";
import type { PetCategory, PetFilter, NavTab } from "../types";

interface ExploreShellRouteProps {
  categories: PetCategory[];
}

export function ExploreShellRoute({ categories }: ExploreShellRouteProps) {
  const nav = useTemplateNav();
  const { config } = useLayoutConfig<PetsModernConfig>();
  const [activeFilter, setActiveFilter] = useState<PetFilter>("all");

  const handleTabChange = useCallback(
    (tab: NavTab) => {
      switch (tab) {
        case "shop":
          nav.goHome();
          break;
        case "explore":
          break;
        default:
          break;
      }
    },
    [nav]
  );

  return (
    <ExplorePage
      categories={categories}
      activeFilter={activeFilter}
      activeTab="explore"
      onFilterChange={setActiveFilter}
      onCategoryClick={(categoryId) => nav.goListing()}
      onSearchClick={nav.goSearch}
      onTabChange={handleTabChange}
      layout={config.layout}
      grid={config.grid}
    />
  );
}
