import React, { useEffect, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import auth from '@react-native-firebase/auth';

// screens
// import Home from '../screens/frontend/Home';
// import Login from '../screens/auth/Login';
import FrontendNavigator from '../screens/Frontend/FrontendNavigator';
import AuthNavigator from '../screens/Auth/AuthNavigator';

// services
import { useAuthContext } from '../contexts/Authcontext';
import { getData } from '../utils/Services';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const { isAuthtenticated, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserAndCheckLoginStatus = async () => {
            try {
                const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
                    setUser(firebaseUser);
                    const result = await getData('login');
                    if (result === 'true') {
                        dispatch({ type: "LOGIN", payload: firebaseUser });
                    }
                    unsubscribe();
                    setIsLoading(false);
                });
            } catch (error) {
                console.error('Error in fetching user or checking login status:', error);
            }
        };
        fetchUserAndCheckLoginStatus();
    }, [dispatch]);



    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const result = await getData('login');
                if (result === 'true') {
                    dispatch({ type: "LOGIN" });
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            } finally {
                setIsLoading(false);
            }
        };
        checkLoginStatus();
    }, [dispatch]);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {isAuthtenticated ? (
                <FrontendNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
