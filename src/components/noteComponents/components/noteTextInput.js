//import liraries
import React, { Component, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const NoteTextInput = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef()
    const [text, setText] = React.useState('')

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty,
        getValue,
        setPayload
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

    const _signalEditEvent = () => {
        props.signals.signalEditEvent()
    }

    const setPayload = (payload) => {
        setText(payload.content)
    }

    const _dumpState = (_text) => {
        return {
            type: 'ParagraphComponent',
            id: props.item.id,
            payload:{
                content :_text
            }
        }
    }


    const getValue = () => {
        return text
    }


    // focus on creation
    useEffect(() => {
        if (props.autoFocus){
            textInputRef.current.focus()
        }
    },[])

    const onEdit = (_text) => {
        setText(_text)
        props.signals.signalUpdateChildState(_dumpState(_text))

        _signalEditEvent()


    }





    return (
        <View style={{ paddingHorizontal: '3%' }} >
            <TextInput
                style={styles.text}
                placeholder=''
                ref={textInputRef}
                onChangeText={onEdit}
                multiline
                defaultValue={text}
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
