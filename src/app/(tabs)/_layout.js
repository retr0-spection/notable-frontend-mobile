//import liraries
import { Tabs } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Layout = () => {
    return (
        <>
            <Tabs>
                <Tabs.Screen name="home" options={{title:'Home',headerShown:false}} /> 
                <Tabs.Screen name="notes" options={{title:'Notes',headerShown:false}} /> 
                <Tabs.Screen name="create" options={{title:'Create',headerShown:false}} /> 
            </Tabs>
        </>
        
    ) 
};


export default Layout;
