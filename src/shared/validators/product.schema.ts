// Zod validation schemas for Product inputs.
// Validates server-side before any repository mutation.
// Error codes follow tiendri-rules.md §3.2.

import { z } from 'zod';

/** Slug: lowercase alphanumeric with hyphens, cannot start or end with a hyphen */
const slugSchema = z
  .string()
  .min(2, 'El slug debe tener al menos 2 caracteres')
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    'El slug solo puede contener letras minúsculas, números y guiones, sin empezar ni terminar con guión'
  );

const productImageInputSchema = z.object({
  url: z.string().min(1, 'La URL de la imagen no puede estar vacía'),
  sort_order: z.number().int().min(0),
});

const productVariantInputSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre de la variante no puede estar vacío')
    .max(60, 'El nombre de la variante no puede superar los 60 caracteres'),
  price_modifier: z
    .number()
    .int('El modificador de precio debe ser un número entero'),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(120, 'El nombre no puede superar los 120 caracteres'),
  slug: slugSchema,
  description: z
    .string()
    .max(300, 'La descripción no puede superar los 300 caracteres'),
  price: z
    .number()
    .int('El precio debe ser un número entero')
    .min(0, 'El precio no puede ser negativo'),
  compare_at_price: z
    .number()
    .int('El precio de comparación debe ser un número entero')
    .positive('El precio de comparación debe ser positivo')
    .nullable()
    .optional(),
  category_id: z.string().uuid('Seleccioná una categoría válida'),
  subcategory_id: z.string().uuid('Seleccioná una subcategoría válida').nullable().optional(),
  available: z.boolean().optional(),
  featured: z.boolean().optional(),
  sort_order: z.number().int().min(0).optional(),
  images: z
    .array(productImageInputSchema)
    .max(4, 'El producto puede tener máximo 4 imágenes')
    .optional(),
  variants: z.array(productVariantInputSchema).optional(),
});

export const updateProductSchema = productSchema.partial();

export type ProductInput = z.infer<typeof productSchema>;
export type UpdateProductInputZod = z.infer<typeof updateProductSchema>;
