import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import SubHeading from './SubHeading';
import { getCourseList } from '../../utils/GraphQl';
import Colors from '../../utils/Colors';

export default function CourseList({ level, textColor }) {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(true);
    const [courseList, setCourseList] = useState([]);

    const memoizedGetCourseList = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await getCourseList(level);
            setCourseList(res?.courses);
        } catch (error) {
            console.error('Error fetching course list:', error);
        } finally {
            setIsLoading(false);
        }
    }, [level]);

    useEffect(() => {
        memoizedGetCourseList();
    }, [memoizedGetCourseList]);

    return (
        <View style={styles.container}>
            <SubHeading text={`${level} Courses`} textColor={textColor} />
            {isLoading ? (
                <ActivityIndicator style={styles.loader} size="large" color={Colors.PRIMARY} />
            ) : (
                <FlatList
                    data={courseList}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("course-details", { course: item })}>
                            <View style={styles.courseCard}>
                                <Image source={{ uri: item?.banner?.url }} style={styles.courseImage} />
                                <View style={styles.courseDetails}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.courseTitle}>{item?.name}</Text>
                                    <View style={styles.infoRow}>
                                        <View style={styles.infoItem}>
                                            <Icon name="book-outline" size={24} color="black" />
                                            <Text style={styles.infoText}>{item?.chapters.length} Chapters</Text>
                                        </View>
                                        <View style={styles.infoItem}>
                                            <Icon name="time-outline" size={24} color="black" />
                                            <Text style={[styles.infoText, { maxWidth: 80 }]}>{item?.time}</Text>
                                        </View>
                                    </View>
                                    <Text style={[styles.infoText, { color: Colors.PRIMARY, marginTop: 8 }]}>
                                        {item?.price == 0 ? 'Free' : `$ ${item?.price}`}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
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
