import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../../utils/Colors';
import RenderHTML from 'react-native-render-html';
import { isChapterCompleted, markChapterCompleted } from '../../utils/GraphQl';
import Snackbar from 'react-native-snackbar';
import { useAuthContext } from '../../contexts/Authcontext';

export default function ChapterContent() {
    const { user, points, dispatch, userEnrolledCourse } = useAuthContext()
    const { params } = useRoute();
    const { width } = useWindowDimensions();
    const navigation = useNavigation()

    const [isRunCode, setIsRunCode] = useState(params.content.map(() => false))
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    // Calculate array size and width
    const arraySize = params.content.length > 0 ? Array.from({ length: params.content.length }, (_, index) => index + 1) : [0];
    const progressBarWidth = 100 / (params.content.length > 0 ? params.content.length : 1);

    let contentRef;
    const handlePressNext = () => {
        const nextIndex = currentItemIndex + 1;
        if (nextIndex < params.content.length) {
            setCurrentItemIndex(nextIndex);
            contentRef.scrollToIndex({ animated: true, index: nextIndex });
            return
        }
    };

    const checkIsAlreadyCompleted = () => {
        // Iterate through the userEnrolledCourse array
        for (const enrolledCourse of userEnrolledCourse) {
            if (enrolledCourse?.chapterId && enrolledCourse.chapterId.includes(params.chapterId)) {
                return true;
            }
        }
        return false;
    }


    const handleFinish = async () => {
        setLoading(true);
        const isAlreadyCompleted = checkIsAlreadyCompleted();

        if (!isAlreadyCompleted) {
            const totalPoints = Number(points) + params.content?.length * 10;
            await markChapterCompleted(params.chapterId, params.userCourseRecordId, user?.email, totalPoints).then(resp => {
                if (resp) {
                    dispatch({ type: "ADD_POINTS", payload: resp?.updateUserDetail?.point });
                    dispatch({ type: "CHECK_ENROLLED_COURSE", payload: params.chapterId });
                    Snackbar.show({
                        text: "Congratulations! Chapter Completed",
                        duration: Snackbar.LENGTH_SHORT,
                        backgroundColor: Colors.PRIMARY,
                        textAlign: 'center',
                        fontFamily: "Outfit-SemiBold"
                    });
                }
            });
        } else {
            // Chapter is already completed, show a snackbar message
            Snackbar.show({
                text: "Chapter already completed",
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: Colors.PRIMARY,
                textAlign: 'center',
                fontFamily: "Outfit-SemiBold"
            });
        }

        navigation.goBack();
        setLoading(false);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Render progress bars */}
            <View style={styles.progressBarContainer}>
                {arraySize.map((item, index) => (
                    <View key={index} style={[styles.progressBar, { width: `${progressBarWidth - 2}%`, backgroundColor: index <= currentItemIndex ? Colors.GREEN : Colors.GRAY, },]} />
                ))}
            </View>
            {/* FlatList for content */}
            <View style={styles.flatListContainer}>
                {params.content.length > 0 ? (
                    <FlatList horizontal={true} data={params.content} pagingEnabled showsHorizontalScrollIndicator={false} ref={(ref) => { contentRef = ref }}
                        onMomentumScrollEnd={(event) => { const contentOffsetX = event.nativeEvent.contentOffset.x; const index = Math.round(contentOffsetX / width); setCurrentItemIndex(index); }}
                        renderItem={({ item, index }) => (
                            <View style={styles.contentItem}>
                                <Text style={styles.contentHeading}>{item.heading}</Text>
                                <View>
                                    <RenderHTML source={{ html: item.description.html }} contentWidth={width} tagsStyles={tagsStyles} />
                                    <View style={{ alignSelf: 'flex-end', marginTop: -20 }}>
                                        <TouchableOpacity onPress={() => { const newIsRunCodeArray = [...isRunCode]; newIsRunCodeArray[index] = true; setIsRunCode(newIsRunCodeArray); }}>
                                            <Text style={{ color: Colors.WHITE, paddingVertical: 10, paddingHorizontal: 15, backgroundColor: Colors.PRIMARY, fontFamily: 'Outfit-Bold', borderRadius: 10 }}>Run</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {isRunCode[index] ? <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 17, fontFamily: "Outfit-SemiBold", color: "#000" }}>Output</Text>
                                        {item?.output?.html ? <RenderHTML source={{ html: item?.output.html }} contentWidth={width} tagsStyles={tagsOutputStyles} /> : <Text style={styles.noOutputText}>No output available</Text>}
                                    </View> : null}
                                    <View style={{ marginTop: 20 }}>
                                        <TouchableOpacity onPress={loading ? null : (currentItemIndex < params.content.length - 1 ? handlePressNext : handleFinish)} style={[styles.button, { backgroundColor: currentItemIndex < params.content.length - 1 ? Colors.PRIMARY : Colors.GREEN }]} disabled={loading}>
                                            {loading ? <ActivityIndicator color={Colors.WHITE} /> : <Text style={styles.buttonText}>{currentItemIndex < params.content.length - 1 ? "Next" : "Finish"}</Text>}
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noContentText}>No content available</Text>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 10,
    },
    progressBar: {
        borderRadius: 10,
        height: 10,
        flex: 1,
    },
    flatListContainer: {
        justifyContent: 'center',
        marginVertical: 5,
        width: '100%',
    },
    contentItem: {
        width: Dimensions.get('screen').width * 0.92,
        paddingVertical: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentHeading: {
        color: '#000',
        fontSize: 22,
        fontFamily: 'Outfit-SemiBold',
        marginTop: 15
    },
    progressBarText: {
        color: '#000',
        marginBottom: 10,
    },
    contentText: {
        color: '#000',
        marginTop: 10,
    },
    noContentText: {
        textAlign: 'center',
        fontSize: 20,
        marginTop: 50,
        color: Colors.GRAY,
        fontStyle: 'italic'
    },
    noOutputText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10,
        color: Colors.PRIMARY,
        fontStyle: 'italic'
    },
    buttonContainer: {
        alignItems: 'flex-end',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: Colors.WHITE,
        fontFamily: 'Outfit-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
});
const tagsStyles = {
    body: {
        whiteSpace: 'normal',
        color: 'gray',
        fontFamily: "Outfit-Regular",
        fontSize: 17
    },
    code: {
        color: '#fff',
        backgroundColor: "#000",
        padding: 20,
        borderRadius: 17,
        fontSize: 12,
        fontFamily: "Outfit-SemiBold",
    },
};
const tagsOutputStyles = {
    body: {
        whiteSpace: 'normal',
        fontFamily: "Outfit-Regular",
        fontSize: 17,
        color: '#fff',
        backgroundColor: "#000",
        padding: 20,
        borderRadius: 17,
        fontSize: 12,
        fontFamily: "Outfit-SemiBold",
    },
    code: {
    }
};
