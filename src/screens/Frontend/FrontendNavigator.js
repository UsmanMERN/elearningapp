import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// Screen
import Home from './Home';
import MyCourse from './MyCourse';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
export default function FrontendNavigator() {
    return (
        <Tab.Navigator initialRouteName={"Home"} screenOptions={{ headerShown: false }}>
            <Tab.Group>
                <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: (({ color, size }) => (<Icon name="home" color={color} size={size} />)) }} />
                <Tab.Screen name="my-course" component={MyCourse} options={{ tabBarIcon: (({ color, size }) => (<Icon name="book-open-blank-variant" color={color} size={size} />)) }} />
                <Tab.Screen name="leaderboard" component={LeaderBoard} options={{ tabBarIcon: (({ color, size }) => (<MaterialIcon name="leaderboard" color={color} size={size} />)) }} />
                <Tab.Screen name="profile" component={Profile} options={{ tabBarIcon: (({ color, size }) => (<MaterialIcon name="supervised-user-circle" color={color} size={size} />)) }} />
            </Tab.Group>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})