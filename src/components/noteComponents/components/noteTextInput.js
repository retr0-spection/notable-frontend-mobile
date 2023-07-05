//import liraries
import React, { Component, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const NoteTextInput = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef()
    const [text, setText] = React.useState('')

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty
    }), [])


    const focus = () => {
        textInputRef.current.focus();
    }

    const isEmpty = () => {
        return text.length === 0;
    }

    const _signalEditingDone = () => {
        if (isEmpty()){
            props.signals.signalRemoveComponent()
        }
    }


    // focus on creation
    useEffect(() => {
        textInputRef.current.focus()
    }, [])






    return (
        <View style={{ paddingHorizontal: '3%' }} >
            <TextInput
                style={styles.text}
                placeholder=''
                ref={textInputRef}
                onChangeText={(_text) => setText(_text)}
                multiline
                selectionColor={'black'}
                onEndEditing={_signalEditingDone}

            />
        </View>
    );
})



const styles = StyleSheet.create({
    text: {
        fontSize: 18,
    }
})


//make this component available to the app
export default NoteTextInput;
