import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

export default function OptionItems({ icon, value }) {
    return (
        <View>
            <View style={styles.chaptersText}>
                <Icon name={icon} size={24} color="black" />
                <Text style={{ color: '#000', fontFamily: "Outfit-Regular", maxWidth: 80 }}>{value}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chaptersText: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginTop: 5,
        justifyContent: 'start',
        alignItems: 'center'
    },
})