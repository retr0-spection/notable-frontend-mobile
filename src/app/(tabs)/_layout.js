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
import { useDispatch, useSelector } from 'react-redux';
import { refreshProfile } from '../../../redux/slices/userSlice';
import { uploadAllNotes } from '../../../redux/slices/noteSlice';
import { selectLightMode } from '../../../redux/slices/dataSlice';
import { StatusBar } from 'expo-status-bar';

// create a component
const TabLayout = () => {
    const dispatch = useDispatch()
    const lightMode = useSelector(selectLightMode)

    useEffect(() => {
        const listener = AppState.addEventListener('change', (e) => {
          if (e === 'active'){
            console.warn('App has come to the foreground');
            dispatch(refreshProfile())
          }else if (e === 'background'){
            // syncing notes
            dispatch(uploadAllNotes())
          }
        })
    
        return listener.remove
    
      },[])

      const adaptiveStyle = React.useMemo(() => ({
        color:lightMode ? 'dark' : 'light'
      }), [lightMode])
    
    
    return (
        <>
        <StatusBar style={adaptiveStyle.color} />
            <Tabs  screenOptions={{tabBarActiveTintColor: lightMode ? styles.tabBarActive.light : styles.tabBarActive.dark, tabBarInactiveTintColor:'gray', tabBarStyle:lightMode ? styles.tabBar.light :styles.tabBar.dark}}>
                <Tabs.Screen name="home" options={{ title: 'Home',
                 headerShown: false,
                 tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name='format-list-text' color={color} size={size} />
                ),
                tabBarLabelStyle:{display:'none'} }} />
             
                <Tabs.Screen 
                    name="profile" 
                    options={{
                    title: 'profile',
                    headerShown: false,
                    tabBarLabelStyle: { display: 'none' },
                    tabBarIcon: ({ color, size }) => (
                            <FastImage
                                source={require('../../../assets/mock/profilePictures/jessica.jpg')}
                                style={{ height: size, width: size, borderRadius: size/2,borderRadius:size/2, borderWidth:1, borderColor:color }}
                                resizeMode="cover"
                            />
                    ),
                }} />
            </Tabs>
        </>

    )
};


export default TabLayout;
