# Tiendri — Documento de Producto

> Versión: 2.0 | Actualizado: Junio 2026 | Consolida: vision.md + mvp.md + competitors.md

---

## 1. Qué es Tiendri

Tiendri es una plataforma SaaS que permite a pequeños negocios en Colombia y LATAM crear su catálogo online en menos de 5 minutos y recibir pedidos directamente por WhatsApp.

Está diseñada para el dueño de negocio que **nunca tuvo un sitio web** — la tienda de ropa, la panadería, la ferretería, la barbería, la perfumería — y que hoy vende exclusivamente por WhatsApp sin ninguna presencia digital estructurada.

Cada tienda tiene su propia URL pública: `tiendri.com/{slug}`

### El problema

Los pequeños comerciantes en Colombia usan WhatsApp todo el día para vender: compartir fotos de productos, confirmar precios, coordinar entregas. WhatsApp es su canal de ventas principal — pero también su único canal, y eso tiene un costo enorme:

- **Sin catálogo estructurado**: el cliente tiene que preguntar precio por precio
- **Sin presencia digital**: no aparecen en ningún lado, no generan confianza fuera de su círculo de conocidos
- **Sin historial de pedidos**: todo se pierde en conversaciones de WhatsApp

El mercado está fragmentado entre dos extremos que dejan al pequeño comerciante sin opciones reales:

| Tipo | Ejemplos | Problema |
|------|----------|----------|
| Ecommerce completo | Tiendanube, Shopify | Demasiado complejo, diseñado para negocios con equipo técnico |
| Catálogos simples | CatálogoDigital, Callbell Shop, Whataform | Demasiado genérico, diseño pobre, no cierran ventas |
| Soluciones mixtas | Sumer / Domun | Cobros ocultos, botón de WhatsApp decorativo, todas las tiendas se ven igual |

**El resultado**: el comerciante sigue sin presencia digital, o intenta una herramienta y la abandona porque no le aporta valor real.

### La solución

Tiendri resuelve exactamente ese punto medio que no existe hoy: **un catálogo online de diseño premium, nativo de WhatsApp, que cualquier persona puede crear sin conocimientos técnicos**.

Cómo funciona:

1. **El dueño crea su tienda en minutos**: sube sus productos, elige una plantilla, personaliza colores y logo
2. **Sus clientes navegan el catálogo en `tiendri.com/{slug}`**: ven los productos con fotos, precios y descripción
3. **El cliente hace un pedido**: toca un botón que abre WhatsApp con un mensaje estructurado listo (nombre del producto, cantidad, precio, datos de entrega)
4. **El dueño recibe el pedido en su WhatsApp**: exactamente como hoy, pero con toda la información organizada

### Pilares del producto

- **Velocidad de setup**: catálogo activo en menos de 5 minutos, sin fricción
- **Diseño premium**: plantillas con alto nivel de personalización — cada tienda tiene identidad propia
- **WhatsApp nativo**: no es un botón decorativo; es el canal real de pedidos con mensajes estructurados via `wa.me/`
- **Dashboard de gestión**: administración de productos, categorías y configuración de la tienda
- **Performance móvil**: optimizado para Android de gama media con datos móviles lentos

---

## 2. Público objetivo

### Perfil principal

| Atributo | Detalle |
|----------|---------|
| Ubicación | Colombia (foco inicial), LATAM (expansión) |
| Edad | 25 a 55 años |
| Dispositivo | Android de gama media, datos móviles (posiblemente lentos) |
| Relación con tecnología | Usa WhatsApp todo el día; nunca tuvo un sitio web |
| Conocimiento técnico | Cero — la plataforma debe funcionar sin ningún tipo de capacitación |
| Presupuesto | Dispuesto a pagar entre $40 y $150 USD/mes si ve valor real |

### Segmentos de mercado

- Tiendas de ropa y accesorios
- Restaurantes, panaderías y cafés
- Ferreterías y materiales de construcción
- Barberías y salones de belleza
- Perfumerías y cosméticos
- Artesanías y joyería
- Minimercados y tiendas de abarrotes
- Tiendas de electrónica y accesorios de celular

### Geografía

Foco en ciudades intermedias y grandes de Colombia donde la digitalización de pequeños negocios está en etapa temprana: Bogotá, Medellín, Cali, Barranquilla, Bucaramanga, Pereira, Manizales, y ciudades secundarias.

---

## 3. Scope del MVP

### Qué está en el MVP

#### Landing page

- Página principal que explica qué es Tiendri y dirige al registro.
- Máximo 4-5 secciones limpias y enfocadas.
- CTA principal visible: "Crear mi tienda gratis".

#### Autenticación

- Registro e inicio de sesión con email + contraseña.
- OAuth con Google.
- **Fuera del MVP:** magic link.

#### Wizard de onboarding

El usuario debe poder completar el onboarding en **menos de 5 minutos**. Son 5 pasos secuenciales:

| Paso | Contenido |
|------|-----------|
| 1 | Nombre de la tienda + slug (con verificación de disponibilidad debounced) |
| 2 | Número de WhatsApp (12 dígitos: prefijo 57 + 10 dígitos) |
| 3 | Selección de modo de catálogo: **simple** o **anidado** |
| 4 | Selección de plantilla |
| 5 | Branding: color primario, color secundario, logo, banner |

Al completar: se muestra una pantalla de celebración, la tienda se crea en Supabase al finalizar el último paso, el logo y el banner se suben a Storage en paralelo.

#### Dashboard

**Categorías:** CRUD completo. Campos: nombre, ícono, imagen, descripción. Reordenamiento mediante drag & drop.

**Subcategorías:** CRUD completo, disponible únicamente si el modo de catálogo es `nested`.

**Productos:** CRUD completo. Campos: nombre, precio, precio de comparación (tachado), imágenes (hasta 4), variantes con modificador de precio, toggle de disponibilidad, toggle de destacado.

**Configuración de la tienda:** Nombre, slug, número de WhatsApp, tema visual, enlaces de redes sociales. Generación de link compartible + código QR.

**Fuera del MVP:** analytics, historial de pedidos, marcas, editor de secciones personalizadas, multi-tienda.

#### Storefront público (`tiendri.com/{slug}`)

- Renderizado SSR mediante `getPublicStorefront()` RPC (un solo round-trip a la base de datos).
- Filtro por categoría y subcategoría.
- Búsqueda en tiempo real (nombre + descripción, insensible a mayúsculas/minúsculas).
- Carrito de compras persistido en localStorage, con clave `tc_cart_{slug}` por tienda.
- Vista de detalle de producto con galería de imágenes y selección de variante.
- Formulario de checkout: nombre, WhatsApp, email, dirección, notas.
- Pedido enviado por WhatsApp mediante `wa.me/{phone}?text={encoded}`.
- SEO básico: `generateMetadata`, OG tags, Twitter cards.

**Fuera del MVP:** favoritos, PWA, filtros avanzados (rango de precios, marcas), paginación.

#### Plantillas

- 3 o 4 plantillas bien diferenciadas entre sí.
- Alto grado de personalización dentro de cada plantilla.
- Cada plantilla define: `cardStyle`, `headerStyle`, `navStyle`, `imageRatio`, `hoverEffect`, `gridCols`.
- 13 propiedades CSS custom por plantilla.
- Opciones de personalización: color primario y secundario, par tipográfico (moderno / cálido / elegante / funcional), radio de borde (sharp / rounded / pill), apariencia (light / dark).

### Qué queda fuera del MVP

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

### Planes y precios

> "Sin sorpresas. Sin comisiones por venta."

Tiendri nunca cobra comisión sobre los pedidos o ventas del comerciante. El costo es fijo mensual, predecible y transparente.

| Plan | Precio | Qué incluye |
|------|--------|-------------|
| **Gratis** | $0 COP para siempre | Hasta 20 productos, todas las plantillas, recepción de pedidos por WhatsApp, código QR, búsqueda de productos |
| **Pro** | ~$49.900 COP/mes | Productos ilimitados, panel de estadísticas, historial de pedidos, secciones personalizadas, soporte prioritario |
| **Negocio** | ~$99.900 COP/mes | Todo lo de Pro + múltiples tiendas, dominio personalizado, reportes avanzados |

**Estado en el MVP:**
- Plan Gratis: completamente funcional.
- Plan Pro y Negocio: implementación diferida. Las funcionalidades están listadas para comunicación y posicionamiento.

El límite de 20 productos en el plan gratuito está diseñado para ser suficiente para validar el negocio del comerciante y crear motivación real para actualizar al plan Pro cuando el negocio crece.

> Los precios finales se definirán una vez calculados los costos reales por usuario activo.

### Reglas de negocio y validaciones

#### Multi-tenancy

- **MVP:** un usuario = una tienda. Si intenta crear una segunda, la acción retorna error `MAX_STORES_REACHED`.
- El slug es globalmente único en toda la plataforma.
- Una tienda solo es visible públicamente cuando `onboarding_completed = true`.
- Toda query filtra por `store_id` y/o `user_id`. Row Level Security (RLS) lo refuerza a nivel de base de datos.

#### Modos de catálogo

**Modo `simple`:** Los productos se asignan directamente a categorías. No existen subcategorías.

**Modo `nested`:** Las categorías contienen subcategorías. Los productos se asignan a subcategorías, no directamente a categorías. El campo `subcategory_id` es obligatorio para los productos.

**Cambio de modo:**

| Transición | Comportamiento |
|------------|----------------|
| `nested` → `simple` | Transacción atómica: elimina TODAS las subcategorías, pone `subcategory_id = NULL` en todos los productos. |
| `simple` → `nested` | Solo cambia el flag. No se eliminan datos. |

#### Eliminaciones en cascada

| Acción | Cascada |
|--------|---------|
| Eliminar categoría | Elimina subcategorías, productos, imágenes de productos, variantes + limpieza en Storage. |
| Eliminar subcategoría | Se ofrece opción: mover productos a otra subcategoría, o eliminar los productos huérfanos. |
| Eliminar tienda | Cascada completa + limpieza de Storage en todos los buckets. |
| Eliminar producto | Limpieza de imágenes en Storage antes del DELETE en DB. |

#### Límites del sistema

Todos los límites se validan del lado del servidor (Server Actions). El cliente puede mostrar advertencias, pero la validación autoritativa es server-side.

| Recurso | Límite |
|---------|--------|
| Tiendas por usuario | 1 (MVP) |
| Categorías por tienda | 50 |
| Subcategorías por categoría | 20 |
| Productos por tienda | 1.000 |
| Imágenes por producto | 4 |
| Tamaño máximo por imagen | 5 MB |

#### Validaciones de campos

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

#### Formato de precios

- Moneda: **COP (pesos colombianos)**. Sin decimales en la práctica.
- Almacenamiento en DB: `INTEGER` (ejemplo: $2.500 → `2500`).
- Formato de presentación:

```typescript
new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
}).format(price)
```

#### Carrito y checkout

- El carrito se almacena en `localStorage` (visitante anónimo), con la clave `tc_cart_{slug}`.
- Cada ítem del carrito contiene: `productId`, `variantName` (nullable), `quantity`.
- El formulario de checkout captura: `customerName`, `customerPhone`, `customerEmail`, `customerAddress`, `customerNotes`.
- Al enviar el pedido: se genera el mensaje estructurado de WhatsApp y se abre `wa.me/{phone}?text={encoded}`.

#### Formato del mensaje de WhatsApp

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

#### Gestión de imágenes

| Parámetro | Valor |
|-----------|-------|
| Formato preferido | WebP (30-50% más liviano que JPEG) |
| Tamaño máximo | 5 MB |
| Compresión | Máximo 800px en el lado más largo, calidad 0.7 |
| Estructura en Storage | `{bucket}/{store_id}/{entity_id}/{sort_order}.webp` |
| Buckets disponibles | `logos`, `banners`, `products`, `categories` |

#### Autenticación y seguridad

- El middleware protege todas las rutas `/dashboard/*` → redirige a `/auth/login` si no hay sesión.
- Las rutas `/auth/*` redirigen a `/dashboard` si hay sesión activa.
- Se usa `getUser()` en lugar de `getSession()` para prevenir spoofing de sesión.
- Cada Server Action verifica que `store.user_id === auth.uid()` antes de ejecutar cualquier mutación.

#### Rate limiting

Implementación mediante sliding window en memoria (aceptable para MVP).

| Tipo de operación | Límite | Ventana | Clave |
|-------------------|--------|---------|-------|
| Autenticación | 5 req | 1 minuto | Por IP |
| Lectura pública | 30 req | 1 minuto | Por IP |
| Operaciones de escritura | 20 req | 1 minuto | Por userId |
| Subida de imágenes | 10 req | 1 minuto | Por userId |
| Verificación de slug | 20 req | 1 minuto | Por IP |

#### Patrón de respuesta de Server Actions

Todas las Server Actions retornan:

```typescript
// Éxito
{ success: true, data: T }

// Error
{ success: false, error: { code: string, message: string, field?: string } }
```

**Códigos de error:**

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

**Nota:** el pedido se envía vía WhatsApp nativo. Tiendri no almacena el pedido en esta etapa del MVP (la tabla existe en DB pero sin UI ni lógica de guardado).

### Flujo 4: Personalización de la tienda

1. El comerciante accede a la sección Configuración en el dashboard.
2. Cambia la plantilla visual.
3. Ajusta colores primario y secundario.
4. Sube o reemplaza el logo y el banner.
5. Selecciona el par tipográfico, radio de borde y apariencia (light/dark).
6. Actualiza los enlaces de redes sociales (Instagram, Facebook, TikTok, etc.).
7. Los cambios se reflejan en el storefront público luego de guardar.

---

## 5. Análisis competitivo

> Contexto: segmento micro y pequeño comercio informal/semiformal. Fecha: Abril 2026.

### 1. Whataform

**Tipo:** Plataforma de catálogo + pedidos con enfoque en WhatsApp | **Alcance:** 40.000+ usuarios en 20+ países

Whataform es la solución más completa del segmento: combina catálogo digital, gestión de pedidos, procesamiento de pagos y analíticas en una sola plataforma. Incorpora IA para la creación rápida de catálogos y no cobra comisiones sobre ventas.

**Planes (COP/mes):**

| Plan | Precio | Catálogos | Productos |
|------|--------|-----------|-----------|
| Básico | $59.250 | 1 | 100 |
| Whataform+ | $150.100 | 10 | 1.000 |
| Avanzado | $391.050 | 20 | 99.999 |

Prueba gratuita de 14 días. Sin tier gratuito permanente. Dominio propio incluido en todos los planes.

**Fortalezas:** Solución más completa en funcionalidades. Sin comisiones. Tres modos de pedido (clásico, paso a paso, checkout). IA para generación de catálogos. App móvil dedicada.

**Debilidades:** Precio base ($59.250/mes) limita a solo 100 productos — insuficiente y caro para micronegocios informales. Sin tier gratuito permanente — barrera de entrada monetaria desde el día 1.

---

### 2. Callbell Shop

**Tipo:** Tienda digital gratuita (feature secundaria de Callbell CRM) | **Alcance:** Global

Callbell Shop es una funcionalidad de tienda digital incluida de forma gratuita dentro del ecosistema de Callbell, una plataforma de CRM para equipos de ventas/soporte. No es un producto independiente ni pensado exclusivamente para catálogos.

**Precio:** Completamente gratuito.

**Características:** Hasta 500 productos con 5 fotos por producto. Variantes de producto y control de stock. Historial de pedidos. Personalización de color (sin templates). WhatsApp: enlace `wa.me/` (sin API). Sin procesamiento de pagos ni analíticas ni dominio propio.

**Fortalezas:** Completamente gratuito — barrera de entrada cero.

**Debilidades:** Diseño completamente genérico — todas las tiendas se ven iguales, solo diferenciadas por color. Sin analíticas. Es un CRM con una tienda básica adosada, no un producto de catálogo serio. No está diseñado para el flujo completo de pedidos por WhatsApp.

---

### 3. CatálogoDigital.co

**Tipo:** Plataforma de catálogo digital para el mercado colombiano | **Alcance:** Colombia, empresa local

La opción más barata del mercado colombiano, con soporte local en español por WhatsApp. Solución básica orientada a comercios que solo necesitan mostrar sus productos y recibir consultas.

**Planes (COP/mes):**

| Plan | Precio | Productos |
|------|--------|-----------|
| Básico | $40.000 | 50 |
| Empresarial | $60.000 | 100 |
| Corporativo | $100.000 | 200 |
| Distribuidor | $150.000 | 500 |

**Fortalezas:** El más barato en precio absoluto. Empresa y soporte 100% local. Comunicación directa en español con soporte humano.

**Debilidades:** Plan básico limita a 50 productos. Diseño completamente genérico. Sin pagos integrados ni analíticas. Presencia online casi inexistente: sin documentación, sin tutoriales. Escalabilidad cuestionable.

---

### 4. Tiendanube (Nuvemshop)

**Tipo:** Plataforma de ecommerce completa para LATAM | **Alcance:** 170.000+ tiendas activas, +$2.000M en ventas procesadas

El jugador más grande y sólido de ecommerce en LATAM. Ofrece pagos integrados, templates profesionales, integraciones con marketplaces y IA para ventas por WhatsApp (Chat Nube).

**Planes (COP/mes):**

| Plan | Precio | Productos |
|------|--------|-----------|
| Básico | $33.900 | Ilimitados |
| Tiendanube | $74.900 | Ilimitados |
| Avanzado | $249.900 | Ilimitados |

Prueba gratuita de 7 días. 0% comisión de transacción en todos los planes.

**Fortalezas:** El actor más sólido de LATAM. 0% comisión. IA de WhatsApp avanzada (Chat Nube) con 70% de tasa de auto-respuesta. 60+ templates de calidad profesional. Pagos locales integrados. Productos ilimitados desde el plan más barato.

**Debilidades:** Overkill para el mercado objetivo — un barbero o tienda de barrio no necesita ecommerce completo con SEO, marketplaces y email marketing. Onboarding requiere cierto nivel de alfabetización digital. Chat Nube cobra por conversación como costo adicional. **No está diseñado para negocios con cero presencia digital previa.**

---

### 5. Sumer / Domun

**Tipo:** App de comercio social y catálogo digital — competidor directo | **Alcance:** 24 países, ~96 empleados, 2M descargas

El competidor más directo de Tiendri. Fundado por tres ex-Rappi (Joaquín Serrano como CEO, Yerson Cacua como CTO, Óscar Arellano como CIO), levantó $10,3M de inversores de peso (Susa Ventures, 8VC, Mantis VC, ángeles de Rappi). Adquirió Preki (YC-backed, 800K tiendas en 19 países) y tiene partnerships institucionales con Davivienda, Bancolombia, Coca-Cola FEMSA, Wompi y Bold.

**Métricas clave:**

| Métrica | Valor |
|---------|-------|
| Descargas totales | ~2.000.000 |
| Usuarios pagos | 4.500–7.000 |
| Conversión freemium | 0,2%–0,35% |
| Rating en app stores | 3,7/5 |
| Países | 24 |

**Fortalezas:** Onboarding rápido con experiencia mobile-first. Partnerships institucionales. Playbook probado de ex-Rappi. Multi-canal nativo (Facebook/Instagram/Google Shopping, Mercado Libre). IA integrada para catálogos.

**Debilidades:**
1. **WhatsApp es decorativo:** la integración se limita a un botón que abre un chat. No procesa ni organiza pedidos por WhatsApp.
2. **Cobros post-cancelación:** queja #1 de usuarios en app stores — siguen facturando después de cancelar.
3. **Freemium engañoso:** funcionalidades clave ocultas detrás del paywall sin señalizarlo claramente.
4. **Homogeneidad de diseño:** todas las tiendas lucen igual — sin diferenciación visual real.
5. **Soporte deficiente:** usuarios reportan meses sin resolución de problemas.
6. **Conversión freemium pésima:** 0,2%–0,35% de conversión sobre 2M de descargas — problema estructural de propuesta de valor.
7. **Serie A aparentemente sin cerrar:** señal de potencial presión financiera.

---

### Matriz comparativa

| Característica | Whataform | Callbell Shop | CatálogoDigital.co | Tiendanube | Sumer/Domun |
|----------------|-----------|---------------|-------------------|------------|-------------|
| **Precio base (COP/mes)** | $59.250 | Gratis | $40.000 | $33.900 | Freemium |
| **Tier gratuito permanente** | No | Sí | No | No | Sí (limitado) |
| **Límite de productos** | 100 (básico) | 500 | 50 (básico) | Ilimitados | Variable |
| **Pagos integrados** | Sí | No | No | Sí | Parcial (via partners) |
| **WhatsApp** | API (avanzado) / nativo | Enlace wa.me | Enlace wa.me | Chat Nube (IA) | Botón de contacto |
| **Flujo de pedidos por WhatsApp** | Sí (3 modos) | No | No | Parcial (Chat Nube) | No |
| **Calidad de diseño** | Media-alta | Baja | Baja | Alta | Media |
| **Templates diferenciados** | Limitados | No | No | 60+ | No |
| **Analíticas** | Sí | No | No | Sí | Básicas |
| **Dominio propio** | Sí | No | No | Sí | No |
| **App móvil** | Sí | No (CRM web) | No | Sí | Sí |
| **IA** | Catálogo | No | No | WhatsApp (Chat Nube) | Descripciones/SEO |
| **Pagos colombianos nativos** | No | No | No | Parcial | Parcial |
| **Onboarding < 5 min** | No | Sí (básico) | No | No | Sí |
| **Optimizado mobile low-end** | No | No | No | No | Parcial |
| **Mercado objetivo** | PYMES digitales | CRM users | Micronegocios CO | PYMES/medianas | Micronegocios LATAM |

### Oportunidades de mercado

El análisis revela brechas estructurales que ningún competidor aborda de forma completa:

1. **Pagos colombianos nativos en el flujo del catálogo** — Nequi, Daviplata y PSE son los métodos de pago reales del comercio informal colombiano. Ningún competidor los integra de forma nativa dentro del flujo del catálogo.

2. **Onboarding en menos de 5 minutos para usuarios sin experiencia digital** — El comerciante que vende empanadas en un local del barrio no sabe qué es un dominio, un pixel ni una API. Ningún competidor está diseñado desde cero para ese perfil.

3. **Templates específicos para tipos de negocio colombiano** — No existe ninguna plataforma que ofrezca templates pensados para una peluquería de barrio, una ferretería, una papelería o un restaurante de barrio. Todos tienen templates genéricos estilo occidental.

4. **El comerciante que no quiere "una tienda online"** — Una porción significativa del mercado objetivo no quiere gestionar una tienda — quiere mostrar sus productos y recibir pedidos. La propuesta de "catálogo + pedidos por WhatsApp" sin la complejidad de una tienda online es un nicho sin dueño claro.

5. **Gestión simple de pedidos post-WhatsApp sin CRM complejo** — Un panel simple de "pedidos del día" sin curva de aprendizaje no existe en el mercado.

6. **Freemium real con funcionalidad útil desde el día 0** — Un freemium que permita operar un negocio real con las funciones esenciales — sin ocultarlas detrás de un paywall sorpresa — es una oportunidad de captación masiva.

7. **Optimización para celulares de gama baja y redes 3G** — El comerciante objetivo usa un Moto E, Samsung Galaxy A03 o similar, con conexión 3G intermitente. Ningún competidor menciona optimización para este perfil.

8. **Comunidad y prueba social colombiana local** — La prueba social hiperlocal — casos de éxito de negocios reconocibles, en ciudades colombianas, con testimonios en jerga local — es una palanca de conversión que nadie está usando.

9. **Multi-negocio desde un solo número de WhatsApp** — Los pequeños emprendedores suelen manejar 2-3 emprendimientos con un solo celular y un solo número. Ningún competidor aborda este caso de uso.

### Posicionamiento de Tiendri vs. cada competidor

**vs. Whataform:** Whataform es la solución más completa del segmento, pero su precio base ($59.250/mes por solo 100 productos) lo excluye del mercado de micronegocios informales. Tiendri apunta al comerciante que Whataform no puede servir rentablemente: funcionalidad esencial a precio accesible o gratis, con onboarding sin fricción.

**vs. Callbell Shop:** Callbell Shop ofrece cero barrera de entrada pero cero flujo de pedidos — es un escaparate sin caja registradora. Tiendri cierra ese loop: el cliente ve el catálogo, hace el pedido por WhatsApp y el comerciante lo gestiona, todo en un flujo integrado que Callbell Shop no tiene.

**vs. CatálogoDigital.co:** CatálogoDigital.co resuelve el problema del precio, pero entrega una experiencia genérica, sin pagos, sin analíticas y sin herramientas de crecimiento. Tiendri compite en precio y localidad, pero suma diferenciación visual, flujo de pedidos real y funcionalidades que permiten al comerciante crecer en la misma plataforma.

**vs. Tiendanube:** Tiendanube es una plataforma de ecommerce completo — un sedan ejecutivo cuando el usuario necesita una moto. Tiendri no compite en funcionalidad; compite en simplicidad y foco: cero configuración de ecommerce, cero curva de aprendizaje, cero features irrelevantes para quien solo quiere recibir pedidos por WhatsApp.

**vs. Sumer / Domun:** Sumer es el competidor más cercano en intención, pero su WhatsApp es decorativo y su freemium genera frustración (0,2% de conversión). Tiendri hace exactamente lo que Sumer promete y no cumple: el pedido llega, se organiza y se gestiona dentro de WhatsApp, con un modelo de negocio honesto que no oculta funcionalidades ni cobra post-cancelación.

---

## 6. Marca

### Nombre y origen

**TIENDRI** — derivado de "tienda" + el sufijo moderno "-ri". Corto, pronunciable por cualquier colombiano, fácil de recordar y de escribir.

- Dominio: `tiendri.com`
- URL de tiendas: `tiendri.com/{slug-del-negocio}`

### Tono de comunicación

- Profesional pero accesible — no habla como banco, habla como aliado del negocio
- Confiable y transparente — sin letra chica, sin tecnicismos
- Directo — el comerciante no tiene tiempo para largas explicaciones

### Idioma

Español colombiano. El producto habla como habla el usuario.

### Diferenciadores de marca

1. **Diseño premium y personalización real** — Los competidores directos producen tiendas que se ven todas iguales. Tiendri ofrece plantillas con personalización profunda: paleta de colores, tipografías, disposición de elementos, cabecera, logo, secciones destacadas. Cada tienda en Tiendri se ve como una tienda única.

2. **WhatsApp como canal real de pedidos** — Sumer y otros tienen un botón de WhatsApp que abre una conversación en blanco. En Tiendri, el flujo de pedido genera automáticamente un mensaje estructurado con el detalle completo del pedido — producto, variante, cantidad, precio, notas de entrega — listo para que el comerciante lo confirme.

3. **Precios transparentes, sin sorpresas** — La queja más repetida de Sumer es el cobro oculto post-cancelación. Tiendri publica sus precios desde el primer día. Sin comisiones por venta. Cancelación en un clic.

4. **Colombia-first** — No es una plataforma genérica adaptada a Colombia. UX en español colombiano sin tecnicismos. Diseñada para conexiones lentas (mobile-first, performance prioritario). Cobertura de ciudades intermedias, no solo las capitales. Métodos de pago locales (en roadmap). Soporte que habla el mismo idioma.

### Modelo de negocio

SaaS por suscripción mensual. Sin comisiones por venta. El comerciante paga una tarifa fija y se queda con el 100% de sus ingresos. El plan gratuito actúa como embudo de adquisición. El paso a Pro se justifica cuando el comerciante empieza a ver pedidos reales llegando por WhatsApp — el valor es inmediato y medible.

---

*Tiendri — La tienda online de los que nunca tuvieron una.*
