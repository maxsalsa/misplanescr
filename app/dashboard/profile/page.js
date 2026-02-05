"use client";
import { useState, useEffect } from "react";
import { User, Lock, Building, Plus, Save, KeyRound } from "lucide-react";
import { toast } from "sonner";
import {
  updatePasswordAction,
  addInstitutionAction,
  getUserProfileAction,
} from "@/app/actions/profile";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // PASSWORD STATE
  const [passState, setPassState] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passLoading, setPassLoading] = useState(false);

  // SCHOOL STATE (MOCKED FOR V1)
  const [schools, setSchools] = useState([
    { id: 1, name: "CTP de Mercedes Norte", role: "Docente Titular" },
  ]);
  const [newSchool, setNewSchool] = useState("");

  useEffect(() => {
    getUserProfileAction().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passState.new !== passState.confirm) {
      toast.error("Error", {
        description: "Las contraseñas nuevas no coinciden.",
      });
      return;
    }
    setPassLoading(true);
    const res = await updatePasswordAction(passState.current, passState.new);
    if (res.success) {
      toast.success("Seguridad Actualizada", {
        description: "Su contraseña ha sido modificada.",
      });
      setPassState({ current: "", new: "", confirm: "" });
    } else {
      toast.error("Error", { description: res.error });
    }
    setPassLoading(false);
  };

  const handleAddSchool = async () => {
    if (!newSchool) return; // Prevent empty adds
    const res = await addInstitutionAction(newSchool);
    if (res.success) {
      setSchools([
        ...schools,
        { id: Date.now(), name: newSchool, role: "Docente Invitado" },
      ]);
      setNewSchool("");
      toast.success("Institución Agregada", {
        description: "Vinculación exitosa.",
      });
    }
  };

  if (loading)
    return (
      <div className="p-10 flex justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 fade-in animate-in">
      {/* HEADER */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <div className="bg-blue-100 p-3 rounded-full text-blue-700">
          <User size={32} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            Perfil de Usuario
          </h1>
          <p className="text-slate-500">
            Gestione su identidad y seguridad • {user?.email}
          </p>
        </div>
        <div className="ml-auto">
          <span
            className={`badge ${user?.subscriptionPlan === "ULTRA" ? "badge-primary" : "badge-ghost"} badge-lg font-bold`}
          >
            PLAN {user?.subscriptionPlan || "FREE"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COL 1: SEGURIDAD */}
        <div className="space-y-6">
          <div className="card bg-white border border-slate-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <Lock size={16} /> Seguridad de Cuenta
              </h2>
              <form onSubmit={handlePasswordUpdate} className="space-y-4 mt-2">
                <div className="form-control">
                  <label className="label text-xs font-bold">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    className="input input-bordered input-sm"
                    value={passState.current}
                    onChange={(e) =>
                      setPassState({ ...passState, current: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    className="input input-bordered input-sm"
                    value={passState.new}
                    onChange={(e) =>
                      setPassState({ ...passState, new: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-bold">
                    Confirmar Nueva
                  </label>
                  <input
                    type="password"
                    className="input input-bordered input-sm"
                    value={passState.confirm}
                    onChange={(e) =>
                      setPassState({ ...passState, confirm: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  disabled={passLoading}
                  className="btn btn-neutral btn-sm w-full gap-2"
                >
                  {passLoading ? (
                    <span className="loading loading-spinner"></span>
                  ) : (
                    <>
                      <KeyRound size={14} /> Actualizar Contraseña
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* COL 2: INSTITUCIONES */}
        <div className="space-y-6">
          <div className="card bg-slate-50 border border-slate-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-sm font-bold text-slate-500 uppercase flex items-center gap-2">
                <Building size={16} /> Mis Instituciones
              </h2>

              <div className="space-y-2 mt-2">
                {schools.map((s) => (
                  <div
                    key={s.id}
                    className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {s.name}
                      </p>
                      <p className="text-[10px] text-slate-500 uppercase">
                        {s.role}
                      </p>
                    </div>
                    <span className="badge badge-xs badge-success">Activo</span>
                  </div>
                ))}
              </div>

              <div className="divider text-xs text-slate-400">
                AGREGAR NUEVA
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nombre del Centro Educativo..."
                  className="input input-bordered input-sm w-full"
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                />
                <button
                  onClick={handleAddSchool}
                  className="btn btn-primary btn-sm btn-square"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
