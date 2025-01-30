import React from "react"
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native"

export default function Calculator () {
    return (
        <SafeAreaView style={styles.sectionContainer}>
            <Text style={styles.title}>Loan Calculator</Text>
            <TextInput
                style={styles.inputs}
                placeholder="Bank"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Loan Amount"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Interest Rate"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Loan Term Years"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Loan Term Months"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Interest Rate"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Period of Payment"
            />
            <TextInput
                style={styles.inputs}
                placeholder="Payment Frequency"
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 24,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputs: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: '90%',
    }
})