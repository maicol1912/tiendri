'use client';

import { formatPrice } from '@/shared/format';
import type { StorefrontVariantGroup } from '@/types/domain/store';
import { cn } from '@/shared/utils';

interface VariantPriceSelectorProps {
  group: StorefrontVariantGroup;
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  currencySymbol?: string;
  className?: string;
}

export function VariantPriceSelector({
  group,
  selectedOptionId,
  onSelect,
  currencySymbol = '$',
  className,
}: VariantPriceSelectorProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <label className="text-sm font-medium">{group.label}</label>
      <div className="flex flex-wrap gap-2">
        {group.options.map((option) => {
          const isSelected = option.id === selectedOptionId;
          const isUnavailable = option.available === false;
          const modifierLabel = option.priceModifier && option.priceModifier > 0
            ? ` (+${formatPrice(option.priceModifier, currencySymbol)})`
            : option.priceModifier && option.priceModifier < 0
              ? ` (-${formatPrice(Math.abs(option.priceModifier), currencySymbol)})`
              : '';

          if (group.type === 'color' && option.value) {
            return (
              <button
                key={option.id}
                type="button"
                disabled={isUnavailable}
                onClick={() => onSelect(option.id)}
                className={cn(
                  'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all',
                  isSelected && 'border-current ring-2 ring-current/20',
                  !isSelected && !isUnavailable && 'border-gray-200 hover:border-gray-400',
                  isUnavailable && 'cursor-not-allowed opacity-40'
                )}
                title={`${option.label}${modifierLabel}`}
              >
                <span
                  className="inline-block h-5 w-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: option.value }}
                />
                <span>{option.label}{modifierLabel}</span>
              </button>
            );
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={isUnavailable}
              onClick={() => onSelect(option.id)}
              className={cn(
                'rounded-lg border px-4 py-2 text-sm transition-all',
                isSelected && 'border-current bg-current/5 font-medium ring-2 ring-current/20',
                !isSelected && !isUnavailable && 'border-gray-200 hover:border-gray-400',
                isUnavailable && 'cursor-not-allowed opacity-40 line-through'
              )}
            >
              {option.label}{modifierLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
