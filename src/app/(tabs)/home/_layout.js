import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Layout = () => {
    return (
        <Stack>
            <Stack.Screen name="index"  options={{title:'Home',headerShown:false}}   />
        </Stack>
    );
};


//make this component available to the app
export default Layout;
