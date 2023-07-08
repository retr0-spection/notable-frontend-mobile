import { Stack } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import {store} from '../../redux/store';




const Layout = () => {
  
    return (
      <Provider store={store}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown:false}} />
          <Stack.Screen name="(auth)" options={{headerShown:false}} />
        </Stack>
      </Provider>
    );
};


export default Layout;
