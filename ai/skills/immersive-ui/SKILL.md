---
name: immersive-ui
description: >
  Patrones de diseño inmersivo/premium: dark UI, 3D (Spline/Three.js), glassmorphism, GSAP scroll animations, bento grids, glow effects.
  Trigger: Cuando se diseñe o implemente landing pages, showcases, o secciones con alto impacto visual.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Landing pages que necesitan impacto visual premium
- Secciones con elementos 3D (globos, objetos, visualizaciones)
- Dark UI con glow effects, glassmorphism
- Scroll animations avanzadas con GSAP ScrollTrigger
- Bento grid layouts con cards de tamaños variados
- Counters animados, live feeds, métricas visuales

## Critical Patterns

### Dark UI — reglas base

| Regla | Detalle |
|-------|---------|
| Fondo | NUNCA negro puro (#000). Usar #0A0A0B, #0F0F11, #121214 — oscuro con matiz |
| Texto | Blanco para headings (#FFFFFF), gris claro para body (#A1A1AA, #D4D4D8) |
| Borders | Sutiles, semi-transparentes: `border border-white/5` o `border border-white/10` |
| Superficies | Cards con fondo ligeramente más claro que el background: `bg-white/5` |
| Glow | Accent color con blur: `shadow-[0_0_30px_rgba(accent,0.15)]` |
| Contraste | Mínimo 4.5:1 para texto — verificar con herramienta |

### Glassmorphism

```css
/* Card con efecto glass */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
border-radius: 16px;
```

Reglas:
- NO abusar — máximo 2-3 elementos glass por viewport
- Funciona mejor sobre fondos con contenido visual (gradientes, 3D)
- Siempre tener fallback sin backdrop-filter para browsers viejos

### Bento Grid

| Patrón | Descripción |
|--------|-------------|
| Tamaños variados | Cards de 1x1, 2x1, 1x2, 2x2 en la misma grilla |
| Asimetría | NUNCA 3 cards iguales — variar tamaños intencionalmente |
| Contenido mixto | Combinar: texto, métricas, mini-visualizaciones, íconos animados |
| Gap | 16-24px entre cards, consistente |

```html
<!-- Ejemplo de bento grid -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="col-span-2 row-span-2"><!-- Card grande --></div>
  <div><!-- Card pequeña --></div>
  <div><!-- Card pequeña --></div>
  <div class="col-span-2"><!-- Card ancha --></div>
</div>
```

### Glow Effects

```css
/* Glow en elemento */
box-shadow: 0 0 20px rgba(accent, 0.15), 0 0 60px rgba(accent, 0.05);

/* Punto de luz pulsante */
@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Glow en texto */
text-shadow: 0 0 20px rgba(accent, 0.3);
```

### 3D — flujo Valentina → Camilo

| Paso | Quién | Qué |
|------|-------|-----|
| 1 | Valentina | Diseña escena en Spline (spline.design) |
| 2 | Valentina | Exporta como .splinecode, lo guarda en `public/3d/` |
| 3 | Camilo | Integra con `@splinetool/react` en un Client Component |
| 4 | Camilo | Lazy loading: `dynamic(() => import('./Scene3D'), { ssr: false })` |
| 5 | Camilo | Fallback estático para mobile: imagen PNG en vez de 3D |

```tsx
// Integración de Spline — Camilo
'use client'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-white/5 rounded-2xl h-[400px]" />
})

export function HeroScene() {
  return <Spline scene="/3d/hero-scene.splinecode" />
}
```

### GSAP ScrollTrigger — patrones comunes

| Patrón | Uso |
|--------|-----|
| Fade-up on scroll | Secciones que aparecen al scrollear |
| Pin + scrub | Sección que se "fija" mientras el contenido cambia |
| Parallax layers | Elementos que se mueven a diferentes velocidades |
| Counter animation | Números que cuentan desde 0 al valor final |
| Stagger reveal | Elementos de una grilla que aparecen uno por uno |

Regla: GSAP se usa cuando Framer Motion no alcanza (timelines complejas, pin, scrub). Para reveals simples, Framer Motion es suficiente.

### Counters animados

```
// Descripción para Valentina:
// "Tres métricas grandes: '5 min', '$0', '0%' 
// que cuentan desde 0 al valor final cuando entran en viewport"

// Camilo implementa con GSAP o un hook custom
```

### Métricas / Stats section

| Componente | Descripción |
|------------|-------------|
| Número grande | Font display, peso 800, tamaño 3xl-5xl |
| Label debajo | Font body, peso 400, text-muted |
| Disposición | 3-4 métricas en fila, separadas por dividers sutiles |
| Animación | Counter desde 0 al scrollear al viewport |

### Live Feed / Activity Cards

Cards que simulan actividad en tiempo real:
- Borde sutil glass
- Ícono + título + timestamp
- Stagger animation al entrar
- Pueden pulsar sutilmente para simular "en vivo"

### Scroll Animations — qué usar cuándo

| Necesidad | Herramienta |
|-----------|-------------|
| Fade-up simple | Framer Motion `whileInView` |
| Stagger de lista | Framer Motion `staggerChildren` |
| Pin section | GSAP ScrollTrigger `pin: true` |
| Scrub animation | GSAP ScrollTrigger `scrub: true` |
| Parallax | GSAP ScrollTrigger con `y` offset |
| Page transition | Framer Motion `AnimatePresence` |
| Timeline compleja | GSAP `gsap.timeline()` |
| Counter | GSAP `gsap.to()` o hook custom |

## Anti-patterns inmersivos

| NO hacer | Hacer en cambio |
|----------|-----------------|
| 3D en TODA la página | 3D solo en hero o showcase — 1-2 escenas máximo |
| Glow en todos los elementos | Glow solo en el accent/CTA — 2-3 puntos de luz |
| Glass en todo | Glass en 2-3 cards destacadas, el resto sólido |
| Animaciones en cada scroll pixel | Animar solo transiciones entre secciones |
| Fondo negro puro #000 | Oscuro con matiz (#0A0A0B, #0F0F11) |
| Gradiente azul-violeta-rosa | Gradientes sutiles con colores de la paleta |
| Mismo glow/efecto en todo | Variar intensidad según jerarquía |

## Performance con 3D (CRÍTICO)

| Regla | Detalle |
|-------|---------|
| SSR: false | Escenas 3D SIEMPRE con `ssr: false` en dynamic import |
| Lazy load | Solo cargar 3D cuando es visible (Intersection Observer) |
| Fallback mobile | Imagen estática en dispositivos de gama baja |
| Bundle | 3D NUNCA en el bundle principal — siempre code split |
| Suspense | Skeleton/placeholder mientras carga la escena |
| Prefers-reduced-motion | Respetar — sin 3D si el usuario lo desactiva |

## Commands

```bash
# Instalar Spline para React
pnpm add @splinetool/react-spline @splinetool/runtime

# Instalar GSAP
pnpm add gsap

# Instalar React Three Fiber (alternativa a Spline)
pnpm add @react-three/fiber @react-three/drei three

# Tipos de Three.js
pnpm add -D @types/three
```

## Resources

- **Inspiración**: supahero.io, 21st.dev, bentogrids.com
- **3D**: spline.design (editor), sketchfab.com (modelos)
- **Documentación**: Ver [references/](references/) para docs del proyecto
