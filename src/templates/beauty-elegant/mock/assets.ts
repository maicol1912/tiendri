// Beauty Elegant Template — Image Path Constants
// All image assets live in /public/mocks/beauty-elegant/

const BASE = "/mocks/beauty-elegant";

export const ASSETS = {
  // Product images — reused across multiple products
  products: {
    serum:       `${BASE}/product-serum.png`,
    lotion:      `${BASE}/product-skin-lotion.png`,
    nightRevival:`${BASE}/product-night-revival.png`,
    lotionSwirl: `${BASE}/product-lotion-swirl.png`,
    detailLakme: `${BASE}/detail-lakme.png`,
  },

  // Cart thumbnails (reuse product images)
  cart: {
    serum:       `${BASE}/product-serum.png`,
    lotion:      `${BASE}/product-skin-lotion.png`,
    nightRevival:`${BASE}/product-night-revival.png`,
    lotionSwirl: `${BASE}/product-lotion-swirl.png`,
  },
} as const;
