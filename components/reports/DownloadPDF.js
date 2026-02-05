"use client";
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  header: { textAlign: "center", marginBottom: 20 },
  title: { fontSize: 14, fontWeight: "bold" },
  sectionTitle: { fontSize: 11, fontWeight: "bold", marginTop: 10, marginBottom: 5, backgroundColor: "#f0f0f0", padding: 2 },
  row: { flexDirection: "row", borderBottom: "1px solid #000" },
  col: { width: "33%", padding: 5 },
  disclaimer: { fontSize: 8, marginTop: 30, textAlign: "center", color: "grey" },
  // ESTILO DE MARCA DE AGUA (SOLO DEMO)
  watermark: {
    position: "absolute", top: 300, left: 100, fontSize: 60, color: "rgba(255,0,0,0.2)",
    transform: "rotate(-45deg)", zIndex: 1000
  }
});

const Doc = ({ p, u }) => {
  const c = typeof p.content === "string" ? JSON.parse(p.content) : p.content;
  const isDemo = u?.subscriptionStatus === "FREE";
  
  return (
    <Document>
      <Page style={styles.page}>
        {/* MARCA DE AGUA SI ES GRATIS */}
        {isDemo && <Text style={styles.watermark}>DEMO NO OFICIAL</Text>}

        <View style={styles.header}>
          <Text style={styles.title}>PLAN DE PRÁCTICA PEDAGÓGICA</Text>
          <Text>{p.subject} - {p.level}</Text>
          <Text>Docente: {isDemo ? "USUARIO SIN LICENCIA" : u?.name}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.col}><Text>Resultados</Text></View>
          <View style={styles.col}><Text>Estrategias</Text></View>
          <View style={styles.col}><Text>Indicadores</Text></View>
        </View>

        <View style={styles.row}>
          <View style={styles.col}>
            {c.objectives?.map((o, i) => <Text key={i}>• {o}</Text>)}
          </View>
          <View style={styles.col}>
            {isDemo 
                ? <Text>CONTENIDO BLOQUEADO - VERSIÓN DEMO. ADQUIERA SU LICENCIA CON SALAZAR SÁNCHEZ.</Text> 
                : Object.values(c.strategies || {}).map((s, i) => <Text key={i} style={{marginBottom:4}}>{s}</Text>)}
          </View>
          <View style={styles.col}>
            {c.planning_module?.rubric?.map((r, i) => <Text key={i}>• {r.indicator}</Text>)}
          </View>
        </View>

        <Text style={styles.sectionTitle}>MATERIAL PARA EL ESTUDIANTE</Text>
        <View style={{ padding: 5 }}>
            <Text style={{fontWeight:"bold"}}>Resumen de Estudio:</Text>
            <Text>{c.student_materials?.summary || "No generado"}</Text>
            <Text style={{fontWeight:"bold", marginTop:5}}>Puntos para Infografía:</Text>
            {c.student_materials?.infographic_points?.map((pt,i)=><Text key={i}>- {pt}</Text>)}
        </View>

        <Text style={styles.disclaimer}>
            Propiedad de Salazar Sánchez. {isDemo ? "VERSIÓN DE PRUEBA" : "LICENCIA OFICIAL ACTIVA"}.
            {/* Metadatos invisibles para rastreo */}
            <Text style={{color:"white", fontSize:1}}>UID:{u?.id}</Text>
        </Text>
      </Page>
    </Document>
  );
};

export default function DownloadPDF({ plan, user }) { 
  return (
    <button onClick={async () => {
        const blob = await pdf(<Doc p={plan} u={user}/>).toBlob();
        saveAs(blob, `Plan_${plan.subject}.pdf`);
    }} className="btn btn-sm btn-outline">
        <Download className="w-4"/> PDF Oficial
    </button>
  ); 
}