export const ASSETS = {
  hero: "/templates/tech-premium/hero-phone.png",
  bannerWide: "/templates/tech-premium/banner-ps5.png",
  bannerTall: "/templates/tech-premium/banner-macbook.png",
  bannerSmallLeft: "/templates/tech-premium/banner-airpods.png",
  bannerSmallRight: "/templates/tech-premium/banner-visionpro.png",
  summerSale: "/templates/tech-premium/summer-sale.png",
  summerSaleMobile: "/templates/tech-premium/summer-sale-mobile.png",
  products: Array.from(
    { length: 8 },
    (_, i) => `/templates/tech-premium/product-${String(i + 1).padStart(2, "0")}.png`
  ),
  popularProducts: Array.from(
    { length: 4 },
    (_, i) => `/templates/tech-premium/popular-${String(i + 1).padStart(2, "0")}.png`
  ),
  discountProducts: Array.from(
    { length: 4 },
    (_, i) => `/templates/tech-premium/discount-${String(i + 1).padStart(2, "0")}.png`
  ),
} as const;
