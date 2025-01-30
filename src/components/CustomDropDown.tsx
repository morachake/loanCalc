import  React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import { CustomDropdownProps } from "../types/types"





export default function CustomDropdown ({ options, selectedValue, onValueChange, placeholder }: CustomDropdownProps ) { 
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleSelect = (value: string) => {
    onValueChange(value)
    setIsOpen(false)
  }

  const selectedOption = options.find((option) => option.value === selectedValue)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.headerText}>{selectedOption ? selectedOption.label : placeholder}</Text>
      </TouchableOpacity>
      {isOpen && (
        <ScrollView style={styles.optionsList}>
          {options.map((option) => (
            <TouchableOpacity key={option.value} style={styles.option} onPress={() => handleSelect(option.value)}>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  header: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  headerText: {
    fontSize: 16,
    color: "#333",
  },
  optionsList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 5,
    backgroundColor: "#fff",
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
})
