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
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";
import type { PopularProductItem } from "@/templates/mock-loader";

export interface HomeShellProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
  currencySymbol?: string;
  /** Lista de productos más vendidos — solo disponible para templates que la definen. */
  bestSellers?: BestSellerItem[];
  /** Productos populares — banner cards con imagen y CTA. */
  popularProducts?: PopularProductItem[];
  /** Productos con descuento — misma forma que StorefrontProduct. */
  discountProducts?: StorefrontProduct[];
}

export function HomeShell({
  store,
  products,
  categories,
  config,
  variants,
  currencySymbol = "$",
  bestSellers,
  popularProducts,
  discountProducts,
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
  // promotionalBanners[0] sirve como segundo panel en variantes de 2 banners (ej. CAROUSEL de decor-warm).
  type PromoBanner = { image?: string; title?: string; subtitle?: string; ctaText?: string };
  const secondBanner = (config.content?.promotionalBanners as PromoBanner[] | undefined)?.[0];
  const secondBannerImage = secondBanner?.image;
  const heroData = {
    // tag → subtitle slot (small label at top of PROMO_CARD hero)
    // Falls back to the legacy subtitle field for templates that don't define a tag.
    subtitle: heroBanner?.tag ?? heroBanner?.subtitle,
    // heroTitleLight in manifest overrides the default fallback (store.name)
    titleLight: (config as Record<string, unknown>).heroTitleLight as string | undefined,
    titleBold: heroBanner?.title,
    // CAROUSEL variants use `description` as the second banner image URL.
    // When a tag is present we still prefer secondBannerImage over the subtitle text,
    // because PROMO_CARD reads description as text while CAROUSEL reads it as an image path.
    // CAROUSEL templates should always have a secondBannerImage defined in promotionalBanners[0].
    description: secondBannerImage ?? (heroBanner?.tag ? heroBanner?.subtitle : undefined),
    ctaText: heroBanner?.ctaText,
    // Pass second banner's ctaText so CAROUSEL can render per-slide CTA buttons.
    secondCtaText: secondBanner?.ctaText,
    image: heroBanner?.image,
  };

  void handleTabChange; // disponible para uso del TemplateLayout

  // Filtrar productos por categoría activa
  const displayedProducts = activeCategoryId
    ? products.filter((p) => p.categoryId === activeCategoryId)
    : products;

  // Mostrar search bar inline (debajo del header, encima del hero)
  // cuando el template declara searchBar: "INLINE" y no lo suprime explícitamente
  const showSearchBar =
    variants.searchBar === "INLINE" &&
    (config as Record<string, unknown>).showSearchBar !== false;

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
      bestSellers={bestSellers}
      popularProducts={popularProducts}
      discountProducts={discountProducts}
    />
  );
}
