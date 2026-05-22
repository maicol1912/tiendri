---
name: security-audit
description: >
  Checklist de auditoría de seguridad para aplicaciones web con Supabase, Next.js y multi-tenancy.
  Trigger: Cuando se audite seguridad de features, módulos o el sistema completo.
license: Apache-2.0
metadata:
  author: maicol1912
  version: "1.0"
---

## When to Use

- Auditar una feature nueva antes de ir a producción
- Revisar seguridad de un módulo completo
- Auditoría full del sistema
- Verificar que un fix de seguridad resolvió el problema

## Critical Patterns

### Checklist por categoría

#### A. Autenticación

| Check | Qué verificar |
|-------|---------------|
| AUTH-01 | ¿Se usa `getUser()` y NUNCA `getSession()`? |
| AUTH-02 | ¿Middleware protege todas las rutas de `/dashboard/*`? |
| AUTH-03 | ¿`/auth/*` redirige si ya hay sesión activa? |
| AUTH-04 | ¿`SUPABASE_SERVICE_ROLE_KEY` está SOLO en Server Actions? |
| AUTH-05 | ¿Rate limiting en endpoints de auth (5 req/min por IP)? |
| AUTH-06 | ¿Confirmación de email funciona correctamente? |
| AUTH-07 | ¿OAuth callback valida el state parameter? |

#### B. Autorización y control de acceso

| Check | Qué verificar |
|-------|---------------|
| AUTHZ-01 | ¿CADA Server Action verifica `store.user_id = auth.uid()`? |
| AUTHZ-02 | ¿RLS habilitado en TODAS las tablas? |
| AUTHZ-03 | ¿Test cruzado: usuario A NO puede acceder a datos de usuario B? |
| AUTHZ-04 | ¿Anon users solo pueden SELECT en tiendas completadas e INSERT orders? |
| AUTHZ-05 | ¿No hay IDOR? (cambiar ID en request no da acceso a otro recurso) |
| AUTHZ-06 | ¿Eliminar entidad verifica ownership antes de ejecutar? |
| AUTHZ-07 | ¿Slug check no expone información de tiendas no completadas? |

#### C. Validación de inputs

| Check | Qué verificar |
|-------|---------------|
| INPUT-01 | ¿Zod valida TODOS los inputs en Server Actions? |
| INPUT-02 | ¿Strings se hacen trim + check longitud mínima/máxima? |
| INPUT-03 | ¿Precios validados como INTEGER >= 0? |
| INPUT-04 | ¿Slugs validados contra regex? |
| INPUT-05 | ¿File uploads validan tipo MIME + extensión + tamaño? |
| INPUT-06 | ¿No hay SQL injection (no string interpolation en queries)? |
| INPUT-07 | ¿No hay XSS (no dangerouslySetInnerHTML con datos de usuario)? |

#### D. Storage y archivos

| Check | Qué verificar |
|-------|---------------|
| STOR-01 | ¿Storage policies verifican ownership via store_id? |
| STOR-02 | ¿File upload valida tipo (image/webp, image/jpeg, image/png)? |
| STOR-03 | ¿File upload valida tamaño (max 5MB)? |
| STOR-04 | ¿Al eliminar entidad se limpian archivos de Storage? |
| STOR-05 | ¿No se puede subir archivos a paths de otras tiendas? |

#### E. Rate limiting

| Check | Qué verificar |
|-------|---------------|
| RATE-01 | ¿Auth: 5 req/min por IP? |
| RATE-02 | ¿Public read: 30 req/min por IP? |
| RATE-03 | ¿Write: 20 req/min por userId? |
| RATE-04 | ¿Image upload: 10 req/min por userId? |
| RATE-05 | ¿Slug check: 20 req/min por IP? |

#### F. Datos sensibles

| Check | Qué verificar |
|-------|---------------|
| DATA-01 | ¿No se loguean passwords, tokens ni API keys? |
| DATA-02 | ¿Error responses no exponen stack traces ni queries SQL? |
| DATA-03 | ¿IDs internos de Supabase no se exponen en URLs públicas? |
| DATA-04 | ¿Variables de entorno en .env, nunca hardcodeadas? |
| DATA-05 | ¿.env está en .gitignore? |

#### G. Headers y configuración

| Check | Qué verificar |
|-------|---------------|
| HEAD-01 | ¿CORS configurado correctamente (no wildcard en producción)? |
| HEAD-02 | ¿CSP headers definidos? |
| HEAD-03 | ¿X-Frame-Options configurado? |
| HEAD-04 | ¿HTTPS enforced? |

### Clasificación de severidad

| Severidad | Criterio | Ejemplo |
|-----------|----------|---------|
| **CRÍTICA** | Acceso no autorizado a datos de otros usuarios, ejecución remota | IDOR que expone todas las tiendas, RLS faltante |
| **ALTA** | Bypass de autenticación, escalación de privilegios | Server Action sin auth check, file upload sin validación |
| **MEDIA** | Información expuesta, protección parcial | Error response con stack trace, rate limiting faltante |
| **BAJA** | Best practice faltante, riesgo teórico | Header de seguridad faltante, .env.example con valores reales |

### Formato de hallazgo

```markdown
### [SEV-XXX] Título descriptivo
- **Severidad**: CRÍTICA | ALTA | MEDIA | BAJA
- **Categoría**: AUTH | AUTHZ | INPUT | STOR | RATE | DATA | HEAD
- **Ubicación**: `ruta/al/archivo.ts:LXXX`
- **Descripción**: qué está mal
- **Impacto**: qué puede pasar
- **Reproducción**: pasos para explotar
- **Remediación**: qué corregir
- **Asignar a**: Santiago | Camilo
```

## Commands

```bash
# Buscar getSession (debe ser 0 resultados)
rg "getSession" src/ --type ts

# Buscar dangerouslySetInnerHTML
rg "dangerouslySetInnerHTML" src/ --type tsx

# Buscar string interpolation en queries
rg "from\(" src/ --type ts -C 2

# Verificar .env en gitignore
rg "\.env" .gitignore

# Buscar SERVICE_ROLE_KEY expuesto en client code
rg "SERVICE_ROLE" src/components/ src/app/ --type ts
```

## Resources

- **Documentación**: Ver [references/](references/) para docs del proyecto
