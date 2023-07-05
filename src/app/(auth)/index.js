//import liraries
import { Link } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../../components/screenLayoutComponents/styles';

// create a component
const Login = () => {
    return (
        <View style={styles.container}>
            <Link href='(tabs)' asChild>
                <Text>Login</Text>
            </Link>
        </View>
    );
};



//make this component available to the app
export default Login;
