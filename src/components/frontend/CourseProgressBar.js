import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../utils/Colors';

export default function CourseProgressBar({ completedChapter, totalChapters }) {
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        const percentage = (completedChapter.length / totalChapters.length) * 100;
        setCompletionPercentage(percentage);

    }, [completedChapter, totalChapters]);

    return (
        <View style={styles.progressBar}>
            <View style={[styles.innerProgressBar, { width: `${Math.max(0, Math.min(100, completionPercentage))}%` }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    progressBar: {
        width: '100%',
        height: 7,
        backgroundColor: Colors.GRAY,
        borderRadius: 10,
        marginTop: 5,
        paddingTop: 5
    },
    innerProgressBar: {
        height: 7,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 10,
        marginTop: -5
    }
});
