//import liraries
import React, { Component, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { generateRandomUuid } from '../../../utils/generators';
import { useNavigation } from 'expo-router';

// create a component
const TitleHeader = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef()
    const navigation = useNavigation()
    const [text, setText] = React.useState(null)

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty,
        getValue,
        setPayload,
        clear
    }))


    const focus = () => {
        textInputRef.current.focus();
    }

    const isEmpty = () => {
        return text.length === 0;
    }

    const _signalEditEvent = () => {
        props.parentMethods.startActivityTimeout()
    }

    const setPayload = (payload) => {
        setText(payload)
    }
    const clear = () => {
        setText('')
        textInputRef.current.clear()
    }

    const _signalAddBlock = () => {
       if (props.blocks.length === 0){
            const _newNoteBlockTemplate = {
                id: generateRandomUuid(),
                type: 'ParagraphComponent',
                payload:null,
                focus:true
    
            }
            props.parentMethods.addComponent(_newNoteBlockTemplate)
        }else{
            // focus on first block
            props.focusOnFirstBlock()
        }
    }

    const onEditingDone = () => {
        textInputRef.current.blur();
        _signalAddBlock()
    }

    useEffect(() => {
        if (props.autoFocus){
            textInputRef.current.focus()
        }
    },[])



    const onEdit = (_text) => {
        setText(_text)
        _signalEditEvent()

    }

    const getValue = () => {
        return text
    }

    const onFocus = () => {
        props.setFocusedBlock({type:'title'})
    }




    return (
        <View style={{ paddingHorizontal: '3%' }} >
            <TextInput 
                style={styles.text}
                placeholder='Untitled'
                ref={textInputRef}
                onChangeText={onEdit}
                onSubmitEditing={onEditingDone}
                onFocus={onFocus}
                defaultValue={props.initial}
                selectionColor={'black'}
                blurOnSubmit={true}
                multiline
            />
        </View>
    );
})

const styles = StyleSheet.create({
    text : {
        fontSize:26,
        fontWeight:'bold',
    }
})

//make this component available to the app
export default TitleHeader;
