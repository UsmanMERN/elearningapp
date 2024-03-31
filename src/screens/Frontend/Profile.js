import React from 'react';
import auth from '@react-native-firebase/auth';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../utils/Colors';
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/Authcontext';

import avatar from "../../assets/images/avatar.png";
import CoinIcon from "../../assets/images/Coin.png";
import Snackbar from 'react-native-snackbar';
import { storeData } from '../../utils/Services';

const Profile = () => {
    const navigation = useNavigation();
    const { user, points, dispatch } = useAuthContext();

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
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" color={Colors.WHITE} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.profileTitle}>Profile</Text>
            </View>
            <View style={styles.profileInfo}>
                <Image source={user?.photoURL ? { uri: user.photoURL } : avatar} style={styles.avatar} />
                <Text style={styles.userName}>{user.displayName}</Text>
            </View>
            <View style={styles.pointsContainer}>
                <Image source={CoinIcon} style={styles.coinIcon} />
                <Text style={styles.userPoints}>{points}</Text>
            </View>
            <TouchableOpacity style={styles.myCoursesButton} onPress={() => navigation.navigate('my-course')}>
                <MaterialCommunityIcons name="book-open-blank-variant" color={Colors.PRIMARY} size={30} />
                <Text style={styles.myCoursesText}>My Courses</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <TouchableOpacity style={styles.myCoursesButton} onPress={() => navigation.navigate('leaderboard')}>
                <Icon name="cellular-outline" color={Colors.PRIMARY} size={30} />
                <Text style={styles.myCoursesText}>Ranking</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
            <TouchableOpacity style={styles.myCoursesButton} onPress={handleLogout}>
                <MaterialCommunityIcons name="logout" color={Colors.PRIMARY} size={30} />
                <Text style={styles.myCoursesText}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.horizontalLine} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    topBar: {
        height: 160,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        paddingTop: 40,
        marginBottom: -50,
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 30,
        marginRight: 20,
    },
    profileTitle: {
        fontSize: 24,
        color: Colors.WHITE,
        fontFamily: "Outfit-Bold",
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 60,
    },
    userName: {
        fontSize: 24,
        color: Colors.BLACK,
        fontFamily: "Outfit-Bold",
        marginTop: 10,
    },
    pointsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    coinIcon: {
        height: 30,
        width: 30,
        marginRight: 10,
    },
    userPoints: {
        fontSize: 24,
        color: Colors.GRAY,
        fontFamily: "Outfit-Regular",
    },
    myCoursesButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    myCoursesText: {
        fontSize: 24,
        color: Colors.PRIMARY,
        fontFamily: "Outfit-Regular",
        marginLeft: 10,
    },
    horizontalLine: {
        borderBottomColor: Colors.GRAY,
        borderBottomWidth: 1,
        marginTop: 20,
        width: "85%",
        alignSelf: 'center'
    },
});

export default Profile;
