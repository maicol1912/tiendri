-- ============================================
-- Patrón 1: Owner table (profiles, stores)
-- ============================================

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_select" ON stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "owner_insert" ON stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owner_update" ON stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "owner_delete" ON stores
  FOR DELETE USING (auth.uid() = user_id);

-- Público: solo tiendas con onboarding completado
CREATE POLICY "public_select" ON stores
  FOR SELECT USING (onboarding_completed = true);


-- ============================================
-- Patrón 2: Child table — acceso privado (dashboard)
-- ============================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_all" ON categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = categories.store_id
      AND stores.user_id = auth.uid()
    )
  );

-- Público: leer categorías de tiendas completadas
CREATE POLICY "public_select" ON categories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = categories.store_id
      AND stores.onboarding_completed = true
    )
  );


-- ============================================
-- Patrón 3: Child con store_id redundante (subcategories)
-- Evita JOIN extra en RLS
-- ============================================

ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_all" ON subcategories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = subcategories.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "public_select" ON subcategories
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = subcategories.store_id
      AND stores.onboarding_completed = true
    )
  );


-- ============================================
-- Patrón 4: Child con JOIN doble (product_variants)
-- RLS via producto → tienda
-- ============================================

ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_all" ON product_variants
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM products
      JOIN stores ON stores.id = products.store_id
      WHERE products.id = product_variants.product_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "public_select" ON product_variants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM products
      JOIN stores ON stores.id = products.store_id
      WHERE products.id = product_variants.product_id
      AND stores.onboarding_completed = true
    )
  );


-- ============================================
-- Patrón 5: Orders — INSERT público, SELECT/UPDATE owner
-- ============================================

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_insert" ON orders
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = orders.store_id
      AND stores.onboarding_completed = true
    )
  );

CREATE POLICY "owner_select" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = orders.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "owner_update" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = orders.store_id
      AND stores.user_id = auth.uid()
    )
  );
