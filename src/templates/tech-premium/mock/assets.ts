export const ASSETS = {
  hero: "/mocks/tech-premium/hero-phone.png",
  bannerWide: "/mocks/tech-premium/banner-ps5.png",
  bannerTall: "/mocks/tech-premium/banner-macbook.png",
  bannerSmallLeft: "/mocks/tech-premium/banner-airpods.png",
  bannerSmallRight: "/mocks/tech-premium/banner-visionpro.png",
  summerSale: "/mocks/tech-premium/summer-sale.png",
  summerSaleMobile: "/mocks/tech-premium/summer-sale-mobile.png",
  products: Array.from(
    { length: 8 },
    (_, i) => `/mocks/tech-premium/product-${String(i + 1).padStart(2, "0")}.png`
  ),
  popularProducts: Array.from(
    { length: 4 },
    (_, i) => `/mocks/tech-premium/popular-${String(i + 1).padStart(2, "0")}.png`
  ),
  discountProducts: Array.from(
    { length: 4 },
    (_, i) => `/mocks/tech-premium/discount-${String(i + 1).padStart(2, "0")}.png`
  ),
} as const;
