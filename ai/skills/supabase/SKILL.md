---
name: supabase
description: >
  Patrones para trabajar con Supabase en Tiendri: Server Actions, RLS, Storage, migraciones y auth.
  Trigger: Cuando se trabaje con base de datos, autenticación, storage de archivos o migraciones SQL.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Crear o modificar Server Actions que interactúan con Supabase
- Diseñar o modificar políticas RLS
- Manejar uploads/deletes en Storage
- Escribir migraciones SQL
- Implementar autenticación o middleware de sesión

## Critical Patterns

### Server Action — estructura obligatoria

| Paso | Qué hacer |
|------|-----------|
| 1 | `'use server'` directive |
| 2 | Validar input con Zod |
| 3 | Autenticar con `getUser()` (NUNCA `getSession()`) |
| 4 | Verificar ownership (`store.user_id = auth.uid()`) |
| 5 | Ejecutar operación en DB |
| 6 | Retornar `ActionResult<T>` estándar |

Ver template completo en [assets/server-action.ts](assets/server-action.ts).

### RLS — 3 patrones base

| Patrón | Cuándo usar | Policy check |
|--------|-------------|--------------|
| **Owner** | profiles, stores | `auth.uid() = user_id` |
| **Child (privado)** | categories, products en dashboard | `EXISTS (SELECT 1 FROM stores WHERE id = store_id AND user_id = auth.uid())` |
| **Child (público)** | storefront anónimo | `EXISTS (SELECT 1 FROM stores WHERE id = store_id AND onboarding_completed = true)` |

Regla: tabla sin RLS = agujero de seguridad. Ver [assets/rls-policies.sql](assets/rls-policies.sql).

### Storage — convención de paths

```
{bucket}/{store_id}/{entity_id}/{sort_order}.webp
```

| Bucket | Ratio | Contenido |
|--------|-------|-----------|
| logos | 1:1 | Logo de tienda |
| banners | 3:1 | Banner de tienda |
| products | libre | Imágenes de productos (max 4) |
| categories | libre | Imágenes de categorías |

Upload: validar tipo + tamaño (5MB) → comprimir (800px, 0.7, WebP) → subir → guardar URL.
Delete: limpiar Storage ANTES de eliminar registro en DB. Best-effort.

### Migraciones — convenciones

| Convención | Regla |
|------------|-------|
| Naming | `001_create_{table}.sql` secuencial |
| PK | `id UUID DEFAULT gen_random_uuid()` |
| FK | `{table}_id` (ej: `store_id`) |
| Timestamps | `created_at TIMESTAMPTZ DEFAULT now()` + `updated_at` |
| Orden | `sort_order INTEGER DEFAULT 0` |
| Strings | SIEMPRE `CHECK (char_length(trim(name)) >= 2)` |

Ver template en [assets/migration-template.sql](assets/migration-template.sql).

### Auth — decisiones clave

| Decisión | Regla |
|----------|-------|
| Verificar sesión | `getUser()` NUNCA `getSession()` |
| Service role key | SOLO en Server Actions, NUNCA en frontend |
| Middleware | Protege `/dashboard/*`, redirige `/auth/*` si hay sesión |
| Métodos MVP | Email/password + Google OAuth |
| createClient | Server → `createServerClient`, Client → `createBrowserClient` |

### Respuesta estándar

```typescript
type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: { code: ErrorCode; message: string; field?: string } }
```

## Commands

```bash
# Generar tipos de Supabase
pnpm dlx supabase gen types typescript --project-id <id> > src/lib/supabase/database.types.ts

# Crear nueva migración
pnpm dlx supabase migration new <nombre>

# Aplicar migraciones locales
pnpm dlx supabase db push

# Reset DB local
pnpm dlx supabase db reset
```

## Resources

- **Templates**: Ver [assets/](assets/) para Server Action, RLS policies, migration template
- **Documentación**: Ver [references/](references/) para docs técnicos del proyecto
