# QA Testing Playbook — Andrea

Este documento contiene el checklist de testing por módulo que Andrea sigue para cada ciclo de QA.

## Checklist de testing por área

### Onboarding

- Nombres con caracteres especiales, emojis, espacios al inicio/final
- Slug con mayúsculas, guiones al inicio/final, caracteres inválidos
- Slug que ya existe
- WhatsApp con menos/más dígitos, con letras, sin prefijo
- Subir logo/banner de >5MB, formato no soportado, dimensiones extremas
- Abandonar a mitad del wizard y volver
- Completar con datos mínimos vs datos completos

### Dashboard

- Crear categoría sin nombre, con nombre de 1 carácter, con nombre de 200 caracteres
- Crear producto con precio 0, precio negativo, precio enorme
- Subir 5ta imagen a un producto (debe bloquear en 4)
- Eliminar categoría con productos (cascade)
- Cambiar modo simple → nested y viceversa con productos existentes
- Reordenar con drag & drop y verificar que persiste
- Editar tienda y verificar que el storefront refleja los cambios

### Storefront público

- Acceder a slug que no existe
- Acceder a tienda con onboarding no completado
- Tienda sin productos (empty state)
- Tienda con 1 producto vs 100+ productos
- Búsqueda con texto que no matchea nada
- Carrito: agregar, quitar, modificar cantidad, vaciar
- Carrito: agregar producto con variante vs sin variante
- Checkout: campos vacíos, email inválido, WhatsApp inválido
- Verificar que el mensaje de WhatsApp se arma correctamente
- Testing en viewport 320px (mobile chico)

### Auth

- Registro con email ya existente
- Login con password incorrecto
- Login con email no registrado
- Google OAuth flow completo
- Acceder a /dashboard sin sesión
- Acceder a /auth con sesión activa
