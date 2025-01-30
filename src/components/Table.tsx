import React from 'react'
import { View, Text, StyleSheet, ScrollView } from "react-native"
import type { AmortizationEntry } from "../types/types"

interface TableProps {
  data: AmortizationEntry[]
}

export default function Table({ data }: TableProps) {
  return (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.numberCell]}>No.</Text>
          <Text style={[styles.headerCell, styles.balanceCell]}>Start</Text>
          <Text style={[styles.headerCell, styles.amountCell]}>Interest</Text>
          <Text style={[styles.headerCell, styles.amountCell]}>Principal</Text>
          <Text style={[styles.headerCell, styles.balanceCell]}>End</Text>
        </View>

        {data.map((entry, index) => (
          <View key={entry.payment_number} style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
            <Text style={[styles.cell, styles.numberCell]}>{entry.payment_number}</Text>
            <Text style={[styles.cell, styles.balanceCell]}>{entry.beginning_balance}</Text>
            <Text style={[styles.cell, styles.amountCell]}>{entry.interest_amount}</Text>
            <Text style={[styles.cell, styles.amountCell]}>{entry.principal_amount}</Text>
            <Text style={[styles.cell, styles.balanceCell]}>{entry.ending_balance}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  evenRow: {
    backgroundColor: "#F8F9FA",
  },
  oddRow: {
    backgroundColor: "#FFFFFF",
  },
  headerCell: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  cell: {
    fontSize: 14,
    color: "#333333",
  },
  numberCell: {
    width: 50,
    textAlign: "center",
  },
  balanceCell: {
    width: 150,
    textAlign: "right",
    paddingRight: 15,
  },
  amountCell: {
    width: 120,
    textAlign: "right",
    paddingRight: 15,
  },
})

