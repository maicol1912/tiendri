// Zod v4 validation schemas for product groups configuration.
// All schemas validate server-side before any Supabase mutation.
// Error codes follow tiendri-rules.md §3.2.

import { z } from "zod";

export const productGroupBannerSchema = z.object({
  url: z
    .string()
    .min(1, "La URL de la imagen es obligatoria")
    .url("Debe ser una URL válida"),
  alt: z
    .string()
    .max(120, "El texto alternativo no puede superar los 120 caracteres")
    .optional(),
  aspectRatio: z.enum(["wide", "standard"]).optional(),
});

export const productGroupLayoutSchema = z.object({
  columnsMobile: z.union([z.literal(1), z.literal(2)]).optional(),
  columnsDesktop: z
    .union([z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
    .optional(),
  productsLimit: z
    .number()
    .int("El límite debe ser un número entero")
    .min(1, "El mínimo es 1 producto")
    .max(100, "El máximo es 100 productos")
    .optional(),
});

export const productGroupSchema = z.object({
  id: z.string().uuid("El id del grupo debe ser un UUID válido"),
  name: z
    .string()
    .min(1, "El nombre del grupo es obligatorio")
    .max(60, "El nombre no puede superar los 60 caracteres"),
  productIds: z.array(
    z.string().uuid("Cada producto debe tener un UUID válido")
  ),
  banner: productGroupBannerSchema.optional(),
  layout: productGroupLayoutSchema.optional(),
  sortOrder: z
    .number()
    .int("El orden debe ser un número entero")
    .min(0, "El orden mínimo es 0"),
});

export const productGroupDisplayModeSchema = z.enum(["tabs", "stacked"]);

export const productGroupsConfigSchema = z.object({
  displayMode: productGroupDisplayModeSchema,
  groups: z.array(productGroupSchema),
});

export type ProductGroupInput = z.infer<typeof productGroupSchema>;
export type ProductGroupsConfigInput = z.infer<typeof productGroupsConfigSchema>;
