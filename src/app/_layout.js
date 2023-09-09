global.Buffer = global.Buffer || require("buffer").Buffer;
import { polyfillWebCrypto } from "expo-standard-web-crypto";
polyfillWebCrypto();

import { Stack } from 'expo-router';
import React, { Component, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, AppState } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {persistor, store} from '../../redux/store';
import { SheetProvider } from "react-native-actions-sheet";
import { PersistGate } from 'redux-persist/integration/react';
import { StatusBar } from 'expo-status-bar';
import { selectLightMode } from "../../redux/slices/dataSlice";





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
                <Stack.Screen name="workspaces" options={{headerShown:false}} />
                <Stack.Screen name="canvas" options={{headerShown:false}} />
                <Stack.Screen name="notes" options={{headerShown:false}} />
              </Stack>
            </SheetProvider>
         </PersistGate>
      </Provider>
    );
};


export default AppEntry;
