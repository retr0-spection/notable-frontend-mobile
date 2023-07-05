//import liraries
import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import StackNavigationHeader from '../../../components/screenLayoutComponents/stackNavigationHeader';
import { styles } from '../../../components/screenLayoutComponents/styles';

// create a component
const NoteDetail = () => {
    return (
        <SafeAreaView style={styles.container} edges={['right', 'left']}>
            <StackNavigationHeader title={'Note'} />
        </SafeAreaView>
    );
};



//make this component available to the app
export default NoteDetail;
