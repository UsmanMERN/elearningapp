import React from 'react'
import { StyleSheet, View } from 'react-native'

import auth from '@react-native-firebase/auth';
// screen
import Header from '../../components/frontend/Header';
// services
import { storeData } from '../../utils/Services';
import { useAuthContext } from '../../contexts/Authcontext';
import Colors from '../../utils/Colors';
import CourseList from '../../components/frontend/CourseList';

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
            <View style={styles.headerContainer}>
                <Header />
            </View>
            <View>
                <CourseList />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.PRIMARY,
        height: 250,
        padding: 15
    }
})