"Actúa como el Antigravity Automation Script. Genera una función lógica que:

1.  Extraiga los indicadores de desempeño de la tabla `m_mep_respaldo` para una unidad específica.
2.  Cree una tabla temporal de evaluación para un grupo de N estudiantes.
3.  Calcule la nota de asistencia basada en bloques configurables de 1 a 4 lecciones, aplicando las reglas de AI (Ausencia Injustificada) y tardías del reglamento MEP.
4.  Consolide 'Trabajo Cotidiano' a partir de puntos obtenidos en rúbricas (ej: 3 pts Avanzado, 2 pts Intermedio) y NO de valores porcentuales inventados.
5.  Entregue un JSON final de 'Consolidado de Periodo' listo para que el Frontend lo muestre como un reporte de notas oficial.

CRÍTICO:
Aunque la interfaz muestre barras de colores o insignias visuales, el cálculo interno debe ser rigurosamente matemático y ajustado a los porcentajes oficiales (ej: Cotidiano 45%, Pruebas 35%, etc.)."
