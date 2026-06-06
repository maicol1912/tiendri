# Sistema de Onboarding — Referencia Técnica

> Documentación del wizard de configuración inicial, el sistema de vibes, la detección de primer uso, el tour guiado y el checklist persistente.

---

## Tabla de contenidos

1. [Visión general del flujo](#1-visión-general-del-flujo)
2. [Los 5 pasos del wizard](#2-los-5-pasos-del-wizard)
3. [Sistema de vibes — 5 vibes + 13 presets](#3-sistema-de-vibes--5-vibes--13-presets)
4. [Gestión de estado — OnboardingProvider](#4-gestión-de-estado--onboardingprovider)
5. [Detección de primer uso y redirect guard](#5-detección-de-primer-uso-y-redirect-guard)
6. [Creación de la tienda al submit](#6-creación-de-la-tienda-al-submit)
7. [Tour guiado — driver.js](#7-tour-guiado--driverjs)
8. [Checklist persistente](#8-checklist-persistente)
9. [Cómo modificar el wizard](#9-cómo-modificar-el-wizard)

---

## 1. Visión general del flujo

```
/onboarding?step=1   Step 1: Nombre + WhatsApp
         |
         v
/onboarding?step=2   Step 2: Modo de catálogo
         |
         v
/onboarding?step=3   Step 3: Selección de vibe
         |
         v
/onboarding?step=4   Step 4: Refinamiento de preset
         |
         v
/onboarding?step=5   Step 5: Branding (color + logo)
         |
         v
   [Crear mi tienda]
         |
         |  handleCreateStore():
         |    - applyPreset(presetId, { templateId: 'tech-premium' })
         |    - Aplica accentColor como color primary
         |    - Escribe storeMeta en localStorage
         |    - Escribe customization en localStorage
         |    - markOnboardingCompleted()
         |    - sessionStorage.setItem('tiendri_tour_trigger', 'true')
         |
         v
/onboarding?step=celebration   CelebrationScreen (pantalla completa)
         |
         v
/dashboard   (el tour se dispara automáticamente)
```

La ruta está en `src/app/(onboarding)/onboarding/page.tsx`. El step se controla por query param (`?step=N`), no por estado interno — esto permite navegación con el botón Atrás del browser.

---

## 2. Los 5 pasos del wizard

El shell del wizard es `src/components/onboarding/onboarding-shell.tsx`. Maneja:
- Barra de progreso de 5 segmentos
- Label "Paso N de 5 — {título del paso}"
- Animaciones de entrada/salida al cambiar de paso (slide forward/backward)
- Botones "Anterior" y "Siguiente / Crear mi tienda"
- Prop `canProceed` para habilitar/deshabilitar el botón de avance

Títulos de los pasos: Tu tienda | Tu catálogo | El estilo | El look | Tu marca

### Paso 1 — Información de la tienda

**Archivo:** `src/components/onboarding/step1-store-info.tsx`

**Captura:**
- `storeName` — nombre de la tienda (mínimo 3 caracteres)
- `whatsapp` — 10 dígitos colombianos (prefijo +57 mostrado, no guardado)
- `slug` — generado automáticamente desde `storeName` (slugify: lowercase, sin acentos, guiones)

**Validación para avanzar:** `storeName.trim().length >= 3` AND `whatsapp matches /^3\d{9}$/` AND `slug.length >= 3`

**Lógica notable:** El slug se genera en tiempo real via `useEffect` cuando cambia `storeName`. La función `toSlug` normaliza acentos (NFD + strip combining chars), reemplaza espacios con guiones y trunca a 30 caracteres.

### Paso 2 — Modo de catálogo

**Archivo:** `src/components/onboarding/step2-catalog-mode.tsx`

**Captura:** `catalogMode` — una de dos opciones:
- `"simple"` — Directo: pocas categorías o productos del mismo tipo (ej: perfumería, barbería)
- `"nested"` — Por secciones: muchas categorías anidadas (ej: ferretería, ropa por segmento)

**Validación para avanzar:** `catalogMode !== null`

**UI:** Dos tarjetas de selección con ícono SVG, título, descripción y ejemplo.

### Paso 3 — Selección de vibe

**Archivo:** `src/components/onboarding/step3-vibe-selection.tsx`

**Captura:** `selectedVibe` (VibeId) + `selectedPresetId` (string — preset default del vibe)

Al seleccionar un vibe, el paso actualiza automáticamente `selectedPresetId` al `defaultPresetId` del vibe. El paso 4 le permite al merchant refinar dentro del vibe.

**Validación para avanzar:** `selectedVibe !== null`

**UI:** Grid de tarjetas con swatches de 3 colores representativos del vibe, nombre, descripción y tags de tipos de tienda.

### Paso 4 — Refinamiento de preset

**Archivo:** `src/components/onboarding/step4-preset-refinement.tsx`

**Captura:** `selectedPresetId` — refinamiento dentro del vibe seleccionado

Muestra solo los presets del vibe elegido en el paso 3. Si `selectedVibe` es null (el merchant llegó directamente al paso 4 sin pasar por el 3), muestra un mensaje pidiendo que vuelva.

**Validación para avanzar:** `true` (siempre permitido — el preset default del vibe ya está preseleccionado)

**UI:** Tarjetas de preset via `PresetPreviewCard` (`src/components/onboarding/preset-preview-card.tsx`).

### Paso 5 — Branding

**Archivo:** `src/components/onboarding/step5-branding.tsx`

**Captura:**
- `accentColor` (AccentColor) — 12 opciones de color de acento
- `logoUrl` (string | null) — logo subido como Data URL via `useImageUpload`

**Validación para avanzar:** `true` (ambos campos son opcionales)

**UI:**
- Grid de 12 swatches de color (6 columnas × 2 filas)
- Drop zone para subir logo (drag & drop + click). Acepta PNG, JPG, WebP, máx. 5 MB.
- Preview del logo subido con botón "Quitar"

### Pantalla de celebración

**Archivo:** `src/components/onboarding/celebration-screen.tsx`

Se muestra cuando `?step=celebration`. Es una pantalla fullscreen con:
- Fondo del `accentColor` elegido
- Texto adaptado al contraste (claro para blanco/amarillo, blanco para todo lo demás)
- Link directo a `tiendri.co/{slug}`
- Botón de compartir por WhatsApp (pre-compuesto con el URL)
- Botón "Ir al panel de control" que llama `resetState()` y navega a `/dashboard`

---

## 3. Sistema de vibes — 5 vibes + 13 presets

Definido en `src/lib/onboarding/vibe-preset-map.ts`.

Un **vibe** es una categoría amplia de estética que agrupa 2–3 presets relacionados. El merchant elige primero un vibe (paso 3) y luego refina cuál de los presets de ese vibe quiere (paso 4).

### Los 5 vibes

| ID | Nombre | Descripción | Presets incluidos | Preset default | Colores preview |
|---|---|---|---|---|---|
| `elegante` | Elegante | Sofisticada. Que tus productos brillen en silencio. | galeria, boutique-elegante, editorial-lujo | `galeria` | `#1a1a2e`, `#c9a96e`, `#f5f5f0` |
| `moderno` | Moderno | Limpia, digital, directa. Como las marcas grandes. | tech-premium, instagram-aesthetic, neon-night | `tech-premium` | `#0a0a0a`, `#6366f1`, `#ffffff` |
| `energetico` | Energético | Colores, movimiento y alegría. Colombia viva. | deportivo-energy, tropical-vibrante, pop-juvenil | `tropical-vibrante` | `#ff6b35`, `#ffc107`, `#00c853` |
| `calido` | Cálido | Con historia y alma. Hecha a mano, sentida de verdad. | artesanal-rustico, vintage-retro | `artesanal-rustico` | `#8b6914`, `#d4a574`, `#f5ebe0` |
| `catalogo` | Catálogo | Sin adornos. Tus productos, el precio, el pedido. | mercado-popular, corporate-catalog | `mercado-popular` | `#ffffff`, `#333333`, `#e53935` |

### VibeConfig

```typescript
export interface VibeConfig {
  id: VibeId                          // 'elegante' | 'moderno' | 'energetico' | 'calido' | 'catalogo'
  name: string
  description: string
  presetIds: string[]                 // IDs de los presets del vibe
  defaultPresetId: string             // preset preseleccionado al elegir el vibe
  defaultTemplateId: string           // siempre 'tech-premium' (MVP)
  previewColors: [string, string, string]  // 3 colores hex para los swatches
  targetStores: string               // CSV de tipos de tienda
}
```

---

## 4. Gestión de estado — OnboardingProvider

**Archivo:** `src/lib/onboarding/onboarding-provider.tsx`

El estado del onboarding se gestiona en un React Context con localStorage como draft store.

### OnboardingState

```typescript
export interface OnboardingState {
  step: OnboardingStep         // 1 | 2 | 3 | 4 | 5
  storeName: string
  whatsapp: string             // 10 dígitos, sin prefijo +57
  slug: string                 // generado desde storeName
  catalogMode: CatalogMode | null     // 'simple' | 'nested' | null
  selectedVibe: VibeId | null
  selectedPresetId: string | null
  accentColor: AccentColor | null
  logoUrl: string | null       // Data URL del logo (Base64)
}
```

### AccentColor

12 opciones: `'rojo' | 'naranja' | 'amarillo' | 'verde' | 'turquesa' | 'azul' | 'violeta' | 'rosa' | 'negro' | 'gris' | 'blanco' | 'cafe'`

### API del contexto

```typescript
interface OnboardingContextValue {
  state: OnboardingState
  updateField: <K extends keyof OnboardingState>(field: K, value: OnboardingState[K]) => void
  goToStep: (step: OnboardingStep) => void
  resetState: () => void
}
```

### Persistencia de draft

- **Clave localStorage:** `tiendri_onboarding_draft`
- El estado se carga desde localStorage en la inicialización del `useState` (solo en cliente)
- Cada cambio de estado hace `localStorage.setItem` via `useEffect`
- `resetState()` borra el item del localStorage y vuelve a `INITIAL_ONBOARDING_STATE`

Esto permite que el merchant pueda cerrar el browser y continuar donde quedó.

---

## 5. Detección de primer uso y redirect guard

**Archivo:** `src/lib/onboarding/first-time.ts`

**Clave localStorage:** `tiendri_onboarding_completed` → `"true"`

```typescript
// Verificar si el onboarding fue completado
isOnboardingCompleted(): boolean   // false en servidor (SSR-safe)

// Marcar como completado (llamado al crear la tienda)
markOnboardingCompleted(): void

// Conveniencia: ¿debería redirigir a /onboarding?
shouldRedirectToOnboarding(): boolean   // = !isOnboardingCompleted()
```

El redirect guard debe implementarse en el layout o middleware del dashboard. El patrón estándar es:

```typescript
// En un layout o page server component del dashboard
if (shouldRedirectToOnboarding()) {
  redirect('/onboarding?step=1')
}
```

**Nota SSR:** `isOnboardingCompleted()` retorna `true` cuando `window === undefined` (server-side) para evitar redirects en SSR. La verificación real ocurre solo en cliente.

---

## 6. Creación de la tienda al submit

Al completar el paso 5 y hacer click en "Crear mi tienda", se ejecuta `handleCreateStore()` en `src/app/(onboarding)/onboarding/page.tsx`.

### Qué escribe en localStorage

#### 1. Metadatos de la tienda

**Clave:** `tiendri_demo-store_store`

```json
{
  "name": "Nombre de la tienda",
  "slug": "nombre-de-la-tienda",
  "whatsapp": "+573001234567",
  "catalog_mode": "simple"
}
```

#### 2. Customización completa

**Clave:** `CUSTOMIZATION_STORAGE_KEY` (importado desde `src/app/(dashboard)/dashboard/configuracion/actions`)

El valor es una `StoreCustomization` construida así:

```typescript
// 1. Aplicar el preset seleccionado (o el default del vibe, o 'tech-premium')
let customization = applyPreset(presetId, { templateId: 'tech-premium' })

// 2. Si eligió un color de acento, inyectarlo como primary
if (state.accentColor) {
  customization = {
    ...customization,
    theme: {
      ...customization.theme,
      colors: { ...customization.theme?.colors, primary: ACCENT_HEX[accentColor] },
    },
  }
}

// 3. Si subió un logo, guardarlo en branding
if (state.logoUrl) {
  customization = {
    ...customization,
    branding: { ...customization.branding, logo: state.logoUrl },
  }
}
```

#### 3. Flags de estado

| Clave | Valor | Significado |
|---|---|---|
| `tiendri_onboarding_completed` | `"true"` | Onboarding completado, no redirigir más |
| `tiendri_tour_trigger` | `"true"` (sessionStorage) | Disparar el tour cuando el dashboard cargue |

### Flujo completo de claves en localStorage tras el onboarding

| Clave | Tipo | Contenido |
|---|---|---|
| `tiendri_onboarding_completed` | localStorage | `"true"` |
| `tiendri_demo-store_store` | localStorage | JSON con name, slug, whatsapp, catalog_mode |
| `CUSTOMIZATION_STORAGE_KEY` | localStorage | JSON con StoreCustomization completa |
| `tiendri_onboarding_draft` | localStorage | Borrado (`resetState()`) |
| `tiendri_tour_trigger` | sessionStorage | `"true"` — borrado al disparar el tour |

---

## 7. Tour guiado — driver.js

**Archivo principal:** `src/hooks/useDashboardTour.ts`
**Definición de pasos:** `src/lib/onboarding/tour-steps.ts`

### Trigger mechanism

El tour se dispara por una combinación de dos flags:
1. `sessionStorage['tiendri_tour_trigger'] === 'true'` — flag efímero, se destruye al disparar el tour
2. `localStorage['tiendri_tour_completed'] !== 'true'` — el tour solo se muestra una vez por device

El hook `useDashboardTour` debe montarse en el layout del dashboard:

```typescript
// En el layout principal del dashboard
export function DashboardLayout({ children }) {
  useDashboardTour() // <-- hook que dispara el tour si corresponde
  return <>{children}</>
}
```

### Implementación del hook

El hook usa `import()` dinámico para cargar `driver.js` y su CSS solo cuando es necesario (no en el bundle principal). El delay de 800ms asegura que el DOM esté listo después de la navegación.

### Los 5 pasos del tour

| # | Elemento | Título | Descripción |
|---|---|---|---|
| 1 | `[data-tour="productos"]` | Agregá tu primer producto | "Acá subís los productos que tus clientes van a ver. Empezá con uno — nombre, foto y precio." |
| 2 | `[data-tour="categorias"]` | Organizá con categorías | "Las categorías ayudan a tus clientes a encontrar más rápido lo que buscan." |
| 3 | `[data-tour="configuracion"]` | Personalizá tu tienda | "Cambiá colores, tipografía, secciones y el estilo general. Todo se ve al instante." |
| 4 | `[data-tour="preview"]` | Mirá cómo se ve | "Así ven tus clientes tu tienda. Probala antes de compartirla." |
| 5 | `[data-tour="compartir"]` | Compartí tu link | "Mandá el link por WhatsApp, Instagram o donde quieras. ¡Ya estás online!" |

### Configuración de driver.js

```typescript
driver({
  showProgress: true,
  animate: true,
  overlayColor: 'rgba(0,0,0,0.5)',
  stagePadding: 8,
  stageRadius: 8,
  popoverClass: 'tiendri-tour-popover',
  nextBtnText: 'Siguiente',
  prevBtnText: 'Anterior',
  doneBtnText: '¡Listo!',
  onDestroyed: () => {
    localStorage.setItem('tiendri_tour_completed', 'true')
  },
})
```

**Claves localStorage del tour:**

| Clave | Tipo | Significado |
|---|---|---|
| `tiendri_tour_trigger` | sessionStorage | Bandera efímera para disparar el tour |
| `tiendri_tour_completed` | localStorage | El tour ya fue mostrado, no mostrarlo más |

Los elementos del DOM deben tener el atributo `data-tour="{nombre}"` correspondiente. Sin ese atributo, driver.js skipea el paso silenciosamente.

---

## 8. Checklist persistente

**Archivo:** `src/components/dashboard/tour-checklist.tsx`

El checklist es un widget en el sidebar del dashboard que muestra el progreso del merchant en sus primeras 5 tareas. Se oculta automáticamente cuando todos los items están completados.

### Los 5 items del checklist

| ID | Label | Link | Clave de completion |
|---|---|---|---|
| `name` | Nombre y link listos | `/dashboard` | `tiendri_onboarding_completed` |
| `whatsapp` | WhatsApp conectado | `/dashboard` | `tiendri_onboarding_completed` |
| `product` | Agregá tu primer producto | `/dashboard/productos` | `tiendri_checklist_product` |
| `share` | Compartí el link | `/dashboard/compartir` | `tiendri_checklist_shared` |
| `order` | Recibí tu primer pedido | `#` (sin link) | `tiendri_checklist_order` |

Los primeros dos items (`name` y `whatsapp`) usan la misma clave `tiendri_onboarding_completed`, que se marca al completar el wizard. El resto requieren acciones explícitas del merchant que deben marcar sus claves correspondientes.

### Comportamiento

- Lee el estado de completion desde localStorage on mount (evita SSR mismatch con `mounted` flag)
- Barra de progreso animada (`width: {percent}%` con `transition-all`)
- Se puede colapsar/expandir (estado en `tiendri_checklist_hidden`)
- Desaparece permanentemente cuando `completedCount === totalCount`
- Items completados: aparecen con `CheckCircle2` verde, tachados y con opacity reducida
- Items pendientes con link: aparecen como `<Link>` clicables
- Items pendientes sin link (`href === '#'`): aparecen como texto sin interacción

---

## 9. Cómo modificar el wizard

### Agregar un nuevo campo a un paso existente

1. Agregar el campo a `OnboardingState` en `src/types/onboarding.ts`
2. Actualizar `INITIAL_ONBOARDING_STATE` con el valor inicial
3. Agregar la UI al componente del paso correspondiente
4. Usar `updateField('nombreCampo', valor)` para escribir en el estado
5. Si el campo es requerido para avanzar, actualizar `canProceedForStep` en `src/app/(onboarding)/onboarding/page.tsx`
6. Usar el campo en `handleCreateStore()` si afecta la customización inicial

### Agregar un nuevo paso

1. Incrementar `TOTAL_STEPS` en `src/components/onboarding/onboarding-shell.tsx`
2. Agregar el título del nuevo paso a `STEP_TITLES`
3. Actualizar el tipo `OnboardingStep` en `src/types/onboarding.ts` (actualmente `1 | 2 | 3 | 4 | 5`)
4. Crear el componente del nuevo paso en `src/components/onboarding/step{N}-{nombre}.tsx`
5. Agregar el componente al objeto `stepComponents` en la página del onboarding
6. Agregar la lógica de validación en `canProceedForStep`

### Eliminar un paso

Seguir los pasos anteriores en sentido inverso. Tener cuidado con: la numeración de los pasos restantes, los query params (`?step=N`), y el `TOTAL_STEPS` en el shell.

### Agregar un nuevo vibe

1. Agregar el ID al tipo `VibeId` en `src/types/onboarding.ts`
2. Agregar la configuración completa a `VIBE_CONFIGS` en `src/lib/onboarding/vibe-preset-map.ts`
3. Los presets listados en `presetIds` deben existir en `src/lib/presets/presets.ts`

### Agregar un nuevo color de acento

1. Agregar el ID al tipo `AccentColor` en `src/types/onboarding.ts`
2. Agregar el hex en `SWATCHES` en `src/components/onboarding/step5-branding.tsx`
3. Agregar el hex en `ACCENT_HEX` en `src/components/onboarding/celebration-screen.tsx`
4. Agregar el hex en `ACCENT_HEX` en `src/app/(onboarding)/onboarding/page.tsx`

---

_Última actualización: 2026-06-06_
_Basado en: `src/types/onboarding.ts`, `src/lib/onboarding/`, `src/components/onboarding/`, `src/hooks/useDashboardTour.ts`, `src/components/dashboard/tour-checklist.tsx`, `src/app/(onboarding)/onboarding/page.tsx`_
