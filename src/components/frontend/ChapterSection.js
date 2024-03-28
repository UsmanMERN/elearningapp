import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../../utils/Colors';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';

export default function ChapterSection({ chapters, userEnrolledCourses }) {
    const navigation = useNavigation()

    const handleChapterPress = (content) => {
        if (userEnrolledCourses.length == 0) {
            Snackbar.show({
                text: "Please Enroll Course!",
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: Colors.PRIMARY,
                textAlign: 'center',
                fontFamily: "Outfit-SemiBold"
            })
            return
        } else {
            navigation.navigate('chapter-content', { content })
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ color: '#000', fontFamily: "Outfit-SemiBold", fontSize: 22, marginBottom: 10 }}>Chapters</Text>
                {chapters?.map((item, i) => {
                    return (
                        <TouchableOpacity style={[styles.chapterContainer]} key={i + 1} onPress={() => handleChapterPress(item.content)}>
                            <Text style={styles.chapterNumber}>{i + 1}</Text>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.chapterTitle}>{item.title}</Text>
                            {userEnrolledCourses.length === 0 ? <Icon name="lock-closed-outline" size={20} color={Colors.GRAY} /> : <Icon name="play" size={20} color={Colors.GRAY} />}</TouchableOpacity>
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
