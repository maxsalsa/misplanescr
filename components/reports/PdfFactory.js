import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { OfficialHeader } from "./OfficialHeader";
import { RubricGrid } from "./RubricGrid";

// REGISTRAR FUENTES (Para que se vea profesional)
Font.register({
  family: "Helvetica-Bold",
  src: "https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT4ttDfA.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingBottom: 60,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10,
    textTransform: "uppercase",
    color: "#2c3e50",
  },

  // TABLAS DINÁMICAS
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  cellHeader: {
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
    fontSize: 9,
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cell: {
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },

  // PIE DE PÁGINA LEGAL
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
    color: "grey",
    borderTop: 1,
    borderColor: "#ccc",
    paddingTop: 10,
  },
});

// --- PLANTILLA 1: ACADÉMICA Y NOCTURNA (ESTÁNDAR) ---
const AcademicTemplate = ({ data, content }) => (
  <Document>
    <Page size="Letter" orientation="landscape" style={styles.page}>
      <OfficialHeader data={data} mode="ACADEMICA" />

      <Text style={styles.sectionTitle}>
        I. Habilidades en el marco de la Política Curricular
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.cellHeader, width: "25%" }}>
            <Text>Aprendizaje Esperado</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "30%" }}>
            <Text>Indicadores del Aprendizaje</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "45%" }}>
            <Text>Estrategias de Mediación</Text>
          </View>
        </View>

        {content.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={{ ...styles.cell, width: "25%" }}>
              <Text>{row.outcome}</Text>
            </View>
            <View style={{ ...styles.cell, width: "30%" }}>
              <Text>{row.indicator}</Text>
            </View>
            <View style={{ ...styles.cell, width: "45%" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#2563EB",
                  marginBottom: 4,
                }}
              >
                {row.mediationTitle}
              </Text>
              <Text style={{ marginBottom: 8 }}>{row.mediation}</Text>
              {row.taskTitle && (
                <View
                  style={{
                    backgroundColor: "#fffbeb",
                    padding: 4,
                    borderRadius: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 8,
                      color: "#d97706",
                      fontWeight: "bold",
                    }}
                  >
                    TAREA: {row.taskTitle}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#d97706" }}>
                    {row.taskContent}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>II. Instrumentos de Evaluación</Text>
      <RubricGrid content={content} />

      <Text style={styles.footer}>
        Documento generado por AulaPlan v4.0 | Cumple con Circular
        DVM-AC-001-2026 MEP | {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

// --- PLANTILLA 2: TÉCNICA (CTP - ENFOQUE COMPETENCIAS) ---
const TechnicalTemplate = ({ data, content }) => (
  <Document>
    <Page size="Legal" orientation="landscape" style={styles.page}>
      <OfficialHeader data={data} mode="TECNICA" />

      <Text style={styles.sectionTitle}>
        Matriz de Planeamiento - Educación Técnica Profesional
      </Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.cellHeader, width: "20%" }}>
            <Text>Resultado de Aprendizaje</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "20%" }}>
            <Text>Criterios de Desempeño</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "15%" }}>
            <Text>Saberes Esenciales</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "35%" }}>
            <Text>Estrategias (Inicio-Desarrollo-Cierre)</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "10%" }}>
            <Text>Tiempo</Text>
          </View>
        </View>

        {content.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={{ ...styles.cell, width: "20%" }}>
              <Text>{row.outcome}</Text>
            </View>
            <View style={{ ...styles.cell, width: "20%" }}>
              <Text>{row.indicator.replace("Indicador:", "Criterio:")}</Text>
            </View>
            <View style={{ ...styles.cell, width: "15%" }}>
              <Text>Contenidos conceptuales y procedimentales.</Text>
            </View>
            <View style={{ ...styles.cell, width: "35%" }}>
              <Text>{row.mediation}</Text>
              <Text style={{ fontSize: 8, marginTop: 5, color: "#666" }}>
                *Incluye Normas de Seguridad.
              </Text>
            </View>
            <View style={{ ...styles.cell, width: "10%" }}>
              <Text>8 Lecciones</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        Formato Oficial Educación Técnica | Enfoque por Competencias Laborales |
        AulaPlan Ultra
      </Text>
    </Page>
  </Document>
);

// --- PLANTILLA 3: CINDEA / IPEC (ADULTOS) ---
const AdultTemplate = ({ data, content }) => (
  <Document>
    <Page size="Letter" orientation="landscape" style={styles.page}>
      <OfficialHeader data={data} mode="ADULTOS" />

      <Text style={styles.sectionTitle}>Planeamiento Andragógico Modular</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={{ ...styles.cellHeader, width: "20%" }}>
            <Text>Módulo / Unidad</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "25%" }}>
            <Text>Aprendizaje por Lograr</Text>
          </View>
          <View style={{ ...styles.cellHeader, width: "55%" }}>
            <Text>Estrategias de Mediación (Contextualizadas)</Text>
          </View>
        </View>

        {content.map((row, i) => (
          <View key={i} style={styles.tableRow}>
            <View style={{ ...styles.cell, width: "20%" }}>
              <Text>{row.unit}</Text>
            </View>
            <View style={{ ...styles.cell, width: "25%" }}>
              <Text>{row.outcome}</Text>
            </View>
            <View style={{ ...styles.cell, width: "55%" }}>
              <Text>{row.mediation}</Text>
            </View>
          </View>
        ))}
      </View>
      <RubricGrid content={content} />
      <Text style={styles.footer}>
        Educación de Personas Jóvenes y Adultas (EPJA) | CINDEA / IPEC
      </Text>
    </Page>
  </Document>
);

// --- EL DISCRIMINADOR INTELIGENTE ---
export const PdfFactory = ({ modality, data, content }) => {
  // Detectar CINDEA por palabras clave si la modalidad viene genérica
  if (
    data.level &&
    (data.level.includes("Nivel") || data.subject.includes("Módulo"))
  ) {
    return <AdultTemplate data={data} content={content} />;
  }

  // Detectar Técnica
  if (
    modality === "TECNICA" ||
    data.subject.includes("Taller") ||
    data.subject.includes("Desarrollo")
  ) {
    return <TechnicalTemplate data={data} content={content} />;
  }

  // Detectar Preescolar (Pendiente implementación completa, fallback a Académica)
  if (modality === "PREESCOLAR") {
    // return <PreschoolTemplate ... /> (Se puede expandir)
    return <AcademicTemplate data={data} content={content} />;
  }

  // Por defecto: Académica (Diurna/Nocturna/Rural)
  return <AcademicTemplate data={data} content={content} />;
};
