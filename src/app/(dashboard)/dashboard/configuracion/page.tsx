'use client';

// /dashboard/configuracion — Client Component
// Reads initial customization from localStorage (no Supabase dependency).
// Persistence: localStorage key `tiendri_demo-store_customization`

import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ConfiguracionClient } from './configuracion-client';
import type { StoreCustomization } from '@/types/templates/store-customization';

const STORAGE_KEY = 'tiendri_demo-store_customization';

function loadCustomization(): StoreCustomization {
  if (typeof window === 'undefined') {
    return { templateId: 'tech-premium' };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as StoreCustomization;
    }
  } catch {
    // Corrupted data — start fresh
  }
  return { templateId: 'tech-premium' };
}

export default function ConfiguracionPage() {
  const [customization, setCustomization] = useState<StoreCustomization | null>(null);

  useEffect(() => {
    setCustomization(loadCustomization());
  }, []);

  if (!customization) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const storeName = customization.branding?.storeName ?? 'Mi tienda';

  return (
    <ConfiguracionClient
      storeName={storeName}
      initialCustomization={customization}
    />
  );
}
