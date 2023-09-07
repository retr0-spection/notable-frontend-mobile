//import liraries
import React, { Component, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import TextInputComponent from '../../formComponents/textInput';
import { styles } from '../../../styles';

// create a component
const SCREEN_WIDTH = Dimensions.get('screen').width

const NameInput = React.forwardRef((props, ref) => {
    const inputRef = React.useRef()

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus()
    }))

    return (
        <View style={{width:SCREEN_WIDTH}}>
            <View style={{paddingVertical:'3%', paddingTop:'30%'}}>
                    <Text style={[styles.textDark, {fontSize:24, fontWeight:'bold'}]}>Workspace Name</Text>
            </View>
            <TextInputComponent ref={inputRef} onChangeText={props.onChangeText} placeholder='Workspace name' placeholderTextColor={'gray'} />
        </View>
    );
});



//make this component available to the app
export default NameInput;
