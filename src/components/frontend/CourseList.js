import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import SubHeading from './SubHeading'

import { getCourseList } from '../../utils/GraphQl'
import Colors from '../../utils/Colors'
import CourseItems from './CourseItems'
import { useNavigation } from '@react-navigation/native'

export default function CourseList({ level, textColor }) {
    const navigation = useNavigation()

    const [courseList, setCourseList] = useState([])
    const courses = () => {
        getCourseList(level).then(res => {
            setCourseList(res?.courses)
        })
    }
    useEffect(() => {
        courses()
    }, [])

    return (
        <View style={styles.container}>
            <SubHeading text={`${level} Courses`} textColor={textColor} />
            <FlatList data={courseList} key={courseList.id} horizontal={true} showsHorizontalScrollIndicator={false} renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate("course-details", { course: item })}>
                        <CourseItems item={item} />
                    </TouchableOpacity>
                )
            }} />
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
        borderRadius: 15
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