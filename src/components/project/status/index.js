//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const StatusComponent = (props) => {
    const TYPES = {
        urgent : {
            textColor:'rgb(255, 93, 93)',
            backgroundColor: 'rgb(255, 227, 228)',
            text: 'Urgent',
        },
        new : {
            textColor: "rgb(0, 152, 172)",
            backgroundColor: 'rgb(227, 250, 252)',
            text: 'New',
        }
    }
    const [mode, setMode] = useState(TYPES['new']) 

    useEffect(() => {
        setMode(TYPES[props.type])
    },
    [props.type])



    return (
        <View style={{backgroundColor: mode.backgroundColor, paddingHorizontal: '10%', paddingVertical: '3%', borderRadius: 20, alignSelf: 'flex-start' }}>
            <Text style={{ color: mode.textColor, fontWeight: 'bold' }}>{mode.text}</Text>
        </View>
    );
};



//make this component available to the app
export default StatusComponent;
