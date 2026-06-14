# Agent Launch Protocol

Protocolo obligatorio para el orchestrator antes de cada `Agent()` call.
Un sub-agente arranca con CERO contexto. Si el prompt es vago, el resultado es vago.

## Checklist Pre-Launch

Antes de escribir el prompt del sub-agente, verificar:

### 1. TASK — Qué y por qué
- [ ] La tarea es específica y accionable (no "explorá esto", sino "encontrá X en Y para Z")
- [ ] Incluye el POR QUÉ (motivación, problema que resuelve)
- [ ] Define criterio de éxito (cómo sé que terminó bien)

### 2. CONTEXT — Info previa relevante
- [ ] Si hay decisiones previas en la conversación → incluirlas textualmente
- [ ] Si hay trabajo de engram relevante → buscar con mem_search ANTES y pasar el resumen
- [ ] Si hay estado actual del código relevante → describir (no asumir que el agente "lo va a ver")
- [ ] Si hubo intentos fallidos previos → explicar qué se probó y por qué falló

### 3. SKILLS — Qué cargar
- [ ] Listar skills con paths EXACTOS: `ai/skills/{nombre}/SKILL.md`
- [ ] Especificar si es CORE (cargar antes de empezar) o referencia (consultar si necesita)
- [ ] NO poner "cargá las skills de Camilo" — poner los paths

### 4. FILES — Dónde trabajar
- [ ] Listar archivos a LEER con paths completos
- [ ] Listar archivos a EDITAR/CREAR con paths completos
- [ ] Si hay archivos que NO debe tocar → explicitarlo

### 5. CONSTRAINTS — Límites
- [ ] Convenciones del proyecto (idioma del UI, commit format, etc.)
- [ ] Lo que NO debe hacer (no agregar dependencias, no cambiar X)
- [ ] Reglas de negocio relevantes (si aplica, referenciar ai/rules/tiendri-rules.md)

### 6. OUTPUT — Qué espero de vuelta
- [ ] Formato del reporte (lista, tabla, diff, resumen)
- [ ] Nivel de detalle (breve vs exhaustivo)
- [ ] Si debe guardar en engram → decirlo explícitamente con project name

## Template de Prompt

Estructura recomendada para prompts de sub-agentes:

---

**[Título de la tarea]**

**Contexto**: [1-3 oraciones de por qué se hace esto y qué se decidió previamente]

**Tarea**: [Qué hacer exactamente, paso a paso si tiene sentido]

**Skills a cargar**:
- `ai/skills/X/SKILL.md` — [para qué]

**Archivos involucrados**:
- Leer: `path/to/file.ts`
- Editar: `path/to/other.ts`
- No tocar: `path/to/protected.ts`

**Constraints**:
- [Convención 1]
- [Convención 2]

**Output esperado**: [Qué formato, qué nivel de detalle]

---

## Anti-Patterns

❌ "Explorá el codebase y fijate qué pasa" → sin dirección, resultado genérico
❌ "Arreglá el bug" → sin contexto de qué bug, dónde, qué se probó
❌ "Hacé lo que hace Camilo" → el agente no sabe quién es Camilo
❌ "Cargá las skills necesarias" → el agente no sabe cuáles son
❌ Pasar 10 skills para "estar seguros" → sobrecarga de contexto
❌ No mencionar archivos → el agente pierde tiempo explorando
❌ Asumir que el agente vio la conversación previa → NO la vio

## Nivel de Contexto por Tipo de Tarea

| Tipo de tarea | Context necesario | Skills | Files |
|---|---|---|---|
| Bug fix | Síntoma + error + archivo + qué se probó | 1-2 relevantes | Exactos |
| Feature nueva | Requisito + diseño + decisiones previas | 2-3 CORE | Lista de crear/editar |
| Refactor | Qué cambiar + por qué + patrón destino | 1-2 | Lista completa |
| Exploración | Pregunta específica + dónde buscar | 0-1 | Directorios target |
| Code review | Archivos a revisar + criterios + prioridad | 1-2 | Lista de archivos |
| Auditoría | Scope + qué evaluar + formato de reporte | 1-2 | Scope dirs |

## Regla de Engram

- ANTES de lanzar un agente sobre un tema que se trabajó antes → `mem_search` primero
- Pasar el resumen relevante en el contexto del prompt
- El sub-agente NO busca en engram por sí mismo (no tiene el contexto de qué buscar)
- Si el agente va a hacer decisiones importantes → incluir en el prompt: "Guardá decisiones/descubrimientos en engram con project: 'tiendri_v2'"
