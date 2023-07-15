//import liraries
import { Tabs } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// create a component
const Layout = () => {
    return (
        <>
            <Tabs screenOptions={{tabBarActiveTintColor:'black', tabBarInactiveTintColor:'gray'}}>
                <Tabs.Screen name="home" options={{ title: 'Home',
                 headerShown: false,
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='format-list-text' color={color} size={size} />
                ),
                tabBarLabelStyle:{display:'none'} }} />
                <Tabs.Screen name="notes" options={{
                    title: 'Notes',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name='notes' color={color} size={size} />
                    ),
                    tabBarLabelStyle:{display:'none'}
                }} />
                <Tabs.Screen 
                    name="canvas" 
                    options={{
                    title: 'canvas',
                    headerShown: false,
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name='create' color={color} size={size} />
                    ),
                }} />
            </Tabs>
        </>

    )
};


export default Layout;
