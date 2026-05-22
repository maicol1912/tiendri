# TIENDRI — Documento de Alcance MVP

> Documento de referencia para implementación. Versión inicial — Abril 2026.
> Este archivo es la fuente de verdad para decisiones de producto, reglas de negocio y flujos UX del MVP.

---

## Tabla de contenidos

1. [Qué está en el MVP](#1-qué-está-en-el-mvp)
2. [Qué queda fuera del MVP](#2-qué-queda-fuera-del-mvp)
3. [Reglas de negocio y validaciones](#3-reglas-de-negocio-y-validaciones)
4. [Flujos UX](#4-flujos-ux)
5. [Planes y precios](#5-planes-y-precios)

---

## 1. Qué está en el MVP

### 1.1 Landing page

- Página principal que explica qué es Tiendri y dirige al registro.
- Máximo 4-5 secciones limpias y enfocadas.
- CTA principal visible: "Crear mi tienda gratis".
- Sin sobrecargar con contenido — claridad sobre cantidad.

### 1.2 Autenticación

- Registro e inicio de sesión con email + contraseña.
- OAuth con Google.
- **Fuera del MVP:** magic link.

### 1.3 Wizard de onboarding

El usuario debe poder completar el onboarding en **menos de 5 minutos**. Son 5 pasos secuenciales:

| Paso | Contenido |
|------|-----------|
| 1 | Nombre de la tienda + slug (con verificación de disponibilidad debounced) |
| 2 | Número de WhatsApp (12 dígitos: prefijo 57 + 10 dígitos) |
| 3 | Selección de modo de catálogo: **simple** o **anidado** |
| 4 | Selección de plantilla |
| 5 | Branding: color primario, color secundario, logo, banner |

**Al completar:**

- Se muestra una pantalla de celebración.
- La tienda se crea en Supabase al finalizar el último paso.
- El logo y el banner se suben a Storage en paralelo (no secuencialmente).

### 1.4 Dashboard

#### Categorías
- CRUD completo: crear, leer, actualizar, eliminar.
- Campos: nombre, ícono, imagen, descripción.
- Reordenamiento mediante drag & drop.

#### Subcategorías
- CRUD completo, disponible **únicamente** si el modo de catálogo es `nested`.

#### Productos
- CRUD completo.
- Campos: nombre, precio, precio de comparación (tachado), imágenes (hasta 4), variantes con modificador de precio, toggle de disponibilidad, toggle de destacado.

#### Configuración de la tienda
- Nombre, slug, número de WhatsApp, tema visual, enlaces de redes sociales.
- Generación de link compartible + código QR.

**Fuera del MVP:** analytics, historial de pedidos, marcas, editor de secciones personalizadas, multi-tienda.

### 1.5 Storefront público (`tiendri.com/{slug}`)

- Renderizado SSR mediante `getPublicStorefront()` RPC (un solo round-trip a la base de datos).
- Renderizado basado en plantillas.
- Filtro por categoría y subcategoría.
- Búsqueda en tiempo real (nombre + descripción, insensible a mayúsculas/minúsculas).
- Carrito de compras persistido en localStorage, con clave `tc_cart_{slug}` por tienda.
- Vista de detalle de producto con galería de imágenes y selección de variante.
- Formulario de checkout: nombre, WhatsApp, email, dirección, notas.
- Pedido enviado por WhatsApp mediante `wa.me/{phone}?text={encoded}`.
- SEO básico: `generateMetadata`, OG tags, Twitter cards.

**Fuera del MVP:** favoritos, PWA, filtros avanzados (rango de precios, marcas), paginación.

### 1.6 Plantillas

- 3 o 4 plantillas nuevas, bien diferenciadas entre sí (no las del repositorio anterior).
- Alto grado de personalización dentro de cada plantilla.
- Cada plantilla define: `cardStyle`, `headerStyle`, `navStyle`, `imageRatio`, `hoverEffect`, `gridCols`.
- **13 propiedades CSS custom** por plantilla.
- Opciones de personalización:
  - Color primario y secundario.
  - Par tipográfico: moderno / cálido / elegante / funcional.
  - Radio de borde: sharp / rounded / pill.
  - Apariencia: light / dark.

---

## 2. Qué queda fuera del MVP

Estas funcionalidades están identificadas para fases posteriores. Pueden estar mencionadas en la interfaz (por ejemplo, en la página de precios), pero **no tienen implementación funcional en el MVP**.

| Funcionalidad | Motivo de exclusión |
|---------------|---------------------|
| Pagos integrados (Nequi, Daviplata, PSE) | Requiere integraciones externas y flujos de cobro complejos |
| Dashboard de analytics y estadísticas | Se implementa en Plan Pro |
| Historial de pedidos (UI) | La tabla existe en DB pero sin interfaz |
| Dominio personalizado | Requiere infraestructura de DNS adicional |
| Multi-tienda | En MVP: 1 tienda por usuario |
| Editor de secciones personalizadas del storefront | Complejidad de producto alta |
| Gestión de marcas | Baja prioridad para MVP |
| Favoritos | Requiere sesión de visitante |
| PWA | Opcional para lanzamiento inicial |
| Magic link | Innecesario con email/contraseña + Google |
| Paginación server-side | El límite de 1000 productos hace viable el listado completo |
| Importar desde catálogo de WhatsApp Business | Integración compleja con API de WhatsApp |

---

## 3. Reglas de negocio y validaciones

### 3.1 Multi-tenancy

- **MVP:** un usuario = una tienda. Si intenta crear una segunda, la acción retorna error `MAX_STORES_REACHED`.
- El slug es globalmente único en toda la plataforma.
- Una tienda solo es visible públicamente cuando `onboarding_completed = true`.
- Toda query filtra por `store_id` y/o `user_id`. Row Level Security (RLS) lo refuerza a nivel de base de datos.

### 3.2 Modos de catálogo

#### Modo `simple`
- Los productos se asignan directamente a categorías.
- No existen subcategorías.

#### Modo `nested`
- Las categorías contienen subcategorías.
- Los productos se asignan a subcategorías, no directamente a categorías.
- El campo `subcategory_id` es **obligatorio** para los productos.

#### Cambio de modo

| Transición | Comportamiento |
|------------|----------------|
| `nested` → `simple` | Transacción atómica: elimina TODAS las subcategorías, pone `subcategory_id = NULL` en todos los productos. |
| `simple` → `nested` | Solo cambia el flag. No se eliminan datos. |

### 3.3 Eliminaciones en cascada

| Acción | Cascada |
|--------|---------|
| Eliminar categoría | Elimina subcategorías, productos, imágenes de productos, variantes + limpieza en Storage. |
| Eliminar subcategoría | Se ofrece opción: mover productos a otra subcategoría, o eliminar los productos huérfanos. |
| Eliminar tienda | Cascada completa + limpieza de Storage en todos los buckets. |
| Eliminar producto | Limpieza de imágenes en Storage antes del DELETE en DB. |

### 3.4 Límites del sistema

Todos los límites se validan del lado del servidor (Server Actions). El cliente puede mostrar advertencias, pero la validación autoritativa es server-side.

| Recurso | Límite |
|---------|--------|
| Tiendas por usuario | 1 (MVP) |
| Categorías por tienda | 50 |
| Subcategorías por categoría | 20 |
| Productos por tienda | 1.000 |
| Imágenes por producto | 4 |
| Tamaño máximo por imagen | 5 MB |

### 3.5 Validaciones de campos

| Campo | Regla |
|-------|-------|
| Nombre de tienda | `trim().length >= 2` |
| Slug | Regex `^[a-z0-9][a-z0-9-]*[a-z0-9]$`, longitud mínima 2, único globalmente |
| WhatsApp | Regex `^\d{12}$` (prefijo 57 + 10 dígitos) |
| Descripción de tienda | Máximo 120 caracteres |
| Nombre de producto | Mínimo 2 caracteres |
| Precio | `INTEGER >= 0` (COP, sin decimales) |
| Precio de comparación | Entero positivo o `NULL` |
| Descripción de producto | Máximo 300 caracteres |

### 3.6 Formato de precios

- Moneda: **COP (pesos colombianos)**.
- Sin decimales en la práctica.
- Almacenamiento en DB: `INTEGER` (ejemplo: $2.500 → `2500`).
- Formato de presentación:

```typescript
new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
}).format(price)
```

### 3.7 Carrito y checkout

- El carrito se almacena en `localStorage` (visitante anónimo), con la clave `tc_cart_{slug}`.
- Cada ítem del carrito contiene: `productId`, `variantName` (nullable), `quantity`.
- El formulario de checkout captura: `customerName`, `customerPhone`, `customerEmail`, `customerAddress`, `customerNotes`.
- Al enviar el pedido: se genera el mensaje estructurado de WhatsApp y se abre `wa.me/{phone}?text={encoded}`.

### 3.8 Formato del mensaje de WhatsApp

```
*Nuevo pedido*

- {qty}x {nombre del producto} ({variante}) — ${precio}
- ...

*Total: ${total}*

--- Datos del cliente ---
Nombre: {nombre}
WhatsApp: +57{teléfono}
Correo: {email}
Dirección: {dirección}

Notas: {notas}

_Pedido desde tiendri.com/{slug}_
```

- Las variantes se muestran solo si el producto tiene variante seleccionada.
- Las notas se incluyen solo si el campo no está vacío.
- El total se calcula sobre el precio base del producto + modificador de variante (si aplica), multiplicado por la cantidad.

### 3.9 Gestión de imágenes

| Parámetro | Valor |
|-----------|-------|
| Formato preferido | WebP (30-50% más liviano que JPEG) |
| Tamaño máximo | 5 MB |
| Compresión | Máximo 800px en el lado más largo, calidad 0.7 |
| Estructura en Storage | `{bucket}/{store_id}/{entity_id}/{sort_order}.webp` |
| Buckets disponibles | `logos`, `banners`, `products`, `categories` |

### 3.10 Autenticación y seguridad

- El middleware protege todas las rutas `/dashboard/*` → redirige a `/auth/login` si no hay sesión.
- Las rutas `/auth/*` redirigen a `/dashboard` si hay sesión activa.
- Se usa `getUser()` en lugar de `getSession()` para prevenir spoofing de sesión.
- Cada Server Action verifica que `store.user_id === auth.uid()` antes de ejecutar cualquier mutación.

### 3.11 Rate limiting

Implementación mediante sliding window en memoria (aceptable para MVP). No requiere Redis en esta etapa.

| Tipo de operación | Límite | Ventana | Clave |
|-------------------|--------|---------|-------|
| Autenticación | 5 req | 1 minuto | Por IP |
| Lectura pública | 30 req | 1 minuto | Por IP |
| Operaciones de escritura | 20 req | 1 minuto | Por userId |
| Subida de imágenes | 10 req | 1 minuto | Por userId |
| Verificación de slug | 20 req | 1 minuto | Por IP |

### 3.12 Patrón de respuesta de Server Actions

Todas las Server Actions retornan un objeto con la siguiente estructura:

```typescript
// Éxito
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string, field?: string } }
```

**Códigos de error disponibles:**

| Código | Cuándo se usa |
|--------|---------------|
| `UNAUTHORIZED` | No hay sesión activa |
| `FORBIDDEN` | La sesión existe pero no tiene permiso sobre el recurso |
| `NOT_FOUND` | El recurso solicitado no existe |
| `VALIDATION_ERROR` | Un campo no cumple las reglas de validación |
| `SLUG_TAKEN` | El slug ya está en uso por otra tienda |
| `MAX_STORES_REACHED` | El usuario ya tiene 1 tienda (límite MVP) |
| `MAX_IMAGES_REACHED` | El producto ya tiene 4 imágenes |
| `INVALID_MODE` | Operación inválida para el modo de catálogo actual |
| `FILE_TOO_LARGE` | La imagen supera los 5 MB |
| `INVALID_FILE_TYPE` | El archivo no es una imagen válida |
| `STORAGE_ERROR` | Error al subir o eliminar en Supabase Storage |
| `DATABASE_ERROR` | Error inesperado en la base de datos |
| `RATE_LIMITED` | Se superó el límite de solicitudes |

---

## 4. Flujos UX

### Flujo 1: Registro → Primera tienda

1. El usuario visita `tiendri.com`.
2. Hace clic en "Crear mi tienda gratis".
3. Se registra con email/contraseña o Google OAuth.
4. Confirma su email (si registró con email).
5. Es redirigido a `/onboarding`.
6. Completa el wizard de 5 pasos (menos de 5 minutos).
7. Al finalizar: pantalla de celebración → la tienda se crea en Supabase.
8. Es redirigido a `/dashboard`.

**Punto de quiebre crítico:** si el usuario abandona el onboarding a mitad, la tienda NO se crea. Al volver a ingresar, retoma desde el paso donde lo dejó (estado del wizard persistido).

### Flujo 2: Gestión del catálogo

1. El comerciante accede a `/dashboard`.
2. Crea categorías (nombre, ícono, imagen, descripción).
3. Si el modo es `nested`: crea subcategorías dentro de las categorías.
4. Crea productos (nombre, precio, imágenes, variantes, descripción).
5. Activa/desactiva disponibilidad y el estado de destacado por producto.
6. Reordena ítems mediante drag & drop.
7. Los cambios se reflejan de forma inmediata en el storefront público (ISR con `revalidatePath`).

### Flujo 3: Pedido de un cliente

1. El cliente recibe el link de la tienda (por WhatsApp, redes sociales o QR).
2. Abre `tiendri.com/{slug}`.
3. Navega el catálogo por categoría/subcategoría.
4. Usa la búsqueda para encontrar productos.
5. Agrega ítems al carrito (con selección de variante si aplica).
6. Abre el drawer del carrito.
7. Completa el formulario de checkout (nombre, teléfono, email, dirección, notas).
8. Hace clic en "Enviar por WhatsApp".
9. Se abre WhatsApp con el mensaje pre-completado y estructurado.
10. El cliente envía el mensaje → el comerciante recibe el pedido en su WhatsApp.

**Nota importante:** el pedido se envía vía WhatsApp nativo. Tiendri no almacena el pedido en esta etapa del MVP (la tabla existe en DB pero sin UI ni lógica de guardado).

### Flujo 4: Personalización de la tienda

1. El comerciante accede a la sección Configuración en el dashboard.
2. Cambia la plantilla visual.
3. Ajusta colores primario y secundario.
4. Sube o reemplaza el logo y el banner.
5. Selecciona el par tipográfico, radio de borde y apariencia (light/dark).
6. Actualiza los enlaces de redes sociales (Instagram, Facebook, TikTok, etc.).
7. Los cambios se reflejan en el storefront público luego de guardar.

---

## 5. Planes y precios

### Tabla de planes

| Plan | Precio | Qué incluye |
|------|--------|-------------|
| **Gratis** | $0 COP para siempre | Hasta 20 productos, todas las plantillas, recepción de pedidos por WhatsApp, código QR, búsqueda de productos |
| **Pro** | ~$49.900 COP/mes | Productos ilimitados, panel de estadísticas, historial de pedidos, secciones personalizadas, soporte prioritario |
| **Negocio** | ~$99.900 COP/mes | Todo lo de Pro + múltiples tiendas, dominio personalizado, reportes avanzados |

### Política de precios

> "Sin sorpresas. Sin comisiones por venta."

- Tiendri **nunca cobra comisión** sobre los pedidos o ventas del comerciante.
- El costo es fijo mensual, predecible y transparente.

### Estado en el MVP

- **Plan Gratis:** completamente funcional en el MVP.
- **Plan Pro y Negocio:** implementación diferida para post-MVP. Las funcionalidades están listadas para comunicación y posicionamiento, pero **no tienen implementación funcional**.
- La página de precios existe en el MVP con fines de comunicación.

### Criterio para el límite gratuito

El límite de 20 productos en el plan gratuito está diseñado para:

1. Ser suficiente para validar el negocio del comerciante.
2. Crear motivación real para actualizar al plan Pro cuando el negocio crece.
3. No requerir restricciones técnicas complejas en el MVP (se valida con el mismo mecanismo de `MAX_PRODUCTS_REACHED`).

---

*Última actualización: Abril 2026 — Alcance MVP inicial.*
