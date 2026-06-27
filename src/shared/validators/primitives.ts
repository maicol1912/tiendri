import { z } from 'zod'

export const slugSchema = z
  .string()
  .min(2, 'El slug debe tener al menos 2 caracteres')
  .max(60, 'El slug no puede superar los 60 caracteres')
  .regex(
    /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
    'El slug solo puede contener letras minúsculas, números y guiones, y no puede empezar o terminar con guión'
  )

export const imageField = z.string().nullable().optional()

export const storageUrl = z
  .string()
  .refine(
    (val) =>
      val === '' ||
      val.startsWith('https://') ||
      val.startsWith('http://') ||
      val.startsWith('media_') ||
      val.startsWith('/'),
    'Debe ser una URL válida o un ID de media library'
  )
  .nullable()
  .optional()

export const whatsappSchema = z
  .string()
  .regex(/^3\d{9}$/, 'El número debe ser un celular colombiano válido (10 dígitos, empieza con 3)')

export const whatsappInternationalSchema = z
  .string()
  .regex(/^57\d{10}$/, 'El número debe incluir el código de país (57) seguido de 10 dígitos')
