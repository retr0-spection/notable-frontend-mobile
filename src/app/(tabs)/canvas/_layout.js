//import liraries
import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const CreateLayout = () => {
    return (
       <Stack>
            <Stack.Screen name='[id]' options={{headerShown:false}}  />
       </Stack>
    );
};



//make this component available to the app
export default CreateLayout;
