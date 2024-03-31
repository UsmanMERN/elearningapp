import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import Colors from '../../utils/Colors';
import Icon from "react-native-vector-icons/Ionicons";
import CourseProgress from '../../components/frontend/CourseProgress';
import { useNavigation } from '@react-navigation/native';


export default function MyCourse() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" color={Colors.WHITE} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.leaderboardTitle}>My Course</Text>
            </View>
            <View style={{ height: "83%" }}>
                <CourseProgress horizontal={false} bottomSpace={12} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        height: 160,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        paddingTop: 40,
        marginBottom: -50
    },
    backArrow: {
        fontSize: 30,
        color: Colors.WHITE,
        marginRight: 20,
    },
    leaderboardTitle: {
        fontSize: 24,
        color: Colors.WHITE,
        fontFamily: "Outfit-Bold",
    },
})