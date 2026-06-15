# Funcionalidades de un Template — Tiendri V2

Documento de alto nivel que describe TODAS las funcionalidades que debe tener un template de Tiendri desde la perspectiva del usuario final (comprador) y del comerciante.

---

## 1. Navegacion General

### Header (Desktop)

- Logo de la empresa visible en todo momento
- Links de navegacion por defecto: Inicio, Catalogo, Info de la tienda
- **Links personalizables por el comerciante:**
  - El comerciante puede agregar, editar, reordenar y eliminar links del header desde el dashboard
  - Cada link tiene: nombre visible (ej: "Ofertas", "Nuevos", "Colecciones") y destino
  - Destinos posibles:
    - Una seccion especifica de la pagina (scroll automatico al ancla, ej: #promociones, #categorias)
    - Una categoria o subcategoria del catalogo (ej: /catalogo?categoria=ofertas)
    - Una pagina interna del template (catalogo, info, carrito)
    - Un link externo (ej: redes sociales, blog)
  - Ejemplo: el comerciante agrega "Ofertas" que lleva a la seccion de promociones del home, "Nueva Coleccion" que filtra por una categoria especifica, "Blog" que abre un link externo
- Barra o icono de busqueda de productos
- Icono de carrito con badge que muestra la cantidad de items
- Sticky: el header se queda fijo al hacer scroll

### Navegacion Mobile

- Barra fija en la parte inferior con 4 tabs: Inicio, Buscar, Carrito, Info
- Solo visible en mobile, se oculta en desktop
- El tab activo se resalta visualmente

### Paginas del Template

Todo template debe incluir estas 7 paginas navegables:

| Pagina | Funcion |
|--------|---------|
| Inicio (Home) | Pagina principal con hero, categorias y productos destacados |
| Catalogo | Lista completa de productos con filtros y ordenamiento |
| Detalle de Producto | Vista completa de un producto individual |
| Busqueda | Busqueda de productos en tiempo real |
| Carrito | Items agregados, cantidades, total |
| Checkout | Formulario de datos + envio de pedido por WhatsApp |
| Info de la Tienda | Contacto, horarios, redes sociales, WhatsApp |

---

## 2. Pagina de Inicio (Home)

### Hero Banner

- Seccion principal de la pagina con impacto visual
- Debe mostrar: titulo, subtitulo, descripcion breve, boton CTA
- Puede incluir imagen de fondo o lateral segun la variante
- 4 variantes disponibles:
  - **Full bleed**: imagen de fondo a pantalla completa
  - **Contenido centrado**: hero con margenes
  - **Split**: mitad texto, mitad imagen
  - **Solo texto**: sin imagen, enfocado en tipografia

### Secciones de Productos

- Grilla de productos con cards
- Secciones personalizables tipo "Para Ti", "Promociones", "Mas Vendidos"
- Cada seccion puede tener su propio banner/titulo
- El comerciante puede configurar:
  - Nombre de la seccion
  - Visibilidad (mostrar/ocultar)
  - A donde lleva cada seccion (deep linking a categorias, productos, filtros)
- Filtrado por categoria en la misma pagina (tabs/chips/scroll)

### Navegacion de Categorias

- Seccion que muestra las categorias de productos
- 4 variantes de visualizacion:
  - **Scroll horizontal**: chips deslizables
  - **Grilla**: cards de categorias con imagen/icono
  - **Tabs**: barra de tabs
  - **Chips**: botones tipo pill
- Al seleccionar una categoria se filtran los productos del home

### Secciones Configurables

- El comerciante puede activar/desactivar secciones del home
- Cada seccion tiene un toggle de visibilidad
- El orden de las secciones es fijo por template pero la visibilidad es configurable

---

## 3. Productos

### Card de Producto

- Imagen del producto
- Nombre
- Precio (formateado en COP: $80.000)
- Precio original tachado si hay descuento
- Badge de descuento (ej: -20%)
- Indicador de disponibilidad (en stock / agotado)
- Boton o icono de agregar al carrito
- 4 variantes de layout de la card:
  - **Debajo de la imagen**: info debajo de la foto
  - **Overlay inferior**: info superpuesta en la parte baja
  - **Overlay completo**: info sobre toda la imagen
  - **Lado a lado**: imagen a un lado, info al otro
- 4 estilos del boton de agregar al carrito:
  - **Ancho completo**: boton grande debajo de la card
  - **Icono**: icono pequeno en la esquina
  - **FAB flotante**: boton circular flotante
  - **Solo en hover**: aparece al pasar el mouse

### Detalle del Producto

- Galeria de imagenes (multiples imagenes con navegacion)
- Nombre del producto
- Precio y precio original (si hay descuento)
- Porcentaje de descuento
- Descripcion completa
- Caracteristicas / especificaciones tecnicas
- Rating y cantidad de reviews (si aplica)

**Variantes del Producto:**
- Selector de variantes visible:
  - Tipo de medida (cm, metros, litros, tamano, GB, etc.)
  - Colores (swatches visuales)
  - Capacidad/almacenamiento
  - Tallas
  - Cualquier variante personalizada
- Al seleccionar una variante, el precio puede cambiar (price modifier)
- Cada variante se trata como item separado en el carrito

**Secciones adicionales configurables:**
- Tabs o acordeones con info extra: composicion, materiales, cuidado, envio, etc.
- Estas secciones son configurables por el comerciante via `productTabs`

**Productos relacionados:**
- Seccion debajo del producto: "Tambien te puede gustar" / "Para Ti"
- El nombre de esta seccion es personalizable por el comerciante
- Muestra productos de la misma categoria u otros criterios

**Acciones:**
- Boton de agregar al carrito con selector de cantidad (+/-)
- Indicador de stock

### Ofertas y Promociones

El comerciante puede crear ofertas sobre productos individuales desde el dashboard:

- **Descuento por porcentaje**: ej: -20%, -50%
- **Precio promocional fijo**: ej: antes $120.000, ahora $89.000
- **2x1 / 3x2**: compra multiple con descuento
- **Envio gratis**: marcar producto con envio gratis

**Como se muestra en el template:**
- Badge de descuento visible en la card del producto (ej: "-20%", "2x1", "Envio gratis")
- Precio original tachado + precio con descuento
- Seccion dedicada en el home: "Ofertas" / "Promociones" — configurable por el comerciante
- Los productos en oferta pueden destacarse visualmente (borde, fondo, badge de color)
- El comerciante puede configurar fecha de inicio y fin de la oferta (ofertas temporales)

### Combos / Bundles

El comerciante puede armar combos agrupando varios productos en un paquete:

**Creacion del combo (dashboard):**
- El comerciante selecciona 2 o mas productos existentes para incluir en el combo
- Define un nombre para el combo (ej: "Combo Cocina Completa", "Kit de Belleza", "Pack Gaming")
- Puede subir una imagen/banner propia para el combo (diferente a las de los productos individuales)
- Define el precio del combo:
  - **Con descuento**: precio menor que la suma de los productos individuales (ej: 3 productos que suman $450.000 por $350.000)
  - **Sin descuento**: precio igual a la suma, pero se vende como paquete por conveniencia
- Agrega descripcion del combo
- Puede activar/desactivar el combo

**Como se muestra en el template:**
- El combo aparece como una card especial en la grilla de productos, visualmente diferenciada (badge "Combo", "Pack", "Bundle")
- Muestra la imagen propia del combo
- Muestra los productos incluidos (nombres y/o thumbnails)
- Precio del combo + precio original de los productos por separado (si hay ahorro)
- Badge con el ahorro: "Ahorrás $100.000" o "-22%"
- Al agregar el combo al carrito, se agrega como un solo item (no productos sueltos)

**Ejemplo:**
```
┌─────────────────────────────────┐
│  🏷️ COMBO                       │
│  [Imagen propia del combo]      │
│                                 │
│  Combo Cocina Completa          │
│  Licuadora + Tostadora +        │
│  Cafetera                       │
│                                 │
│  $450.000  →  $350.000          │
│  Ahorrás $100.000               │
│                                 │
│  [Agregar al carrito]           │
└─────────────────────────────────┘
```

**Secciones en el home:**
- El comerciante puede crear una seccion dedicada a combos: "Combos", "Packs Especiales", "Ofertas en Pack"
- Los combos tambien pueden aparecer mezclados en la grilla general o en secciones de ofertas

---

## 4. Categorias

### Tipos de Visualizacion

Las categorias pueden mostrarse de 3 formas:
- **Solo texto**: nombre de la categoria
- **Icono + texto**: icono (Lucide) junto al nombre
- **Imagen + texto**: foto de la categoria con el nombre

### Categorias Anidadas (Subcategorias)

Las categorias pueden contener subcategorias dentro de ellas, creando una jerarquia de navegacion.

**Ejemplo — Electrodomesticos:**
```
Electrodomesticos (categoria padre)
├── Neveras
│   ├── Samsung
│   ├── LG
│   └── Haceb
├── Lavadoras
│   ├── Carga frontal
│   └── Carga superior
└── Cocinas
    ├── Estufas
    └── Hornos
```

**Ejemplo — Ropa:**
```
Ropa (categoria padre)
├── Mujer
│   ├── Camisetas
│   ├── Pantalones
│   └── Vestidos
├── Hombre
│   ├── Camisas
│   └── Jeans
└── Accesorios
    ├── Bolsos
    └── Cinturones
```

**Flujo de navegacion:**
1. El comprador ve las categorias principales (ej: "Electrodomesticos", "Tecnologia", "Hogar")
2. Al seleccionar una categoria, se muestran las subcategorias dentro de ella
3. Al seleccionar una subcategoria, se filtran los productos de esa subcategoria
4. Debe haber opcion de "Ver todo" para mostrar todos los productos de la categoria padre
5. Breadcrumb o indicador visual de la ruta: Inicio → Electrodomesticos → Neveras

**Configuracion:**
- El modo de catalogo (simple o anidado) se configura en el onboarding
- En modo **simple**: solo categorias, sin subcategorias
- En modo **anidado**: categorias con subcategorias
- Las subcategorias pueden tener su propia imagen
- El comerciante puede crear, editar y reordenar subcategorias desde el dashboard

### Filtrado

- Seleccionar una categoria filtra los productos en tiempo real
- Seleccionar una subcategoria filtra solo los productos de esa subcategoria
- "Todas" muestra todos los productos
- Se muestra conteo de productos por categoria y subcategoria

---

## 5. Carrito

### Funcionalidades

- Lista de items con:
  - Imagen del producto
  - Nombre
  - Variante seleccionada (si aplica)
  - Precio unitario
  - Cantidad
- Controles por item:
  - Boton para subir cantidad (+)
  - Boton para bajar cantidad (-)
  - Boton para eliminar el producto (x)
- Subtotal por item (precio × cantidad)
- Total general del pedido
- Boton de "Ir a Checkout" / "Realizar Pedido"
- Badge en el header/bottom nav con la cantidad total de items

### Persistencia

- El carrito se guarda en el navegador (localStorage)
- Si el usuario cierra y vuelve a abrir, el carrito se mantiene
- Cada tienda tiene su propio carrito separado

---

## 6. Checkout y Pedido via WhatsApp

### Formulario de Checkout

Campos del formulario:
- **Nombre completo** (obligatorio)
- **Numero de WhatsApp** (obligatorio)
- **Email** (opcional)
- **Direccion de entrega** (obligatorio)
- **Notas adicionales** (opcional — instrucciones especiales, referencias, etc.)

### Envio del Pedido

- Al enviar, se genera un mensaje de WhatsApp con formato estructurado
- Se abre WhatsApp Web/App automaticamente con el mensaje pre-llenado
- El mensaje incluye:
  - Lista de productos con cantidades y precios
  - Total del pedido
  - Datos del cliente (nombre, WhatsApp, direccion)
  - Origen del pedido (URL de la tienda)
- Despues de enviar, el carrito se limpia automaticamente

### Formato del Mensaje

```
🛍️ *Nuevo pedido*

*Productos:*
• Producto A × 2 — $224.000
• Producto B × 1 — $89.000

*Total: $313.000*

*Datos del cliente:*
• Nombre: Juan Perez
• WhatsApp: +573001234567
• Direccion: Calle 123 #45-67, Bogota

Pedido desde tiendri.com/mi-tienda
```

---

## 7. Busqueda de Productos

### Funcionalidad

- Input de busqueda accesible desde el header y la pagina de busqueda
- Busqueda en tiempo real (sin necesidad de presionar Enter)
- Busca en: nombre del producto, descripcion, subtitulo
- Resultados se muestran como grilla de product cards
- Si no hay resultados, mostrar estado vacio con mensaje

---

## 8. Filtros y Ordenamiento (Catalogo)

### Filtros Disponibles

| Filtro | Tipo | Opciones |
|--------|------|----------|
| **Categoria** | Checkbox multiple | Todas las categorias disponibles con conteo de productos |
| **Rango de Precio** | Rangos predefinidos | "Menos de $80.000", "$80.000 - $120.000", "$120.000 - $200.000", "Mas de $200.000" |
| **Disponibilidad** | Checkbox | "Disponible" / "Agotado" |

### Ordenamiento

| Opcion | Comportamiento |
|--------|---------------|
| Recientes | Orden original (mas nuevos primero) |
| Menor precio | De menor a mayor precio |
| Mayor precio | De mayor a menor precio |

### Estilos de Filtros por Template

El componente de filtros debe tener diferentes estilos visuales segun el template, adaptandose a la estetica de cada industria:

| Estilo | Descripcion | Templates ejemplo |
|--------|-------------|-------------------|
| **Sidebar clasica** | Panel lateral con checkboxes y acordeones, fondo solido | tech-premium, furniture-light |
| **Minimal flotante** | Filtros como chips/pills flotantes sobre la grilla, sin sidebar | beauty-soft, beauty-elegant |
| **Drawer lateral** | Panel que se desliza desde el costado con overlay oscuro | fashion, furniture-dark |
| **Top bar horizontal** | Filtros en una barra horizontal encima de la grilla, con dropdowns | food-night, decor-warm |

Cada template define su estilo de filtro pero todos deben mantener la misma funcionalidad base (categoria, precio, disponibilidad, ordenamiento).

**En mobile todos los templates usan drawer/bottom sheet** independientemente del estilo desktop.

### UX de Filtros

- **Desktop**: el estilo del panel de filtros varia segun el template (sidebar, chips, drawer, top bar)
- **Mobile**: boton "Filtrar" que abre un panel deslizable (bottom sheet/drawer) — igual en todos los templates
- Badge con cantidad de filtros activos
- Boton para limpiar todos los filtros
- Los filtros se aplican inmediatamente al seleccionar

---

## 9. Pagina de Info de la Tienda

### Contenido

- Nombre de la tienda
- Descripcion / historia del negocio
- Informacion de contacto (telefono, email)
- Horarios de atencion
- Direccion fisica (si aplica)
- Redes sociales (Instagram, Facebook, TikTok)
- Boton de contacto directo por WhatsApp
- Metodos de pago aceptados
- Informacion de envio

---

## 10. Footer

### Contenido Obligatorio

- **Redes sociales**: iconos clickeables de Instagram, Facebook, TikTok
  - Solo se muestran las redes que el comerciante ha configurado
  - Abren en nueva pestana
- **Branding Tiendri**: badge "Creado con Tiendri" con link a tiendri.com
- Espacio inferior extra en mobile para no tapar el bottom nav

### Contenido Opcional

- Columnas de links de servicios (envios, devoluciones, terminos)
- Columnas de links de asistencia (FAQ, contacto, soporte)

---

## 11. Personalizacion por el Comerciante

### Que Puede Personalizar el Comerciante desde el Dashboard

**Tema visual:**
- Paleta de colores (elegir entre 16+ paletas pre-armadas)
- Colores individuales por token (ajuste fino)
- Border radius de cards, categorias, botones
- Par de fuentes (heading + body)

**Layout y grilla:**
- Cantidad de columnas en mobile y desktop (productos, categorias, catalogo, busqueda)
- Ratio de imagen de las cards (1:1, 4:5, 3:4, 16:9)
- Densidad de la grilla (compacta, balanceada, espaciosa)
- Densidad de spacing

**Secciones:**
- Activar/desactivar secciones del home (hero, categorias, productos)

**Contenido:**
- Texto del hero (titulo, subtitulo, descripcion, CTA)
- Links de navegacion
- Links del footer (servicios, asistencia)
- Tabs de detalle de producto
- Busquedas populares sugeridas

**Branding:**
- Nombre de la tienda
- Descripcion
- Logo
- Favicon
- Numero de WhatsApp
- Links de redes sociales (Instagram, Facebook, TikTok)

**Negocio:**
- Moneda y formato de precio
- Metodos de pago
- Informacion de envio
- Ciudad, direccion
- Horarios de atencion

### Preview en Vivo

- Theme Customizer flotante que permite ver cambios de color, fuentes y layout en tiempo real
- Los cambios se aplican instantaneamente sin recargar la pagina

---

## 12. Responsive Design

### Comportamiento por Dispositivo

| Elemento | Mobile | Desktop |
|----------|--------|---------|
| Header | Minimal o escondido | Completo con nav, search, cart |
| Bottom Nav | Visible, fijo abajo | Escondido |
| Grilla de productos | 2 columnas (default) | 4 columnas (default) |
| Filtros | Bottom sheet/drawer | Sidebar lateral |
| Hero | Adaptado a pantalla vertical | Layout completo horizontal |
| Footer | Apilado verticalmente | Columnas horizontales |
| Detalle producto | Stack vertical | Layout con galeria lateral |

### Soporte

- Compatible con safe areas de iPhone (notch, home indicator)
- Touch-friendly: botones y areas de tap suficientemente grandes
- Scroll suave entre secciones

---

## 13. SEO

### Metadata

- Titulo y descripcion unicos por pagina
- Open Graph tags para compartir en redes sociales (titulo, descripcion, imagen)
- Twitter Cards con imagen grande

### Datos Estructurados (JSON-LD)

- **Detalle de producto**: schema Product con nombre, precio (COP), disponibilidad, rating
- **Catalogo**: schema ItemList con todos los productos

### Formato de Precios

- Locale colombiano: `$80.000`, `$1.250.000`
- Moneda: COP (Peso Colombiano)

---

## 14. Idioma y Localizacion

- Todo el texto de la interfaz en **espanol colombiano**
- Etiquetas: "Agregar al carrito", "Ver mas", "Buscar productos", "Filtrar por", "Ordenar por", "Inicio", "Catalogo", "Carrito", "Info"
- Formatos de precio en COP
- Formato de WhatsApp con prefijo de pais (+57)

---

## 15. Funcionalidades Futuras (Roadmap)

Funcionalidades que seria bueno implementar por template en el futuro:

### Prioridad Alta

- **Favoritos / Wishlist**: que el comprador pueda guardar productos para despues (ya hay stub de pagina `/favoritos`)
- **Productos vistos recientemente**: seccion automatica con historial de navegacion
- **Compartir producto**: boton para compartir por WhatsApp, copiar link, redes sociales
- **Galeria de imagenes avanzada**: zoom, swipe, pantalla completa
- **Estados de carga (skeletons)**: placeholder animado mientras cargan los productos

### Prioridad Media

- **Cupones y codigos de descuento**: campo en checkout para aplicar codigos
- **Reviews y valoraciones**: que los compradores puedan dejar opiniones
- **Notificaciones de stock**: "Avisame cuando este disponible"
- **Calculo de envio**: estimado de costo segun ciudad/zona
- **Multiples imagenes por variante**: que cada color/talla tenga su propia galeria

### Prioridad Baja

- **Multi-idioma**: soporte para ingles u otros idiomas
- **Modo oscuro**: toggle de tema claro/oscuro
- **Comparar productos**: seleccionar 2-3 productos y ver comparativa
- **Historial de pedidos**: que el comprador vea pedidos anteriores (requiere auth)
- **Chat en vivo**: widget de chat integrado (Tawk.to, Crisp, etc.)

---

## Checklist de Funcionalidades

Verificacion rapida de que un template cumple con todas las funcionalidades:

### Navegacion
- [ ] Header desktop con logo, nav links, search, cart badge
- [ ] Bottom nav mobile con 4 tabs (home, buscar, carrito, info)
- [ ] Navegacion funcional entre las 7 paginas
- [ ] Header sticky en desktop

### Home
- [ ] Hero banner con titulo, subtitulo, CTA
- [ ] Seccion de categorias con filtrado
- [ ] Grilla de productos con cards
- [ ] Secciones activables/desactivables

### Productos
- [ ] Cards con imagen, nombre, precio, descuento, boton agregar
- [ ] Detalle con galeria, variantes, descripcion, specs, add-to-cart
- [ ] Selector de variantes (medidas, colores, tallas, etc.)
- [ ] Productos relacionados debajo del detalle
- [ ] Tabs/secciones extra configurables en detalle

### Categorias
- [ ] 3 tipos de display (texto, icono+texto, imagen+texto)
- [ ] Soporte para subcategorias anidadas
- [ ] Filtrado de productos por categoria
- [ ] Conteo de productos por categoria

### Carrito
- [ ] Agregar items al carrito
- [ ] Subir cantidad (+)
- [ ] Bajar cantidad (-)
- [ ] Eliminar producto (x)
- [ ] Total del pedido actualizado
- [ ] Badge de cantidad en header/bottom nav
- [ ] Persistencia en localStorage

### Checkout
- [ ] Formulario: nombre, WhatsApp, email, direccion, notas
- [ ] Validacion de campos requeridos
- [ ] Envio a WhatsApp con mensaje formateado
- [ ] Limpieza del carrito post-envio

### Busqueda
- [ ] Input de busqueda en header y pagina dedicada
- [ ] Busqueda en tiempo real
- [ ] Resultados como grilla de cards
- [ ] Estado vacio cuando no hay resultados

### Filtros
- [ ] Filtro por categoria (checkbox)
- [ ] Filtro por rango de precio
- [ ] Filtro por disponibilidad
- [ ] Ordenamiento (reciente, menor precio, mayor precio)
- [ ] Sidebar en desktop, drawer en mobile
- [ ] Badge con conteo de filtros activos

### Info y Footer
- [ ] Pagina de info con contacto, horarios, redes, WhatsApp CTA
- [ ] Footer con redes sociales + "Creado con Tiendri"

### Responsive
- [ ] Mobile-first, funcional en todos los dispositivos
- [ ] Safe areas para iPhone

### SEO
- [ ] Metadata por pagina
- [ ] JSON-LD en detalle de producto y catalogo
- [ ] Open Graph + Twitter Cards
