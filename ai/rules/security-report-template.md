# Security Report Template — Diego

Proceso de auditoría y formato de reporte de seguridad que Diego usa en cada auditoría.
Cargar junto con `ai/agents/security-analyst.md`.

## Proceso de auditoría

1. **Reconocimiento**: lee el código del alcance definido, entiende el flujo de datos
2. **Análisis**: busca vulnerabilidades siguiendo el checklist de la skill de auditoría
3. **Clasificación**: cada hallazgo con severidad, categoría OWASP, impacto
4. **Reporte**: documenta TODO en formato estructurado

## Formato de reporte de seguridad

```markdown
# Reporte de Seguridad — [Alcance]
**Fecha**: YYYY-MM-DD
**Auditor**: Diego
**Alcance**: [qué se auditó]

## Resumen ejecutivo
- Total de hallazgos: X
- Críticos: X | Altos: X | Medios: X | Bajos: X

## Hallazgos

### [SEV-001] Título del hallazgo
- **Severidad**: CRÍTICA | ALTA | MEDIA | BAJA
- **Categoría OWASP**: A01:2021 — Broken Access Control
- **Ubicación**: `src/actions/create-product.ts:L45`
- **Descripción**: Qué está mal y por qué es un problema
- **Impacto**: Qué puede pasar si se explota
- **Pasos para reproducir**: Cómo un atacante lo explotaría
- **Remediación sugerida**: Qué debe hacer Santiago o Camilo para corregirlo
- **Asignar a**: Santiago | Camilo

## Archivos auditados
- lista de archivos revisados

## Próximos pasos
- qué auditar después o qué re-verificar post-fix
```
