// Beauty Elegant Template — Complete Mock Store Data
// All content lives here — zero hardcoded strings in components.

import { ASSETS } from "./assets";
import type { BeautyElegantProduct, BeautyElegantCategory } from "../types";
import type { StoreInfo } from "@/types/store";

// ── Store Info ────────────────────────────────────────────────────────────────

export const mockStore: StoreInfo = {
  name: "Blushora",
  slug: "blushora",
  logo: null,
  description: "Tu tienda de belleza exclusiva con cosméticos y cuidado personal premium.",
  whatsapp: "573001234567",
  social_links: {
    instagram: "blushora.co",
    facebook: "blushorabeauty",
    tiktok: "blushora",
  },
};

// ── Categories ────────────────────────────────────────────────────────────────

export const mockCategories: BeautyElegantCategory[] = [
  { id: "cat-makeup",    name: "Makeup" },
  { id: "cat-skincare",  name: "Skincare" },
  { id: "cat-fragrance", name: "Fragrance" },
  { id: "cat-tools",     name: "Accesorios" },
  { id: "cat-sets",      name: "Kits Regalo" },
];

// ── Products ──────────────────────────────────────────────────────────────────

export const mockProducts: BeautyElegantProduct[] = [
  {
    id: "p-serum-vitc",
    name: "Purple Glow Vitamin C Serum",
    slug: "purple-glow-vitamin-c-serum",
    price: 112000,
    originalPrice: 140000,
    images: [{ url: ASSETS.products.serum, sort_order: 0 }],
    inStock: true,
    description: "Sérum antioxidante con vitamina C al 20% y resveratrol. Ilumina y protege contra el envejecimiento prematuro.",
    categoryId: "cat-skincare",
    subtitle: "20% Vitamin C • Anti-aging",
    discountLabel: "-20%",
  },
  {
    id: "p-lotion-daily",
    name: "Peptide Rich Moisturizer",
    slug: "peptide-rich-moisturizer",
    price: 89000,
    originalPrice: 108000,
    images: [{ url: ASSETS.products.lotion, sort_order: 0 }],
    inStock: true,
    description: "Crema con complejo de péptidos y ceramidas. Restaura la barrera cutánea y reduce las líneas finas.",
    categoryId: "cat-skincare",
    subtitle: "Peptide Complex • Anti-wrinkle",
    healthFacts: "Sin parabenos • Sin sulfatos",
    discountLabel: "-18%",
  },
  {
    id: "p-night-revival",
    name: "Night Revival Cream",
    slug: "night-revival-cream",
    price: 98000,
    originalPrice: 125000,
    images: [{ url: ASSETS.products.nightRevival, sort_order: 0 }],
    inStock: true,
    description: "Crema nocturna regeneradora con retinol encapsulado y niacinamida. Despierta con piel renovada.",
    categoryId: "cat-skincare",
    subtitle: "Retinol • Niacinamide",
    discountLabel: "-22%",
  },
  {
    id: "p-lotion-swirl",
    name: "Blur & Glow Foundation",
    slug: "blur-glow-liquid-foundation",
    price: 98000,
    originalPrice: 125000,
    images: [{ url: ASSETS.products.lotionSwirl, sort_order: 0 }],
    inStock: true,
    description: "Base líquida de cobertura completa con efecto blur instantáneo. Larga duración 16h, resistente al agua.",
    categoryId: "cat-makeup",
    subtitle: "Full Coverage • SPF 20",
    discountLabel: "-22%",
  },
  {
    id: "p-lakme-palette",
    name: "Violet Haze Eye Palette",
    slug: "violet-haze-eye-palette",
    price: 135000,
    originalPrice: 168000,
    images: [{ url: ASSETS.products.detailLakme, sort_order: 0 }],
    inStock: true,
    description: "Paleta de 12 sombras en tonos violetas, malvas y lilas. Fórmula ultrasuave de alta pigmentación.",
    categoryId: "cat-makeup",
    subtitle: "12 Shades • Highly Pigmented",
    discountLabel: "-20%",
  },
  {
    id: "p-gift-set",
    name: "Blushora Starter Gift Set",
    slug: "blushora-starter-gift-set",
    price: 220000,
    originalPrice: 280000,
    images: [{ url: ASSETS.products.serum, sort_order: 0 }],
    inStock: false,
    description: "Set regalo con sérum, crema hidratante, labial y mini paleta de sombras. El regalo perfecto para ella.",
    categoryId: "cat-sets",
    subtitle: "4 Bestsellers • Gift Box Included",
    discountLabel: "-21%",
  },
  {
    id: "p-night-lotion",
    name: "Berry Crush Lip Gloss",
    slug: "berry-crush-lip-gloss",
    price: 58000,
    originalPrice: 72000,
    images: [{ url: ASSETS.products.lotion, sort_order: 0 }],
    inStock: true,
    description: "Labial líquido de larga duración en tonos berry y ciruela. Fórmula no resecante con aceite de jojoba.",
    categoryId: "cat-makeup",
    subtitle: "Matte Finish • 12h Wear",
    discountLabel: "-19%",
  },
  {
    id: "p-perfume-violet",
    name: "Violet Bloom Eau de Parfum",
    slug: "violet-bloom-eau-de-parfum",
    price: 175000,
    originalPrice: null,
    images: [{ url: ASSETS.products.nightRevival, sort_order: 0 }],
    inStock: true,
    description: "Fragancia floral-amaderada con notas de violeta, iris y cedro blanco. Una firma olfativa única.",
    categoryId: "cat-fragrance",
    subtitle: "100ml • Floral Woody",
  },
];

// ── Detail product ────────────────────────────────────────────────────────────

export const mockDetailProduct: BeautyElegantProduct = mockProducts[0]!;

// ── Cart mock items ───────────────────────────────────────────────────────────

export const mockCartItems = [
  {
    productId: "p-serum-vitc",
    productName: "Purple Glow Vitamin C Serum",
    price: 112000,
    imageUrl: ASSETS.cart.serum,
    quantity: 1,
  },
  {
    productId: "p-lotion-daily",
    productName: "Peptide Rich Moisturizer",
    price: 89000,
    imageUrl: ASSETS.cart.lotion,
    quantity: 2,
  },
];
