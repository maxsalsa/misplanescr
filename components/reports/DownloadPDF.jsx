"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from "@react-pdf/renderer";
import { Lock, ShieldCheck } from "lucide-react";

// ESTILOS DE SEGURIDAD Y FORMATO
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica", position: "relative" },
  header: { marginBottom: 20, borderBottom: "2px solid #000", paddingBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", textTransform: "uppercase" },
  subtitle: { fontSize: 10, color: "#666" },
  
  // SECCIONES
  section: { margin: 10, padding: 10, border: "1px solid #eee" },
  label: { fontSize: 9, fontWeight: "bold", color: "#444" },
  value: { fontSize: 11, marginBottom: 5 },
  
  // --- CAPA DE SEGURIDAD VISUAL (MARCA DE AGUA) ---
  watermarkContainer: {
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "center", alignItems: "center", zIndex: -1, opacity: 0.15
  },
  watermarkText: {
    fontSize: 60, color: "red", transform: "rotate(-45deg)", fontWeight: "bold"
  },
  
  // --- TRAZABILIDAD FORENSE (PIE DE PÁGINA) ---
  footer: {
    position: "absolute", bottom: 30, left: 40, right: 40,
    borderTop: "1px solid #ccc", paddingTop: 10,
    fontSize: 8, color: "#888", textAlign: "center"
  }
});

// DOCUMENTO INTERNO (MOTOR DE RENDERIZADO)
const PlanDocument = ({ plan, user, isPremium }) => {
  // 1. INYECCIÓN DE IDENTIDAD INMUTABLE
  // Se ignora cualquier input del frontend. La verdad viene de la DB (prop 'user').
  const teacherName = user?.name || "USUARIO AULAPLAN";
  const teacherId = user?.id || "ANON";
  const securityHash = btoa(`${plan.id}-${teacherId}-${new Date().toISOString().split("T")[0]}`);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        {/* 3. MARCAS DE AGUA CONDICIONALES */}
        {!isPremium && (
          <View style={styles.watermarkContainer}>
            <Text style={styles.watermarkText}>VISTA PREVIA</Text>
            <Text style={{fontSize: 20, marginTop: 20}}>SIN LICENCIA - AULAPLAN.COM</Text>
          </View>
        )}

        {/* ENCABEZADO OFICIAL */}
        <View style={styles.header}>
          <Text style={styles.title}>{plan.title.toUpperCase()}</Text>
          <Text style={styles.subtitle}>
            ASIGNATURA: {plan.subject.toUpperCase()} | NIVEL: {plan.level.toUpperCase()}
          </Text>
          <Text style={styles.subtitle}>
            DOCENTE TITULAR: {teacherName.toUpperCase()} {/* NOMBRE QUEMADO */}
          </Text>
        </View>

        {/* CONTENIDO DEL PLAN (EJEMPLO ESTRATEGIAS) */}
        <View style={styles.section}>
          <Text style={styles.label}>ESTRATEGIAS DE MEDIACIÓN:</Text>
          <Text style={styles.value}>{JSON.stringify(plan.content.strategies).slice(0, 500)}...</Text>
        </View>

        {/* RÚBRICA (SI EXISTE) */}
        {plan.content.planning_module?.rubric && (
           <View style={styles.section}>
             <Text style={styles.label}>INSTRUMENTO DE EVALUACIÓN:</Text>
             {plan.content.planning_module.rubric.map((r, i) => (
                <Text key={i} style={{fontSize: 10, marginTop: 5}}>• {r.indicator}</Text>
             ))}
           </View>
        )}

        {/* 2. TRAZABILIDAD FORENSE (PIE DE PÁGINA OBLIGATORIO) */}
        <View style={styles.footer}>
          <Text>
            DOCUMENTO OFICIAL GENERADO POR AULAPLAN ULTRA.
            LICENCIA INTRANSFERIBLE PERTENECIENTE A: {teacherName.toUpperCase()}
          </Text>
          <Text>ID DE RASTREO: {teacherId} | HASH: {securityHash}</Text>
          {!isPremium && <Text style={{color: "red", marginTop: 2}}>VERSIÓN GRATUITA - PROHIBIDA SU REPRODUCCIÓN</Text>}
        </View>

      </Page>
    </Document>
  );
};

// COMPONENTE DE DESCARGA (BOTÓN)
export default function DownloadPDF({ plan, user }) {
  const isPremium = user?.subscriptionStatus === "ULTRA" || user?.subscriptionStatus === "SEMESTRAL";

  return (
    <div className="mt-4">
        {/* 4. PROTECCIÓN DE INTERFAZ (PREVIEW) - AQUI VA EL BOTÓN */}
        <PDFDownloadLink
            document={<PlanDocument plan={plan} user={user} isPremium={isPremium} />}
            fileName={`Plan_${plan.subject}_${user.name}.pdf`}
            className={`btn w-full gap-2 ${isPremium ? "btn-primary" : "btn-warning"}`}
        >
            {({ loading }) => 
                loading ? "Generando Documento Blindado..." : (
                    <>
                        {isPremium ? <ShieldCheck className="w-4 h-4"/> : <Lock className="w-4 h-4"/>}
                        {isPremium ? "Descargar PDF Oficial" : "Descargar Muestra (Con Marca de Agua)"}
                    </>
                )
            }
        </PDFDownloadLink>
        
        {!isPremium && (
            <p className="text-xs text-center text-error mt-2 font-bold">
                * La versión gratuita incluye marcas de agua. Actualice a Ultra para removerlas.
            </p>
        )}
    </div>
  );
}