"use client";

// TODO: Implement useSearch hook
export function useSearch() {
  // TODO: Return search state and actions from SearchContext
  return {
    query: "",
    setQuery: (_q: string) => {},
    results: [],
    isOpen: false,
    open: () => {},
    close: () => {},
  };
}
