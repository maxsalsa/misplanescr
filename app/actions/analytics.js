"use server";
import { prisma } from "@/lib/db";

export async function getDashboardStats() {
  try {
    // 1. CONSULTAS PARALELAS (VELOCIDAD EXTREMA)
    const [totalStudents, totalPlans, pendingRequests] = await Promise.all([
      prisma.student.count(),
      prisma.pedagogicalPlan.count(),
      prisma.administrativeRequest.count({ where: { status: "PENDIENTE" } }),
    ]);

    // 2. CÁLCULO DE ALERTA TEMPRANA (MEP)
    // Contamos estudiantes con más de 3 ausencias injustificadas ("A")
    // (Simulación lógica basada en registros existentes)
    const criticalAttendance = await prisma.attendanceRecord.groupBy({
      by: ["studentId"],
      where: { status: "A" },
      _count: { status: true },
      having: { status: { _count: { gt: 3 } } },
    });
    const alerts = criticalAttendance.length;

    // 3. DATOS DE RENDIMIENTO (PARA GRÁFICOS)
    // Si no hay datos, enviamos estructura vacía para que no rompa el gráfico
    const performanceData = [
      { name: "I Sem", nota: 0 },
      { name: "II Sem", nota: 0 },
      { name: "Cotidiano", nota: 0 },
      { name: "Proyectos", nota: 0 },
    ];

    return {
      kpi: {
        students: totalStudents,
        plans: totalPlans,
        requests: pendingRequests,
        alerts: alerts,
      },
      charts: {
        performance: performanceData,
        // Datos simulados de asistencia hasta que haya registros reales diarios
        attendance: [
          { day: "L", presentes: 0, ausentes: 0 },
          { day: "K", presentes: 0, ausentes: 0 },
          { day: "M", presentes: 0, ausentes: 0 },
          { day: "J", presentes: 0, ausentes: 0 },
          { day: "V", presentes: 0, ausentes: 0 },
        ],
      },
    };
  } catch (error) {
    console.error("Error en Analítica:", error);
    // Retorno seguro en caso de fallo DB
    return {
      kpi: { students: 0, plans: 0, requests: 0, alerts: 0 },
      charts: { performance: [], attendance: [] },
    };
  }
}
