// Zod validation schemas for Category and Subcategory inputs.
// Validates server-side before any repository mutation.
// Error codes follow tiendri-rules.md §3.2.

import { z } from 'zod';
import type { CategoryIcon } from '@/types/domain/category';

const CATEGORY_ICONS: readonly CategoryIcon[] = [
  'Smartphone',
  'Watch',
  'Camera',
  'Laptop',
  'Headphones',
  'Tv',
  'Shirt',
  'ShoppingBag',
  'Home',
  'Sofa',
  'Utensils',
  'Car',
  'Bike',
  'Dumbbell',
  'Book',
  'Music',
  'Gamepad2',
  'Baby',
  'Dog',
  'Flower2',
] as const;

/** Slug: lowercase alphanumeric with hyphens, cannot start or end with a hyphen */
const slugSchema = z
  .string()
  .min(2, 'El slug debe tener al menos 2 caracteres')
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    'El slug solo puede contener letras minúsculas, números y guiones, sin empezar ni terminar con guión'
  );

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(60, 'El nombre no puede superar los 60 caracteres'),
  slug: slugSchema,
  description: z
    .string()
    .max(120, 'La descripción no puede superar los 120 caracteres')
    .optional(),
  image: z.string().optional(),
  icon: z.enum(CATEGORY_ICONS as [CategoryIcon, ...CategoryIcon[]], {
    error: 'Seleccioná un ícono válido',
  }),
  sort_order: z.number().int().min(0).optional(),
});

export const updateCategorySchema = categorySchema.partial();

export type CategoryInput = z.infer<typeof categorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const subcategorySchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(60, 'El nombre no puede superar los 60 caracteres'),
  slug: slugSchema,
  category_id: z.string().uuid('category_id debe ser un UUID válido'),
  description: z
    .string()
    .max(120, 'La descripción no puede superar los 120 caracteres')
    .optional(),
  image: z.string().optional(),
  sort_order: z.number().int().min(0).optional(),
});

export const updateSubcategorySchema = subcategorySchema.omit({ category_id: true }).partial();

export type SubcategoryInput = z.infer<typeof subcategorySchema>;
export type UpdateSubcategoryInputZod = z.infer<typeof updateSubcategorySchema>;
