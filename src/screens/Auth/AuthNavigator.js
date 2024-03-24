import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';


const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
    return (
        <Stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
            <Stack.Group>
                <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})