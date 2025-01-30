import React from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { useAppContext } from "../context/AppContext"
import Table from "../components/Table"
import { formatCurrency, formatPaymentFrequency, formatPercentage, formatLoanTerm } from "../utils/formatters"

export default function LoanCalculations() {
  const { formData, loanData, loading, error } = useAppContext()

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  }

  if (!formData || !loanData) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.noDataText}>No loan data available. Press "New Calculation" to start.</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.summaryCard}>
        <Text style={styles.title}>Loan Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Bank</Text>
            <Text style={styles.summaryValue}>{formData.bank}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Loan Amount</Text>
            <Text style={styles.summaryValue}>{formatCurrency(formData.loan_amount)}</Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Interest Rate</Text>
            <Text style={styles.summaryValue}>{formatPercentage(formData.interest_rate)}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Term</Text>
            <Text style={styles.summaryValue}>
              {formatLoanTerm(Number(formData.loan_term_years), Number(formData.loan_term_months))}
            </Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Payment Frequency</Text>
            <Text style={styles.summaryValue}>{formatPaymentFrequency(formData.payment_frequency)}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Compound Period</Text>
            <Text style={styles.summaryValue}>{formatPaymentFrequency(formData.compound_period)}</Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Payment Amount</Text>
            <Text style={styles.summaryValue}>{formatCurrency(loanData.payment_amount)}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Number of Payments</Text>
            <Text style={styles.summaryValue}>{loanData.total_payments}</Text>
          </View>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Total Interest</Text>
            <Text style={styles.summaryValue}>{formatCurrency(loanData.total_interest)}</Text>
          </View>
          <View style={styles.summaryColumn}>
            <Text style={styles.summaryLabel}>Total Cost</Text>
            <Text style={styles.summaryValue}>{formatCurrency(loanData.total_cost)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.subtitle}>Loan Overview</Text>
        <Text style={styles.summaryText}>
          Your loan of {formatCurrency(formData.loan_amount)} from {formData.bank} will be repaid over{" "}
          {loanData.total_payments} payments, with {formatPaymentFrequency(formData.payment_frequency).toLowerCase()}{" "}
          payments of {formatCurrency(loanData.payment_amount)}. The total interest paid over the life of the loan will
          be {formatCurrency(loanData.total_interest)}, with an interest rate of{" "}
          {formatPercentage(formData.interest_rate)}.
        </Text>
      </View>

      <View style={{ marginBottom: 0 ,justifyContent: "center", alignItems: "center"}}>
         <Text >Amortization Schedule</Text>
         <Text style={{}}>Swipe Left and Right to view the whole table</Text>
      </View>
      {loanData.amortization_schedule && loanData.amortization_schedule.length > 0 && (
        <Table data={loanData.amortization_schedule} paymentFrequency={formData.payment_frequency} />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F0F4F8",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2C3E50",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#2C3E50",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  summaryColumn: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111",
    marginBottom: 5,
  },
  summaryValue: {
    fontSize: 12,
    color: "#2C3E50",
  },
  summaryText: {
    fontSize: 16,
    color: "#34495E",
    lineHeight: 20,
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#7F8C8D",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#E74C3C",
  },
})

