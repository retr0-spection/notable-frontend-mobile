import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLightMode } from '../../../redux/slices/dataSlice';

const Layout = () => {
    const lightMode = useSelector(selectLightMode)
    const adaptiveStyle = React.useMemo(() => ({
        color:lightMode ? 'dark' : 'light'
      }), [lightMode])
    
    return (
        <>
        <StatusBar style={adaptiveStyle.color} />

        <Stack>
            <Stack.Screen name="landing" options={{headerShown:false}} />
            <Stack.Screen name="signup" options={{headerShown:false}} />
            <Stack.Screen name="login" options={{headerShown:false}} />
        </Stack>
        </>
    );
};

export default Layout;
