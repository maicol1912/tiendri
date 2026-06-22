// Canonical domain type for store metadata — used by Server Actions and context.
// Originally defined in src/infrastructure/repositories/interfaces.ts (kept there
// for backward compatibility with repository interfaces).

export interface StoreMeta {
  id: string;
  name: string;
  slug: string;
  catalog_mode: 'simple' | 'nested';
  currency: string;
}
