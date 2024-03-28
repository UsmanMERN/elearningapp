import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import Header from '../../components/frontend/Header';
import { storeData } from '../../utils/Services';
import { useAuthContext } from '../../contexts/Authcontext';
import Colors from '../../utils/Colors';
import CourseList from '../../components/frontend/CourseList';
import Snackbar from 'react-native-snackbar';

const Home = () => {
    const { dispatch } = useAuthContext();

    const handleLogout = () => {
        auth().signOut()
            .then(() => {
                storeData("login", 'false');
                dispatch({ type: "LOGOUT", payload: {} });
                Snackbar.show({
                    text: 'Logout Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: Colors.WHITE,
                    textAlign: 'center',
                    fontFamily: "Outfit-SemiBold",
                    textColor: Colors.PRIMARY
                })
            })
            .catch(error => {
                console.error('Error signing out:', error);
            });
    };

    return (
        <>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Header />
                </View>
                <View style={{ marginTop: -90 }}>
                    <CourseList level="Basic" textColor={Colors.WHITE} />
                </View>
                <CourseList level="Advance" />
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={{ color: "#000" }}>Click me</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.PRIMARY,
        height: 250,
        padding: 15
    }
});

export default Home;
