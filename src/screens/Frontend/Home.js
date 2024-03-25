import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

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
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
            <View >
                <View style={styles.headerContainer}>
                    <Header />
                </View>
                <View style={{ marginTop: -90 }}>
                    <CourseList level={"Basic"} textColor={Colors.WHITE} />
                    <CourseList level={"Advance"} />
                    <CourseList level={"Advance"} />
                    <CourseList level={"Advance"} />
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.PRIMARY,
        height: 250,
        padding: 15
    }
})