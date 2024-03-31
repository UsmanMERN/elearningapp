import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { getAllUserDetails } from '../../utils/GraphQl';

import Colors from '../../utils/Colors';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

// aasets
import goldeBagde from "../../assets/images/golden.png"
import bronzeBagde from "../../assets/images/bronze.png"
import silverBagde from "../../assets/images/silver.png"

export default function LeaderBoard() {
    const navigation = useNavigation();

    const [userDetails, setUserDetails] = useState([]);

    useEffect(() => {
        getAllUser();
    }, []);

    const getAllUser = async () => {
        try {
            const response = await getAllUserDetails();
            setUserDetails(response.userDetails);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" color={Colors.WHITE} style={styles.backArrow} />
                </TouchableOpacity>
                <Text style={styles.leaderboardTitle}>Leaderboard</Text>
            </View>
            <View style={{ height: "85%" }}>
                <FlatList
                    data={userDetails}
                    renderItem={({ item, index }) => (
                        <View style={styles.userContainer}>
                            <Text style={styles.userNumber}>{index + 1}</Text>
                            <Image source={{ uri: item.profileImage }} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{item.userName}</Text>
                                <Text style={styles.userPoints}>Points: {item.point}</Text>
                            </View>
                            {index < 3 && (
                                <Image
                                    source={index === 0 ? goldeBagde : index === 1 ? silverBagde : bronzeBagde}
                                    style={styles.badgeImage}
                                />
                            )}
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBar: {
        height: 160,
        padding: 20,
        backgroundColor: Colors.PRIMARY,
        flexDirection: 'row',
        paddingTop: 40,
        marginBottom: -30
    },
    backArrow: {
        fontSize: 30,
        color: Colors.WHITE,
        marginRight: 20,
    },
    leaderboardTitle: {
        fontSize: 24,
        color: Colors.WHITE,
        fontFamily: "Outfit-Bold",
    },
    listContainer: {
        paddingBottom: 10,
        paddingHorizontal: 20,
    },
    userNumber: {
        color: Colors.GRAY,
        fontSize: 18,
        fontFamily: "Outfit-Bold",
        marginEnd: 12
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 10,
        borderRadius: 15
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontFamily: "Outfit-Bold",
        color: Colors.PRIMARY
    },
    userPoints: {
        fontSize: 14,
        color: 'gray',
    },
    badgeImage: {
        width: 40,
        height: 40,
        marginLeft: 'auto',
    },
});
