import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../Home'
import CoursesDetails from '../CoursesDetails'
import ChapterContent from '../../../components/frontend/ChapterContent'

const Stack = createNativeStackNavigator()
export default function HomeScreenNavigations() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='course-details' component={CoursesDetails} />
            <Stack.Screen name='chapter-content' component={ChapterContent} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})