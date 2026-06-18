"use client";

// _core/TemplateLayout.tsx
// El frame orquestador del sistema de templates.
// Resuelve variantes de slots (Header/Footer/BottomNav) y monta el shell
// correspondiente según el pathname actual.

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import { useShellHandlers } from "@/templates/_core/hooks/useShellHandlers";
import { useCartController } from "@/templates/_core/hooks/useCartController";
import { HEADER_REGISTRY } from "@/templates/_variants/header";
import { FOOTER_REGISTRY } from "@/templates/_variants/footer";
import { BOTTOM_NAV_REGISTRY } from "@/templates/_variants/bottom-nav";
import {
  HomeShell,
  ListingShell,
  ProductDetailShell,
  CartShell,
  SearchShell,
  CheckoutShell,
  StoreInfoShell,
} from "@/templates/_core/shells";
import type { StoreInfo, StorefrontProduct, Category } from "@/types/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateManifest } from "@/types/templates/manifest";
import type { NavTab } from "@/templates/_variants/bottom-nav/types";
import type { NavLink } from "@/templates/_variants/header/types";
import type { BestSellerItem } from "@/templates/_core/sections/BestSellersSection";
import type { PopularProductItem } from "@/templates/mock-loader";

// ── Tipos de ruta reconocidos ──────────────────────────────────────────────────

type TemplateRoute =
  | "home"
  | "listing"
  | "product"
  | "cart"
  | "search"
  | "checkout"
  | "info";

// ── Helpers de pathname ────────────────────────────────────────────────────────

function resolveRoute(pathname: string, basePath: string): TemplateRoute {
  // Quitar el basePath del inicio para trabajar con la ruta relativa
  const relative = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length)
    : pathname;

  // Normalizar: quitar trailing slash
  const normalized = relative.endsWith("/") && relative.length > 1
    ? relative.slice(0, -1)
    : relative;

  if (normalized === "" || normalized === "/") return "home";
  if (normalized === "/catalogo") return "listing";
  if (normalized === "/carrito") return "cart";
  if (normalized === "/buscar") return "search";
  if (normalized === "/checkout") return "checkout";
  if (normalized === "/info") return "info";
  if (normalized.startsWith("/producto/")) return "product";

  // Fallback al home
  return "home";
}

function extractProductSlug(pathname: string, basePath: string): string | null {
  const productPrefix = `${basePath}/producto/`;
  if (!pathname.startsWith(productPrefix)) return null;

  const slug = pathname.slice(productPrefix.length);
  // Quitar segmentos adicionales si los hubiera (ej: query params en pathname)
  return slug.split("/")[0] || null;
}

function mapRouteToTab(route: TemplateRoute): NavTab {
  switch (route) {
    case "cart":
    case "checkout":
      return "cart";
    case "search":
      return "search";
    case "info":
      return "info";
    default:
      return "home";
  }
}

// ── Props ─────────────────────────────────────────────────────────────────────

export interface TemplateLayoutProps {
  store: StoreInfo;
  products: StorefrontProduct[];
  categories: Category[];
  config: ResolvedStoreConfig;
  manifest: TemplateManifest;
  currencySymbol?: string;
  /** Lista de productos más vendidos — solo disponible para templates que la definen. */
  bestSellers?: BestSellerItem[];
  /** Productos populares — banner cards con imagen y CTA. */
  popularProducts?: PopularProductItem[];
  /** Productos con descuento — misma forma que StorefrontProduct. */
  discountProducts?: StorefrontProduct[];
}

// ── Componente ────────────────────────────────────────────────────────────────

export function TemplateLayout({
  store,
  products,
  categories,
  config,
  manifest,
  currencySymbol = "$",
  bestSellers,
  popularProducts,
  discountProducts,
}: TemplateLayoutProps) {
  const pathname = usePathname();
  const nav = useTemplateNav();
  const { handleTabChange } = useShellHandlers(nav);
  const { itemCount } = useCartController();

  // Resolver variantes del frame
  const HeaderComponent = HEADER_REGISTRY[manifest.variants.header];
  const FooterComponent = FOOTER_REGISTRY[manifest.variants.footer];
  const BottomNavComponent = BOTTOM_NAV_REGISTRY[manifest.variants.bottomNav];

  // Ruta activa
  const route = resolveRoute(pathname, nav.basePath);
  const activeTab = mapRouteToTab(route);

  // Slug del producto activo (solo en ruta "product")
  const productSlug = route === "product"
    ? extractProductSlug(pathname, nav.basePath)
    : null;

  const currentProduct = productSlug
    ? (products.find((p) => p.slug === productSlug) ??
       products.find((p) => p.id === productSlug) ??
       null)
    : null;

  const relatedProducts = currentProduct
    ? products.filter((p) => p.id !== currentProduct.id).slice(0, 4)
    : [];

  // Nav links: desde config o defaults
  const navLinks: NavLink[] = (config.content?.navLinks as NavLink[] | undefined) ?? [
    { label: "Inicio", href: `${nav.basePath}` },
    { label: "Catálogo", href: `${nav.basePath}/catalogo` },
    { label: "Info", href: `${nav.basePath}/info` },
  ];

  // isActive para el header
  // Soporta tanto hrefs absolutos (/template/fashion/catalogo) como
  // hrefs relativos (/, /catalogo, /info) definidos en el manifest
  const isActive = useCallback(
    (href: string) => {
      // Normalizar href relativo a absoluto para comparar con pathname
      // "" y "/" se tratan como home (nav.basePath) — solo activo en exact match
      const absHref =
        href === "" || href === "/" ? nav.basePath :
        href.startsWith("/") && !href.startsWith(nav.basePath) ? `${nav.basePath}${href}` :
        href;
      return pathname === absHref || (absHref !== nav.basePath && pathname.startsWith(absHref + "/"));
    },
    [pathname, nav.basePath]
  );

  // Handler de nav links del header
  // Soporta tanto hrefs absolutos (/template/fashion/catalogo) como
  // hrefs relativos (/, /catalogo, /info) definidos en el manifest
  const handleNavClick = useCallback(
    (href: string) => {
      if (href === nav.basePath || href === `${nav.basePath}/` || href === "/" || href === "") {
        nav.goHome();
      } else if (href === `${nav.basePath}/catalogo` || href === "/catalogo") {
        nav.goListing();
      } else if (href === `${nav.basePath}/info` || href === "/info") {
        nav.goInfo();
      }
    },
    [nav]
  );

  return (
    <>
      <HeaderComponent
        store={store}
        navLinks={navLinks}
        cartCount={itemCount}
        isActive={isActive}
        onNavClick={handleNavClick}
        onSearchClick={nav.goSearch}
        onCartClick={nav.goCart}
        config={config as Record<string, unknown>}
      />

      <main className="min-h-screen">
        {route === "home" && (
          <HomeShell
            store={store}
            products={products}
            categories={categories}
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
            bestSellers={bestSellers}
            popularProducts={popularProducts}
            discountProducts={discountProducts}
          />
        )}

        {route === "listing" && (
          <ListingShell
            products={products}
            categories={categories}
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
          />
        )}

        {route === "product" && currentProduct && (
          <ProductDetailShell
            product={currentProduct}
            relatedProducts={relatedProducts}
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
          />
        )}

        {route === "product" && !currentProduct && (
          // Producto no encontrado — fallback al listado
          <ListingShell
            products={products}
            categories={categories}
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
          />
        )}

        {route === "cart" && (
          <CartShell
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
          />
        )}

        {route === "search" && (
          <SearchShell
            products={products}
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
          />
        )}

        {route === "checkout" && (
          <CheckoutShell
            store={store}
            config={config}
            variants={manifest.variants}
            currencySymbol={currencySymbol}
          />
        )}

        {route === "info" && (
          <StoreInfoShell
            store={store}
            config={config}
            variants={manifest.variants}
          />
        )}
      </main>

      <FooterComponent
        store={store}
        services={(config.content?.footerServices as string[] | undefined) ?? []}
        assistance={(config.content?.footerAssistance as string[] | undefined) ?? []}
      />

      <BottomNavComponent
        activeTab={activeTab}
        cartCount={itemCount}
        onTabChange={handleTabChange}
      />
    </>
  );
}
