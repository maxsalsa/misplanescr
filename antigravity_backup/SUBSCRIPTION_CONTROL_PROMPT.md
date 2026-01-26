"Actúa como el Antigravity Business Logic Controller.

Objetivo: Implementar y Documentar el Sistema de Control de Suscripciones y Roles.

Reglas de Negocio:
1. Scope Validator: Acceso debe ser O(1).
   - Si `user.subscriptions` incluye `module.required_id` -> ALLOW.
   - Si no -> DENY + Trigger 'Lock Animation'.
2. Jerarquía:
   - Super Admin: Acceso Total.
   - Admin Delegado: Permisos específicos, sin acceso a contenido académico ajeno.
3. Seguridad:
   - Firmar asignaciones de roles con HMAC.

UX/UI:
- Definir el comportamiento del 'Bloqueo Elegante' (Blur + Modal de Suscripción) en caso de acceso denegado."
