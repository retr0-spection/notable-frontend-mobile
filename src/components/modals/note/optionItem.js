//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const OptionItem = (props) => {
    const parentRef = props.parentRef

    const doAction = () => {
        parentRef.current.hide()
        props.action()
    }


    return (
        <TouchableOpacity style={{paddingHorizontal:'3%', backgroundColor:'#dedede', paddingVertical:'5%', borderRadius:10, flexDirection:'row', width:'100%', alignItems:'center'}} activeOpacity={0.7} onPress={doAction}>
            <View style={{width:'10%', marginRight:'5%'}}>
                {props.icon}
            </View>
            <Text style={{fontSize:16, color:props.titleColor || 'black' }}>{props.title}</Text>
        </TouchableOpacity>
    );
};



//make this component available to the app
export default OptionItem;
