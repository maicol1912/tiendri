-- ── Migration: 014_fix_storage_policies ──────────────────────────────────────
-- Fix: Storage INSERT/DELETE policies for products, banners, and categories
-- fail because they use a nested EXISTS against the stores table, which has
-- its own RLS — the subquery returns 0 rows and the policy denies the upload.
--
-- Solution: a SECURITY DEFINER helper function that bypasses stores RLS to
-- verify ownership. All four buckets' existing policies remain untouched;
-- PostgreSQL OR-combines multiple policies, so these new ones act as fallbacks.

-- ── Helper function ─────────────────────────────────────────────────────────
-- Runs as the function owner (superuser), bypassing RLS on stores.
-- Returns true if the given folder name is a valid UUID that matches
-- a store owned by the current authenticated user.

CREATE OR REPLACE FUNCTION public.check_store_owner(folder_name text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM stores
    WHERE id = folder_name::uuid
    AND owner_id = auth.uid()
  );
$$;

-- ── products ────────────────────────────────────────────────────────────────

CREATE POLICY "authenticated: upload own products v2"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'products'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

CREATE POLICY "authenticated: delete own products v2"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'products'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

-- ── banners ─────────────────────────────────────────────────────────────────

CREATE POLICY "authenticated: upload own banners v2"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'banners'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

CREATE POLICY "authenticated: delete own banners v2"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'banners'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

-- ── categories ──────────────────────────────────────────────────────────────

CREATE POLICY "authenticated: upload own categories v2"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'categories'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

CREATE POLICY "authenticated: delete own categories v2"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'categories'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

-- ── logos (store_id path — existing 009 policy also broken) ─────────────────
-- The user_id-path policies from 013 cover onboarding uploads.
-- This covers post-onboarding uploads that use store_id as the first folder.

CREATE POLICY "authenticated: upload own logos v2"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'logos'
    AND public.check_store_owner((storage.foldername(name))[1])
  );

CREATE POLICY "authenticated: delete own logos v2"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'logos'
    AND public.check_store_owner((storage.foldername(name))[1])
  );
