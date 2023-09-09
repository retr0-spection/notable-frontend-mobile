//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLightMode } from '../../../redux/slices/dataSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '..';

// create a component
const CustomSafeAreaView = ({children, ...props}) => {
    const lightMode = useSelector(selectLightMode)



    return (
        <SafeAreaView {...props} style={[!lightMode ? styles.containerDark : styles.containerLight, {height:'100%'}]}>
            {children}
        </SafeAreaView>
    );
};



//make this component available to the app
export default CustomSafeAreaView;
