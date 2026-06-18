import React, { memo, useState } from "react";
import { SEARCH_BAR_REGISTRY } from "@/templates/_variants/search-bar";
import type { SectionRendererProps } from "./types";

export const SearchBarSection = memo(function SearchBarSection({
  showSearchBar,
  searchBarVariant,
  searchBarPlaceholder,
}: SectionRendererProps) {
  const [searchValue, setSearchValue] = useState("");

  if (!showSearchBar || !searchBarVariant) return null;

  const SearchBarComponent = SEARCH_BAR_REGISTRY[searchBarVariant];
  if (!SearchBarComponent) return null;

  return (
    <div className="max-w-[92%] lg:max-w-[65%] mx-auto py-3">
      <SearchBarComponent
        value={searchValue}
        onChange={setSearchValue}
        placeholder={searchBarPlaceholder}
      />
    </div>
  );
});
