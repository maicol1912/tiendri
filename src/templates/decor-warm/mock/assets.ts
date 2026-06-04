// Decor Warm Template — Asset Paths

const BASE = "/mocks/decor-warm";

export const ASSETS = {
  heroBanner: `${BASE}/hero-banner.png`,
  heroBanner2: `${BASE}/hero-banner-2.png`,
  bestSeller: `${BASE}/best-seller-kitchen-cart.png`,

  products: {
    chairAluminum: `${BASE}/chair-aluminum.png`,
    chairStylish: `${BASE}/chair-stylish.png`,
    sofaScandinavian: `${BASE}/sofa-scandinavian.png`,
    sofaChesterfield: `${BASE}/sofa-chesterfield.png`,
    sofaContemporary: `${BASE}/sofa-contemporary.png`,
    sofaLuxe: `${BASE}/sofa-luxe.png`,
    bedBrown: `${BASE}/bed-brown.png`,
    bedGreen: `${BASE}/bed-green.png`,
    bedKing: `${BASE}/bed-king.png`,
    bedSingle: `${BASE}/bed-single.png`,
  },

  cart: {
    lamp: `${BASE}/cart-lamp.png`,
    nightstand: `${BASE}/cart-nightstand.png`,
    dresser: `${BASE}/cart-dresser.png`,
  },
} as const;
