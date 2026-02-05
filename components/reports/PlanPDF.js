import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    fontSize: 10,
    position: "relative",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: { fontSize: 14, fontWeight: "bold", textTransform: "uppercase" },

  // MARCA DE AGUA (SOLO PARA FREE)
  watermark: {
    position: "absolute",
    top: 250,
    left: 100,
    fontSize: 50,
    color: "red",
    opacity: 0.2,
    transform: "rotate(-45deg)",
    zIndex: -1,
  },

  // PIE DE PÁGINA DISCRETO (PARA TODOS)
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    fontSize: 8,
    color: "gray",
  },

  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableHeader: {
    margin: 5,
    fontSize: 9,
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
  },
  tableCell: { margin: 5, fontSize: 9 },
});

export const PlanPDF = ({ data, content, isPremium = false }) => (
  <Document title={`Plan Didáctico - ${data.subject}`} author="AulaPlan V200">
    <Page size="LEGAL" orientation="landscape" style={styles.page}>
      {/* LÓGICA DE CONDICIONAL: SI NO PAGA, SE LE MARCA */}
      {!isPremium && (
        <>
          <Text style={styles.watermark}>VISTA PREVIA - SIN LICENCIA</Text>
          <Text style={[styles.watermark, { top: 400, left: 300 }]}>
            SUSCRÍBASE AL 6090-6359
          </Text>
        </>
      )}

      {/* ENCABEZADO OFICIAL */}
      <View style={styles.header}>
        <Text style={styles.title}>MINISTERIO DE EDUCACIÓN PÚBLICA</Text>
        <Text>PLANEAMIENTO DIDÁCTICO - {data.subject.toUpperCase()}</Text>
        <Text style={{ fontSize: 8, marginTop: 5 }}>
          {isPremium
            ? "LICENCIA OFICIAL: MAX SALAZAR (PLAN ULTRA)"
            : "DOCUMENTO NO OFICIAL - VERSIÓN GRATUITA"}
        </Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Aprendizaje Esperado</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Indicador (Pautas)</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Estrategias de Mediación</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableHeader}>Técnicas de Evaluación</Text>
          </View>
        </View>
        {content.map((row, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.outcome}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.indicator}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.mediation}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{row.rubric}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        Generado por AulaPlan | {new Date().toLocaleDateString()} |{" "}
        {isPremium ? "Documento Certificado" : "Sin Valor Oficial"}
      </Text>
    </Page>
  </Document>
);
