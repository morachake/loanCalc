import React, { useState } from "react"
import { Text, TextInput, Button, StyleSheet, TouchableOpacity, View, ActivityIndicator, ScrollView } from "react-native"
import { useAppContext } from "../context/AppContext"
import type { LoanFormData } from "../types/types"
import CustomDropdown from "../components/CustomDropDown"

interface LoanFormProps {
  onClose: () => void
}

const compoundPeriodOptions = [
  { label: "Annually", value: "ANNUALLY" },
  { label: "Semi-Annually", value: "SEMI_ANNUALLY" },
  { label: "Quarterly", value: "QUARTERLY" },
  { label: "Monthly (APR)", value: "MONTHLY_APR" },
  { label: "Semi-Monthly", value: "SEMI_MONTHLY" },
  { label: "Biweekly", value: "BIWEEKLY" },
  { label: "Weekly", value: "WEEKLY" },
  { label: "Daily", value: "DAILY" },
  { label: "Continuous", value: "CONTINUOUS" },
]

const paymentFrequencyOptions = [
  { label: "Every Day", value: "EVERYDAY" },
  { label: "Every Week", value: "EVERY_WEEK" },
  { label: "Every Two Weeks", value: "EVERY_WEEKS" },
  { label: "Twice a Month", value: "EVERY_HALF_MONTH" },
  { label: "Every Month", value: "EVERY_MONTH" },
  { label: "Every 6 Months", value: "EVERY_6_MONTHS" },
  { label: "Annually", value: "ANNUALLY" },
]

export default function LoanForm({ onClose }: LoanFormProps) {
  const { calculateLoan, loading } = useAppContext()
  const [formData, setFormData] = useState<LoanFormData>({
    bank: "",
    loan_amount: "",
    loan_term_years: "",
    loan_term_months: "",
    interest_rate: "",
    compound_period: "MONTHLY_APR",
    payment_frequency: "EVERY_MONTH",
  })

  const handleChange = (name: keyof LoanFormData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async () => {
    await calculateLoan(formData)
    onClose()
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>
      <Text style={styles.title}>New Loan Calculation</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bank Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter bank name"
          value={formData.bank}
          onChangeText={(text) => handleChange("bank", text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter loan amount"
          value={formData.loan_amount}
          onChangeText={(text) => handleChange("loan_amount", text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.rowContainer}>
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.label}>Loan Term (Years)</Text>
          <TextInput
            style={styles.input}
            placeholder="Years"
            value={formData.loan_term_years}
            onChangeText={(text) => handleChange("loan_term_years", text)}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.inputContainer, styles.halfWidth]}>
          <Text style={styles.label}>Loan Term (Months)</Text>
          <TextInput
            style={styles.input}
            placeholder="Months"
            value={formData.loan_term_months}
            onChangeText={(text) => handleChange("loan_term_months", text)}
            keyboardType="numeric"
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Interest Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter interest rate"
          value={formData.interest_rate}
          onChangeText={(text) => handleChange("interest_rate", text)}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Compound Period</Text>
        <CustomDropdown
          options={compoundPeriodOptions}
          selectedValue={formData.compound_period}
          onValueChange={(value) => handleChange("compound_period", value)}
          placeholder="Select Compound Period"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Payment Frequency</Text>
        <CustomDropdown
          options={paymentFrequencyOptions}
          selectedValue={formData.payment_frequency}
          onValueChange={(value) => handleChange("payment_frequency", value)}
          placeholder="Select Payment Frequency"
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <TouchableOpacity style={styles.calculateButton} onPress={handleSubmit}>
          <Text style={styles.calculateButtonText}>Calculate</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    maxHeight: "85%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  calculateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})

