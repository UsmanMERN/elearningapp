import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import FrontendNavigator from '../screens/Frontend/Navigations/FrontendNavigator';
import AuthNavigator from '../screens/Auth/AuthNavigator';

// services
import { useAuthContext } from '../contexts/Authcontext';
import { getData } from '../utils/Services';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Colors from '../utils/Colors';

export default function AppNavigator() {
    const { isAuthenticated, dispatch } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const fetchUserAndCheckLoginStatus = useCallback(async () => {
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
    }, [dispatch]);

    useEffect(() => {
        fetchUserAndCheckLoginStatus();
    }, [fetchUserAndCheckLoginStatus]);

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
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
            </View>
        )
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? (
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
        backgroundColor: Colors.WHITE
    },
});
