import FamilyCapsuleGenerator from "@/components/features/family/FamilyCapsuleGenerator";

export default function FamilyPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#003366]">
        Comunicación con el Hogar
      </h1>
      {/* Ejemplo: Se inyectaría el tema actual */}
      <FamilyCapsuleGenerator
        topic="Ciclo del Agua"
        learningOutcome="Describe la importancia del agua..."
      />
    </div>
  );
}
