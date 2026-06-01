"use client";

// Electronics Classic — Home Shell
// Rule 18: reads live config from LayoutConfigContext via useLayoutConfig().
// Bridges mock data + config into the presentational HomePage component.

import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { HomePage } from "./HomePage";
import type { ElectronicsClassicConfig } from "../config";
import {
  mockStore,
  mockHeroBanner,
  mockCategories,
  mockProductSections,
  mockFeatureCards,
  mockPromoBanner,
  mockTestimonials,
  mockBrands,
} from "../mock/data";

export function HomeShell() {
  const router = useRouter();
  const { config } = useLayoutConfig<ElectronicsClassicConfig>();
  const { totalItems: cartCount } = useCart();

  const layout = config.layout as {
    cardStyle?: string;
    cardHoverEffect?: string;
    cardImageRatio?: string;
    bannerHeight?: string;
    headerStyle?: string;
    footerStyle?: string;
  } | undefined;

  const grid = config.grid as {
    categories?: { mobile: number; desktop: number };
    products?: { mobile: number; desktop: number };
  } | undefined;

  // config.sections is readonly { id, visible }[] — extract only visible ids
  const rawSections = (config.sections as unknown) as ReadonlyArray<{ id: string; visible: boolean }> | undefined;
  const sections = rawSections
    ? rawSections.filter((s) => s.visible !== false).map((s) => s.id)
    : undefined;

  return (
    <HomePage
      store={mockStore}
      heroBanner={mockHeroBanner}
      categories={mockCategories}
      productSections={mockProductSections}
      featureCards={mockFeatureCards}
      promoBanner={mockPromoBanner}
      testimonials={mockTestimonials}
      brands={mockBrands}
      cartCount={cartCount}
      layout={layout}
      grid={grid}
      sections={sections}
      onNavigate={(path) => router.push(path)}
      onCategoryClick={(categoryId) =>
        router.push(`${TEMPLATE_BASE}/catalogo?category=${categoryId}`)
      }
      onProductClick={(productId) =>
        router.push(`${TEMPLATE_BASE}/producto/${productId}`)
      }
      onSearchSubmit={(query) =>
        router.push(`${TEMPLATE_BASE}/buscar?q=${encodeURIComponent(query)}`)
      }
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onHeroCtaClick={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
      onPromoCtaClick={() => router.push(`${TEMPLATE_BASE}/catalogo`)}
    />
  );
}
