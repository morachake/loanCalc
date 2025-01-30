import React from "react"
import { View, Text, StyleSheet, ScrollView } from "react-native"
import type { AmortizationEntry } from "../types/types"

interface TableProps {
  data: AmortizationEntry[]
  paymentFrequency: string
}

export default function Table({ data, paymentFrequency }: TableProps) {
  const getPaymentsPerYear = (frequency: string) => {
    switch (frequency) {
      case "EVERYDAY":
        return 365
      case "EVERY_WEEK":
        return 52
      case "EVERY_WEEKS":
        return 26
      case "EVERY_HALF_MONTH":
        return 24
      case "EVERY_MONTH":
        return 12
      case "EVERY_6_MONTHS":
        return 2
      case "ANNUALLY":
        return 1
      default:
        return 12
    }
  }

  const paymentsPerYear = getPaymentsPerYear(paymentFrequency)

  return (
    <ScrollView horizontal style={styles.tableContainer}>
      <View>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.numberCell]}>No</Text>
          <Text style={[styles.headerCell, styles.balanceCell]}>Start Balance</Text>
          <Text style={[styles.headerCell, styles.amountCell]}>Payment</Text>
          <Text style={[styles.headerCell, styles.amountCell]}>Principal</Text>
          <Text style={[styles.headerCell, styles.amountCell]}>Interest</Text>
          <Text style={[styles.headerCell, styles.balanceCell]}>End Balance</Text>
        </View>

        {/* Data Rows */}
        {data.map((entry, index) => (
          <React.Fragment key={entry.payment_number}>
            {index > 0 && index % paymentsPerYear === 0 && (
              <View style={styles.yearSeparator}>
                <Text style={styles.yearSeparatorText}>Year {Math.floor(index / paymentsPerYear) + 1}</Text>
              </View>
            )}
            <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
              <Text style={[styles.cell, styles.numberCell]}>{entry.payment_number}</Text>
              <Text style={[styles.cell, styles.balanceCell]}>{entry.beginning_balance}</Text>
              <Text style={[styles.cell, styles.amountCell]}>{entry.payment_amount}</Text>
              <Text style={[styles.cell, styles.amountCell]}>{entry.principal_amount}</Text>
              <Text style={[styles.cell, styles.amountCell]}>{entry.interest_amount}</Text>
              <Text style={[styles.cell, styles.balanceCell]}>{entry.ending_balance}</Text>
            </View>
          </React.Fragment>
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
    backgroundColor: "#3498DB",
    paddingVertical: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ECF0F1",
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
    color: "#2C3E50",
  },
  numberCell: {
    width: 20,
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
  yearSeparator: {
    backgroundColor: "#ECF0F1",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  yearSeparatorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C3E50",
  },
})

