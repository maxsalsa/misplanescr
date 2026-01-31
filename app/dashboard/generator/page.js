import React from 'react';
import GeneratorClient from "./components/GeneratorClient";
import { getOfficialTemplates } from "@/actions/template-actions";

export const metadata = {
  title: "Generador IA | AulaPlan",
  description: "Cree planeamientos inteligentes con Antigravity",
};

export default async function GeneratorPage() {
  // Fetch templates (optionally filtered by user profile in a real scenario)
  const officialTemplates = await getOfficialTemplates();

  return (
    <GeneratorClient officialTemplates={officialTemplates} />
  );
}