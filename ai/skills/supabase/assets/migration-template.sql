-- ============================================
-- Migración: {NNN}_{descripción}.sql
-- ============================================

-- 1. Crear tabla
CREATE TABLE {table_name} (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Índices
CREATE INDEX idx_{table_name}_store_id ON {table_name}(store_id);
CREATE INDEX idx_{table_name}_sort_order ON {table_name}(store_id, sort_order);

-- 3. RLS
ALTER TABLE {table_name} ENABLE ROW LEVEL SECURITY;

CREATE POLICY "owner_all" ON {table_name}
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = {table_name}.store_id
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "public_select" ON {table_name}
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM stores
      WHERE stores.id = {table_name}.store_id
      AND stores.onboarding_completed = true
    )
  );

-- 4. Trigger updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON {table_name}
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
