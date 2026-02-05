"use client";
import { useState } from "react";
import { UserCheck, MapPin, Briefcase, Save } from "lucide-react";

/**
 * 🧙‍♂️ PROFILE WIZARD (ONBOARDING)
 * Forces user to complete profile before accessing RAG.
 */

export default function ProfileWizard({ onComplete }) {
  const [formData, setFormData] = useState({
    professionalId: "",
    specialty: "Primaria",
    region: "San José Central",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Server Action Call
      const { updateUserProfile } = await import("@/app/actions/user-profile");
      const result = await updateUserProfile(formData);

      if (result.success) {
        // Keep local flag for UI speed, but DB is source of truth
        localStorage.setItem("MEP_PROFILE_COMPLETE", "true");
        if (onComplete) onComplete();
        window.location.reload();
      } else {
        alert("❌ Error guardando perfil. Intente nuevamente.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión.");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/95 z-[50] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-pop-in">
        <div className="bg-[#003366] p-6 text-white text-center">
          <h2 className="text-2xl font-black mb-1">Bienvenido a MisPlanesCR</h2>
          <p className="text-sm opacity-80">
            Configure su identidad docente para comenzar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* CEDULA */}
          <div>
            <label className="label font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <UserCheck size={16} /> Cédula / ID Profesional
              </span>
            </label>
            <input
              type="text"
              required
              placeholder="Ej. 1-1234-5678"
              className="input input-bordered w-full font-mono text-lg"
              value={formData.professionalId}
              onChange={(e) =>
                setFormData({ ...formData, professionalId: e.target.value })
              }
            />
            <span className="text-xs text-slate-400">
              Se usará para la marca de agua oficial.
            </span>
          </div>

          {/* ESPECIALIDAD */}
          <div>
            <label className="label font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <Briefcase size={16} /> Especialidad
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
            >
              <option>Preescolar</option>
              <option>Primaria (I y II Ciclo)</option>
              <option>Matemáticas</option>
              <option>Español</option>
              <option>Ciencias</option>
              <option>Estudios Sociales</option>
              <option>Inglés</option>
              <option>Artes Industriales</option>
              <option>Educación Física</option>
            </select>
          </div>

          {/* REGION */}
          <div>
            <label className="label font-bold text-slate-700">
              <span className="flex items-center gap-2">
                <MapPin size={16} /> Dirección Regional
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              value={formData.region}
              onChange={(e) =>
                setFormData({ ...formData, region: e.target.value })
              }
            >
              <option>San José Central</option>
              <option>San José Norte</option>
              <option>Alajuela</option>
              <option>Cartago</option>
              <option>Heredia</option>
              <option>Puntarenas</option>
              <option>Limón</option>
              <option>Guanacaste</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full btn-lg gap-2 shadow-lg"
          >
            <Save size={20} /> Guardar Perfil
          </button>
        </form>
      </div>
    </div>
  );
}
