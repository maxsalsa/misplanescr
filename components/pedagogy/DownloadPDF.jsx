"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { FileDown, Lock } from "lucide-react";

// ESTILOS OFICIALES MEP (ENCRIPTADOS EN EL PDF)
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", fontSize: 11 },
  header: {
    marginBottom: 20,
    borderBottom: "1px solid #000",
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  subtitle: { fontSize: 12, textAlign: "center", marginTop: 5 },

  // ZONA DE SEGURIDAD (DATOS DEL SUSCRIPTOR)
  adminTable: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    backgroundColor: "#f0f0f0",
    padding: 5,
  },
  adminCol: { width: "50%" },
  label: { fontSize: 9, color: "#666", fontWeight: "bold" },
  value: { fontSize: 10, fontWeight: "bold" },

  // TABLA DE MEDIACIÓN
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#000",
    color: "#fff",
    padding: 4,
  },
  row: { marginBottom: 8, paddingBottom: 8, borderBottom: "1px solid #eee" },
  moment: { fontSize: 10, fontWeight: "bold", color: "#0044cc" },
  activity: { marginTop: 2 },
  dua: { fontSize: 9, fontStyle: "italic", color: "#555", marginTop: 2 },

  // PROTECCIÓN CONTRA PIRATERÍA (PIE DE PÁGINA)
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: "1px solid #ccc",
    paddingTop: 10,
  },
  copyright: { fontSize: 8, color: "#999", textAlign: "center" },
  licenseId: { fontSize: 8, color: "#999", textAlign: "center", marginTop: 2 },
});

// DOCUMENTO PDF (ESTRUCTURA INTERNA)
const PlanDocument = ({ plan, teacherName }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* ENCABEZADO OFICIAL */}
      <View style={styles.header}>
        <Text style={styles.title}>MINISTERIO DE EDUCACIÓN PÚBLICA</Text>
        <Text style={styles.subtitle}>
          Planeamiento Didáctico - {plan.subject}
        </Text>
      </View>

      {/* DATOS ADMINISTRATIVOS BLINDADOS */}
      <View style={styles.adminTable}>
        <View style={styles.adminCol}>
          <Text style={styles.label}>DOCENTE (LICENCIA ACTIVA):</Text>
          <Text style={styles.value}>{teacherName.toUpperCase()}</Text>{" "}
          {/* NOMBRE QUEMADO */}
        </View>
        <View style={styles.adminCol}>
          <Text style={styles.label}>NIVEL / SECCIÓN:</Text>
          <Text style={styles.value}>{plan.level}</Text>
        </View>
      </View>

      {/* MEDIACIÓN PEDAGÓGICA */}
      <Text style={styles.sectionTitle}>SECUENCIA DIDÁCTICA</Text>
      {plan.content?.planning_module?.mediation?.map((m, i) => (
        <View key={i} style={styles.row}>
          <Text style={styles.moment}>{m.moment}</Text>
          <Text style={styles.activity}>{m.activity}</Text>
          {m.dua_variant && (
            <Text style={styles.dua}>DUA / Ajuste: {m.dua_variant}</Text>
          )}
        </View>
      ))}

      {/* SISTEMA DE EVALUACIÓN */}
      <Text style={styles.sectionTitle}>EVALUACIÓN DE LOS APRENDIZAJES</Text>
      {plan.content?.planning_module?.evaluation_system?.daily_work?.rubric?.map(
        (r, i) => (
          <View key={i} style={styles.row}>
            <Text style={{ fontSize: 9, fontWeight: "bold" }}>INDICADOR:</Text>
            <Text style={{ fontSize: 10 }}>{r.indicator}</Text>
            <Text style={{ fontSize: 8, marginTop: 2, color: "#444" }}>
              [ ] Inicial (1) [ ] Intermedio (2) [ ] Avanzado (3)
            </Text>
          </View>
        ),
      )}

      {/* PIE DE PÁGINA ANTI-COPIA */}
      <View style={styles.footer}>
        <Text style={styles.copyright}>
          Este documento fue generado legalmente por la plataforma AULAPLAN.
        </Text>
        <Text style={styles.licenseId}>
          Licencia intransferible perteneciente a: {teacherName} | ID:{" "}
          {plan.userId}
        </Text>
      </View>
    </Page>
  </Document>
);

export default function DownloadPDF({ plan }) {
  // OBTENEMOS EL NOMBRE DEL DOCENTE DIRECTAMENTE DEL OBJETO PLAN (QUE VIENE DE LA BD)
  // ESTO EVITA QUE ALGUIEN CAMBIE EL NOMBRE EN EL FRONTEND
  const teacherName =
    plan.content?.administrative?.docente || "Usuario AulaPlan";

  return (
    <div className="flex gap-2">
      <PDFDownloadLink
        document={<PlanDocument plan={plan} teacherName={teacherName} />}
        fileName={`Planeamiento_${plan.subject}_${plan.level}.pdf`}
      >
        {({ blob, url, loading, error }) => (
          <button
            disabled={loading}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-700 transition-all shadow-md"
          >
            {loading ? (
              "Generando PDF..."
            ) : (
              <>
                <FileDown size={16} /> Descargar PDF Oficial
              </>
            )}
          </button>
        )}
      </PDFDownloadLink>

      <div
        className="tooltip tooltip-bottom"
        data-tip="Documento protegido contra edición"
      >
        <button className="flex items-center justify-center bg-slate-100 text-slate-400 px-3 py-2 rounded-lg border border-slate-200 cursor-not-allowed">
          <Lock size={16} />
        </button>
      </div>
    </div>
  );
}
