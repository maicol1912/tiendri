// Fashion Template — Home Page
// Header → dynamic section order (hero, collections, editorial) → Footer → BottomNav
// Monochromatic B&W. Background: var(--t-background).
// Sections are rendered dynamically based on the `sections` prop so the
// ThemeCustomizer can control visibility and order.

import { Fragment } from "react";
import { Header } from "./Header";
import { HeroBanner } from "./HeroBanner";
import { CollectionSection } from "./CollectionSection";
import { EditorialSection } from "./EditorialSection";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { fashionConfig } from "../config";
import type { FashionConfig } from "../config";
import type { StoreInfo, StorefrontProduct, NavTab, HomeSectionConfig } from "../types";

interface Collection {
  title: string;
  products: StorefrontProduct[];
}

interface HomePageProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  collections?: Collection[];
  activeTab: NavTab;
  cartItemCount?: number;
  currencySymbol?: string;
  sections?: readonly HomeSectionConfig[];
  layout?: FashionConfig["layout"];
  grid?: FashionConfig["grid"];
  activeHref?: string;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onMenuClick?: () => void;
  onNavLinkClick?: (href: string) => void;
  onProductClick?: (id: string) => void;
  onShopClick?: () => void;
  onTabChange?: (tab: NavTab) => void;
}

export function HomePage({
  store,
  products,
  collections = [],
  activeTab,
  cartItemCount = 0,
  currencySymbol = "$",
  sections = fashionConfig.sections,
  layout = fashionConfig.layout,
  grid = fashionConfig.grid,
  activeHref,
  onSearchClick,
  onCartClick,
  onMenuClick,
  onNavLinkClick,
  onProductClick,
  onShopClick,
  onTabChange,
}: HomePageProps) {
  // ── Local render functions — one per configurable section ──────────────────

  function renderHero() {
    return (
      <HeroBanner
        products={products.slice(0, 4)}
        currencySymbol={currencySymbol}
        onShopClick={onShopClick}
        onProductClick={onProductClick}
        onSearchFocus={onSearchClick}
      />
    );
  }

  function renderCollections() {
    if (collections.length > 0) {
      return (
        <>
          {collections.map((col) => (
            <CollectionSection
              key={col.title}
              title={col.title}
              products={col.products}
              currencySymbol={currencySymbol}
              desktopColumns={grid.products.desktop}
              onSeeAllClick={onShopClick}
              onProductClick={onProductClick}
            />
          ))}
        </>
      );
    }
    // Fallback: show all products as a single "Nueva Colección" collection
    return (
      <CollectionSection
        title="Nueva Colección"
        products={products}
        currencySymbol={currencySymbol}
        desktopColumns={grid.products.desktop}
        onSeeAllClick={onShopClick}
        onProductClick={onProductClick}
      />
    );
  }

  function renderEditorial() {
    return <EditorialSection />;
  }

  // ── Section registry — maps each id to its render function ─────────────────

  const sectionRenderers: Record<string, () => React.ReactNode> = {
    hero: renderHero,
    collections: renderCollections,
    editorial: renderEditorial,
  };

  return (
    <div
      className="min-h-screen bg-[var(--t-background)]"
      style={{ fontFamily: "var(--font-sans, 'Inter', sans-serif)" }}
    >
      {/* ── Sticky Header — structural, always rendered ── */}
      <Header
        store={store}
        navLinks={fashionConfig.content.navLinks}
        cartItemCount={cartItemCount}
        activeHref={activeHref}
        layout={layout}
        onSearchClick={onSearchClick}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
        onNavLinkClick={onNavLinkClick}
      />

      {/* ── Main scrollable content — dynamic section order + visibility ── */}
      <main>
        {sections
          .filter((s) => s.visible)
          .map((s) => (
            <Fragment key={s.id}>{sectionRenderers[s.id]?.()}</Fragment>
          ))}
      </main>

      {/* ── Footer — structural, always rendered ── */}
      <Footer
        store={store}
        services={fashionConfig.content.footerServices}
        assistance={fashionConfig.content.footerAssistance}
        layout={layout}
      />

      <BottomNav
        activeTab={activeTab}
        cartItemCount={cartItemCount}
        onTabChange={onTabChange}
      />
    </div>
  );
}
