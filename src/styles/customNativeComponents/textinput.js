//import liraries
import React, { Component, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLightMode } from '../../../redux/slices/dataSlice';
import { styles } from '..';

// create a component
const CustomTextInput = React.forwardRef((props, ref) => {
    const inputRef = React.useRef()
    const lightMode = useSelector(selectLightMode)

    useImperativeHandle(ref, () => ({
        focus,
        blur
    }))

    const color = React.useMemo(() => ({
        color:lightMode ? styles.textLight : styles.textDark
}), [lightMode])

    const focus = () => {
        inputRef.current.focus()
    }

    const blur = () => {
        inputRef.current.blur()

    }


    return (<TextInput {...props} ref={inputRef} style={[{...props.style}, color.color]} selectionColor={lightMode ? 'black' : 'white'} />);
});



//make this component available to the app
export default CustomTextInput;
