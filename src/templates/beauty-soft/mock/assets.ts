// Beauty Soft Template — Image Asset Constants
// All images served from /templates/beauty-soft/ — real files exist in public/templates/beauty-soft/.

export const ASSETS = {
  heroBanner: "/templates/beauty-soft/hero-banner.png",
  avatar: "/templates/beauty-soft/avatar.png",
  products: {
    cleanser: "/templates/beauty-soft/product-cleanser.png",
    detailCleanser: "/templates/beauty-soft/product-detail-cleanser.png",
    facePack: "/templates/beauty-soft/product-face-pack.png",
    foamCleanser: "/templates/beauty-soft/product-foam-cleanser.png",
    serum: "/templates/beauty-soft/product-serum.png",
    sunscreen: "/templates/beauty-soft/product-sunscreen.png",
  },
  categories: {
    body: "/templates/beauty-soft/category-body.png",
    cleanse: "/templates/beauty-soft/category-cleanse.png",
    kits: "/templates/beauty-soft/category-kits.png",
    mask: "/templates/beauty-soft/category-mask.png",
    moisturize: "/templates/beauty-soft/category-moisturize.png",
    protect: "/templates/beauty-soft/category-protect.png",
    tools: "/templates/beauty-soft/category-tools.png",
    treat: "/templates/beauty-soft/category-treat.png",
  },
  cart: {
    cleanser: "/templates/beauty-soft/cart-item-cleanser.png",
    sunscreen: "/templates/beauty-soft/cart-item-sunscreen.png",
  },
} as const;
