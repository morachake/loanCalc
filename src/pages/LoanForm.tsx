import { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native"
import { useAppContext } from "../context/AppContext"
import { LoanFormData } from "../types/types"


interface LoanFormProps {
  onClose: () => void
}

export default function LoanForm({ onClose }: LoanFormProps) {
  const { calculateLoan, loading } = useAppContext()
  const [formData, setFormData] = useState<LoanFormData>({
    bank: "",
    loan_amount: "",
    loan_term_years: "",
    loan_term_months: "",
    interest_rate: "",
    compound_period: "MONTHLY_APR",
    payment_frequency: "MONTHLY",
  })

  const handleChange = (name: keyof LoanFormData, value: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async () => {
    await calculateLoan(formData)
    onClose()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.title}>New Loan Calculation</Text>
      <TextInput
        style={styles.input}
        placeholder="Bank Name"
        value={formData.bank}
        onChangeText={(text) => handleChange("bank", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Amount"
        value={formData.loan_amount}
        onChangeText={(text) => handleChange("loan_amount", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Term (Years)"
        value={formData.loan_term_years}
        onChangeText={(text) => handleChange("loan_term_years", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Loan Term (Months)"
        value={formData.loan_term_months}
        onChangeText={(text) => handleChange("loan_term_months", text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Interest Rate"
        value={formData.interest_rate}
        onChangeText={(text) => handleChange("interest_rate", text)}
        keyboardType="numeric"
      />
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Calculate" onPress={handleSubmit} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
})

