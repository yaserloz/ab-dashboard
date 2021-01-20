import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import React, { useState, useEffect } from "react";
import axios from "axios";
// Create styles
const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border:'2',
    borderColor:"red"
  },
});

// Create Document Component
const MyDocument = () => {

  return (
    <Document style={{ width: "100%" }}>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
