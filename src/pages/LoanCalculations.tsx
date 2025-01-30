import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { useAppContext } from "../context/AppContext"
import Table from "../components/Table"


export default function LoanCalculations() {
  const { loanData, loading, error } = useAppContext()

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
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

  if (!loanData) {
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
        <Text style={styles.summaryItem}>
          Monthly Payment: <Text style={styles.summaryValue}>{loanData.monthly_payment}</Text>
        </Text>
        <Text style={styles.summaryItem}>
          Total Payments: <Text style={styles.summaryValue}>{loanData.total_payments}</Text>
        </Text>
        <Text style={styles.summaryItem}>
          Total Interest: <Text style={styles.summaryValue}>{loanData.total_interest}</Text>
        </Text>
      </View>

      <Text style={styles.subtitle}>Amortization Schedule</Text>
      {loanData.amortization_schedule && loanData.amortization_schedule.length > 0 && (
        <Table data={loanData.amortization_schedule} />
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    color: "#333333",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333333",
  },
  summaryItem: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666666",
  },
  summaryValue: {
    fontWeight: "bold",
    color: "#333333",
  },
  noDataText: {
    fontSize: 16,
    textAlign: "center",
    color: "#666666",
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
  },
})

