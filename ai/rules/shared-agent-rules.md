# Reglas compartidas — Todos los agentes

> Estas reglas aplican a TODOS los agentes del equipo. Son obligatorias, no sugerencias.

---

## 1. ANTES DE EMPEZAR CUALQUIER TAREA

Ejecutar en este orden, SIN EXCEPCIONES:

1. Leer `ai/rules/tiendri-rules.md` — reglas de negocio, convenciones, seguridad
2. Leer `ai/rules/reading-list.md` — identificar qué docs adicionales te corresponden por rol y leerlos
3. Cargar los skills obligatorios de tu agente (los que dicen "SIEMPRE" en tu tabla de skills)
4. Entender el contexto completo ANTES de escribir una sola línea

Si tu agente tiene steps adicionales (ej: Valentina verifica design system, Steve consulta branding), van DESPUÉS de estos 4.

---

## 2. REGLA DE ENTREGA (BASE)

NUNCA entregar trabajo sin verificar que funciona. No se acepta "hice los cambios, verificá vos".

### Checklist base — todos los agentes que escriben código:

1. **TypeScript**: `npx tsc --noEmit` — CERO errores. Sin excepción.
2. **Browser (UI)**: si el cambio afecta UI → validar en browser con agent-browser OBLIGATORIAMENTE. `tsc` sin errores NO es suficiente — verifica tipos, no renderizado.
3. **Iterar**: si algo falla o se ve mal → corregir y volver a verificar. Hasta 3 intentos.
4. **Consistencia**: verificar que no rompiste otras secciones o componentes existentes

### Checklist adicional por rol:

| Rol | Verificaciones extra |
|-----|---------------------|
| Frontend (Camilo) | Golden Path completo, CERO errores de consola JS, overflow (h-screen), responsive 375px + 1440px, screenshots como evidencia |
| UI/UX (Valentina) | Anti-AI check, responsive 375px + 1440px, screenshots como evidencia, checklist visual completa |
| Backend (Santiago) | Migraciones sin error, Server Actions compilan, Zod schemas validan |
| SEO (Martín) | Score de rúbrica sube, metadata completa, structured data válido |
| Copy (Sofía) | Score humanizalo > 42/60 |

**Regla de browser para Valentina y Camilo**: la validación en browser NO es opcional. Ver protocolo completo en `ai/agents/uiux-designer.md` (sección "Validación con Browser") y `ai/agents/frontend-senior.md` (sección "Validación con Browser").

### Regla de escalamiento:

- Tenés autonomía para hacer 2-3 iteraciones de corrección SIN preguntar al CTO
- Solo escalar al CTO si después de 3 iteraciones no resolvés el problema
- Al escalar: reportar QUÉ intentaste, QUÉ falló y POR QUÉ creés que no funciona

---

## 3. COMUNICACIÓN CON EL CTO

- **Proponer ANTES de ejecutar** decisiones de diseño, paleta, tipografía o estructura de página
- **No asumir** — si algo no está claro, preguntar. PARAR y esperar respuesta
- **Reportar problemas con evidencia** — "no anda" no es un reporte. Decir QUÉ no anda, DÓNDE y POR QUÉ
- **No mentir sobre el estado** — si no verificaste, decí que no verificaste

---

## 4. CALIDAD Y ESTÁNDARES

### Código:

- TypeScript strict, NUNCA `any`
- Nombres descriptivos que se entienden solos
- Funciones cortas, responsabilidad única
- Imports: 1) externos, 2) internos, 3) tipos
- Archivos en kebab-case, componentes en PascalCase
- Conventional commits: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`

### UI (aplica a Valentina y Camilo):

- Mobile-first SIEMPRE — el target usa Moto E con datos lentos
- Jerarquía visual clara — el usuario sabe dónde mirar
- Whitespace como herramienta de diseño, no como espacio vacío
- Color con propósito — cada color comunica algo
- Motion con intención — si no guía al usuario ni comunica estado, sobra
- Anti-AI aesthetic — ver `ai/rules/anti-ai-patterns.md`

### Copy (aplica a Sofía):

- Español neutro LATAM — ni colombiano cerrado, ni argentino marcado
- Beneficio antes que característica
- Cero tecnicismos — el usuario nunca tuvo web
- Pasar TODO por humanizalo

---

## 5. OUTPUTS Y ARCHIVOS

### Regla de ubicación:

- Borradores, drafts, exploraciones, previews → `tmp/`
- NUNCA escribir directamente en `ai/`, `docs/`, `public/` o `src/` para contenido draft
- Solo el CTO decide qué se promueve de `tmp/` a su ubicación final

### Regla de no-duplicación:

- Antes de crear un componente, verificar que no existe uno similar
- Antes de definir un color o token, verificar el design system existente
- Reutilizar antes que crear

---

## 6. COLABORACIÓN ENTRE AGENTES

### Separación Valentina ↔ Camilo:

| Valentina hace | Camilo hace |
|---------------|-------------|
| Estructura visual: HTML + Tailwind + CSS variables | Estado, lógica, hooks, event handlers |
| DESCRIBE animaciones en comentarios | IMPLEMENTA con Framer Motion, GSAP |
| Diseña en Spline, exporta .splinecode | Integra con @splinetool/react + lazy loading |
| Define estados visuales (hover, active, scroll) | Implementa la interactividad |
| Define responsive visual | Implementa con Tailwind breakpoints |

Si Valentina entrega código con `useState`, `useEffect` o event handlers complejos → está MAL.

### Separación Steve → Valentina → Camilo:

1. Steve genera el asset (imagen/video) con prompt aprobado por el CTO
2. Valentina define DÓNDE y CÓMO se integra visualmente
3. Camilo implementa la integración técnica (lazy loading, fallbacks, degradados)

### Diego y Andrea:

- Solo se activan cuando el CTO lo solicita
- Diego reporta vulnerabilidades, NO corrige código
- Andrea reporta bugs, NO corrige código
- Ambos asignan fixes a Santiago o Camilo

---

## 7. PRINCIPIOS UNIVERSALES

1. **"Si parece hecho por IA, está mal"** — todo output debe sentirse humano, intencional, con criterio
2. **"Mobile primero, siempre"** — 84% del comercio WhatsApp en Colombia es desde celular
3. **"Verificar antes de entregar"** — "funciona en mi cabeza" no es validación
4. **"No inventar, preguntar"** — si no está definido, consultá antes de asumir
5. **"Componentes, no páginas"** — pensar en sistemas reutilizables
