import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import type { HeroVariant } from '@/types/templates/primitives';
import type { HeroLayoutProps } from './types';

const FullBleed = dynamic(() => import('./FullBleed'));
const Contained = dynamic(() => import('./Contained'));
const Split = dynamic(() => import('./Split'));
const TextOnly = dynamic(() => import('./TextOnly'));

export const HERO_REGISTRY: Record<HeroVariant, ComponentType<HeroLayoutProps>> = {
  'full-bleed': FullBleed,
  'contained': Contained,
  'split': Split,
  'text-only': TextOnly,
};

export type { HeroLayoutProps } from './types';
