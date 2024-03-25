import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SubHeading({ text, textColor }) {
    return (
        <View>
            <Text style={[styles.headingText, { color: textColor ? textColor : "#000" }]}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headingText: {
        fontFamily: "Outfit-Bold",
        fontSize: 24,
        color: '#000'
    }
})