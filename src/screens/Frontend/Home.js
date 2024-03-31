import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../../components/frontend/Header';
import Colors from '../../utils/Colors';
import CourseList from '../../components/frontend/CourseList';
import CourseProgress from '../../components/frontend/CourseProgress';
import { useAuthContext } from '../../contexts/Authcontext';

const Home = () => {
    const { points } = useAuthContext()
    return (
        <>
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.headerContainer}>
                    <Header />
                </View>
                <View style={{ marginTop: -90 }}>
                    <CourseProgress level="Advance" textColor={Colors.WHITE} horizontal={true} cardWidth={225} />
                </View>
                <CourseList level="Basic" textColor={points < 0 ? Colors.WHITE : null} />
                <CourseList level="Moderate" />
                <CourseList level="Advance" />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.PRIMARY,
        height: 250,
        padding: 15
    }
});

export default Home;
