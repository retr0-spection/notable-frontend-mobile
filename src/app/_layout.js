import { Stack } from 'expo-router';
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, AppState } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import {persistor, store} from '../../redux/store';
import { SheetProvider } from "react-native-actions-sheet";
import { PersistGate } from 'redux-persist/integration/react';





const AppEntry = () => {
  

  
    return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <SheetProvider>
              <Stack>
                <Stack.Screen name="index" options={{headerShown:false}} />
                <Stack.Screen name="(tabs)" options={{headerShown:false}} />
                <Stack.Screen name="(auth)" options={{headerShown:false}} />
                <Stack.Screen name="projects" options={{headerShown:false}} />
                <Stack.Screen name="canvas" options={{headerShown:false}} />
              </Stack>
            </SheetProvider>
         </PersistGate>
      </Provider>
    );
};


export default AppEntry;
