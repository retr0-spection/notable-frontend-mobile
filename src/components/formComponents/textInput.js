//import liraries
import React, { Component, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const TextInputComponent = React.forwardRef((props, ref) => {
    const inputRef = React.useRef()

    useImperativeHandle(ref, () => ({
        focus: () => inputRef.current.focus()
    }))

    return (
       <TextInput ref={inputRef} {...props}  selectionColor={'white'} style={{color:'white', borderBottomWidth:1, borderColor:'gray', paddingVertical:'3%'}}  />
    );
});


//make this component available to the app
export default TextInputComponent;
