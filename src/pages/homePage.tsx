import React, { useState } from "react"
import { SafeAreaView, StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native"
import LoanForm from "./LoanForm"
import { useAppContext } from "../context/AppContext"
import LoanCalculations from "./LoanCalculations"
import { formatCurrency, formatLoanTerm, formatPaymentFrequency } from "../utils/formatters"

export default function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { loading, formData, loanData } = useAppContext()

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Loan Calculator</Text>
        <TouchableOpacity onPress={toggleModal} style={styles.navbarButton} disabled={loading}>
          <Text style={styles.navbarButtonText}>New Calculation</Text>
        </TouchableOpacity>
      </View>
      <LoanCalculations />
      <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalView}>
          <LoanForm onClose={toggleModal} />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#3498DB",
    borderBottomWidth: 1,
    borderBottomColor: "#2980B9",
  },
  navbarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  summaryContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: 5,
  },
  navbarButton: {
    backgroundColor: "#2980B9",
    padding: 10,
    borderRadius: 5,
  },
  navbarButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
})

