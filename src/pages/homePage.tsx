import React from 'react'
import { useState } from "react"
import { SafeAreaView, StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native"
import LoanForm from "./LoanForm"
import { useAppContext } from "../context/AppContext"
import LoanCalculations from "./LoanCalculations"

export default function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { loading } = useAppContext()

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
    backgroundColor: "#fff",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  navbarTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  navbarButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  navbarButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
})

