"use client";

// Electronics Classic — Product Detail Shell Route
// "use client" — manages gallery nav, qty, cart state.
// Reads config from useLayoutConfig(). Wired to CartContext.

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLayoutConfig } from "@/app/template/[templateName]/TemplateLayoutClient";
import { useCart } from "../context/CartContext";
import { TEMPLATE_BASE } from "../hooks/useTemplateNav";
import { ProductDetailPage } from "./ProductDetailPage";
import type { ElectronicsClassicConfig } from "../config";
import {
  mockProducts,
  mockKeyFeatures,
  mockProductAbout,
  mockFeatureShowcase,
  mockProductFeatures,
  mockFeaturesDescription,
} from "../mock/data";
import type { StorefrontProduct } from "../types";

interface ProductDetailShellRouteProps {
  productId: string;
}

export function ProductDetailShellRoute({ productId }: ProductDetailShellRouteProps) {
  const router = useRouter();
  const { config } = useLayoutConfig<ElectronicsClassicConfig>();
  const { totalItems: cartCount, addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Lookup product from mock (real app would fetch from DB)
  const product: StorefrontProduct | undefined =
    mockProducts.find((p) => p.id === productId) ?? mockProducts[0];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--t-background)" }}>
        <p className="text-[var(--t-text-muted)]">Producto no encontrado.</p>
      </div>
    );
  }

  // Related products: same category, excluding current
  const related = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const layout = config.layout as Record<string, string> | undefined;
  const grid = config.grid as Record<string, { mobile: number; desktop: number }> | undefined;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      imageUrl: product.images?.[0]?.url ?? null,
    });
  };

  return (
    <ProductDetailPage
      store={{
        name: "TronMart",
        logo: null,
        slug: "tronmart",
        whatsapp: "573001234567",
      }}
      product={product}
      keyFeatures={mockKeyFeatures}
      about={mockProductAbout}
      showcase={mockFeatureShowcase}
      productFeatures={mockProductFeatures}
      featuresDescription={mockFeaturesDescription}
      relatedProducts={related}
      cartCount={cartCount}
      quantity={quantity}
      activeTab={activeTab}
      activeImageIndex={activeImageIndex}
      layout={layout}
      grid={grid}
      onNavigate={(path) => router.push(path)}
      onSearchSubmit={(q) =>
        router.push(`${TEMPLATE_BASE}/buscar?q=${encodeURIComponent(q)}`)
      }
      onCartClick={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onQuantityChange={setQuantity}
      onAddToCart={handleAddToCart}
      onViewCart={() => router.push(`${TEMPLATE_BASE}/carrito`)}
      onTabChange={setActiveTab}
      onImageIndexChange={setActiveImageIndex}
      onProductClick={(id) => router.push(`${TEMPLATE_BASE}/producto/${id}`)}
    />
  );
}
