"use client";

// _core/shells/StoreInfoShell.tsx
// Client boundary para la ruta de información de la tienda.
// No gestiona estado propio más allá de la navegación.

import { useCallback } from "react";
import { StoreInfoPage } from "@/templates/_shared/StoreInfoPage";
import { useTemplateNav } from "@/templates/_shared/hooks/useTemplateNav";
import type { StoreInfo } from "@/types/domain/store";
import type { ResolvedStoreConfig } from "@/types/templates/resolved-config";
import type { TemplateVariants } from "@/types/templates/manifest";

export interface StoreInfoShellProps {
  store: StoreInfo;
  config: ResolvedStoreConfig;
  variants: TemplateVariants;
}

export function StoreInfoShell({
  store,
}: StoreInfoShellProps) {
  const nav = useTemplateNav();

  const handleBack = useCallback(() => nav.goHome(), [nav]);

  return (
    <StoreInfoPage
      store={store}
      header={null}
      onBack={handleBack}
    />
  );
}
