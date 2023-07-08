//import liraries
import React, { Component, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

// create a component
const TitleComponent = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef()
    const [text, setText] = React.useState('')

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty,
        getValue
    }), [])


    const focus = () => {
        textInputRef.current.focus();
    }

    const isEmpty = () => {
        console.warn(text)
        return text.length === 0;
    }

    const _signalEditEvent = () => {
        props.signals.signalEditEvent()
    }

    const _signalAddBlock = () => {
        console.warn(props)
        props.signals.signalAddComponent('ParagraphComponent')
    }


    // this should send data to store
    const onEditingDone = () => {
        if (isEmpty() && props.index !== 0){
            props.signals.signalRemoveComponent()
        }
        textInputRef.current.blur();
        _signalAddBlock()
    }

    useEffect(() => {
        textInputRef.current.focus()
    },[])


    const onEdit = (_text) => {
        setText(_text)
        props.item.title.value = {length:_text.length, value: _text}
        _signalEditEvent()

    }


    const getValue = () => {
        return text
    }






    return (
        <View style={{ paddingHorizontal: '3%' }} >
            <TextInput 
                style={styles.text}
                placeholder='Untitled'
                ref={textInputRef}
                onChangeText={onEdit}
                onSubmitEditing={onEditingDone}
                defaultValue={text}
                selectionColor={'black'}
            />
        </View>
    );
})

const styles = StyleSheet.create({
    text : {
        fontSize:26,
        fontWeight:'bold'
    }
})

//make this component available to the app
export default TitleComponent;
