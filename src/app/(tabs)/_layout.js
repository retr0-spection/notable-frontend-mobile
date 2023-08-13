//import liraries
import { Tabs } from 'expo-router';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../../styles';
import { Pressable } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch } from 'react-redux';
import { refreshProfile } from '../../../redux/slices/userSlice';

// create a component
const TabLayout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const listener = AppState.addEventListener('change', (e) => {
          if (e === 'active'){
            console.warn('App has come to the foreground');
            dispatch(refreshProfile())
          }
        })
    
        return listener.remove
    
      },[])
    
    return (
        <>
            <Tabs  screenOptions={{tabBarActiveTintColor:styles.tabBarActive.dark, tabBarInactiveTintColor:'gray', tabBarStyle:styles.tabBar.dark}}>
                <Tabs.Screen name="home" options={{ title: 'Home',
                 headerShown: false,
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='format-list-text' color={color} size={size} />
                ),
                tabBarLabelStyle:{display:'none'} }} />
                <Tabs.Screen name="discussions" options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        
                        <Ionicons name='chatbubbles' color={color} size={size} />
                    ),
                    tabBarLabelStyle:{display:'none'}
                }} />
                <Tabs.Screen 
                    name="profile" 
                    options={{
                    title: 'profile',
                    headerShown: false,
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color, size }) => (
                        <TouchableOpacity style={{borderRadius:size/2, borderWidth:1, borderColor:color}}>
                            <FastImage
                                source={require('../../../assets/mock/profilePictures/jessica.jpg')}
                                style={{ height: size, width: size, borderRadius: size/2 }}
                                resizeMode="cover"
                            />
                        </TouchableOpacity>
                    ),
                }} />
            </Tabs>
        </>

    )
};


export default TabLayout;
