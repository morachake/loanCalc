import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from "react-native"
import { useAppContext } from "../context/AppContext"
import { Banks } from "../utils/formatters"
import { LoanFormData } from "../types/types"
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

const bankOptions = [
  ...Banks.map((bank) => ({ label: bank.name, value: bank.name })),
  { label: "Other", value: "OTHER" },
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
  const [errors, setErrors] = useState<Partial<Record<keyof LoanFormData, string>>>({})

  const handleChange = (name: keyof LoanFormData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
  }

  const handleBankChange = (value: string) => {
    const selectedBank = Banks.find((bank) => bank.name === value)
    setFormData((prevState) => ({
      ...prevState,
      bank: value,
      interest_rate: selectedBank ? selectedBank.interestRate.toString() : prevState.interest_rate,
    }))
    setErrors((prevErrors) => ({ ...prevErrors, bank: "" }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof LoanFormData, string>> = {}
    let isValid = true

    if (!formData.bank) {
      newErrors.bank = "Bank is required"
      isValid = false
    }
    if (!formData.loan_amount) {
      newErrors.loan_amount = "Loan amount is required"
      isValid = false
    }
    if (!formData.loan_term_years && !formData.loan_term_months) {
      newErrors.loan_term_years = "Loan term is required"
      isValid = false
    }
    if (!formData.interest_rate) {
      newErrors.interest_rate = "Interest rate is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      await calculateLoan(formData)
      onClose()
    } else {
      Alert.alert("Form Error", "Please fill in all required fields.")
    }
  }

  return (
    <ScrollView style={styles.container}>

      <View style={{
        justifyContent: "space-between", 
        alignItems: 'center', 
        flexDirection: 'row',
        marginBottom: 20
        }}>
          <Text style={styles.title}>New Calculation</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bank</Text>
        <CustomDropdown
          options={bankOptions}
          selectedValue={formData.bank}
          onValueChange={handleBankChange}
          placeholder="Select a bank"
        />
        {errors.bank && <Text style={styles.errorText}>{errors.bank}</Text>}
        {formData.bank === "OTHER" && (
          <TextInput
            style={[styles.input, { marginTop: 10 ,flex: 1}]}
            placeholder="Enter bank name"
            value={formData.bank === "OTHER" ? "" : formData.bank}
            onChangeText={(text) => handleChange("bank", text)}
          />
        )}
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
        {errors.loan_amount && <Text style={styles.errorText}>{errors.loan_amount}</Text>}
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
      {errors.loan_term_years && <Text style={styles.errorText}>{errors.loan_term_years}</Text>}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Interest Rate (%)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter interest rate"
          value={formData.interest_rate}
          onChangeText={(text) => handleChange("interest_rate", text)}
          keyboardType="numeric"
        />
        {errors.interest_rate && <Text style={styles.errorText}>{errors.interest_rate}</Text>}
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
        <ActivityIndicator size="large" color="#3498DB" style={styles.loader} />
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
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    width: "90%",
    maxHeight: "70%",
  },
  closeButton: {
    // alignSelf: "flex-end",
    // padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#2C3E50",
  },
  inputContainer: {
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  label: {
    fontSize: 12,
    marginBottom: 2,
    color: "#34495E",
  },
  input: {
    height: 40,
    borderColor: "#BDC3C7",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
  },
  loader: {
    marginTop: 20,
  },
  calculateButton: {
    backgroundColor: "#3498DB",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  errorText: {
    color: "#E74C3C",
    fontSize: 14,
    marginTop: 5,
  },
})

