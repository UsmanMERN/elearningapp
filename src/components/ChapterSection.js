import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../utils/Colors';

export default function ChapterSection({ chapters }) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ color: '#000', fontFamily: "Outfit-SemiBold", fontSize: 22, marginBottom: 10 }}>Chapters</Text>
                {chapters?.map((item, i) => {
                    return (
                        <View style={styles.chapterContainer} key={i + 1}>
                            <Text style={styles.chapterNumber}>{i + 1}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chapterTitle}>{item.title}</Text>
                            <Icon name="lock-closed-outline" size={20} color={Colors.GRAY} />
                        </View>
                    )
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 15
    },
    chapterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: Colors.GRAY
    },
    chapterNumber: {
        color: Colors.GRAY,
        fontFamily: "Outfit-SemiBold",
        fontSize: 18,
        marginRight: 10,
    },
    chapterTitle: {
        color: Colors.GRAY,
        fontFamily: "Outfit-Regular",
        fontSize: 17,
        flex: 1,
    },
});
