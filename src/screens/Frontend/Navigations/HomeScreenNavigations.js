import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../Home'
import CoursesDetails from '../CoursesDetails'

const Stack = createNativeStackNavigator()
export default function HomeScreenNavigations() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='course-details' component={CoursesDetails} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})