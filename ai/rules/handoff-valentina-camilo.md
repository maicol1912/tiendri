# Handoff Contract: Valentina → Camilo

## Propósito

Estandarizar la entrega de diseño visual para que Camilo tenga TODO el contexto necesario sin tener que inferir comportamientos, animaciones o estados.

**Tiempo estimado para completar**: 5-10 minutos por entrega.

---

## Template de Entrega

Valentina DEBE completar este template antes de pasar trabajo a Camilo. Camilo DEBE verificar que está completo antes de empezar.

---

### 1. Componentes Entregados

Lista de archivos/componentes con ubicación y propósito:

```
- tmp/design-previews/ProductCard.tsx     → Card de producto con imagen, nombre, precio y CTA
- tmp/design-previews/ProductGrid.tsx     → Grilla de cards con responsive 2→3→4 cols
- tmp/design-previews/CartDrawer.tsx      → Panel lateral con items del carrito
```

---

### 2. Estados Visuales

Para CADA componente interactivo (solo completar los que aplican, poner "—" en los que no):

| Componente | Default | Hover | Active | Disabled | Loading | Empty | Error |
|------------|---------|-------|--------|----------|---------|-------|-------|
| _ejemplo: ProductCard_ | ✅ base | escala 1.02 + sombra sutil | escala 0.98 | opacity 50% | skeleton layout | — | — |
| _ejemplo: CartButton_ | ✅ base | color primario oscurece 10% | ripple | opacity 40% | spinner inline | — | — |

> **Regla**: si Valentina no completó esta tabla, Camilo DEBE pedirla antes de implementar. No inventar estados.

---

### 3. Animaciones Deseadas

Para CADA animación (usar terminología GSAP/Framer Motion — ver `ai/agents/uiux-designer.md`):

| Elemento | Trigger | Tipo | Duración | Easing | Notas |
|----------|---------|------|----------|--------|-------|
| _ejemplo: ProductCard_ | mouseenter | scale 1→1.02 + shadow | 200ms | ease-out | Sutil, no exagerado |
| _ejemplo: Hero section_ | scroll enter 80% viewport | opacity 0→1 + y 40→0 | 600ms | power2.out | stagger 150ms entre cards |
| _ejemplo: CartDrawer_ | open | slide desde derecha (x: 100%→0) | 300ms | ease-out | AnimatePresence para unmount |

> Si no hay animaciones especiales → escribir: "Solo CSS transitions estándar de Tailwind (hover, focus)."

---

### 4. Comportamiento Responsive

Cambios de layout entre breakpoints (solo los que difieren del mobile-first):

| Breakpoint | Cambio |
|------------|--------|
| < 768px | Layout X — bottom sticky bar visible, grid 2 cols |
| 768px–1024px | Grid 3 cols, bottom bar oculta, botón inline |
| > 1024px | Grid 4 cols, sidebar visible, 2 columnas en detail |

> Si el responsive ya está implementado visualmente con clases Tailwind en los archivos → escribir: "Responsive implementado con Tailwind, ver clases en el componente."

---

### 5. Tokens y Variables CSS Usadas

- Variables `--t-*` referenciadas: `--t-primary`, `--t-surface`, `--t-text-muted`, ...
- Font pair aplicado: _ej: "Inter para body, Sora para headings"_
- Spacing scale: _ej: "base-4 (p-4), base-6 (section padding)"_

> Si usó un color hardcodeado en vez de una variable → explicar POR QUÉ o Camilo lo cambia.

---

### 6. Lo Que Camilo NO Debe Cambiar

Elementos visuales intencionales que no son bugs:

- _ej: El gap de 3px entre cards es intencional — no subirlo a gap-4_
- _ej: El color `text-zinc-400` en el precio original es intencional — no usar `text-muted-foreground`_
- _ej: El `border-b` en el header sin shadow es decisión de diseño_

> Si todo puede cambiarse libremente → escribir: "Sin restricciones — Camilo tiene libertad de ajustar si lo ve necesario para funcionalidad."

---

### 7. Lo Que Camilo DEBE Agregar

Checklist de responsabilidades de Camilo sobre esta entrega:

- [ ] `'use client'` donde haya interactividad
- [ ] Estado de loading (skeleton específico del componente, NO spinner genérico)
- [ ] Error boundaries si hay data fetching
- [ ] Accesibilidad: `aria-label`, `role`, keyboard navigation, `focus-visible`
- [ ] Server/Client Component split correcto
- [ ] Data fetching / Server Actions conectados
- [ ] Animaciones implementadas (según tabla sección 3)
- [ ] Validación de Golden Path completo antes de entregar

> Tachar los que no aplican a esta entrega.

---

## Reglas del Contrato

### Para Valentina (antes de entregar)

1. Completar este template — sin excepciones
2. Los estados visuales deben estar visibles en el código (no solo descritos aquí)
3. Animaciones descriptas como comentarios `{/* ANIMACIÓN — ... */}` directamente en el JSX
4. Hacer browser validation visual (screenshots mobile + desktop) ANTES de pasar a Camilo
5. Si hay dudas de implementación → preguntar al CTO, no inventar

### Para Camilo (al recibir)

1. Verificar que las 7 secciones del template están completas — si falta alguna, pedirla antes de empezar
2. NO cambiar elementos visuales sin avisar (si algo se ve "raro", preguntar)
3. Respetar al 100% colores, spacing y layout de lo que entregó Valentina
4. Las animaciones descritas por Valentina son el spec — implementar con Framer Motion o GSAP según complejidad
5. Al terminar: Golden Path + browser validation + screenshots como evidencia

---

## Ejemplo de Handoff Bien Hecho

```
### 1. Componentes Entregados
- tmp/design-previews/beauty-soft/ProductCard.tsx — card con imagen, nombre, precio, botón agregar

### 2. Estados Visuales
| Componente  | Default | Hover         | Active       | Disabled  | Loading         |
|-------------|---------|---------------|--------------|-----------|-----------------|
| ProductCard | ✅      | sombra medium | scale 0.97   | —         | skeleton 3 rows |
| AddButton   | ✅      | bg oscurece   | ripple efecto| opacity 50%| spinner inline |

### 3. Animaciones Deseadas
| Elemento    | Trigger       | Tipo           | Duración | Easing    |
|-------------|---------------|----------------|----------|-----------|
| ProductCard | scroll enter  | opacity+y 20px | 400ms    | ease-out  |
| AddButton   | click         | scale 0.95→1   | 150ms    | spring    |

### 4. Responsive
< 768px: grid 2 cols, imagen aspect-square
> 1024px: grid 4 cols, sin cambios en card structure

### 5. Tokens
--t-primary, --t-surface-card, --t-text, --t-border
Font: Inter (body), sin heading especial

### 6. No Cambiar
- border-radius de 12px en cards (no usar rounded-xl que son 16px)

### 7. Camilo agrega
- [x] 'use client'
- [x] Loading skeleton
- [x] aria-label en botón agregar
- [x] onClick handler → addToCart()
- [x] Animación de entrada con Framer Motion
```
