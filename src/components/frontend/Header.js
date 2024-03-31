import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

import { useAuthContext } from '../../contexts/Authcontext'

import Icon from "react-native-vector-icons/Ionicons"

import Colors from '../../utils/Colors'
import CoinIcon from "../../assets/images/Coin.png"
import avatar from "../../assets/images/avatar.png"

export default function Header() {
    const { user, isAuthenticated, points } = useAuthContext()

    return (
        <View>
            <View style={styles.container}>
                <View style={styles.topbar}>
                    <Image source={user?.photoURL ? { uri: user.photoURL } : avatar} style={styles.avatar} />
                    <View>
                        <Text style={styles.welcomeTxt}>Welcome,</Text>
                        <Text style={styles.nameTxt}>{user?.displayName}</Text>
                    </View>
                </View>
                <View style={styles.topbar}>
                    <Image source={CoinIcon} style={styles.coinIcon} />
                    <Text style={styles.nameTxt}>{points}</Text>
                </View>
            </View>

            <View style={[styles.searchBar, styles.topbar]}>
                <TextInput placeholder='Search Course' placeholderTextColor={'#000'} style={styles.searchBarText} />
                <Icon name="search-circle" style={{ color: Colors.PRIMARY }} size={50} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 30,
        fontFamily: 'Outfit-Regular'
    },
    topbar: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 99,
    },
    welcomeTxt: {
        color: Colors.WHITE
    },
    nameTxt: {
        color: Colors.WHITE,
        fontSize: 18,
        fontFamily: "Outfit-Regular"
    },
    coinIcon: {
        height: 35,
        width: 35
    },
    searchBar: {
        backgroundColor: Colors.WHITE,
        color: '#000',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 5,
        marginTop: 20,
        borderRadius: 99
    },
    searchBarText: {
        color: '#000',
    }
})