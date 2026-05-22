# Anti-AI Patterns — Checklist Definitiva

> Si algo parece generado por IA, se rehace. Sin discusión.
> Esta checklist aplica a: Valentina (diseño), Camilo (implementación), Sofía (copy).

---

## PATRONES VISUALES PROHIBIDOS

Cada uno de estos delata que una UI fue generada por IA. NUNCA usarlos:

### Gradientes y color
- [ ] NO gradientes lineales genéricos (especialmente azul → violeta → rosa)
- [ ] NO degradados en backgrounds de hero sections sin propósito claro
- [ ] NO colores que no pertenecen a una paleta definida con roles
- [ ] NO colores random que "se ven bien juntos" sin sistema

### Layout y composición
- [ ] NO layouts perfectamente simétricos sin jerarquía visual
- [ ] NO secciones de 3 columnas iguales con ícono + título + párrafo
- [ ] NO spacing uniforme robot-like sin ritmo ni tensión visual

### Cards y componentes
- [ ] NO cards con border-radius, padding y sombras idénticas en toda la página
- [ ] NO badges/pills redondeados decorativos con colores pastel random
- [ ] NO CTAs con el mismo estilo en toda la página ("Get Started" con gradiente)

### Tipografía
- [ ] NO tipografía monótona (mismo font, mismo peso, mismo tamaño en todo)
- [ ] NO Inter en todo sin variación de peso ni escala
- [ ] NO textos sin sistema tipográfico real (display ≠ body ≠ caption)

### Iconos e ilustraciones
- [ ] NO íconos genéricos de lucide/heroicons como decoración sin función
- [ ] NO ilustraciones abstractas/blobby como relleno visual
- [ ] NO elementos decorativos que no comunican nada

---

## PATRONES DE COPY PROHIBIDOS

Sofía usa la skill `humanizalo` con 40 patrones de detección. Los más comunes:

- [ ] NO frases que suenan a modelo de lenguaje generando párrafos
- [ ] NO muletillas tipo "potencia tu negocio", "lleva tu tienda al siguiente nivel"
- [ ] NO listas de features sin beneficio real para el usuario
- [ ] NO copy genérico que podría ser de cualquier producto
- [ ] NO tecnicismos que el target (comerciante sin experiencia digital) no entiende
- [ ] NO tono condescendiente ni tono robótico

**Regla**: todo copy pasa por `humanizalo`. Score mínimo: **42/60**. Si no llega, se reescribe.

---

## QUÉ HACER EN CAMBIO

### Visual — Principios de diseño humano:
- **Jerarquía visual deliberada** — el ojo del usuario sabe exactamente dónde mirar primero, segundo, tercero
- **Asimetría intencional** — romper la simetría con propósito, no por azar
- **Tipografía con sistema real** — display font para headings, body font para texto, pesos y tamaños definidos, escala coherente
- **Color que comunica** — cada color tiene un rol: acción, información, éxito, error, superficie. Paleta con fundamento (complementarios, análogos, triádicos)
- **Whitespace como herramienta** — el espacio vacío es diseño, no falta de contenido. Genera ritmo y tensión
- **Ritmo visual que guía el ojo** — spacing variado con intención, no uniforme
- **Consistencia con variación** — mismo design system, pero cada sección tiene personalidad

### Copy — Principios de escritura humana:
- **Escribir como persona real** — que suene a alguien que entiende el negocio del cliente
- **Beneficio > característica** — "Recibí pedidos organizados" > "Integración con WhatsApp"
- **Cortar lo que sobra** — si una palabra no aporta, se va
- **Hablar como el usuario** — si tu abuela no lo entiende, está mal
- **Microcopy con la misma importancia que headlines** — empty states, errores, tooltips importan tanto como el hero

---

## CHECKLIST DE REVISIÓN RÁPIDA

Antes de entregar cualquier diseño o copy, preguntarse:

1. ¿Si le muestro esto a alguien, diría "esto lo hizo una IA"? → Si sí, rehacer
2. ¿La paleta de colores tiene fundamento en teoría del color? → No solo "se ve bien"
3. ¿Hay jerarquía visual clara? → El ojo sabe dónde ir
4. ¿El spacing tiene ritmo? → No es uniforme robótico
5. ¿Las animaciones tienen propósito? → No son decorativas
6. ¿El copy suena a persona? → No a modelo de lenguaje
7. ¿Funciona en mobile gama baja? → No solo en desktop bonito
