"use client";
import SpeedGrader from "@/components/grading/SpeedGrader";

export default function GradebookPage() {
  // Mock Data for User Journey Test
  const MOCK_CRITERIA = [
    { id: "c1", name: "R. Cognitiva (30%)" },
    { id: "c2", name: "R. Socioafectiva (30%)" },
    { id: "c3", name: "Psicomotriz (40%)" },
  ];

  const MOCK_STUDENTS = [
    {
      id: "s1",
      name: "Ana Gutiérrez",
      scores: { c1: 3, c2: 3, c3: 3 },
      finalGrade: 100,
    },
    {
      id: "s2",
      name: "Carlos Pérez",
      scores: { c1: 2, c2: 2, c3: 1 },
      finalGrade: 65,
    },
    {
      id: "s3",
      name: "María Rodríguez",
      scores: { c1: 3, c2: 3, c3: 2 },
      finalGrade: 90,
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">
        Libro de Marcas Oficial
      </h1>
      <p className="text-slate-500">
        Registro de calificaciones y control de asistencia.
      </p>
      <div className="p-4 bg-white rounded-xl shadow border border-slate-200 min-h-[500px]">
        <SpeedGrader students={MOCK_STUDENTS} criteria={MOCK_CRITERIA} />
      </div>
    </div>
  );
}
