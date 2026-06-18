"use client";

// _core/shells/HomeShell.tsx
// Client boundary para la ruta de inicio.
// Gestiona estado de interacción y delega render a CoreHomePage.

import { useState, useCallback } from "react";
import { CoreHomePage } from "@/templates/_core/pages/CoreHomePage";
import { useShellHandlers } from "@/templates/_core/hooks/useShellHandlers";
import { useCartController } from "@/templates/_core/hooks/useCartController";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { useCart } from "@/lib/cart";
import type { StoreInfo, StorefrontProduct, Category } from "@/types/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";

export interface HomeShellProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
}

export function HomeShell({
  store,
  products,
  categories,
  config,
  variants,
  currencySymbol = "$",
}: HomeShellProps) {
  const nav = useTemplateNav();
  const { addItem } = useCart();
  const { } = useCartController(); // se usa itemCount en TemplateLayout
  const { handleTabChange } = useShellHandlers(nav);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);

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

  const handleCategoryClick = useCallback((categoryId: string) => {
    // Empty string means "Todos" — reset to null (show all)
    if (!categoryId) {
      setActiveCategoryId(null);
      return;
    }
    setActiveCategoryId((prev) => (prev === categoryId ? null : categoryId));
  }, []);

  // Datos del hero extraídos del config o con fallbacks
  // La estructura real es config.content.heroBanner (ver ContentConfig en customization-sections.ts)
  const heroBanner = config.content?.heroBanner;
  const heroData = {
    subtitle: heroBanner?.subtitle,
    // heroBanner.title va a titleBold; titleLight queda undefined → CoreHomePage usa store.name como fallback
    titleLight: undefined as string | undefined,
    titleBold: heroBanner?.title,
    // heroBanner no tiene description → CoreHomePage usa store.description como fallback
    description: undefined as string | undefined,
    ctaText: heroBanner?.ctaText,
    image: heroBanner?.image,
  };

  void handleTabChange; // disponible para uso del TemplateLayout

  // Filtrar productos por categoría activa
  const displayedProducts = activeCategoryId
    ? products.filter((p) => p.categoryId === activeCategoryId)
    : products;

  // Mostrar search bar inline (debajo del header, encima del hero)
  // cuando el template declara searchBar: "INLINE"
  const showSearchBar = variants.searchBar === "INLINE";

  return (
    <CoreHomePage
      store={store}
      products={displayedProducts}
      categories={categories}
      config={config}
      variants={{
        hero: variants.hero,
        categoryNav: variants.categoryNav,
        productCard: variants.productCard,
      }}
      onProductClick={nav.goProduct}
      onAddToCart={handleAddToCart}
      onCategoryClick={handleCategoryClick}
      onCtaClick={nav.goListing}
      currencySymbol={currencySymbol}
      heroData={heroData}
      showSearchBar={showSearchBar}
      searchBarVariant={variants.searchBar}
      searchBarPlaceholder="Buscar productos..."
    />
  );
}
