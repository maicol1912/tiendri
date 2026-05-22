---
name: browser-testing
description: >
  Navegar sitios web, tomar screenshots, inspeccionar UI, testear flujos y verificar diseño con agent-browser.
  Trigger: Cuando se necesite ver una página en el browser, tomar screenshots, verificar responsive, o inspeccionar un sitio de referencia.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Ver cómo se ve la landing o cualquier página del proyecto en el browser
- Tomar screenshots de secciones específicas
- Testear responsive en diferentes viewports
- Navegar sitios de referencia para extraer patrones de diseño
- Verificar que animaciones y transiciones funcionan
- Testear flujos de usuario (onboarding, checkout, etc.)
- Comparar antes/después de cambios visuales

## Critical Patterns

### Flujo básico de navegación

| Paso | Tool MCP | Qué hace |
|------|----------|----------|
| 1 | `browser_navigate` | Abre una URL |
| 2 | `browser_snapshot` | Ve la estructura accesible de la página |
| 3 | `browser_take_screenshot` | Captura lo que se ve en el viewport |
| 4 | `browser_evaluate` | Ejecuta JavaScript (scroll, resize, etc.) |
| 5 | `browser_close` | Cierra el browser cuando termina |

### Tomar screenshots de toda la página

```
1. browser_navigate → URL
2. browser_take_screenshot (viewport actual)
3. browser_evaluate → window.scrollBy(0, 800)
4. browser_take_screenshot (siguiente sección)
5. Repetir hasta cubrir toda la página
```

### Screenshot full-page (una sola imagen)

```
browser_take_screenshot con fullPage: true
```
Nota: las animaciones de scroll (whileInView) quedan en opacity 0 en full-page. Mejor scrollear sección por sección.

### Testear responsive

| Viewport | Comando |
|----------|---------|
| Mobile | `browser_resize` → width: 375, height: 812 |
| Tablet | `browser_resize` → width: 768, height: 1024 |
| Desktop | `browser_resize` → width: 1440, height: 900 |

```
1. browser_navigate → URL
2. browser_resize → { width: 375, height: 812 }
3. browser_take_screenshot → "mobile.png"
4. browser_resize → { width: 1440, height: 900 }
5. browser_take_screenshot → "desktop.png"
```

### Scroll a una posición exacta

```javascript
// Scroll al inicio
browser_evaluate → () => window.scrollTo(0, 0)

// Scroll 800px abajo
browser_evaluate → () => window.scrollBy(0, 800)

// Scroll al final
browser_evaluate → () => window.scrollTo(0, document.body.scrollHeight)

// Scroll a un elemento específico
browser_evaluate → () => document.querySelector('#precios').scrollIntoView()
```

### Interactuar con elementos

| Acción | Tool |
|--------|------|
| Click en un botón | `browser_click` con selector o texto |
| Escribir en un input | `browser_fill_form` o `browser_type` |
| Hover sobre un elemento | `browser_hover` |
| Presionar una tecla | `browser_press_key` |
| Seleccionar un dropdown | `browser_select_option` |

### Verificar que el dev server está corriendo

```bash
# Antes de navegar, verificar que el server responde
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
# Si devuelve 200, está listo
```

### Si el browser se cierra o se pierde la conexión

```
1. browser_close (limpia la sesión vieja)
2. browser_navigate → URL (abre una nueva)
```

### Navegar sitios de referencia

Para analizar diseño de otros sitios:
```
1. browser_navigate → URL del sitio
2. browser_take_screenshot → capturar secciones
3. Anotar: colores, tipografía, layout, animaciones, efectos
4. browser_close cuando termine
```

### Naming de screenshots

Usar nombres descriptivos para los screenshots:
```
landing-hero.png
landing-pricing.png
landing-mobile-hero.png
reference-agentai-hero.png
before-fix.png
after-fix.png
```

Los screenshots se guardan en la raíz del proyecto. Limpiar cuando ya no se necesiten.

### Verificar console errors

```
browser_console_messages → ver errores JS, warnings, etc.
```

### Verificar network requests

```
browser_network_requests → ver qué recursos carga la página (útil para performance)
```

## Quién la usa

| Agente | Para qué |
|--------|----------|
| Orquestador | Ver el estado actual de la landing, verificar cambios |
| Andrea (QA) | Testear flujos, responsive, edge cases |
| Valentina | Verificar que el diseño se ve como esperaba |
| Camilo | Verificar que las animaciones funcionan |

## Commands

```bash
# Verificar que el dev server está corriendo
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000

# Iniciar dev server si no está corriendo
cd "D:/info maicol/Documents/PERSONAL_PROJECTS/tiendri" && pnpm dev

# Limpiar screenshots temporales
rm -f *.png
```

## Resources

- **agent-browser skill**: `ai/skills/agent-browser`
- **Documentación del proyecto**: Ver [references/](references/)
