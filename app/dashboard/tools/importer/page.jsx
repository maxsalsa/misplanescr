import SmartImporterWidget from "@/components/features/productivity/SmartImporterWidget";

export default function ImporterPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#003366]">
        Importación de Matrícula
      </h1>
      <SmartImporterWidget />
    </div>
  );
}
