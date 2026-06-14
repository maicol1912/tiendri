---
name: palette-expert
description: >
  Diseña y recomienda paletas de color con criterio de diseñador gráfico senior. Analiza templates/diseños existentes, recomienda paletas fundamentadas en teoría del color, valida contraste WCAG, y genera output en formato CSS variables.
  Trigger: Cuando se necesite crear paletas de color, recomendar colores para un template, evaluar una paleta existente, o diseñar un sistema de color para una industria específica.
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

## Cuándo usar esta skill

- Crear una nueva paleta para un template de Tiendri
- Evaluar si una paleta existente funciona visualmente y cumple WCAG
- Recomendar paletas basadas en una industria o mood específico
- Analizar un diseño o screenshot y sugerir mejoras de color
- Validar contraste y accesibilidad de una paleta
- Convertir una paleta a CSS variables del sistema Tiendri (`--t-*`)
- Diseñar un sistema de color completo desde cero para una industria nueva

---

## Fundamentos de Teoría del Color — Aplicados a Interfaces

No te quedes en la teoría académica. Cada concepto acá tiene una aplicación directa en UI.

### Armonías de color

| Armonía | Cuándo usarla | Ejemplo de industria |
|---------|--------------|----------------------|
| **Complementaria** | Cuando necesitás máximo contraste y energía. Primary + accent en lados opuestos del círculo | Deportes, tecnología disruptiva |
| **Análoga** | Para cohesión y calma. Colores vecinos en el círculo — paletas suaves y armoniosas | Salud, bienestar, belleza natural |
| **Triádica** | Para diversidad y equilibrio. Tres colores equidistantes — requiere saber cuál domina | Marcas jóvenes, ecommerce vibrante |
| **Split-complementaria** | Complementario más suavizado. Más fácil de equilibrar que la pura complementaria | Fashion, decoración de interiores |
| **Monocromática** | Una sola hue en distintas saturaciones y luminosidades. Sofisticación, premium | Moda de lujo, tech minimalista |

**Regla práctica**: Para storefronts LATAM, la análoga y la monocromática son las más seguras. La complementaria pura cansa si la superficie donde vive el accent es grande.

### Temperatura del color

- **Cálidos** (rojos, naranjas, amarillos, terracota): urgencia, apetito, energía, calidez. Aumentan el tiempo de decisión en food/belleza. Perfectos para CTAs en cualquier industria.
- **Fríos** (azules, verdes, violetas, grises): confianza, calma, tecnología, salud. Reducen la ansiedad de compra. Ideales para el background y las superficies.
- **Neutros** (blanco, gris, crema, negro): no tienen temperatura propia — amplifican los colores que los rodean. El 70-80% de un storefront vive en neutros.

**Cuándo usar cada uno**: Un storefront de comida NO puede tener background azul — inhibe el apetito. Un storefront de tecnología médica NO puede tener accents naranjas chillones — transmite urgencia donde necesita transmitir calma.

### Saturación y luminosidad: señales de estatus

| Saturación | Luminosidad | Percepción |
|-----------|-------------|------------|
| Alta | Media | Vibrante, popular, accesible |
| Baja | Alta | Sofisticado, calmado, premium |
| Baja | Baja | Oscuro, serio, de lujo |
| Alta | Alta | Juguetón, juvenil, casual |

**La regla del premium**: Las marcas de lujo siempre bajan la saturación y aumentan el contraste (fondos muy oscuros o muy claros, accents sutiles pero precisos). Nunca primaries saturados en fondos de color.

### OKLCH vs HSL — Por qué importa

**HSL** miente: `hsl(60, 100%, 50%)` (amarillo) y `hsl(240, 100%, 50%)` (azul) tienen la misma luminosidad en código pero el amarillo se percibe MUCHO más brillante por el ojo humano.

**OKLCH** es perceptualmente uniforme: si dos colores tienen el mismo valor `L`, el ojo los percibe con el mismo brillo. Esto importa para:
1. Generar escalas de color donde cada paso sea visualmente equidistante
2. Derivar hover states que se sientan consistentes (no "este hover es más dramático que ese otro")
3. Asegurar contraste real, no matemático

**Para derivar hover states en OKLCH:**
- Hover de primary: bajar `L` 5-8 puntos (oscurecer)
- Disabled state: subir `L` 20 puntos + bajar `C` 30% (desaturar)
- Focus ring: mantener `H` y `C`, solo cambiar `L`

**Herramienta recomendada**: [oklch.com](https://oklch.com) para manipular colores en tiempo real.

### La regla 60-30-10 en interfaces web

| Proporción | Rol | En Tiendri |
|-----------|-----|-----------|
| **60%** | Color dominante — backgrounds y grandes superficies | `background`, `surface`, `section-bg` |
| **30%** | Color secundario — estructura, secciones, cards | `card-bg`, `header-bg`, `footer-bg`, `border` |
| **10%** | Color de acción — lo que capta la atención | `primary`, `accent`, badges, CTAs |

**Error frecuente**: poner el primary en el header, en los botones, en los badges, en el footer y en los íconos. El primary pierde impacto. Si todo grita, nada se escucha.

---

## Paletas por Industria

Para cada industria: dos paletas completas con hex codes reales, la psicología detrás, las sensaciones que transmite, y una marca real de referencia.

---

### 1. Moda / Fashion

**Psicología**: La moda vive del deseo, la exclusividad y la identidad. Los colores deben decir "esto no es para todos" o "esto es para vos". Dos extremos funcionan: editorial frío (negro + blanco + un acento inesperado) o cálido aspiracional (champán, terracota, dusty rose).

#### Paleta A — "Noir Parisino"
*Sensaciones: exclusividad, editorial, atemporal. Referencia: Sandro Paris.*

```typescript
"noir-parisino": {
  label: "Noir Parisino",
  colors: {
    primary: "#1A1A1A",
    "on-primary": "#F5F0EA",
    secondary: "#8A7968",
    accent: "#C4A882",
    background: "#F5F0EA",
    surface: "#EDE8E0",
    "on-surface": "#1A1A1A",
    text: "#1A1A1A",
    "text-secondary": "#5C5347",
    border: "#D6CFC5",
    "surface-hover": "#E4DDD4",
    "primary-hover": "#333333",
  }
}
```

**Por qué funciona**: El champán (#F5F0EA) como background transmite lujo sin ostentar. El primary negro es editorial — alto contraste, máxima jerarquía. El accent dorado-tostado (#C4A882) es el único toque de calidez y actúa como firma de la marca.

#### Paleta B — "Rosa Ceniza"
*Sensaciones: feminidad contemporánea, suavidad aspiracional. Referencia: Reformation.*

```typescript
"rosa-ceniza": {
  label: "Rosa Ceniza",
  colors: {
    primary: "#8B6363",
    "on-primary": "#FAF7F5",
    secondary: "#C4A8A8",
    accent: "#D4886B",
    background: "#FAF7F5",
    surface: "#F2EAE8",
    "on-surface": "#3D2B2B",
    text: "#3D2B2B",
    "text-secondary": "#7A5C5C",
    border: "#E0D0CE",
    "surface-hover": "#EBE0DE",
    "primary-hover": "#7A5454",
  }
}
```

---

### 2. Tecnología / Tech

**Psicología**: La tecnología vende confianza e innovación. El azul lleva décadas siendo el color de la confianza (IBM, Meta, Samsung). Pero el tech moderno se está moviendo a verde esmeralda, violeta eléctrico y negro profundo para diferenciarse.

**Advertencia**: evitá el azul genérico `#007AFF` como primary sin personalalizarlo. Es el color de Apple, de Tailwind, de Bootstrap. No es tuyo.

#### Paleta A — "Código Profundo" (dark)
*Sensaciones: potencia, modernidad, seriedad técnica. Referencia: Linear.app.*

```typescript
"codigo-profundo": {
  label: "Código Profundo",
  colors: {
    primary: "#5B6AF0",
    "on-primary": "#FFFFFF",
    secondary: "#3D4580",
    accent: "#8B5CF6",
    background: "#0D1117",
    surface: "#161B22",
    "on-surface": "#E6EDF3",
    text: "#E6EDF3",
    "text-secondary": "#8B949E",
    border: "#30363D",
    "surface-hover": "#1C2128",
    "primary-hover": "#4A59DF",
  }
}
```

**Por qué funciona**: El background `#0D1117` es el negro de GitHub — no es negro puro (que fatiga), sino un azul-negro que da profundidad. El violeta `#8B5CF6` como accent es inesperado y diferenciador frente al azul genérico.

#### Paleta B — "Esmeralda Digital" (light)
*Sensaciones: innovación, crecimiento, confianza moderna. Referencia: Stripe (variante verde).*

```typescript
"esmeralda-digital": {
  label: "Esmeralda Digital",
  colors: {
    primary: "#0D7A5F",
    "on-primary": "#FFFFFF",
    secondary: "#065F46",
    accent: "#059669",
    background: "#F9FAFB",
    surface: "#FFFFFF",
    "on-surface": "#111827",
    text: "#111827",
    "text-secondary": "#6B7280",
    border: "#E5E7EB",
    "surface-hover": "#F3F4F6",
    "primary-hover": "#0A6B52",
  }
}
```

---

### 3. Comida / Food

**Psicología**: Los colores cálidos estimulan el apetito — no es un cliché, es neurociencia. Rojo y naranja aumentan la producción de saliva y aceleran la decisión de compra. El amarillo activa la felicidad. Los restaurantes de fast food lo saben desde los 70s.

**Regla crítica**: NUNCA fondo azul en un storefront de comida. El azul es el único color que suprime el apetito en la naturaleza (no hay comida naturalmente azul venenosa). Mismo principio para grises fríos.

#### Paleta A — "Cocina de Autor" (warm dark)
*Sensaciones: calidez artesanal, sofisticación gastronómica. Referencia: Noma, restaurantes de autor.*

```typescript
"cocina-de-autor": {
  label: "Cocina de Autor",
  colors: {
    primary: "#C84B0F",
    "on-primary": "#FFF8F3",
    secondary: "#8B3A10",
    accent: "#F59E0B",
    background: "#1C1009",
    surface: "#2A1A0E",
    "on-surface": "#F5E6D3",
    text: "#F5E6D3",
    "text-secondary": "#C4A882",
    border: "#3D2A18",
    "surface-hover": "#321F12",
    "primary-hover": "#B04210",
  }
}
```

#### Paleta B — "Mercado Fresco" (light vibrant)
*Sensaciones: frescura, mercado local, vibrante. Referencia: Rappi, deliveries premium.*

```typescript
"mercado-fresco": {
  label: "Mercado Fresco",
  colors: {
    primary: "#E03A1A",
    "on-primary": "#FFFFFF",
    secondary: "#EA580C",
    accent: "#FCD34D",
    background: "#FFFBF7",
    surface: "#FFF3EA",
    "on-surface": "#1C0A00",
    text: "#1C0A00",
    "text-secondary": "#6B3020",
    border: "#FDDAC8",
    "surface-hover": "#FEE9D8",
    "primary-hover": "#C93018",
  }
}
```

---

### 4. Belleza / Beauty

**Psicología**: La belleza vende una transformación — la promesa de ser una versión mejor de uno mismo. El color debe acompañar ese deseo sin intimidar. Dos mundos: el lujo frío (blanco clínico, dorado, negro) y el lujo cálido (rosa empolvado, nude, terracota suave).

#### Paleta A — "Atelier" (luxury cold)
*Sensaciones: sofisticación clínica, lujo europeo. Referencia: Chanel Beauty.*

```typescript
"atelier": {
  label: "Atelier",
  colors: {
    primary: "#C9A96E",
    "on-primary": "#1A1410",
    secondary: "#8A7555",
    accent: "#C9A96E",
    background: "#FAFAF8",
    surface: "#F5F3EE",
    "on-surface": "#1A1410",
    text: "#1A1410",
    "text-secondary": "#6B6055",
    border: "#E0D9CE",
    "surface-hover": "#EDEAE3",
    "primary-hover": "#B89458",
  }
}
```

**Por qué funciona**: El dorado-arena `#C9A96E` como primary es más discreto y sofisticado que un dorado brillante. El background no es blanco puro sino crema ligeramente cálida — transmite calidez y exclusividad al mismo tiempo.

#### Paleta B — "Dulce Nude" (warm soft)
*Sensaciones: inclusión, femineidad suave, accesible. Referencia: Rare Beauty de Selena Gomez.*

```typescript
"dulce-nude": {
  label: "Dulce Nude",
  colors: {
    primary: "#C4726A",
    "on-primary": "#FFFFFF",
    secondary: "#E8A598",
    accent: "#D4886B",
    background: "#FDF8F6",
    surface: "#F9EFEb",
    "on-surface": "#2D1A18",
    text: "#2D1A18",
    "text-secondary": "#8B5E58",
    border: "#F0DEDA",
    "surface-hover": "#F4E5E2",
    "primary-hover": "#B06560",
  }
}
```

---

### 5. Muebles / Furniture

**Psicología**: Los muebles venden permanencia, artesanía y hogar. Los colores deben evocar materiales naturales: madera, piedra, lino, cuero. Nada sintético, nada digital. El tono debe transmitir que "este mueble va a durar 20 años".

#### Paleta A — "Madera y Piedra" (warm neutral)
*Sensaciones: artesanía, calidez, permanencia. Referencia: Restoration Hardware.*

```typescript
"madera-y-piedra": {
  label: "Madera y Piedra",
  colors: {
    primary: "#5C4A3A",
    "on-primary": "#F5EFE8",
    secondary: "#8B7355",
    accent: "#A67C52",
    background: "#F5EFE8",
    surface: "#EDE5DB",
    "on-surface": "#2A1F17",
    text: "#2A1F17",
    "text-secondary": "#6B5C4A",
    border: "#D4C5B2",
    "surface-hover": "#E4D9CE",
    "primary-hover": "#4A3A2C",
  }
}
```

#### Paleta B — "Escandinavo Oscuro" (dark nordic)
*Sensaciones: minimalismo nórdico, calidad silenciosa. Referencia: Muuto, Hay.*

```typescript
"escandinavo-oscuro": {
  label: "Escandinavo Oscuro",
  colors: {
    primary: "#4A8C7A",
    "on-primary": "#FFFFFF",
    secondary: "#3A6B5C",
    accent: "#7BC4B0",
    background: "#1A1E1C",
    surface: "#222824",
    "on-surface": "#E8F0EC",
    text: "#E8F0EC",
    "text-secondary": "#9AB0A8",
    border: "#2E3832",
    "surface-hover": "#28302C",
    "primary-hover": "#3E7868",
  }
}
```

---

### 6. Decoración / Home Decor

**Psicología**: La decoración vende un estilo de vida, un ideal de cómo queremos vivir. Paletas orgánicas y cálidas (terracota, salvia, crema, arcilla) son el estándar actual — evocán naturaleza y bienestar post-pandemia.

#### Paleta A — "Terraza Orgánica"
*Sensaciones: acogedor, orgánico, hogar ideal. Referencia: Anthropologie Home.*

```typescript
"terraza-organica": {
  label: "Terraza Orgánica",
  colors: {
    primary: "#8B6A50",
    "on-primary": "#FAF6F1",
    secondary: "#C4936A",
    accent: "#D4A76A",
    background: "#FAF6F1",
    surface: "#F2EAE0",
    "on-surface": "#2A1E14",
    text: "#2A1E14",
    "text-secondary": "#7A6050",
    border: "#E0D0C0",
    "surface-hover": "#EAE0D4",
    "primary-hover": "#7A5C44",
  }
}
```

#### Paleta B — "Salvia Verde"
*Sensaciones: naturaleza interior, calma zen. Referencia: The Sill, plantas de interior.*

```typescript
"salvia-verde": {
  label: "Salvia Verde",
  colors: {
    primary: "#5C7A5A",
    "on-primary": "#F5F8F4",
    secondary: "#7A9878",
    accent: "#A8C4A5",
    background: "#F5F8F4",
    surface: "#EAF0E8",
    "on-surface": "#1E2E1C",
    text: "#1E2E1C",
    "text-secondary": "#507050",
    border: "#D0DECC",
    "surface-hover": "#E0EAD8",
    "primary-hover": "#4E6A4C",
  }
}
```

---

### 7. Deportes / Sports

**Psicología**: Los deportes venden energía, superación y pertenencia a una tribu. Colores de alto contraste que activen la adrenalina — negros profundos con accents neón (verde lima, cian eléctrico, naranja encendido). El color debe hacer que el usuario quiera levantarse y moverse.

#### Paleta A — "Velocidad Máxima" (dark energetic)
*Sensaciones: potencia, velocidad, performance. Referencia: Nike Training App.*

```typescript
"velocidad-maxima": {
  label: "Velocidad Máxima",
  colors: {
    primary: "#B8FF00",
    "on-primary": "#0A0A0A",
    secondary: "#8ACC00",
    accent: "#CCFF33",
    background: "#0A0A0A",
    surface: "#141414",
    "on-surface": "#F5F5F5",
    text: "#F5F5F5",
    "text-secondary": "#A0A0A0",
    border: "#2A2A2A",
    "surface-hover": "#1C1C1C",
    "primary-hover": "#A0E000",
  }
}
```

**Por qué funciona**: El verde lima `#B8FF00` contra negro puro es el contraste más energético posible — es el lenguaje visual de Nike y Under Armour desde hace años. Sin embargo, el lime como `on-primary` texto requiere negro puro para WCAG.

#### Paleta B — "Fuego y Sombra" (warm dark)
*Sensaciones: competencia, pasión, intensidad. Referencia: Adidas Sport.*

```typescript
"fuego-y-sombra": {
  label: "Fuego y Sombra",
  colors: {
    primary: "#FF4D1A",
    "on-primary": "#FFFFFF",
    secondary: "#CC3D15",
    accent: "#FF8C42",
    background: "#0F0A08",
    surface: "#1A1008",
    "on-surface": "#F5EDE8",
    text: "#F5EDE8",
    "text-secondary": "#B09080",
    border: "#2A1C14",
    "surface-hover": "#221610",
    "primary-hover": "#E04518",
  }
}
```

---

### 8. Salud / Health

**Psicología**: La salud vende seguridad, limpieza y bienestar. El verde y azul son los colores de la naturaleza y el cielo — evolutivamente los asociamos con entornos seguros. El blanco clínico transmite higiene. Evitar rojos (urgencia/peligro) salvo para CTAs de emergency.

#### Paleta A — "Clínica Moderna"
*Sensaciones: confianza, limpieza, profesionalismo. Referencia: Clinique, MediFast.*

```typescript
"clinica-moderna": {
  label: "Clínica Moderna",
  colors: {
    primary: "#1B6B8A",
    "on-primary": "#FFFFFF",
    secondary: "#2D8FAF",
    accent: "#4ABCD6",
    background: "#F8FBFD",
    surface: "#FFFFFF",
    "on-surface": "#0F2A36",
    text: "#0F2A36",
    "text-secondary": "#4A7080",
    border: "#D0E8F0",
    "surface-hover": "#EEF6FA",
    "primary-hover": "#165C78",
  }
}
```

#### Paleta B — "Bienestar Natural"
*Sensaciones: bienestar holístico, naturaleza, calma activa. Referencia: Headspace, Calm.*

```typescript
"bienestar-natural": {
  label: "Bienestar Natural",
  colors: {
    primary: "#3A7D6E",
    "on-primary": "#FFFFFF",
    secondary: "#2D6357",
    accent: "#5FAD9E",
    background: "#F5F9F8",
    surface: "#EAF4F1",
    "on-surface": "#0F2822",
    text: "#0F2822",
    "text-secondary": "#4A7068",
    border: "#C8E4DE",
    "surface-hover": "#DFF0EC",
    "primary-hover": "#326B5E",
  }
}
```

---

## Proceso de Análisis de Diseño Existente

Cuando tenés un template o screenshot para analizar, seguí estos pasos en orden. No improvises.

### Paso 1 — Identificar colores dominantes

Recorré mentalmente (o con eyedropper) los grandes planos de color:
- ¿Cuál es el background principal?
- ¿Cuál es el color de las superficies (cards, headers, navbars)?
- ¿Cuántos colores distintos ocupan más del 5% del viewport?

Un buen diseño tiene máximo 2-3 colores con área significativa. Si hay más, hay problema de foco.

### Paso 2 — Identificar colores de acción

- ¿Cuál es el color de los botones primarios?
- ¿Los links tienen un color propio?
- ¿Los badges y etiquetas de descuento tienen color?
- ¿El primary contrasta suficientemente con el surface donde vive?

### Paso 3 — Evaluar jerarquía visual

El ojo del usuario debe ir en este orden: **CTA principal → Precio / info clave → Categorías → Navegación**. Los colores deben guiar ese recorrido.

Preguntas:
- ¿El color del precio/CTA es el más saturado del viewport?
- ¿El header compite visualmente con el contenido principal?
- ¿Hay más de un color que "grita" al mismo nivel?

### Paso 4 — Verificar contraste texto/fondo

Siempre verificar los pares críticos:
- Texto de precio sobre card background
- Texto de CTA sobre primary button
- Texto secundario sobre background principal

Herramienta recomendada: [webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

### Paso 5 — Evaluar consistencia

- ¿Todos los borders tienen el mismo color?
- ¿Hay colores que aparecen una sola vez sin propósito (huérfanos)?
- ¿El footer usa colores del mismo sistema o parece un cortar-pegar de otro diseño?

### Paso 6 — Diagnosticar con la tabla de problemas comunes

| Problema | Síntoma visible | Fix específico |
|----------|----------------|---------------|
| **Palette mud** | Todo se ve grisáceo, sin energía, aplastado | Aumentar saturación del `accent` y `primary`. Aumentar contraste entre `background` y `surface` (mínimo 3% de diferencia en L) |
| **Too many accents** | Nada destaca porque todo compite. El usuario no sabe dónde hacer click | Reducir a 1 `accent` + 1 `secondary`. El resto son neutros |
| **Bad hierarchy** | El usuario no identifica el CTA ni el precio principal | El `primary` debe ser el color más saturado y contrastante del viewport. Si hay algo más saturado, ese es el problema |
| **Cold food template** | Comida con backgrounds azulados, grises fríos o violáceos | Warm shift completo: backgrounds crema/beige, accents naranja-rojo, bordes cálidos |
| **Generic tech** | Azul corporativo sin personalidad, podría ser cualquier empresa | Reemplazar por colores inesperados: verde esmeralda, violeta, amber. Mantener el azul como secondary solo |
| **Low contrast** | Texto difícil de leer en dispositivos con baja luminosidad | Mínimo 4.5:1 (AA). Verificar en negro de carbón (#1A1A1A) contra blanco roto (#FAFAFA) como base |
| **Vibrating colors** | Colores muy saturados adyacentes que "vibran" y lastiman la vista | Separar con neutro o bajar saturación de uno de los dos. Nunca rojo 100% sat junto a verde 100% sat |
| **Flat surfaces** | Cards y background son el mismo color — no hay profundidad | `surface` debe ser 3-5% más claro o más oscuro que `background` en OKLCH lightness |
| **Accent = primary** | El accent se usa con la misma frecuencia que el primary — nada diferencia CTAs de decoración | El accent debe aparecer máximo un 5-10% del tiempo. Si aparece más, se convierte en primary |

---

## Cómo Recomendar una Paleta — Árbol de Decisión

Seguí este flujo antes de proponer cualquier color. No propongas colores al azar.

```
¿Para qué industria?
│
├─→ Identificar psicología de la industria (ver sección anterior)
│
¿Qué mood/vibe tiene la marca?
│
├─→ Premium / Lujo
│     Baja saturación general, alto contraste, fondos muy oscuros o muy claros
│     Accents sutiles pero precisos (dorado, bronce, blanco roto)
│     Sin colores vibrantes en grandes superficies
│
├─→ Playful / Casual
│     Alta saturación, colores cálidos, fondos claros
│     Accents brillantes que generan alegría
│     Bordos visibles, cards con colores tenues
│
├─→ Professional / Confianza
│     Azules o verdes de media saturación, grises estructurados
│     Spacing visual generoso, bordes finos
│     CTAs en colores de acción claros pero no agresivos
│
├─→ Organic / Natural
│     Verdes, terracota, crema, beige, colores tierra
│     Sin nada sintético ni fluorescente
│     Fondos ligeramente amarillos-crema, no blancos puros
│
└─→ Bold / Energético
      Contrastes fuertes, accents que dominan el viewport
      Fondos oscuros o blancos puros (no intermedios)
      Primary vibrante, secondary contrastante

¿Light mode o dark mode?
│
├─→ Dark:
│     background: entre #0B0A0D y #1A1A2E (nunca negro puro)
│     surface: background + 3-5 puntos en OKLCH L
│     text: entre #E0E0E0 y #F5F5F5 (nunca blanco puro)
│
└─→ Light:
      background: entre #F8F9FA y #FFFBF7 (nunca blanco puro)
      surface: background - 2-4 puntos en OKLCH L (ligeramente más oscuro)
      text: entre #1A1A1A y #212121 (nunca negro puro)

¿Cuántos colores necesitás?
│
├─→ Mínimo viable (4 tokens): primary + background + surface + text
├─→ Estándar Tiendri (8 tokens): + secondary + accent + border + text-secondary
└─→ Completa Tiendri (12 tokens): + on-primary + on-surface + surface-hover + primary-hover
```

**Regla de oro**: siempre proponé 3 opciones con justificación. Nunca una sola. El CTO elige, vos justificás. Eso es diseño senior.

---

## Formato de Output — CSS Variables Tiendri

Toda recomendación de paleta DEBE incluir los dos formatos siguientes, listos para copiar y usar:

### Formato palettes.ts (para agregar a `src/templates/{nombre}/palettes.ts`)

```typescript
import type { ColorPalette } from "@/types/templates/config-schema";

export const templatePalettes: ColorPalette[] = [
  {
    id: "nombre-kebab-case",           // guardado en customization.theme.paletteId
    name: "Nombre Descriptivo",         // mostrado en el picker del dashboard
    description: "Una línea describiendo la estética",
    style: "premium",                   // minimal | premium | corporate | warm | vibrant | nature | brutalist | playful
    preview: ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],  // 5 swatches para el picker
    colors: {
      primary: "#HEX",
      "on-primary": "#HEX",
      secondary: "#HEX",
      accent: "#HEX",
      background: "#HEX",
      surface: "#HEX",
      "on-surface": "#HEX",
      text: "#HEX",
      "text-secondary": "#HEX",
      border: "#HEX",
      "surface-hover": "#HEX",
      "primary-hover": "#HEX",
    }
  }
];
```

### Formato CSS variables (para `TemplateLayoutClient.tsx` o inyección directa)

```css
/* Paleta: Nombre Descriptivo */
--t-primary: #HEX;
--t-on-primary: #HEX;
--t-secondary: #HEX;
--t-accent: #HEX;
--t-background: #HEX;
--t-surface: #HEX;
--t-on-surface: #HEX;
--t-text: #HEX;
--t-text-secondary: #HEX;
--t-border: #HEX;
--t-surface-hover: #HEX;
--t-primary-hover: #HEX;
```

**Nota crítica sobre la integración en Tiendri**: El storefront en `/[slug]` usa `buildCssVars.ts` que auto-convierte camelCase a `--t-kebab-case`. Pero el preview en `/template/[templateName]` usa `TemplateLayoutClient.tsx` que mapea **manualmente** — cada token nuevo debe agregarse ahí también. Si falta, el preview se rompe silenciosamente (el CSS var queda undefined, el browser fallback es transparente).

---

## Validación de Contraste WCAG

Toda paleta recomendada DEBE pasar estos umbrales. Sin excepción.

### Tabla de ratios mínimos

| Elemento | Mínimo AA | Ideal AAA | Par a verificar |
|----------|-----------|-----------|-----------------|
| Body text (16px-) | 4.5:1 | 7:1 | `text` / `background` |
| Texto grande (24px+ o 18.67px bold+) | 3:1 | 4.5:1 | `text` / `background` |
| Elementos UI (borders, inputs, íconos) | 3:1 | 4.5:1 | `border` / `background` |
| Botones primarios | 4.5:1 | 7:1 | `on-primary` / `primary` |
| Links y accents | 3:1 | 4.5:1 | `accent` / `background` |
| Texto secundario | 4.5:1 | 7:1 | `text-secondary` / `background` |
| Texto sobre surface | 4.5:1 | 7:1 | `on-surface` / `surface` |

### Cómo derivar hover y disabled states

**Hover state** (oscurecer el color, no saturar):
```
// En OKLCH: bajar L entre 5-8 puntos
primary:       oklch(55% 0.18 250)
primary-hover: oklch(47% 0.18 250)   // -8 en L
```

**Disabled state** (desaturar + aclarar, no solo transparencia):
```
// En OKLCH: subir L 20+ puntos, bajar C a 30% del original
primary:          oklch(55% 0.18 250)
primary-disabled: oklch(75% 0.05 250)  // +20 L, C×0.28
```

**Surface hover** (muy sutil, sin cambiar hue):
```
// Surface hover: solo 3-5 puntos en L
surface:       oklch(97% 0.005 80)
surface-hover: oklch(94% 0.005 80)   // -3 en L
```

### Regla del dark mode

Si `background` tiene OKLCH L < 30%, entonces:
- `text` DEBE tener OKLCH L > 80%
- `text-secondary` DEBE tener OKLCH L > 55%
- `on-surface` DEBE tener OKLCH L > 75%
- Nunca definir texto oscuro sobre background oscuro — el resultado es invisible

---

## Anti-Patterns — Lo Que Hace un Junior, Lo Que Hace un Senior

| Anti-Pattern (Junior) | Por qué es malo | Fix Senior |
|----------------------|----------------|-----------|
| Usar el color exacto de la marca como `primary` sin ajustar | El brand color puede tener saturación extrema, contraste insuficiente, o simplemente no estar pensado para interfaz | Derivar el primary del brand color ajustando L y C en OKLCH hasta que cumpla WCAG 4.5:1 sobre el surface |
| Elegir colores bonitos en Dribbble sin testear contraste | Se ve perfecto en monitor de diseñador bien calibrado, ilegible en celular de gama baja con brillo bajo | Siempre verificar ratio con webaim.org. Después abrír en modo avión + brillo al 30% |
| Copiar paletas de UI kits sin adaptarlas | Una paleta de Framer Template está hecha para portfolio, no para storefront de empanadas en Medellín | Adaptar industria, público objetivo y dispositivos target. La paleta de Linear no es para tu tienda de ropa |
| Usar blanco puro `#FFFFFF` como background | Demasiado bright, fatiga visual especialmente en dark + white harsh transitions | Off-whites: `#FAFAFA`, `#F8F9FA`, `#FFFBF7`. El blanco puro solo en superficies pequeñas (cards sobre background off-white) |
| Usar negro puro `#000000` para texto | Contraste excesivo sobre fondos claros — "vibra" y fatiga más que near-blacks | Near-blacks: `#1A1A1A`, `#212121`, `#111827`. El negro puro solo para texto sobre colores brillantes |
| `surface` == `background` | No hay profundidad visual, todo se ve plano, las cards no se distinguen de la página | `surface` debe tener entre 2-5 puntos de diferencia en OKLCH L respecto a `background` |
| `accent` con la misma frecuencia de uso que `primary` | Accent pierde su función diferenciadora. Si todo es especial, nada es especial | `accent` máximo en 10% de los elementos UI. Si lo usás más, convertilo en `secondary` |
| Primary en el header + en botones + en badges + en íconos activos | Violación de la regla 60-30-10. El ojo no sabe dónde ir | Elegir UN lugar privilegiado para el primary (botones CTA). El resto usa secondary o neutros con bordes de primary |
| Surface hover más saturado que el estado base | El hover debe ser sutil — una señal leve. Si es muy dramático, distrae y parece un glitch | Surface hover: solo 3-5 puntos en L (OKLCH). Nunca cambiar H o C para hovers sutiles |
| Definir paleta sin testear en dark mode Y light mode | Una paleta pensada solo para light puede romperse completamente en dark y viceversa | Siempre diseñar ambas variantes desde el inicio. El sistema Tiendri admite paletas dark y light |

---

## Workflow Completo de Recomendación

Seguí estos 6 pasos en orden. No salteés ninguno.

### 1. Input — Recopilar contexto

Antes de proponer un solo color, obtener:
- **Industria**: ¿qué vende el merchant?
- **Mood/vibe**: ¿premium, casual, artesanal, tecnológico?
- **Light o dark mode**: ¿o ambos?
- **¿Hay brand colors existentes?**: logo, colores de redes sociales
- **Referencia visual**: ¿hay un diseño de referencia, competidor, o template base?
- **Público objetivo**: ¿quién va a comprar? (influye en temperatura de color y saturación)

### 2. Investigar — Anclar en marcas reales

Identificar 2-3 marcas exitosas de la industria y analizar sus paletas. No para copiar, sino para entender el lenguaje visual que el cliente ya conoce y en qué te podés diferenciar.

### 3. Generar — Crear 3 opciones contrastantes

Las 3 opciones deben ser genuinamente distintas:
- Opción A: más conservadora/segura
- Opción B: con más personalidad
- Opción C: inesperada/disruptiva

Cada opción con hex codes completos para los 12 tokens del sistema Tiendri.

### 4. Presentar — Justificar cada elección

Para cada paleta:
- **Nombre descriptivo** que comunique la estética
- **Hex codes completos** (nunca "un azul oscuro" sin hex)
- **Justificación psicológica**: por qué estos colores para esta industria/público
- **Mock visual simple**: describir cómo se vería bg + card + botón + texto
- **Contraste verificado**: qué pares cumplen AA/AAA

### 5. Refinar — Incorporar feedback del CTO

El CTO elige o pide ajustes. Nunca defender una paleta si el cliente la rechaza — entender el feedback, ajustar en OKLCH y volver a presentar con los cambios documentados.

### 6. Exportar — Output listo para usar

Una vez aprobada la paleta:
- Formato `palettes.ts` completo (ver sección de Output Format)
- CSS variables `--t-*` correspondientes
- Instrucciones de integración si el template ya existe o si es uno nuevo

---

## Integración Técnica — Sistema de Templates Tiendri

Esta sección cubre el plumbing técnico: cómo conectar una paleta diseñada al sistema de templates.

### Prerequisito crítico: eliminar hardcoded colors

Antes de agregar paletas, todos los componentes del template deben usar CSS vars. Si hay colores hardcoded, las paletas son inútiles.

**Audit command — ejecutar primero:**
```bash
rg "text-black|text-white|bg-white|bg-black|text-gray-|text-zinc-|text-slate-|bg-gray-|bg-zinc-|bg-slate-|border-gray-|border-black|fill-black|stroke-black|ring-black|divide-gray-" src/templates/{template-name}/components/
```

**Tabla de reemplazos:**

| Hardcoded | Reemplazar con |
|-----------|---------------|
| `text-black`, `text-gray-900` | `text-[var(--t-text-primary)]` |
| `text-gray-700` | `text-[var(--t-text-secondary)]` |
| `text-gray-500`, `text-gray-400` | `text-[var(--t-text-muted)]` |
| `bg-white` | `bg-[var(--t-section-bg)]` o `bg-[var(--t-card-bg)]` |
| `bg-gray-50`, `bg-gray-100` | `bg-[var(--t-card-bg)]` |
| `bg-gray-900`, `bg-black` | `bg-[var(--t-background)]` |
| `border-gray-200`, `border-gray-300` | `border-[var(--t-card-border)]` o `border-[var(--t-divider)]` |
| `hover:bg-gray-50` | `hover:opacity-90` o `hover:bg-[var(--t-card-bg)]` |

**Excepciones intencionales** (no reemplazar):
- Texto sobre fondos configurables por contenido (hero banners con prop `bgColor`)
- Backdrops de modales (`bg-black/40`)
- Indicadores semánticos (`text-red-500` para campos requeridos)
- Swatches de colores de productos (datos de contenido, no de tema)

### Arquitectura de tokens por template

**Tokens requeridos mínimos:**

| Grupo | Tokens | Propósito |
|-------|--------|-----------|
| **Core** | `primary`, `secondary`, `background` | Identidad de marca + bg de página |
| **Text** | `textPrimary`, `textSecondary`, `textMuted`, `textSubtle`, `textFooter`, `textBreadcrumb` | Todas las variantes de texto |
| **Surfaces** | `cardBg`, `sectionBg`, `headerBg`, `surface`, `searchBg`, `reviewBg`, `paginationBg` | Backgrounds de áreas UI |
| **Borders** | `border`, `borderLight`, `borderInput`, `borderMid`, `navBorder` | Divisores y bordes |
| **Buttons** | `buttonBg`, `buttonText` | CTAs |
| **Footer** | `footerBg` | Background de footer |
| **Badges** | `badgeBg`, `badgeText` | Badges de carrito, etiquetas de descuento |
| **Interactive** | `tabActive`, `categoryActiveBg`, `categoryActiveText`, `ratingStar`, `ratingBarBg` | Estados activos |
| **Popular cards** | `popularBg0-3`, `popularText0-3` | Ver sección dedicada abajo |

### Popular product card tokens

Los tokens `popularBg0-3` y `popularText0-3` DEBEN definirse por paleta. Fórmulas genéricas (`color-mix`) producen resultados feos en paletas oscuras.

**Paletas light** — progresión de near-white a gris medio:
```
popularBg0: "#F6F6F6"   // muy claro
popularBg1: "#EAEAEA"   // claro-medio
popularBg2: "#CDCDCD"   // medio
popularBg3: "#9A9A9A"   // medio-oscuro (NUNCA near-black)
popularText0-2: "#000000"  // texto oscuro
popularText3: "#FFFFFF"    // texto claro (la card es suficientemente oscura)
```

**Paletas dark** — progresión desde claramente-más-claro-que-la-página:
```
// Card 0 MUST ser visiblemente diferente del background de página
popularBg0: "#3A4A5C"   // MUCHO más claro que page bg (~#0D1117)
popularBg1: "#2C3A4C"   // medio
popularBg2: "#1E2A3C"   // medio-oscuro
popularBg3: "#101C2C"   // near page bg
popularText0-3: "#E6EDF3" / "#FFFFFF"  // texto claro en todos
```

**Reglas críticas:**
- Card 0 (el más claro) MUST tener contraste visible contra `background`
- Card 3 (el más oscuro) se acerca pero NUNCA iguala `background`
- En paletas light, card 3 va a gris medio (~#9A9A9A), NUNCA a negro
- En paletas dark, card 0 necesita al menos +30-40 puntos de lightness sobre el page bg

### Inyección de CSS vars — dos rutas distintas

El sistema tiene dos formas de inyectar CSS vars y se comportan diferente:

**Ruta storefront** (`/[slug]`) → usa `buildCssVars.ts` → **auto-convierte camelCase → `--t-kebab-case`**. Agregar un token a `config.ts` es suficiente.

**Ruta preview** (`/template/[templateName]`) → usa `TemplateLayoutClient.tsx` → **mapeo MANUAL**. Cada token nuevo DEBE agregarse explícitamente:

```tsx
// src/app/template/[templateName]/TemplateLayoutClient.tsx
"--t-text-primary": colors.textPrimary,
"--t-header-bg": colors.headerBg,
"--t-section-bg": colors.sectionBg,
"--t-popular-bg0": colors.popularBg0,
// ... etc
```

Si falta una entrada en TemplateLayoutClient, el preview falla silenciosamente (la CSS var queda `undefined`, el browser hace fallback a transparent) y las paletas dark se ven rotas.

**Regla**: todo token agregado a `config.ts` DEBE también estar en `TemplateLayoutClient.tsx`.

### Checklist de archivos (al agregar paletas a un template)

```
1. CREATE  src/templates/{name}/palettes.ts
   └─ Exportar templatePalettes: ColorPalette[]

2. MODIFY  src/templates/{name}/config-schema.ts
   └─ Importar palettes, agregar a theme.palettes

3. MODIFY  src/templates/{name}/config.ts
   └─ Agregar tokens nuevos a default colors (debe coincidir con palette #1)

4. MODIFY  src/app/template/[templateName]/TemplateLayoutClient.tsx
   └─ Agregar declaraciones CSS var para TODOS los tokens nuevos

5. AUDIT   src/templates/{name}/components/**/*.tsx
   └─ Cero hardcoded colors — todos usan var(--t-*) tokens
```

### Palette #1 = defaults actuales

La paleta número 1 DEBE coincidir EXACTAMENTE con los colores del `config.ts` actual del template. Esto asegura que los stores existentes no vean ningún cambio visual cuando se agrega el sistema de paletas.

### Anti-patterns de migración

| Anti-pattern | Por qué rompe | Enfoque correcto |
|-------------|---------------|-----------------|
| Usar `color-mix()` para popular card backgrounds | Dark palettes producen colores intermedios feos | Tokens `popularBg0-3` dedicados por paleta |
| `footerBg` como ancla oscura para gradiente de cards | El footer es near-black — las cards quedan demasiado oscuras | Anclas oscuras moderadas, o tokens dedicados |
| Hardcoded `text-black` en componentes | Dark palettes = texto negro sobre bg oscuro = invisible | `text-[var(--t-text-primary)]` |
| Tokens faltantes en TemplateLayoutClient | El token existe en config pero no se inyecta como CSS var | Agregar CADA token a TemplateLayoutClient manualmente |
| Mismo color de texto para todos los popular cards | Las cards con bg oscuro necesitan texto claro, las claras texto oscuro | `popularText0-3` por paleta |
| Card 0 muy cerca del page bg en paletas dark | Sin distinción visible entre card y página | Card 0 debe ser +30-40 lightness sobre page bg |
| Ir a near-black en card 3 de paleta light | Demasiado dramático, no coincide con el diseño original | Gris medio (~#9A9A9A) máximo, nunca negro |

### Verificación

1. `npx tsc --noEmit` — cero errores
2. Aplicar palette #1 (default) — el template se ve IDÉNTICO a antes
3. Aplicar una paleta LIGHT — todo el texto legible, todas las secciones visibles
4. Aplicar una paleta DARK — texto legible, cards distintas del page bg, popular cards con gradiente visible
5. Cambiar entre paletas — sin artefactos visuales, transiciones suaves
6. Verificar TODAS las páginas: home, detalle de producto, listing, carrito, checkout, búsqueda

---

## Recursos

- Ver `ai/skills/design-system/SKILL.md` — tokens Ember Core, sistema de tipografía y spacing del proyecto
- Ver `docs/css-variables.md` — catálogo completo de CSS vars `--t-*` disponibles
- Ver `src/templates/tech-premium/palettes.ts` — referencia de 16 paletas implementadas y verificadas (dark y light)
- Ver `src/types/templates/config-schema.ts` — interfaz `ColorPalette` con todos los campos tipados
- Ver `src/lib/buildCssVars.ts` — auto-mapea camelCase → `--t-kebab-case` para storefront
- Ver `src/app/template/[templateName]/TemplateLayoutClient.tsx` — mapeo manual para preview
- Herramienta de contraste: [webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)
- Manipulación OKLCH: [oklch.com](https://oklch.com)
