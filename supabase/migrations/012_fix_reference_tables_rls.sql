-- Migration: 012_fix_reference_tables_rls.sql
-- Fix: grant table-level permissions to anon and authenticated roles.
--
-- Root cause: Supabase does NOT automatically grant table access to anon/authenticated.
-- Without explicit GRANTs, PostgREST returns "permission denied for table" before RLS
-- is even evaluated. Every table accessed via the Supabase client needs GRANTs.
--
-- This migration adds GRANTs for ALL project tables and adds missing RLS policies
-- for authenticated users on reference tables.

-- ══════════════════════════════════════════════════════════════════════════════
-- REFERENCE TABLES (read-only for both roles)
-- ══════════════════════════════════════════════════════════════════════════════

GRANT SELECT ON public.templates TO anon, authenticated;
GRANT SELECT ON public.plans TO anon, authenticated;
GRANT SELECT ON public.currencies TO anon, authenticated;

-- Missing RLS policies for authenticated users on reference tables
CREATE POLICY "authenticated: read templates"
  ON public.templates FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated: read plans"
  ON public.plans FOR SELECT TO authenticated USING (true);

CREATE POLICY "authenticated: read currencies"
  ON public.currencies FOR SELECT TO authenticated USING (true);

-- ══════════════════════════════════════════════════════════════════════════════
-- STORES + related 1:1 tables
-- ══════════════════════════════════════════════════════════════════════════════

-- stores: anon reads public storefronts, authenticated CRUD own stores
GRANT SELECT ON public.stores TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stores TO authenticated;

-- store_appearance: anon reads public, authenticated CRUD own
GRANT SELECT ON public.store_appearance TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.store_appearance TO authenticated;

-- store_infrastructure: anon reads public, authenticated CRUD own
GRANT SELECT ON public.store_infrastructure TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.store_infrastructure TO authenticated;

-- ══════════════════════════════════════════════════════════════════════════════
-- CATALOG TABLES
-- ══════════════════════════════════════════════════════════════════════════════

-- categories
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;

-- subcategories
GRANT SELECT ON public.subcategories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subcategories TO authenticated;

-- products
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- product_images
GRANT SELECT ON public.product_images TO anon;
GRANT SELECT, INSERT, DELETE ON public.product_images TO authenticated;

-- product_variants
GRANT SELECT ON public.product_variants TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_variants TO authenticated;

-- ══════════════════════════════════════════════════════════════════════════════
-- OFFERS
-- ══════════════════════════════════════════════════════════════════════════════

-- offers
GRANT SELECT ON public.offers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.offers TO authenticated;

-- offer_items
GRANT SELECT ON public.offer_items TO anon;
GRANT ALL ON public.offer_items TO authenticated;

-- ══════════════════════════════════════════════════════════════════════════════
-- ORDERS
-- ══════════════════════════════════════════════════════════════════════════════

-- orders: anon can INSERT (anonymous WhatsApp checkout)
GRANT INSERT ON public.orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;

-- ══════════════════════════════════════════════════════════════════════════════
-- MEDIA & PAGES
-- ══════════════════════════════════════════════════════════════════════════════

-- media_assets: no anon access (served via Storage CDN URLs)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.media_assets TO authenticated;

-- store_pages: anon reads published pages
GRANT SELECT ON public.store_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.store_pages TO authenticated;
