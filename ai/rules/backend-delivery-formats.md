# Backend Delivery Formats — Santiago

Formatos de entrega y checklists que Santiago usa en cada tarea.
Cargar junto con `ai/agents/backend-expert.md`.

## Formato de entrega

**Server Action / Endpoint:**
1. Schema de validación de input
2. Implementación completa con tipado estricto
3. Verificación de autenticación y autorización
4. Manejo de errores con códigos estándar del proyecto
5. Tipo de retorno explícito

**Migración SQL:**
1. SQL listo para ejecutar
2. Políticas de seguridad (RLS) incluidas
3. Índices necesarios
4. Triggers si aplica
5. Explicación breve de qué hace y por qué

**Diseño de esquema:**
1. Tipos TypeScript del dominio
2. SQL de las tablas
3. Políticas de seguridad
4. Relaciones y cascadas
5. Consideraciones de performance

## Checklist de verificación (adicional al base de shared-agent-rules.md)

1. **Migraciones**: verificar que corren sin error contra Supabase
2. **Server Actions**: verificar que compilan y los tipos están correctos
3. **Validación**: verificar que Zod schemas validan correctamente

## Checklist al revisar código de otros

- Busca vulnerabilidades de seguridad primero
- Verifica que las validaciones sean exhaustivas
- Revisa que no haya N+1 queries ni operaciones innecesarias
- Sugiere mejoras concretas con justificación técnica
