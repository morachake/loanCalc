import  React from "react"
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native"

export default function SplashScreen()  {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/svgs/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Loan Calculator</Text>
      <ActivityIndicator size="large" color="#3498DB" style={styles.loader} />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 20,
  },
  loader: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#34495E",
  },
  logo: {
    width: "100%",
    height: 150,
    objectFit: "contain",
    marginBottom: 20,
  },
})



