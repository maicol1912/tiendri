-- ── Migration: 007_orders ────────────────────────────────────────────────────
-- Phase 7: Customer orders table
-- Orders use a JSONB snapshot for both customer data and line items, preserving
-- the point-in-time state of product names, prices, and images at checkout.
-- Anonymous checkout is supported (anon INSERT policy) — customers order via
-- WhatsApp without creating an account.
-- Depends on: 001_enums (order_status), 003_stores (stores, set_updated_at),
--             003_reference_tables (currencies)
-- is_store_owner() / is_store_public() helpers defined in 006_rls_helpers migration.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── 4.11 orders ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id    UUID        NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,

  -- Customer data captured at checkout (JSONB snapshot — not normalized).
  -- Required fields (validated at app layer): name, whatsapp, address.
  -- Optional fields: email, notes.
  -- Structure: {
  --   "name":     "Juan Perez",
  --   "whatsapp": "573001234567",
  --   "email":    "juan@mail.com",         -- optional
  --   "address":  "Calle 123 #45-67, Bogotá",
  --   "notes":    "Dejar en portería"      -- optional
  -- }
  customer    JSONB       NOT NULL,

  -- Line items as a point-in-time snapshot.
  -- WHY JSONB: Product names, prices, and images may change after the order is placed.
  -- Normalizing to a FK would break order history if the product is later edited or deleted.
  -- Structure: Array<{
  --   productId:     string,
  --   name:          string,
  --   price:         number,        -- integer, same unit as stores.currency_id
  --   quantity:      number,
  --   imageUrl:      string | null,
  --   variantName:   string | null,
  --   originalPrice: number | null, -- compare_at_price at time of order (for display)
  --   description:   string         -- optional short description
  -- }>
  items       JSONB       NOT NULL DEFAULT '[]'::jsonb,

  -- Monetary totals — integer cents/units (no decimals) aligned with currency decimal_places.
  total       INT         NOT NULL CHECK (total >= 0),

  -- Order lifecycle state
  status      public.order_status NOT NULL DEFAULT 'pending',

  -- Currency at time of order — FK to currencies table (symbol, locale, decimal_places).
  currency_id UUID        NOT NULL REFERENCES public.currencies(id) ON DELETE RESTRICT,

  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  -- NOTE: orders do NOT have updated_at — status changes are the only mutations
  -- and are tracked via the status column directly. If audit history is needed,
  -- add an order_events table in a future migration.
);

-- ── Indexes ──────────────────────────────────────────────────────────────────

-- RLS performance: store ownership lookup
CREATE INDEX idx_orders_store         ON public.orders (store_id);
-- Dashboard: filter orders by status (pending / confirmed / shipped / etc.)
CREATE INDEX idx_orders_store_status  ON public.orders (store_id, status);
-- Dashboard: order history sorted by most recent first
CREATE INDEX idx_orders_store_created ON public.orders (store_id, created_at DESC);

-- ── RLS ──────────────────────────────────────────────────────────────────────

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anon: INSERT only — anonymous WhatsApp checkout on public stores.
-- Customers do NOT need an account to place an order.
CREATE POLICY "anon: insert order on public stores"
  ON public.orders FOR INSERT TO anon
  WITH CHECK (public.is_store_public(store_id));

-- Authenticated: customers with an account can also place orders on public stores.
CREATE POLICY "authenticated: insert order"
  ON public.orders FOR INSERT TO authenticated
  WITH CHECK (public.is_store_public(store_id));

-- Authenticated: store owner reads all orders for their stores (dashboard).
CREATE POLICY "authenticated: select own orders"
  ON public.orders FOR SELECT TO authenticated
  USING (public.is_store_owner(store_id));

-- Authenticated: store owner can update order status (e.g. pending -> confirmed).
CREATE POLICY "authenticated: update own orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (public.is_store_owner(store_id))
  WITH CHECK (public.is_store_owner(store_id));

-- Authenticated: store owner can delete orders (e.g. spam / test orders).
CREATE POLICY "authenticated: delete own orders"
  ON public.orders FOR DELETE TO authenticated
  USING (public.is_store_owner(store_id));
