// localStorage implementation of StoreRepository.
// Stores store metadata (name, slug, catalog_mode, currency).
// updateCatalogMode handles the nested→simple cascade atomically.

import type { ActionResult } from '@/types/domain';
import type { StoreRepository, StoreMeta } from '../interfaces';

const DEMO_STORE_ID = 'demo-store' as const;
const KEY = `tiendri_${DEMO_STORE_ID}_store`;
const SUBCAT_KEY = `tiendri_${DEMO_STORE_ID}_subcategories`;
const PROD_KEY = `tiendri_${DEMO_STORE_ID}_products`;

const DEFAULT_STORE: StoreMeta = {
  id: DEMO_STORE_ID,
  name: 'Mi Tienda',
  slug: 'mi-tienda',
  catalog_mode: 'simple',
  currency: 'COP',
};

function readStore(): StoreMeta | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as StoreMeta;
  } catch {
    return null;
  }
}

function writeStore(meta: StoreMeta): void {
  localStorage.setItem(KEY, JSON.stringify(meta));
}

function err(code: string, message: string): ActionResult<never> {
  return { success: false, error: { code, message } };
}

export class LocalStoreRepository implements StoreRepository {
  async get(storeId: string): Promise<StoreMeta | null> {
    if (storeId !== DEMO_STORE_ID) return null;
    return readStore() ?? { ...DEFAULT_STORE };
  }

  async updateCatalogMode(
    storeId: string,
    newMode: 'simple' | 'nested'
  ): Promise<ActionResult<StoreMeta>> {
    if (storeId !== DEMO_STORE_ID) {
      return err('NOT_FOUND', 'Tienda no encontrada.');
    }

    const current = readStore() ?? { ...DEFAULT_STORE };

    // nested → simple: delete all subcategories, nullify subcategory_id on products
    if (current.catalog_mode === 'nested' && newMode === 'simple') {
      try {
        localStorage.setItem(SUBCAT_KEY, JSON.stringify([]));

        const rawProds = localStorage.getItem(PROD_KEY);
        if (rawProds) {
          const allProds: Array<{ store_id: string; subcategory_id?: string | null; updated_at: string }> =
            JSON.parse(rawProds);
          const updated = allProds.map((p) => {
            if (p.store_id !== storeId) return p;
            return { ...p, subcategory_id: null, updated_at: new Date().toISOString() };
          });
          localStorage.setItem(PROD_KEY, JSON.stringify(updated));
        }
      } catch {
        return err('DATABASE_ERROR', 'No se pudo completar el cambio de modo de catálogo.');
      }
    }

    const updated: StoreMeta = { ...current, catalog_mode: newMode };
    writeStore(updated);
    return { success: true, data: updated };
  }
}
