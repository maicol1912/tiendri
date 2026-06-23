# Tiendri — Documento de Producto

> Versión: 3.0 | Actualizado: Junio 2026

---

## 1. Qué es Tiendri

Tiendri es una plataforma SaaS para comerciantes de LATAM que permite crear un catálogo online de diseño premium y recibir pedidos organizados de manera fácil y rápida.

Está diseñada para el dueño de negocio que vende cualquier tipo de producto físico — perfumes, calzado, ropa, electrónica, muebles, artesanías, alimentos, cosméticos, lo que sea — y que hoy no tiene presencia digital estructurada.

Cada tienda tiene su propia URL pública: `tiendri.com/{slug}`

No se requieren conocimientos técnicos. El catálogo queda activo en minutos.

---

## 2. El problema y la solución

El mercado está partido en dos extremos que dejan al pequeño comerciante sin opciones reales:

- Plataformas completas como Shopify o Tiendanube: demasiado complejas, pensadas para equipos con capacidad técnica, con curvas de aprendizaje largas y funcionalidades irrelevantes para quien solo quiere mostrar productos y recibir pedidos.
- Catálogos simples o gratuitos: diseño pobre, genérico, todas las tiendas se ven igual, sin flujo de pedidos real, sin herramientas para crecer.

El resultado: el comerciante sigue sin presencia digital, o prueba una herramienta y la abandona porque no le aporta valor real.

Tiendri ocupa ese punto medio que no existe hoy. Templates de diseño premium con alta personalización, onboarding en minutos sin fricción técnica, y un sistema de pedidos que organiza la información del cliente de forma clara para que el comerciante pueda cerrar la venta rápido — por el canal que prefiera.

---

## 3. Pilares del producto

- Velocidad de setup: catálogo activo en menos de 5 minutos, sin configuración técnica
- Diseño premium: cada tienda tiene identidad propia — paleta, tipografía, layout, logo
- Pedidos organizados: el cliente genera un pedido estructurado con toda la información lista para el comerciante
- Dashboard de gestión: control total de productos, categorías, apariencia y configuración
- Performance móvil: optimizado para dispositivos de gama media con conexiones lentas
- WhatsApp como canal: el pedido puede cerrarse vía WhatsApp u otros canales — el comerciante elige

---

## 4. Público objetivo

Cualquier comerciante de LATAM que venda productos físicos: desde el emprendedor que opera solo hasta el negocio en crecimiento con decenas de referencias.

No hay restricción por categoría ni por tamaño. Si el negocio tiene productos que mostrar y clientes que atender, Tiendri funciona para él.

El perfil típico: usa el celular para vender, no tiene sitio web, quiere algo que funcione rápido y se vea bien — sin aprender ecommerce.

---

## 5. Scope del MVP

### Qué está incluido

| Módulo | Qué cubre |
|--------|-----------|
| Autenticación | Registro e inicio de sesión con email + contraseña o Google OAuth |
| Onboarding | Wizard de 5 pasos: nombre + slug, contacto, modo de catálogo, plantilla, branding |
| Catálogo | CRUD de categorías, subcategorías (modo anidado) y productos |
| Productos | Nombre, precio, precio de comparación, hasta 4 imágenes, variantes con modificador de precio, disponibilidad, destacado |
| Storefront público | SSR en `tiendri.com/{slug}`, filtro por categoría, búsqueda en tiempo real, carrito, checkout |
| Pedidos | Formulario de checkout con datos del cliente; el pedido se envía al comerciante organizado vía WhatsApp |
| Configuración | Tema visual, identidad, redes sociales, link compartible, código QR |
| Plantillas | 3 o 4 plantillas diferenciadas con personalización profunda de colores, tipografías y layout |

### Qué queda fuera

| Funcionalidad | Motivo |
|---------------|--------|
| Pagos integrados | Requiere integraciones externas y flujos de cobro complejos |
| Analytics y estadísticas | Se implementa en Plan Pro |
| Historial de pedidos (UI) | Tabla existe en DB, sin interfaz aún |
| Dominio personalizado | Requiere infraestructura DNS adicional |
| Multi-tienda | MVP: 1 tienda por usuario |
| Secciones personalizadas del storefront | Complejidad alta, post-MVP |
| Favoritos | Requiere sesión de visitante |
| PWA | Opcional para lanzamiento inicial |
| Importación de catálogos externos | Integraciones complejas, post-MVP |

### Planes

| Plan | Precio | Qué incluye |
|------|--------|-------------|
| Gratis | $0 para siempre | Hasta 20 productos, todas las plantillas, pedidos, código QR, búsqueda |
| Pro | ~$49.900 COP/mes | Productos ilimitados, estadísticas, historial de pedidos, secciones personalizadas, soporte prioritario |
| Negocio | ~$99.900 COP/mes | Todo lo de Pro + múltiples tiendas, dominio personalizado, reportes avanzados |

Sin comisiones por venta. Precio fijo mensual, predecible y transparente.

> Los precios finales se ajustarán según costos reales por usuario activo.

---

## 6. Customización del merchant

Todo lo que el comerciante puede personalizar desde su dashboard.

### Ya implementado

| Área | Qué incluye |
|------|-------------|
| Tema y apariencia | 32+ tokens de color via CSS vars, border radius (card, categoría, botón), pares de fuentes (modern, warm, elegant, functional), grid de columnas, opciones de layout (cardStyle, hoverEffect, imageRatio, tabStyle, bannerHeight, headerStyle, footerStyle), orden y visibilidad de secciones |
| Identidad de marca | Nombre, descripción, contacto, logo, redes sociales (Instagram, Facebook, TikTok, Twitter, YouTube) |
| Contenido visual | Banner hero (título, subtítulo, imagen, CTA), banners promocionales (hasta 4), banner de ofertas (desktop + mobile), links de navegación, tabs de productos, búsquedas populares, servicios del footer |
| Información de negocio | Ciudad, dirección, horarios, métodos de pago, info de envío, moneda |
| Catálogo | CRUD completo de categorías, subcategorías y productos; imágenes (hasta 4 por producto); variantes con modificador de precio; toggle disponibilidad/destacado; modo catálogo simple vs anidado; drag & drop para reordenar |

### Pendiente de implementar

Alta prioridad:
- Selección de productos destacados, populares y en descuento para el home
- Favicon personalizado

Prioridad media:
- Apariencia light / dark (tipos ya definidos, UI pendiente)
- Selección de plantilla desde el dashboard (solo tech-premium activo; 7+ en migración)

Post-MVP:
- Dominio personalizado
- CSS custom para merchants técnicos
- Secciones de contenido libre (about, testimonios, etc.)
- Códigos de seguimiento (Google Analytics, Meta Pixel, TikTok Pixel)
- QR personalizado (color, logo en el centro)
- Multi-tienda (varias tiendas por usuario)

---

## 7. Competidores

### Matriz comparativa

| Característica | Whataform | Callbell Shop | CatálogoDigital.co | Tiendanube | Sumer/Domun |
|----------------|-----------|---------------|-------------------|------------|-------------|
| Precio base (COP/mes) | $59.250 | Gratis | $40.000 | $33.900 | Freemium |
| Tier gratuito permanente | No | Sí | No | No | Sí (limitado) |
| Límite de productos | 100 (básico) | 500 | 50 (básico) | Ilimitados | Variable |
| Pagos integrados | Sí | No | No | Sí | Parcial |
| Canal de pedidos | WhatsApp (3 modos) | Enlace wa.me | Enlace wa.me | Chat Nube (IA) | Botón de contacto |
| Pedidos organizados | Sí | No | No | Parcial | No |
| Calidad de diseño | Media-alta | Baja | Baja | Alta | Media |
| Templates diferenciados | Limitados | No | No | 60+ | No |
| Analíticas | Sí | No | No | Sí | Básicas |
| Dominio propio | Sí | No | No | Sí | No |
| Onboarding < 5 min | No | Sí (básico) | No | No | Sí |
| Optimizado mobile low-end | No | No | No | No | Parcial |
| Mercado objetivo | PYMES digitales | CRM users | Micronegocios CO | PYMES/medianas | Micronegocios LATAM |

---

## 8. Marca

### Nombre y origen

TIENDRI — derivado de "tienda" + el sufijo moderno "-ri". Corto, pronunciable en cualquier país de habla hispana, fácil de recordar y de escribir.

- Dominio: `tiendri.com`
- URL de tiendas: `tiendri.com/{slug-del-negocio}`

### Tono de comunicación

Profesional pero accesible — no habla como banco, habla como aliado del negocio. Confiable y directo, sin letra chica ni tecnicismos. El comerciante no tiene tiempo para explicaciones largas.

Idioma: español. El producto habla como habla el usuario.

### Diferenciadores

- Diseño premium y personalización real: cada tienda en Tiendri se ve única, no genérica
- Pedidos organizados: el cliente genera un pedido con toda la información estructurada — el comerciante no tiene que perseguir datos sueltos en un chat
- Precios transparentes sin sorpresas: sin comisiones por venta, sin cobros ocultos, cancelación en un clic
- Setup en minutos: pensado para quien nunca tuvo un sitio web, no para quien sabe de ecommerce

### Paleta de marca

**Paleta primaria**: Negro / Gris / Rojo / Blanco

| Rol | Color | Valor |
|-----|-------|-------|
| CTA principal | Rojo | `#B91C1C` |
| CTA hover | Rojo hover | `#DC2626` |
| Links / highlights | Rojo claro | `#F87171` |
| Tints sutiles | Rojo oscuro | `#2A0A0A` |
| Fondo más profundo | Negro | `#0B0A0D` |
| Fondo base | Negro | `#100F14` |
| Fondo elevado (cards) | Negro elevado | `#16141B` |
| Superficie / inputs | Gris oscuro | `#1C1A22` |
| Texto primario (sobre oscuro) | Blanco | `#FFFFFF` |
| Texto secundario (sobre oscuro) | Gris claro | `gray-300` |
| Texto muted (sobre oscuro) | Gris | `gray-500` |
| Fondo dashboard | Blanco | `#FFFFFF` |

**Contextos de uso:**
- **Páginas de marketing** (landing, auth): tema oscuro — fondos negros/grises oscuros con acentos rojos
- **Dashboard**: fondo blanco/claro con botones rojos y negros

---

*Tiendri — La tienda online de los que nunca tuvieron una.*
