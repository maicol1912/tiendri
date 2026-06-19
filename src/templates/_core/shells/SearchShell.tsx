"use client";

// _core/shells/SearchShell.tsx
// Client boundary para la ruta de búsqueda.
// Gestiona query con debounce y resultados; delega render a CoreSearchPage.

import { useCallback } from "react";
import { CoreSearchPage } from "@/templates/_core/pages/CoreSearchPage";
import { useSearchController } from "@/templates/_core/hooks/useSearchController";
import { useCartController } from "@/templates/_core/hooks/useCartController";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { useCart } from "@/templates/_core/cart";
import type { StorefrontProduct } from "@/types/domain/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";

export interface SearchShellProps {
  products: StorefrontProduct[];
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
}

export function SearchShell({
  products,
  config,
  variants,
  currencySymbol = "$",
}: SearchShellProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();
  const { } = useCartController();

  const {
    searchQuery,
    setSearchQuery,
    searchResults,
    resultCount,
    hasNoResults,
  } = useSearchController(products);

  const handleProductClick = useCallback(
    (productId: string) => nav.goProduct(productId),
    [nav]
  );

  const handleAddToCart = useCallback(
    (productId: string) => {
      const product = products.find((p) => p.id === productId);
      if (!product || !product.inStock) return;
      addItem({
        productId: product.id,
        variantName: null,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images[0]?.url ?? null,
      });
    },
    [products, addItem]
  );

  // Búsquedas populares derivadas de los nombres de categorías o productos destacados
  const popularSearches = products
    .filter((p) => p.inStock)
    .slice(0, 5)
    .map((p) => p.name);

  return (
    <CoreSearchPage
      config={config}
      variants={{
        productCard: variants.productCard,
        searchBar: variants.searchBar,
      }}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      searchResults={searchResults}
      resultCount={resultCount}
      hasNoResults={hasNoResults}
      onProductClick={handleProductClick}
      onAddToCart={handleAddToCart}
      popularSearches={popularSearches}
      currencySymbol={currencySymbol}
    />
  );
}
