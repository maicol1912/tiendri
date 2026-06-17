'use client';

import { useMemo, useState, useCallback } from 'react';
import type { StorefrontVariantGroup, StorefrontVariantOption } from '@/types/store';

export interface VariantSelection {
  [groupId: string]: string;
}

export interface UseVariantPriceReturn {
  selectedVariants: VariantSelection;
  selectVariant: (groupId: string, optionId: string) => void;
  effectivePrice: number;
  totalModifier: number;
  getSelectedOption: (groupId: string) => StorefrontVariantOption | undefined;
  variantName: string | null;
}

export function useVariantPrice(
  basePrice: number,
  variantGroups?: StorefrontVariantGroup[]
): UseVariantPriceReturn {
  const [selectedVariants, setSelectedVariants] = useState<VariantSelection>(() => {
    if (!variantGroups?.length) return {};
    const initial: VariantSelection = {};
    for (const group of variantGroups) {
      const firstAvailable = group.options.find(o => o.available !== false);
      if (firstAvailable) {
        initial[group.id] = firstAvailable.id;
      }
    }
    return initial;
  });

  const selectVariant = useCallback((groupId: string, optionId: string) => {
    setSelectedVariants(prev => ({ ...prev, [groupId]: optionId }));
  }, []);

  const totalModifier = useMemo(() => {
    if (!variantGroups?.length) return 0;
    let modifier = 0;
    for (const group of variantGroups) {
      const selectedId = selectedVariants[group.id];
      if (selectedId) {
        const option = group.options.find(o => o.id === selectedId);
        if (option?.priceModifier) {
          modifier += option.priceModifier;
        }
      }
    }
    return modifier;
  }, [variantGroups, selectedVariants]);

  const effectivePrice = useMemo(() => basePrice + totalModifier, [basePrice, totalModifier]);

  const getSelectedOption = useCallback((groupId: string): StorefrontVariantOption | undefined => {
    if (!variantGroups) return undefined;
    const group = variantGroups.find(g => g.id === groupId);
    if (!group) return undefined;
    return group.options.find(o => o.id === selectedVariants[group.id]);
  }, [variantGroups, selectedVariants]);

  const variantName = useMemo(() => {
    if (!variantGroups?.length) return null;
    const parts: string[] = [];
    for (const group of variantGroups) {
      const selectedId = selectedVariants[group.id];
      if (selectedId) {
        const option = group.options.find(o => o.id === selectedId);
        if (option) {
          parts.push(option.label);
        }
      }
    }
    return parts.length > 0 ? parts.join(' / ') : null;
  }, [variantGroups, selectedVariants]);

  return {
    selectedVariants,
    selectVariant,
    effectivePrice,
    totalModifier,
    getSelectedOption,
    variantName,
  };
}
