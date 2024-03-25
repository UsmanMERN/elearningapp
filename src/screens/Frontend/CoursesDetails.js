import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Icon from "react-native-vector-icons/FontAwesome5"
import Colors from '../../utils/Colors'
import { useNavigation, useRoute } from '@react-navigation/native'
import OptionItems from '../../components/frontend/OptionItems'
import ChapterSection from '../../components/ChapterSection'
import { enrollCourses } from '../../utils/GraphQl'
import { useAuthContext } from '../../contexts/Authcontext'

export default function CoursesDetails() {
    const navigation = useNavigation()
    const { params } = useRoute()
    const { user } = useAuthContext()

    const [courseDetails, setCourseDetails] = useState(null)
    useEffect(() => {
        setCourseDetails(params?.course)
    }, [params?.course])

    // console.log('first', courseDetails.id)
    const userEnrolledCourse = async () => {
        try {
            await enrollCourses(courseDetails.id, user.email).then(resp => {
                console.log('resp', resp)
            })
        } catch (error) {
            console.error('Error enrolling user:', error);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-circle-left" size={30} color={Colors.PRIMARY} />
                    </TouchableOpacity>
                    {courseDetails && <View style={{ padding: 10, borderRadius: 15, backgroundColor: Colors.WHITE }}>
                        <Image source={{ uri: courseDetails?.banner?.url }} style={{ width: Dimensions.get('screen').width * 0.86, height: 190, borderRadius: 15 }} />
                        <Text style={{ fontSize: 22, fontFamily: "Outfit-SemiBold", color: "#000", marginTop: 10 }}>{courseDetails?.name}</Text>
                        <View>
                            <View style={styles.rowStyle}>
                                <OptionItems icon={"book-outline"} value={courseDetails.chapters?.length + " chapter"} />
                                <OptionItems icon={"time-outline"} value={courseDetails.time + " hr"} />
                            </View>
                            <View style={styles.rowStyle}>
                                <OptionItems icon={"person-circle-outline"} value={courseDetails.author} />
                                <OptionItems icon={"cellular-outline"} value={courseDetails.level} />
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Outfit-SemiBold', fontSize: 20, color: '#000' }}>Description</Text>
                                <Text style={{ color: Colors.GRAY, fontFamily: 'Outfit-Regular', lineHeight: 23 }}>{courseDetails.description?.markdown}</Text>
                            </View>
                            <View style={styles.rowStyle}>
                                <TouchableOpacity onPress={userEnrolledCourse} style={{ padding: 11, backgroundColor: Colors.PRIMARY, borderRadius: 15 }}>
                                    <Text style={{ fontFamily: "Outfit-Regular", color: Colors.WHITE, fontSize: 14, textAlign: 'center' }}>Enroll For Free</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: 11, backgroundColor: Colors.SECONDARY, borderRadius: 15 }}>
                                    <Text style={{ fontFamily: "Outfit-Regular", color: Colors.WHITE, fontSize: 14, textAlign: 'center' }}>Memberships 2.99$/Month</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>}
                </View>
                <View>
                    {courseDetails?.chapters && <ChapterSection chapters={courseDetails?.chapters} />}
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    rowStyle: {
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    }
})