import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from '@react-navigation/native';
import OptionItems from '../../components/frontend/OptionItems';
import ChapterSection from '../../components/frontend/ChapterSection';

import Colors from '../../utils/Colors';
import { enrollCourses, getEnrolledCourse, updateUserPoints } from '../../utils/GraphQl';
import { useAuthContext } from '../../contexts/Authcontext';
import Snackbar from 'react-native-snackbar';

const CoursesDetails = () => {
    const navigation = useNavigation();
    const { params } = useRoute();
    const { user, dispatch, points } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);
    const [isCourseLoading, setIsCourseLoading] = useState(true);
    const [courseDetails, setCourseDetails] = useState(null);
    const [userEnrolledCourseList, setUserEnrolledCourseList] = useState([]);

    useEffect(() => {
        if (params?.course) {
            setCourseDetails(params.course);
        }
    }, [params?.course]);

    const userEnrolledToCourse = useCallback(async () => {
        try {
            setIsLoading(true);
            const enrollResponse = await enrollCourses(courseDetails?.id, user?.email);
            if (enrollResponse) {
                const totalPoints = Number(points) + 10;
                Snackbar.show({
                    text: 'Course Enrolled Successfully',
                    duration: Snackbar.LENGTH_SHORT,
                    backgroundColor: Colors.PRIMARY,
                    textAlign: 'center',
                    fontFamily: "Outfit-SemiBold"
                });
                const updateUserResponse = await updateUserPoints(user?.email, totalPoints);
                dispatch({ type: "ADD_POINTS", payload: updateUserResponse?.updateUserDetail?.point });
            }
        } catch (error) {
            console.error('Error enrolling user:', error);
            Snackbar.show({
                text: 'Error Enrolling Course',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: Colors.PRIMARY,
                textAlign: 'center',
                fontFamily: "Outfit-SemiBold"
            });
        } finally {
            setIsLoading(false);
        }
    }, [courseDetails, user]);

    const getUserEnrolledCourse = useCallback(async () => {
        try {
            const response = await getEnrolledCourse(courseDetails?.id, user?.email);
            setUserEnrolledCourseList(response.userEnrolledCourses);
        } catch (error) {
            console.error('Error fetching user enrolled courses:', error);
        } finally {
            setIsCourseLoading(false);
        }
    }, [courseDetails, user, points]);

    useEffect(() => {
        const fetchUserEnrolledCourse = async () => {
            try {
                await getUserEnrolledCourse();
            } catch (error) {
                console.error('Error fetching user enrolled courses:', error);
            }
        };

        fetchUserEnrolledCourse();
    }, [getUserEnrolledCourse]);

    return (
        <>
            {isCourseLoading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator color={Colors.PRIMARY} size="large" />
                </View>
            )}
            {!isCourseLoading && <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-circle-left" size={30} color={Colors.PRIMARY} />
                    </TouchableOpacity>
                    {courseDetails && (
                        <View style={styles.courseDetailsContainer}>
                            <Image source={{ uri: courseDetails?.banner?.url }} style={styles.courseImage} />
                            <Text style={styles.courseTitle}>{courseDetails?.name}</Text>
                            <View>
                                <View style={styles.rowStyle}>
                                    <OptionItems icon="book-outline" value={`${courseDetails.chapters?.length} chapters`} />
                                    <OptionItems icon="time-outline" value={`${courseDetails.time} hr`} />
                                </View>
                                <View style={styles.rowStyle}>
                                    <OptionItems icon="person-circle-outline" value={courseDetails.author} />
                                    <OptionItems icon="cellular-outline" value={courseDetails.level} />
                                </View>
                            </View>
                            <Text style={styles.descriptionTitle}>Description</Text>
                            <Text style={styles.descriptionText}>{courseDetails.description?.markdown}</Text>
                            <View style={styles.enrollButtonsContainer}>
                                {userEnrolledCourseList && userEnrolledCourseList?.length === 0 && (
                                    <TouchableOpacity onPress={isLoading ? null : userEnrolledToCourse} disabled={isLoading} style={[styles.enrollButton, { backgroundColor: Colors.PRIMARY }]}>
                                        {isLoading ? (
                                            <View style={styles.enrollContent}>
                                                <Text style={styles.enrollButtonText}>Enrolling </Text>
                                                <ActivityIndicator size="small" color={Colors.WHITE} />
                                            </View>
                                        ) : (
                                            <Text style={styles.enrollButtonText}>Enroll For Free</Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity style={[styles.enrollButton, { backgroundColor: Colors.SECONDARY }]}>
                                    <Text style={styles.enrollButtonText}>Memberships $2.99/Month</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {courseDetails?.chapters && <ChapterSection chapters={courseDetails?.chapters} userEnrolledCourses={userEnrolledCourseList} />}
                </View>
            </ScrollView>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    backButton: {
        marginBottom: 10,
    },
    courseDetailsContainer: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: Colors.WHITE,
    },
    courseImage: {
        width: Dimensions.get('screen').width * 0.86,
        height: 190,
        borderRadius: 15,
    },
    courseTitle: {
        fontSize: 22,
        fontFamily: "Outfit-SemiBold",
        color: "#000",
        marginTop: 10,
    },
    descriptionTitle: {
        fontFamily: 'Outfit-SemiBold',
        fontSize: 20,
        color: '#000',
        marginTop: 10,
    },
    descriptionText: {
        color: Colors.GRAY,
        fontFamily: 'Outfit-Regular',
        lineHeight: 23,
    },
    enrollButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    enrollButton: {
        padding: 11,
        borderRadius: 15,
    },
    enrollButtonText: {
        fontFamily: "Outfit-Regular",
        color: Colors.WHITE,
        fontSize: 14,
        textAlign: 'center',
    },
    enrollContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowStyle: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CoursesDetails;
