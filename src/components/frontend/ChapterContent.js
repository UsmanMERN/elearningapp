import React, { useState, useEffect } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '../../utils/Colors';

export default function ChapterContent() {
    const { params } = useRoute();

    // Calculate array size and width
    const arraySize = params.content.length > 0 ? Array.from({ length: params.content.length }, (_, index) => index + 1) : [0];
    const width = 100 / (params.content.length > 0 ? params.content.length : 1);
    const contentIndex = 0;

    console.log('params.content.item.heading', params.content)
    return (
        <View style={styles.container}>
            {/* Render progress bars */}
            <View style={styles.progressBarContainer}>
                {arraySize.map((item, index) => (
                    <View key={index} style={[styles.progressBar, { width: `${width - 2}%`, backgroundColor: index <= contentIndex ? Colors.PRIMARY : Colors.GRAY, },]} />
                ))}
            </View>
            {/* FlatList for content */}
            <View style={styles.flatListContainer}>
                <FlatList horizontal={true} data={params.content} pagingEnabled showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={styles.contentItem}>
                            <Text style={styles.contentHeading}>{item.heading}</Text>
                            <View>
                                <Text style={styles.contentDescription}>{item?.description.html}</Text>
                            </View>
                        </View>
                    )}
                />
            </View>
            {/* Progress bar text */}
            <Text style={styles.progressBarText}>Progress bar:</Text>
            {/* Content text */}
            <Text style={styles.contentText}>Content:</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
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
        maxHeight: Dimensions.get('screen').height * 0.4,
    },
    contentItem: {
        width: Dimensions.get('screen').width * 0.92,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
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
    contentDescription: {
        color: '#000',
        // fontSize: 22,
        fontFamily: 'Outfit-Regular',
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
});
