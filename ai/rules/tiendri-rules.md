# TIENDRI — Reglas del Equipo

> Todo agente que trabaje en este proyecto DEBE leer este archivo antes de escribir una sola línea de código.
> Estas son restricciones y convenciones, no sugerencias.

---

## 1. REGLAS DE NEGOCIO

### 1.1 Multi-tenancy

- **1 usuario = 1 tienda** en MVP. Nunca crear más de una tienda por usuario.
- Toda query DEBE filtrar por `store_id` y/o `user_id`. Sin excepción.
- RLS garantiza el aislamiento a nivel de base de datos — el código de aplicación también valida ownership.
- `store.slug` es globalmente único en toda la plataforma.
- Una tienda solo es visible públicamente cuando `onboarding_completed = true`.
- URL pública de toda tienda: `tiendri.com/{slug}`.

### 1.2 Modos de catálogo

| Modo | Comportamiento |
|---|---|
| `simple` | Productos se asignan directamente a categorías. Sin subcategorías. |
| `nested` | Productos se asignan a subcategorías dentro de categorías. |

- Solo se pueden crear subcategorías si `catalog_mode = 'nested'`.
- Si el modo es `nested`, `subcategory_id` es **obligatorio** en productos.
- Cambio `nested → simple`: eliminar TODAS las subcategorías y poner `subcategory_id = NULL`. Hacerlo en una transacción.
- Cambio `simple → nested`: solo cambia el flag, no elimina nada.

### 1.3 Precios

- El sistema es **multimoneda**. Nunca asumir que los precios son en COP.
- Precios almacenados como `INTEGER` en la base de datos.
- La moneda se define a nivel de tienda.
- El formato de display sigue el locale del negocio.

### 1.4 WhatsApp

- El número de teléfono se almacena como string de dígitos con prefijo de país (ej: `573001234567`).
- Los pedidos se generan via `wa.me/{phone}?text={encoded}`.
- El mensaje debe incluir: productos, cantidades, variantes, total y datos del cliente.
- El footer del mensaje siempre lleva: `"Pedido desde tiendri.com/{slug}"`.

### 1.5 Imágenes

- Máximo **4 imágenes por producto**.
- Tamaño máximo por archivo: **5MB**.
- Formato prioritario: **WebP** (30-50% más liviano que JPEG).
- Compresión: máximo 800px de ancho, calidad 0.7.
- Path en Storage: `{bucket}/{store_id}/{entity_id}/{sort_order}.webp`.
- Buckets disponibles: `logos`, `banners`, `products`, `categories`.
- Al eliminar cualquier entidad, siempre limpiar sus archivos de Storage (best-effort — no bloquea si falla).

### 1.6 Límites del sistema

Estos límites se validan **en el servidor**, no solo en el cliente.

| Recurso | Límite |
|---|---|
| Tiendas por usuario | 1 (MVP) |
| Categorías por tienda | 50 |
| Subcategorías por categoría | 20 |
| Productos por tienda | 1000 |
| Imágenes por producto | 4 |
| Tamaño máximo de imagen | 5MB |

### 1.7 Validaciones de dominio

| Campo | Regla |
|---|---|
| Nombre de tienda | `trim().length >= 2` |
| Slug | Regex `^[a-z0-9][a-z0-9-]*[a-z0-9]$`, longitud >= 2, único global |
| WhatsApp | String de dígitos con prefijo de país |
| Descripción de tienda | Máximo 120 caracteres |
| Nombre de producto | Mínimo 2 caracteres |
| Precio | `INTEGER >= 0` |
| Compare at price | Positivo o `NULL` |
| Descripción de producto | Máximo 300 caracteres |

### 1.8 Cascadas al eliminar

- **Categoría**: CASCADE subcategorías → productos → imágenes → variantes + cleanup Storage.
- **Subcategoría**: el usuario elige mover los productos a otra subcategoría O eliminar los huérfanos.
- **Tienda**: cascade total + cleanup Storage en todos los buckets.
- **Producto**: limpiar imágenes de Storage **antes** del DELETE.

### 1.9 Carrito

- El carrito es del visitante anónimo — se almacena en `localStorage`.
- Clave: `tc_cart_{slug}`.
- Estructura de cada item: `{ productId, variantName: string | null, quantity }`.
- El carrito **nunca** se persiste en la base de datos.

### 1.10 Planes (MVP)

| Plan | Precio | Productos | Extras |
|---|---|---|---|
| Gratis | $0 | Hasta 20 | Templates, pedidos, QR |
| Pro | ~$49.900 COP/mes | Ilimitados | Stats, historial |
| Negocio | ~$99.900 COP/mes | Ilimitados | Todo Pro + multi-tienda, dominio custom |

- Sin comisiones por venta en ningún plan.
- En MVP, **solo el plan Gratis es funcional**. Los demás se muestran pero no se procesan.

---

## 2. CONVENCIONES DE CÓDIGO

### 2.1 TypeScript

- Strict mode **siempre**. Nunca usar `any`.
- Tipos explícitos para todo el dominio — no inferir en interfaces públicas.
- Preferir `interface` para objetos. Preferir `type` para unions y utilidades.
- Los nombres de variables y funciones se entienden solos, sin leer el contexto.
- Funciones cortas, responsabilidad única.
- No escribir comentarios salvo que el WHY no sea obvio por el código.

### 2.2 Archivos y nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Archivos | kebab-case | `product-card.tsx`, `create-store.ts` |
| Componentes React | PascalCase | `ProductCard` |
| Hooks | camelCase con prefijo `use` | `useStoreActions` |
| Server Actions | camelCase verbo + sustantivo | `createProduct`, `updateCategory` |
| Tipos e interfaces | PascalCase | `Store`, `Product`, `CartItem` |

### 2.3 Imports

- Imports absolutos sobre relativos cuando sea posible.
- Orden de agrupación: 1) externos, 2) internos, 3) tipos.
- No usar barrel exports (`index.ts`) salvo en módulos públicos explícitos.

### 2.4 Git

- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`.
- Ramas: `develop` para trabajo diario, `main` para producción.
- Push a `main` = deploy automático en Vercel.
- **Nunca** force push. **Nunca** skip hooks.

---

## 3. MANEJO DE ERRORES

### 3.1 Patrón de respuesta estándar (Server Actions)

```typescript
// Éxito
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string, field?: string } }
```

- `field` es opcional. Usarlo solo cuando el error corresponde a un campo específico del formulario.

### 3.2 Códigos de error

Usar **solo** los siguientes códigos. No inventar nuevos sin documentarlos aquí primero.

| Código | Significado |
|---|---|
| `UNAUTHORIZED` | No hay sesión activa |
| `FORBIDDEN` | Sesión activa pero sin permisos sobre el recurso |
| `NOT_FOUND` | El recurso no existe |
| `VALIDATION_ERROR` | El input no pasa validación |
| `SLUG_TAKEN` | El slug ya existe en otra tienda |
| `MAX_STORES_REACHED` | Se alcanzó el límite de tiendas |
| `MAX_IMAGES_REACHED` | Se alcanzó el límite de imágenes por producto |
| `INVALID_MODE` | Operación no válida para el modo de catálogo actual |
| `FILE_TOO_LARGE` | La imagen supera el tamaño máximo |
| `INVALID_FILE_TYPE` | Tipo de archivo no soportado |
| `STORAGE_ERROR` | Error al subir o eliminar un archivo |
| `DATABASE_ERROR` | Error genérico de base de datos |
| `RATE_LIMITED` | Demasiadas requests |

### 3.3 Reglas de errores

- Siempre usar un código del listado anterior.
- Siempre incluir un `message` legible para el usuario.
- **Nunca** exponer stack traces, queries SQL ni detalles internos en el error response.

---

## 4. SEGURIDAD

### 4.1 Autenticación

- Usar `getUser()`. **Nunca** `getSession()` — `getUser()` protege contra spoofing.
- El middleware protege `/dashboard/*` → redirect a `/auth/login` si no hay sesión.
- El middleware redirige `/auth/*` → `/dashboard` si ya hay sesión activa.
- `SUPABASE_SERVICE_ROLE_KEY` **nunca** en el frontend. Solo en Server Actions.

### 4.2 Autorización

- Cada Server Action verifica `store.user_id = auth.uid()` antes de cualquier mutación.
- **Nunca** confiar en el input del cliente para determinar ownership.
- RLS activo como primera línea de defensa en **todas** las tablas.
- Usuarios anónimos solo pueden: `SELECT` en tiendas con `onboarding_completed = true` e `INSERT` en orders.

### 4.3 Rate Limiting

| Tipo | Límite | Ventana | Key |
|---|---|---|---|
| Auth | 5 req | 1 min | por IP |
| Public read | 30 req | 1 min | por IP |
| Write operations | 20 req | 1 min | por userId |
| Image uploads | 10 req | 1 min | por userId |
| Slug check | 20 req | 1 min | por IP |

### 4.4 Validación de inputs

- Todo input del cliente se valida con **Zod en el servidor** antes de tocar la DB.
- Sanitizar strings: `trim()` y limitar longitud según las reglas de dominio.
- **Nunca** construir queries con string interpolation.
- File uploads: validar tipo MIME + extensión + tamaño antes de procesar.

### 4.5 Datos sensibles

- **Nunca** loguear passwords, tokens ni API keys.
- **Nunca** exponer IDs internos de Supabase en URLs públicas — usar slugs.
- Todos los secrets van en variables de entorno. **Nunca** hardcodeados.

---

## 5. BRANDING Y ASSETS VISUALES

### 5.1 Logo — Reglas de uso (OBLIGATORIO)

**Archivo correcto:**
- El logo para fondos oscuros es `public/images/logo-dark.png` — este es el logo PRIMARIO para toda la aplicación, ya que usamos Ember Core (dark theme) en todas partes.
- **NUNCA** usar `logo.png` (tiene el fondo negro/oscuro integrado en la imagen). Siempre usar `logo-dark.png`, que tiene fondo transparente con texto blanco y acentos rojos.

**Tamaño mínimo:**
- Mobile: **120px de ancho mínimo**
- Desktop: **160px de ancho mínimo**
- No hacer el logo pequeño ni poco visible. Es la identidad de marca y debe ser reconocible de inmediato.

**Espaciado:**
- Siempre dejar un padding mínimo de **16px en todos los lados** alrededor del logo.

**Posición:**
- El logo va en la parte SUPERIOR de cualquier página o flujo donde aparezca — es lo primero que ve el usuario.

**Resumen rápido para agentes:**

| Regla | Valor |
|---|---|
| Archivo a usar | `public/images/logo-dark.png` |
| Archivo PROHIBIDO | `public/images/logo.png` |
| Ancho mínimo mobile | `120px` |
| Ancho mínimo desktop | `160px` |
| Padding mínimo | `16px` en todos los lados |
| Posición | TOP de la página o flujo |

---

## 6. COMPORTAMIENTO UX / COMPONENTES

### 6.1 Carruseles horizontales

Todo carrusel horizontal DEBE responder al scroll vertical del mouse (wheel event), traduciendo `deltaY` a desplazamiento horizontal. El usuario no debería necesitar hacer click-drag — la rueda del mouse es suficiente.

#### Implementación correcta

```tsx
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const el = ref.current;
  if (!el) return;

  const handler = (e: WheelEvent) => {
    e.preventDefault();
    el.scrollLeft += e.deltaY * 2.5; // multiplicador obligatorio — ver regla de multiplier abajo
  };

  // { passive: false } ES OBLIGATORIO para que preventDefault() funcione
  el.addEventListener('wheel', handler, { passive: false });
  return () => el.removeEventListener('wheel', handler);
}, []);
```

```tsx
// Container del carrusel
<div
  ref={ref}
  className="flex overflow-x-auto gap-4"
  // NO usar onWheel de React — en algunos browsers es pasivo
>
  {items.map(item => (
    // flex-shrink-0 ES OBLIGATORIO — sin esto los cards se comprimen y no hay scroll
    <div key={item.id} className="flex-shrink-0 w-[280px]">
      {/* contenido */}
    </div>
  ))}
</div>
```

#### Reglas obligatorias (NUNCA violar)

**1. PROHIBIDO: CSS scroll snap en carruseles con wheel handler**
- `snap-x`, `snap-mandatory`, `snap-proximity`, `snap-center` — NINGUNA de estas clases.
- El snap CSS pelea con el wheel handler: si el `deltaY` amplificado no supera el umbral del snap, el navegador devuelve el scroll a la posición anterior. El resultado es un carrusel que "rebota" y no avanza.
- Si se quiere efecto de snap, implementarlo en JavaScript (detectar card más cercana al soltar) — nunca con CSS.

**2. Multiplicador de deltaY: usar 2.5x**
- El `deltaY` de un tick de rueda del mouse es tipicamente ~100px. Los cards miden 240-300px.
- Sin amplificación, el usuario necesita múltiples rotaciones de rueda para moverse una card.
- Valor correcto: `scrollLeft += deltaY * 2.5` (mueve ~250px por tick, aproximadamente 1 card).
- Ajustar entre 2x-3x según el ancho de los cards del componente específico.

**3. `overflow-x-auto`, no `overflow-x-scroll`**
- `auto`: muestra scrollbar solo cuando el contenido supera el ancho del container.
- `scroll`: siempre reserva espacio para el scrollbar aunque no haya overflow — genera layout shift y scrollbar feo en Windows.
- Usar siempre `overflow-x-auto`.

**4. Listener no-pasivo: `{ passive: false }` es OBLIGATORIO**
- Sin este flag, `preventDefault()` no tiene efecto — el navegador igualmente hace scroll de la página.
- `onWheel` de React es pasivo en algunos navegadores modernos; NO confiar en él para esta funcionalidad.
- Siempre registrar el listener directamente via `addEventListener` con `{ passive: false }`.

**5. `flex-shrink-0` en cada card**
- Sin esta clase, flexbox comprime todos los cards para que quepan en el ancho del container.
- Resultado: no hay overflow, no hay scroll, todos los cards se ven aplastados.
- SIEMPRE poner `flex-shrink-0` (o `shrink-0` en Tailwind) en el elemento card directo.

**6. Glassmorphism: separar el `backdrop-filter` del scroll container**
- Si el carrusel vive dentro de una card con `backdrop-filter: blur()`, el backdrop crea un contexto de clipping implícito que puede cortar el contenido del scroll.
- Solución: separar el efecto visual en su propia capa absolutamente posicionada, independiente del scroll container.

```tsx
// MAL: backdrop en el mismo elemento que hace scroll
<div className="backdrop-blur-md overflow-x-auto flex ...">

// BIEN: backdrop en capa separada
<div className="relative">
  {/* capa visual — no interfiere con el scroll */}
  <div className="absolute inset-0 backdrop-blur-md rounded-xl" aria-hidden />
  {/* scroll container — sin backdrop */}
  <div ref={ref} className="relative flex overflow-x-auto gap-4">
    ...
  </div>
</div>
```

#### Touch/mobile

El swipe horizontal nativo del browser es suficiente en touch. No se necesita traducción de eventos. El wheel handler solo aplica a dispositivos con mouse.

#### Aplica a

TODOS los carruseles de la app sin excepción: landing, onboarding, dashboard, storefront.
