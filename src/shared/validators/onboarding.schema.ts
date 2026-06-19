import { z } from 'zod'

export const step1Schema = z.object({
  storeName: z
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres'),
  whatsapp: z
    .string()
    .regex(/^3\d{9}$/, 'Ingresá un número colombiano válido (10 dígitos)'),
  slug: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
})

export const step2Schema = z.object({
  catalogMode: z.enum(['simple', 'nested']),
})

export const step3Schema = z.object({
  selectedVibe: z.enum(['elegante', 'moderno', 'energetico', 'calido', 'catalogo']),
})

export const step4Schema = z.object({})

export const step5Schema = z.object({
  accentColor: z
    .enum([
      'rojo',
      'naranja',
      'amarillo',
      'verde',
      'turquesa',
      'azul',
      'violeta',
      'rosa',
      'negro',
      'gris',
      'blanco',
      'cafe',
    ])
    .optional(),
  logoUrl: z.string().url().optional().nullable(),
})

export type Step1Input = z.infer<typeof step1Schema>
export type Step2Input = z.infer<typeof step2Schema>
export type Step3Input = z.infer<typeof step3Schema>
export type Step4Input = z.infer<typeof step4Schema>
export type Step5Input = z.infer<typeof step5Schema>
