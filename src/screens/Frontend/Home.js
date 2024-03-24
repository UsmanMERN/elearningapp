import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

import auth from '@react-native-firebase/auth';

import { storeData } from '../../utils/Services';
import { useAuthContext } from '../../contexts/Authcontext';

export default function Home() {
    const { dispatch, user } = useAuthContext()

    const handleLogout = async () => {
        try {
            await auth().signOut().then(async () => {
                await storeData("login", 'false')
                await dispatch({ type: "LOGOUT", payload: {} })
            })

        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <View>
            <Text style={{ color: "#000", fontFamily: 'Outfit-Bold' }}>Welcome, {user?.displayName}</Text>
            {user?.photoURL && <Image source={{ uri: user?.photoURL }} style={{ width: 50, height: 50 }} />}
            <Button title="Logout" onPress={handleLogout} />
            <Button title="Logout" onPress={""} />
        </View>

    )
}

const styles = StyleSheet.create({

})