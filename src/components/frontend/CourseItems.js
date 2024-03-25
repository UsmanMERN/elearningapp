import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../../utils/Colors'

export default function CourseItems({ item }) {
    return (
        <View style={styles.courseCard}>
            <Image source={{ uri: item?.banner?.url }} style={styles.courseImage} />
            <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>{item?.name}</Text>
                <View style={[styles.chaptersText, { justifyContent: 'space-between' }]}>
                    <View style={styles.chaptersText}>
                        <Icon name="book-outline" size={24} color="black" />
                        <Text style={{ color: '#000', fontFamily: "Outfit-Regular" }}>{item?.chapters.length} Chapters</Text>
                    </View>
                    <View style={styles.chaptersText}>
                        <Icon name="time-outline" size={24} color="black" />
                        <Text style={{ color: '#000', fontFamily: "Outfit-Regular", maxWidth: 80 }}>{item?.time}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: Colors.PRIMARY, fontFamily: 'Outfit-SemiBold', marginTop: 8 }}>{item?.price == 0 ? 'Free' : "$ " + item?.price}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingRight: 0,
    },
    courseImage: {
        height: 120,
        width: 210,
        borderRadius: 15,
    },
    courseCard: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        marginRight: 15,
        borderRadius: 15,
        flex: 1,
    },
    courseDetails: {
        padding: 8
    },
    courseTitle: {
        color: "#000",
        fontFamily: 'Outfit-SemiBold',
        fontSize: 17,
        maxWidth: 200,
    },
    chaptersText: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginTop: 5,
        justifyContent: 'start',
        alignItems: 'center'
    },
})