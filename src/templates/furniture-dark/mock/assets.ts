// Furniture Dark Template — Image Asset Paths
// All images live in public/mocks/furniture-dark/

const BASE = "/mocks/furniture-dark";

export const ASSETS = {
  // ── Store avatar ────────────────────────────────────────────────────────
  avatar: `${BASE}/avatar.jpg`,

  // ── Promo carousel banners ──────────────────────────────────────────────
  banners: [
    `${BASE}/banner-furniture-1.jpg`,
    `${BASE}/banner-furniture-2.jpg`,
  ],

  // ── Category images ─────────────────────────────────────────────────────
  categories: {
    livingRoom: `${BASE}/category-living-room.jpg`,
    bedroom: `${BASE}/category-bedroom.jpg`,
    dining: `${BASE}/category-dining.jpg`,
    office: `${BASE}/category-office.jpg`,
    outdoor: `${BASE}/category-outdoor.jpg`,
    storage: `${BASE}/category-storage.jpg`,
  },

  // ── Product images ───────────────────────────────────────────────────────
  products: {
    deepSeatSofa: `${BASE}/product-deep-seat-sofa.jpg`,
    riveraSofa: `${BASE}/product-rivera-sofa.jpg`,
    oakStorage: `${BASE}/product-oak-storage.jpg`,
    woodTable: `${BASE}/product-wood-table.jpg`,
    diningChair: `${BASE}/product-dining-chair.jpg`,
    nightstand: `${BASE}/product-nightstand.jpg`,
    swivelChair: `${BASE}/product-swivel-chair.jpg`,
    bornegoRound: `${BASE}/product-borrego-round.jpg`,
    chairLeather: `${BASE}/product-chair-leather.jpg`,
  },

  // ── Description page images ──────────────────────────────────────────────
  description: {
    tableChair: `${BASE}/desc-table-chair.jpg`,
    tableDetail: `${BASE}/desc-table-detail.jpg`,
  },
} as const;
