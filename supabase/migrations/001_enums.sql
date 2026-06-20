-- ── Migration: 001_enums ─────────────────────────────────────────────────────
-- Phase 1: All 13 PostgreSQL enums for Tiendri V2 data model (v10)
-- These are fixed value sets that never change from the application UI.
-- Adding a new value requires a migration (ALTER TYPE ... ADD VALUE) — intentional.
-- Depends on: nothing (no FK dependencies)
-- ─────────────────────────────────────────────────────────────────────────────

-- Catalog mode: simple (flat categories) or nested (categories + subcategories)
CREATE TYPE public.catalog_mode AS ENUM ('simple', 'nested');

-- Order lifecycle states
CREATE TYPE public.order_status AS ENUM (
  'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'
);

-- Media library context — what the asset is used for
CREATE TYPE public.media_context AS ENUM (
  'product', 'banner', 'logo', 'category', 'general'
);

-- Unified offer types — replaces the old discount_type enum (v7).
-- Combos and coupons are now offers too — no separate tables needed.
CREATE TYPE public.offer_type AS ENUM (
  'percentage',    -- 20% off
  'fixed_amount',  -- $10.000 off
  'bogo',          -- 2x1, 3x2
  'free_shipping', -- free shipping
  'combo',         -- product bundle at special price
  'flash_sale',    -- time-limited sale (future)
  'coupon'         -- discount code (future)
);

-- Payment methods accepted in Colombia
CREATE TYPE public.payment_method AS ENUM (
  'nequi', 'daviplata', 'efectivo', 'transferencia', 'tarjeta'
);

-- Template UI variant slots — the 7 composable section slots
CREATE TYPE public.variant_slot AS ENUM (
  'header', 'hero', 'categoryNav', 'productCard', 'footer', 'bottomNav', 'searchBar'
);

-- Per-slot variant enums — aligned with TypeScript union types in _variants/*/types.ts

CREATE TYPE public.header_variant AS ENUM (
  'DEFAULT', 'GLASS', 'GREETING', 'GREETING_SIMPLE', 'MINIMAL'
);

CREATE TYPE public.hero_variant AS ENUM (
  'FULL_BLEED', 'CONTAINED', 'SPLIT', 'TEXT_ONLY', 'CAROUSEL',
  'CARD_SPLIT', 'EDITORIAL', 'PROMO_STRIP', 'PROMO_CARD'
);

CREATE TYPE public.category_nav_variant AS ENUM (
  'CHIPS', 'GRID', 'HORIZONTAL_SCROLL', 'TABS', 'COLUMNAR'
);

CREATE TYPE public.product_card_variant AS ENUM (
  'BELOW_IMAGE', 'OVERLAY_BOTTOM', 'OVERLAY_FULL', 'SIDE_BY_SIDE', 'WITH_DESCRIPTION'
);

CREATE TYPE public.footer_variant AS ENUM (
  'COLUMNS', 'COMPACT'
);

CREATE TYPE public.bottom_nav_variant AS ENUM (
  'EDGE', 'FLOATING_PILL', 'DOT_INDICATOR'
);

CREATE TYPE public.search_bar_variant AS ENUM (
  'INLINE', 'ICON_TRIGGER'
);

-- Social media platforms supported for store contact/links.
-- Used for app-layer validation of stores.social_media JSONB.
-- The JSONB column itself stores {platform, value} pairs;
-- this enum enforces valid platform keys via Zod at the application layer.
CREATE TYPE public.social_media_platform AS ENUM (
  'whatsapp', 'instagram', 'facebook', 'tiktok', 'twitter', 'youtube'
);
