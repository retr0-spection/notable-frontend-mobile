//import liraries
import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const ProfileLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{headerShown:false}} />
        </Stack>
    );
};



//make this component available to the app
export default ProfileLayout;
