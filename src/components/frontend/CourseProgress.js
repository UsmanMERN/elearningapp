import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SubHeading from './SubHeading';
import { getAllProgressCourse } from '../../utils/GraphQl';
import Colors from '../../utils/Colors';
import { useAuthContext } from '../../contexts/Authcontext';
import CourseProgressBar from './CourseProgressBar';


export default function CourseProgress() {
    const navigation = useNavigation();
    const { user, points } = useAuthContext()

    const [isLoading, setIsLoading] = useState(true);
    const [courseList, setCourseList] = useState([]);

    const fetchCourseList = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getAllProgressCourse(user?.email);
            if (res && res.userEnrolledCourses) {
                setCourseList(res.userEnrolledCourses);
            } else {
                console.log('No courses found');
                setCourseList([]);
            }
        } catch (error) {
            console.error('Error fetching course list:', error);
        } finally {
            setIsLoading(false);
        }
    }, [user, points]);

    useEffect(() => {
        fetchCourseList();
    }, [fetchCourseList]);

    if (courseList.length === 0) {
        return null;
    }


    return (
        <View style={styles.container}>
            <SubHeading text={`In Progress`} textColor={Colors.WHITE} />
            {isLoading ? (
                <ActivityIndicator style={styles.loader} size="large" color={Colors.PRIMARY} />
            ) : (
                <FlatList
                    data={courseList}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("course-details", { course: item.course })}>
                                <View style={styles.courseCard}>
                                    <Image source={{ uri: item.course?.banner?.url }} style={styles.courseImage} />
                                    <View style={styles.courseDetails}>
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.courseTitle}>{item?.course?.name}</Text>
                                        <View style={styles.infoRow}>
                                            <View style={styles.infoItem}>
                                                <Icon name="book-outline" size={24} color="black" />
                                                <Text style={styles.infoText}>{item?.course?.chapters.length} Chapters</Text>
                                            </View>
                                            <View style={styles.infoItem}>
                                                <Icon name="time-outline" size={24} color="black" />
                                                <Text style={[styles.infoText, { maxWidth: 80 }]}>{item?.course?.time}</Text>
                                            </View>
                                        </View>
                                        <Text style={[styles.infoText, { color: Colors.PRIMARY, marginVertical: 8 }]}>
                                            {item?.course?.price == 0 ? 'Free' : `$ ${item?.course?.price}`}
                                        </Text>
                                        <CourseProgressBar completedChapter={item?.completedChapter} totalChapters={item.course?.chapters} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingRight: 0,
    },
    courseCard: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        marginRight: 15,
        borderRadius: 15,
        flex: 1,
    },
    courseImage: {
        height: 120,
        width: 210,
        borderRadius: 15,
    },
    courseDetails: {
        padding: 8,
    },
    courseTitle: {
        color: "#000",
        fontFamily: 'Outfit-SemiBold',
        fontSize: 17,
        maxWidth: 200,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        gap: 8
    },
    infoText: {
        color: '#000',
        fontFamily: "Outfit-Regular",
    },
    loader: {
        marginTop: 20,
        height: 180
    },
});
