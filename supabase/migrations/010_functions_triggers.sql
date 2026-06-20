-- ── Migration: 010_functions_triggers ────────────────────────────────────────
-- Phase 10: Utility functions for variant resolution and catalog mode switching.
--
-- Functions:
--   get_store_variants(target_store_id UUID)
--     — merges template defaults with store overrides from store_appearance.variants
--   switch_catalog_mode_to_simple(target_store_id UUID)
--     — migrates nested (subcategories) → simple (flat categories) mode
--
-- Note: enforce_max_* functions/triggers, slugify, and search_products are
-- defined in their respective earlier migrations (003–008) and are NOT repeated here.

-- ── Get Store Resolved Variants ───────────────────────────────────────────────
-- Returns the effective variant for each slot for a given store.
-- Reads template defaults from templates.default_variants JSONB,
-- then overlays merchant overrides from store_appearance.variants JSONB.

CREATE OR REPLACE FUNCTION public.get_store_variants(target_store_id uuid)
RETURNS jsonb AS $$
DECLARE
  template_defaults jsonb;
  store_overrides   jsonb;
BEGIN
  -- Get template default variants
  SELECT t.default_variants INTO template_defaults
  FROM public.stores s
  JOIN public.templates t ON t.id = s.template_id
  WHERE s.id = target_store_id;

  -- Get store variant overrides from store_appearance.variants (if any)
  SELECT sa.variants INTO store_overrides
  FROM public.store_appearance sa
  WHERE sa.store_id = target_store_id;

  -- Merge: store overrides take precedence over template defaults
  IF store_overrides IS NOT NULL AND store_overrides != '{}'::jsonb THEN
    RETURN template_defaults || store_overrides;
  ELSE
    RETURN template_defaults;
  END IF;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public;

-- ── Catalog Mode Switch ───────────────────────────────────────────────────────
-- Migrates a store from nested (subcategories) to simple (flat categories) mode.
-- Steps: nullify subcategory_id on all products, delete all subcategories,
--        update catalog_mode on the store.
-- Only callable by the store owner — enforced via is_store_owner() inside the function.

CREATE OR REPLACE FUNCTION public.switch_catalog_mode_to_simple(target_store_id uuid)
RETURNS void AS $$
BEGIN
  IF NOT public.is_store_owner(target_store_id) THEN
    RAISE EXCEPTION 'UNAUTHORIZED: Only the store owner can switch catalog mode'
      USING ERRCODE = 'insufficient_privilege';
  END IF;

  UPDATE public.products
  SET subcategory_id = NULL
  WHERE store_id = target_store_id
    AND subcategory_id IS NOT NULL;

  DELETE FROM public.subcategories
  WHERE store_id = target_store_id;

  UPDATE public.stores
  SET catalog_mode = 'simple'
  WHERE id = target_store_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
