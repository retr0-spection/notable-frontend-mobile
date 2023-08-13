import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="landing" options={{headerShown:false}} />
            <Stack.Screen name="signup" options={{headerShown:false}} />
            <Stack.Screen name="login" options={{headerShown:false}} />
        </Stack>
    );
};

export default Layout;
