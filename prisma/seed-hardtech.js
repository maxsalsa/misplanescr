const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.findFirst({ where: { role: "GOD_TIER" } });
  if (!admin) return;

  console.log("💉 INYECTANDO CASO MAESTRO DE CIBERSEGURIDAD...");

  await prisma.lessonPlan.create({
    data: {
      title: "MEP OFICIAL: Seguridad en Bases de Datos (SQL Injection)",
      subject: "Ciberseguridad y Bases de Datos",
      level: "12mo",
      status: "PUBLISHED",
      userId: admin.id,
      content: {
        administrative: { period: "2026", origin: "Expert System" },
        mediation: [
            { moment: "1. CONEXIÓN (Enganche)", activity: "Caso Forense: Se muestra captura de pantalla de una inyección SQL real que filtró datos. Pregunta: ¿Qué falló en la arquitectura?", dua: "Visualización de ataque real" },
            { moment: "2. COLABORACIÓN (Social)", activity: "Auditores de Calidad: Equipos analizan un diagrama ER desordenado y proponen esquema normalizado en Miro/Lucidchart.", dua: "Trabajo Cooperativo" },
            { moment: "3. CONSTRUCCIÓN (Hard Tech)", activity: "Programación de script SQL seguro usando Prepared Statements. Generación de diagrama ER resultante.", evidence: "Repositorio GitHub (.sql)", dua: "Modelado y Andamiaje" },
            { moment: "4. CLARIFICACIÓN (Cierre)", activity: "Checklist de seguridad y verificación de buenas prácticas antes del commit final.", dua: "Autoevaluación" }
        ],
        evaluation: {
            criteria: [
                { indicator: "Normalización de Datos", levels: { high: "Aplica 1FN, 2FN, 3FN sin redundancia.", medium: "Redundancias menores.", low: "Redundancias críticas." } },
                { indicator: "Sintaxis SQL (DDL/DML)", levels: { high: "Código exacto sin errores de compilación.", medium: "Errores leves de sintaxis.", low: "Código no ejecutable." } },
                { indicator: "Seguridad y Acceso", levels: { high: "Permisos y restricciones configurados correctamente.", medium: "Omite restricciones en tablas sensibles.", low: "Sin configuración de seguridad." } }
            ]
        }
      }
    }
  });
  console.log("✅ CASO MAESTRO INYECTADO.");
}

main().finally(() => prisma.$disconnect());