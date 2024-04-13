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

    const contentRef = React.useRef(null);

    const handlePressNext = () => {
        const nextIndex = currentItemIndex + 1;
        if (nextIndex < params.content.length) {
            setCurrentItemIndex(nextIndex);
            contentRef.current.scrollToIndex({ animated: true, index: nextIndex });
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
        <ScrollView contentContainerStyle={styles.container}>
            {/* Render progress bars */}
            <View style={styles.progressBarContainer}>
                {params.content.map((_, index) => (
                    <View key={index} style={[styles.progressBar, { width: `${100 / params.content.length}%`, backgroundColor: index <= currentItemIndex ? Colors.GREEN : Colors.GRAY }]} />
                ))}
            </View>
            {/* FlatList for content */}
            <FlatList
                horizontal
                data={params.content}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={contentRef}
                onMomentumScrollEnd={(event) => {
                    const contentOffsetX = event.nativeEvent.contentOffset.x;
                    const index = Math.round(contentOffsetX / width);
                    setCurrentItemIndex(index);
                }}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.contentItem}>
                        <Text style={styles.contentHeading}>{item.heading}</Text>
                        <RenderHTML source={{ html: item.description.html }} contentWidth={width} tagsStyles={tagsStyles} />
                        <View style={styles.runButtonContainer}>
                            <TouchableOpacity onPress={() => setIsRunCode(prevState => [...prevState.slice(0, index), true, ...prevState.slice(index + 1)])}>
                                <Text style={styles.runButtonText}>Run</Text>
                            </TouchableOpacity>
                        </View>
                        {isRunCode[index] && (
                            <View style={styles.outputContainer}>
                                <Text style={styles.outputTitle}>Output</Text>
                                {item.output?.html ? (
                                    <RenderHTML source={{ html: item.output.html }} contentWidth={width} tagsStyles={tagsOutputStyles} />
                                ) : (
                                    <Text style={styles.noOutputText}>No output available</Text>
                                )}
                            </View>
                        )}
                        <TouchableOpacity onPress={loading ? null : (index < params.content.length - 1 ? handlePressNext : handleFinish)} style={[styles.button, { backgroundColor: index < params.content.length - 1 ? Colors.PRIMARY : Colors.GREEN }]} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color={Colors.WHITE} />
                            ) : (
                                <Text style={styles.buttonText}>{index < params.content.length - 1 ? "Next" : "Finish"}</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    progressBarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    progressBar: {
        height: 10,
        borderRadius: 10,
        marginRight: 2,
    },
    contentItem: {
        width: Dimensions.get('screen').width,
        padding: 10,
    },
    contentHeading: {
        fontSize: 22,
        fontFamily: 'Outfit-SemiBold',
        color: Colors.BLACK,
        marginTop: 15,
    },
    runButtonContainer: {
        alignSelf: 'flex-end',
        marginTop: -20,
    },
    runButtonText: {
        color: Colors.WHITE,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.PRIMARY,
        fontFamily: 'Outfit-Bold',
        borderRadius: 10,
    },
    outputContainer: {
        marginTop: 20,
    },
    outputTitle: {
        fontSize: 17,
        fontFamily: 'Outfit-SemiBold',
        color: Colors.BLACK,
    },
    noOutputText: {
        fontSize: 16,
        fontStyle: 'italic',
        color: Colors.PRIMARY,
        textAlign: 'center',
        marginTop: 10,
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    buttonText: {
        color: Colors.WHITE,
        fontFamily: 'Outfit-Bold',
        fontSize: 16,
        textAlign: 'center',
    },
});

const tagsStyles = {
    body: {
        whiteSpace: 'normal',
        color: Colors.GRAY,
        fontFamily: 'Outfit-Regular',
        fontSize: 17,
    },
};

const tagsOutputStyles = {
    body: {
        whiteSpace: 'normal',
        fontFamily: 'Outfit-Regular',
        fontSize: 17,
        color: Colors.WHITE,
        backgroundColor: Colors.BLACK,
        padding: 20,
        borderRadius: 17,
    },
};
