import { SafeAreaView, StyleSheet, Text } from "react-native"

export default function HomePage () {
    return (
        <SafeAreaView style={stles.sectionContainer}>
            <Text>Homepage</Text>
        </SafeAreaView>
    )
}

const stles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    }
})