import React, { useEffect, useMemo, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { FIREBASE } from "@env"
import Snackbar from 'react-native-snackbar';

import Home from "../../assets/images/home.png"
import google from "../../assets/images/google.png"
import Colors from '../../utils/Colors'
import { storeData } from '../../utils/Services';
import { useAuthContext } from '../../contexts/Authcontext';

const Login = () => {
    const { dispatch, isAuthenticated } = useAuthContext()

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: FIREBASE,
        });
    }, [])

    async function handleLogin() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential);
            const currentUser = auth().currentUser;
            if (currentUser) {
                await storeData("login", 'true');
                await dispatch({ type: "LOGIN", payload: currentUser });
                Snackbar.show({
                    text: 'Login Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: Colors.PRIMARY,
                    textAlign: 'center',
                    fontFamily: "Outfit-SemiBold",
                })
            } else {
                console.error("Unable to retrieve current user after sign-in.");
            }
        } catch (error) {
            console.error("Error occurred during Google sign-in:", error);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={Home} style={styles.imageStyle} />
            <View style={styles.bottomContainer}>
                <Text style={styles.headingText}>{'</>'}</Text>
                <Text style={styles.headingText}>CODEBOX</Text>
                <Text style={styles.paragraphText}>Your Ultimate Programming Learning Box</Text>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Image source={google} style={styles.logo} />
                    <Text style={styles.loginText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    imageStyle: {
        width: 250,
        height: 500,
        objectFit: 'contain',
        marginTop: 50
    },
    bottomContainer: {
        height: 400,
        width: '100%',
        marginTop: -100,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
    },
    headingText: {
        textAlign: 'center',
        fontSize: 35,
        color: Colors.WHITE,
        fontFamily: 'Outfit-Bold'
    },
    paragraphText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 20,
        color: Colors.LIGHT_PRIMARY,
        fontFamily: 'Outfit-Regular'
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        backgroundColor: Colors.WHITE,
        padding: 5,
        borderRadius: 99,
        marginTop: 25
    },
    logo: {
        width: 40,
        height: 40,
    },
    loginText: {
        fontSize: 20,
        color: Colors.PRIMARY,
        fontFamily: 'Outfit-Regular'
    }
})