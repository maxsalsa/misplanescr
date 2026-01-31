import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// ESTILOS DE ALTA PRECISIÓN (TIPO IMPRENTA)
const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica" },
  header: { flexDirection: "row", marginBottom: 20, borderBottom: 2, borderColor: "#000", paddingBottom: 10 },
  logoSection: { width: "20%" },
  titleSection: { width: "80%", textAlign: "center" },
  schoolName: { fontSize: 14, fontWeight: "bold", textTransform: "uppercase" },
  subTitle: { fontSize: 10, marginTop: 4 },
  
  // TABLA ADMINISTRATIVA
  adminTable: { display: "flex", flexDirection: "row", marginBottom: 15, border: 1, borderColor: "#ccc" },
  adminCol: { padding: 4, width: "25%", borderRight: 1, borderColor: "#ccc" },
  label: { fontSize: 8, color: "#666", textTransform: "uppercase" },
  value: { fontSize: 10, fontWeight: "bold" },

  // TABLA CURRICULAR (3 COLUMNAS MEP)
  tableHeader: { flexDirection: "row", backgroundColor: "#f0f0f0", borderBottom: 1, borderColor: "#000", marginTop: 10 },
  col1: { width: "30%", padding: 5, borderRight: 1, borderColor: "#ccc" }, // Aprendizajes
  col2: { width: "40%", padding: 5, borderRight: 1, borderColor: "#ccc" }, // Estrategias
  col3: { width: "30%", padding: 5 }, // Indicadores
  headerText: { fontSize: 9, fontWeight: "bold", textAlign: "center" },
  
  row: { flexDirection: "row", borderBottom: 1, borderColor: "#eee", minHeight: 50 },
  cell: { fontSize: 9, textAlign: "justify", lineHeight: 1.4 },
  
  // SECCIÓN DE VALIDACIÓN
  footer: { position: "absolute", bottom: 30, left: 30, right: 30, flexDirection: "row", justifyContent: "space-between" },
  signature: { borderTop: 1, width: "40%", textAlign: "center", paddingTop: 5, fontSize: 8 }
});

export const MepPlanDocument = ({ plan, teacherName }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      
      {/* 1. ENCABEZADO INSTITUCIONAL */}
      <View style={styles.header}>
        <View style={styles.titleSection}>
            <Text style={styles.schoolName}>MINISTERIO DE EDUCACIÓN PÚBLICA</Text>
            <Text style={styles.subTitle}>DIRECCIÓN DE EDUCACIÓN TÉCNICA Y CAPACIDADES EMPRENDEDORAS</Text>
            <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 10 }}>PLANEAMIENTO DIDÁCTICO - {plan.subject.toUpperCase()}</Text>
        </View>
      </View>

      {/* 2. CUADRO ADMINISTRATIVO */}
      <View style={styles.adminTable}>
        <View style={styles.adminCol}>
            <Text style={styles.label}>Docente:</Text>
            <Text style={styles.value}>{teacherName || "Profesor Titular"}</Text>
        </View>
        <View style={styles.adminCol}>
            <Text style={styles.label}>Nivel:</Text>
            <Text style={styles.value}>{plan.level}</Text>
        </View>
        <View style={styles.adminCol}>
            <Text style={styles.label}>Periodo:</Text>
            <Text style={styles.value}>{plan.content?.administrative?.period || "2026"}</Text>
        </View>
        <View style={{...styles.adminCol, borderRight: 0}}>
            <Text style={styles.label}>Modalidad:</Text>
            <Text style={styles.value}>Técnica Profesional</Text>
        </View>
      </View>

      {/* 3. COLUMNAS CURRICULARES (EL CORAZÓN) */}
      <View style={styles.tableHeader}>
        <View style={styles.col1}><Text style={styles.headerText}>APRENDIZAJES ESPERADOS</Text></View>
        <View style={styles.col2}><Text style={styles.headerText}>ESTRATEGIAS DE MEDIACIÓN (DUA)</Text></View>
        <View style={styles.col3}><Text style={styles.headerText}>INDICADORES DE EVALUACIÓN</Text></View>
      </View>

      {/* FILAS DINÁMICAS (ITERACIÓN SOBRE MEDIACIÓN) */}
      {plan.content?.mediation?.map((activity, index) => (
        <View key={index} style={styles.row}>
            {/* Columna 1: Aprendizaje (Se repite o se agrupa) */}
            <View style={styles.col1}>
                <Text style={styles.cell}>
                    {index === 0 ? plan.content?.curriculum?.learning_result : ""}
                </Text>
            </View>
            
            {/* Columna 2: Estrategias (Los 4 Momentos) */}
            <View style={styles.col2}>
                <Text style={{...styles.cell, fontWeight: "bold", marginBottom: 2}}>{activity.moment}:</Text>
                <Text style={styles.cell}>{activity.activity}</Text>
                <Text style={{fontSize: 8, color: "#666", marginTop: 4, fontStyle: "italic"}}>
                    DUA: {activity.dua_principle}
                </Text>
            </View>
            
            {/* Columna 3: Indicadores (Rúbrica) */}
            <View style={styles.col3}>
                {index === 0 && plan.content?.evaluation?.criteria?.map((c, i) => (
                    <Text key={i} style={styles.cell}>• {c.indicator}</Text>
                ))}
            </View>
        </View>
      ))}

      {/* 4. PIE DE PÁGINA (FIRMAS) */}
      <View style={styles.footer}>
        <View style={styles.signature}><Text>Firma del Docente</Text></View>
        <View style={styles.signature}><Text>Sello Dirección / Comité Evaluación</Text></View>
      </View>

    </Page>
  </Document>
);