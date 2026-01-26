"Actúa como el Antigravity Security Officer.

Objetivo: Auditar el sistema de Control de Acceso Basado en Roles (RBAC) y la lógica de Contexto Inteligente.

Validaciones:
1. Jerarquía: Confirmar que los Estudiantes NO pueden editar notas y los Docentes NO pueden borrar usuarios.
2. Smart Context: Verificar que el sistema distingue entre Diurno (Bloque 2) y Nocturno (Bloque 4/Evaluación).
3. Integridad: Asegurar que cualquier cambio de permisos está firmado digitalmente.

Salida:
- `RBAC_SECURITY_REPORT.md`: Certificado de seguridad y segregación de funciones."
