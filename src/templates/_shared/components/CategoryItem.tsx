'use client';

import { Tag, Smartphone, Watch, Camera, Headphones, Monitor, Gamepad2, Shirt, ShoppingBag, Sofa, Lamp, Bed, Armchair, Frame, Flower2, Sparkles, Heart, Star, Pizza, UtensilsCrossed, Drumstick, Leaf, Package, Wine, Coffee, Paintbrush, Scissors, Gift, Crown, Gem, Home, Grid3X3, Tv, Tablet, Bluetooth, Wifi, Zap, Car, Bike, Book, Baby, Dumbbell, Utensils, IceCream, Sandwich, Apple, Salad, GlassWater } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Smartphone, Phone: Smartphone, Watch, Camera, Headphones, Monitor, Computer: Monitor,
  Gamepad2, Gaming: Gamepad2, Shirt, ShoppingBag, Bag: ShoppingBag, Sofa, Lamp, Bed,
  Armchair, Chair: Armchair, Frame, Flower: Flower2, Flower2, Sparkles, Heart, Star,
  Pizza, UtensilsCrossed, Drumstick, Leaf, Vegan: Leaf, Package, Wine, Coffee,
  Paintbrush, Brush: Paintbrush, Scissors, Gift, Crown, Gem, Home, Grid3X3, Tv,
  Tablet, Bluetooth, Wifi, Zap, Car, Bike, Book, Baby, Dumbbell, Utensils,
  IceCream, Sandwich, Apple, Salad, GlassWater, Drink: GlassWater,
  Tag, Combo: Package,
};

export type CategoryDisplayType = 'text-only' | 'icon-text' | 'image-text';

interface CategoryItemProps {
  name: string;
  icon?: string;
  image?: string;
  productCount?: number;
  isActive: boolean;
  onClick: () => void;
  displayType: CategoryDisplayType;
  className?: string;
}

export function CategoryItem({
  name,
  icon,
  image,
  productCount,
  isActive,
  onClick,
  displayType,
  className = '',
}: CategoryItemProps) {
  const IconComponent = icon ? (ICON_MAP[icon] ?? Tag) : Tag;

  const baseStyle: React.CSSProperties = {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    background: 'none',
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.375rem',
  };

  if (displayType === 'text-only') {
    return (
      <button
        onClick={onClick}
        className={className}
        style={{
          ...baseStyle,
          flexDirection: 'row',
          gap: '0.375rem',
          padding: '0.375rem 0.875rem',
          borderRadius: 'var(--t-radius-category, 9999px)',
          backgroundColor: isActive ? 'var(--t-primary)' : 'var(--t-card)',
          color: isActive ? 'var(--t-on-primary)' : 'var(--t-foreground)',
          border: `1px solid ${isActive ? 'var(--t-primary)' : 'var(--t-border)'}`,
          fontSize: '0.875rem',
          fontWeight: isActive ? 600 : 400,
          whiteSpace: 'nowrap',
        }}
      >
        <span>{name}</span>
        {productCount !== undefined && (
          <span style={{
            fontSize: '0.75rem',
            opacity: 0.7,
            backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--t-muted)',
            color: isActive ? 'var(--t-on-primary)' : 'var(--t-muted-foreground, var(--t-foreground))',
            padding: '0 0.375rem',
            borderRadius: '9999px',
          }}>
            {productCount}
          </span>
        )}
      </button>
    );
  }

  if (displayType === 'icon-text') {
    return (
      <button
        onClick={onClick}
        className={className}
        style={{
          ...baseStyle,
          padding: '0.625rem 0.75rem',
          borderRadius: 'var(--t-radius-category, 0.75rem)',
          backgroundColor: isActive ? 'var(--t-primary)' : 'var(--t-card)',
          color: isActive ? 'var(--t-on-primary)' : 'var(--t-foreground)',
          border: `1px solid ${isActive ? 'var(--t-primary)' : 'var(--t-border)'}`,
          minWidth: '5rem',
        }}
      >
        <IconComponent
          size={22}
          style={{ color: isActive ? 'var(--t-on-primary)' : 'var(--t-primary)' }}
        />
        <span style={{ fontSize: '0.75rem', fontWeight: isActive ? 600 : 400, textAlign: 'center' }}>
          {name}
        </span>
        {productCount !== undefined && (
          <span style={{ fontSize: '0.625rem', opacity: 0.7 }}>{productCount}</span>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        ...baseStyle,
        padding: '0.5rem',
        borderRadius: 'var(--t-radius-category, 0.75rem)',
        backgroundColor: isActive ? 'color-mix(in srgb, var(--t-primary) 10%, transparent)' : 'transparent',
        border: `2px solid ${isActive ? 'var(--t-primary)' : 'transparent'}`,
        minWidth: '4.5rem',
      }}
    >
      <div style={{
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: 'var(--t-muted, var(--t-card))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {image ? (
          <img
            src={image}
            alt={name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <Tag size={20} style={{ color: 'var(--t-primary)' }} />
        )}
      </div>
      <span style={{
        fontSize: '0.75rem',
        fontWeight: isActive ? 600 : 400,
        color: isActive ? 'var(--t-primary)' : 'var(--t-foreground)',
        textAlign: 'center',
        maxWidth: '5rem',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {name}
      </span>
      {productCount !== undefined && (
        <span style={{ fontSize: '0.625rem', opacity: 0.6, color: 'var(--t-foreground)' }}>
          {productCount}
        </span>
      )}
    </button>
  );
}
