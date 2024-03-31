import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Icon from "react-native-vector-icons/Ionicons";
import Colors from '../../utils/Colors';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../contexts/Authcontext';

export default function ChapterSection({ chapters, userEnrolledCourses }) {
    const navigation = useNavigation();
    const { dispatch } = useAuthContext()

    const handleChapterPress = (chapter) => {
        if (userEnrolledCourses.length === 0) {
            Snackbar.show({
                text: "Please Enroll Course!",
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: Colors.PRIMARY,
                textAlign: 'center',
                fontFamily: "Outfit-SemiBold"
            });
            return;
        } else {
            navigation.navigate('chapter-content', { content: chapter.content, chapterId: chapter.id, userCourseRecordId: userEnrolledCourses[0]?.id });
        }
    };

    const checkIsCompletedChapter = (chapterId) => {
        if (!userEnrolledCourses[0]?.completedChapter || userEnrolledCourses[0]?.completedChapter.length <= 0) {
            return false
        }
        const response = userEnrolledCourses[0]?.completedChapter.find((item) => item.chapterId == chapterId)
        return response
    }

    useEffect(() => {
        chapters.forEach(chapter => checkCompletionStatus(chapter.id));
    }, [chapters, userEnrolledCourses]);

    const checkCompletionStatus = (chapterId) => {
        const completedChapter = userEnrolledCourses[0]?.completedChapter;
        if (completedChapter && completedChapter.length > 0) {
            const completionStatus = completedChapter.find((item) => item.chapterId == chapterId);
            dispatch({ type: "CHECK_ENROLLED_COURSE", payload: completionStatus || "" });
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={{ color: '#000', fontFamily: "Outfit-SemiBold", fontSize: 22, marginBottom: 10 }}>Chapters</Text>
                {chapters?.map((item, i) => {
                    const isCompleted = checkIsCompletedChapter(item.id);
                    return (
                        <TouchableOpacity style={[styles.chapterContainer, isCompleted ? styles.completedChapter : styles.notCompletedChapter]} key={i + 1} onPress={() => handleChapterPress(item)}>
                            {isCompleted ? <Icon name="checkmark-circle" size={20} color={Colors.GREEN} styles={styles.chapterNumber} /> : <Text style={[styles.chapterNumber, isCompleted ? styles.completedChapterNumber : styles.notCompletedChapterNumber]}>{i + 1}</Text>}
                            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.chapterTitle, isCompleted ? styles.completedChapterTitle : styles.notCompletedChapterTitle]}>{item.title}</Text>
                            {userEnrolledCourses.length === 0 ? <Icon name="lock-closed-outline" size={20} color={Colors.GRAY} /> : <Icon name="play-circle" size={20} color={isCompleted ? Colors.GREEN : Colors.PRIMARY} />}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    );
}
// checkmark-circle
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
    },
    chapterNumber: {
        fontFamily: "Outfit-SemiBold",
        fontSize: 18,
        marginRight: 10,
    },
    chapterTitle: {
        fontFamily: "Outfit-Regular",
        fontSize: 17,
        flex: 1,
    },
    completedChapter: {
        borderColor: Colors.GREEN,
        backgroundColor: "#5AE8571C",
    },
    completedChapterNumber: {
        color: Colors.GREEN,
    },
    completedChapterTitle: {
        color: Colors.GREEN,
    },
    notCompletedChapter: {
        borderColor: Colors.PRIMARY,
        backgroundColor: "#6857E81C",
    },
    notCompletedChapterNumber: {
        color: Colors.PRIMARY,
    },
    notCompletedChapterTitle: {
        color: Colors.PRIMARY,
    },
});
