//import liraries
import React, { Component, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { generateRandomUuid } from '../../../utils/generators';
import CustomTextInput from '../../../styles/customNativeComponents/textinput';

// create a component
const TitleComponent = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef()
    const [text, setText] = React.useState('')

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty,
        getValue,
        _dumpState,
        setPayload
    }))


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

    const setPayload = (payload) => {
        setText(payload.content)
    }

    const _signalAddBlock = () => {
       if (props.blocks.length == 1){
            const _newNoteBlockTemplate = {
                id: generateRandomUuid(),
                type: 'ParagraphComponent',
                payload:null,
                focus:true
    
            }
            props.signals.signalAddComponent(_newNoteBlockTemplate)
        }else{
            // focus on next block
            props.blockRefs.current[props.blocks[1].id].focus()
        }
    }

    const _dumpState = (_text) => {

        return {
            type: 'TitleComponent',
            id:props.item.id,
            payload:{
                content :_text
            }
        }
    }


    const onEditingDone = () => {
        if (isEmpty() && props.index !== 0){
            props.signals.signalRemoveComponent()
        }
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
        props.signals.signalUpdateChildState(_dumpState(_text))
        _signalEditEvent()

    }


    const getValue = () => {
        return text
    }






    return (
        <View style={{ paddingHorizontal: '3%' }} >
            <CustomTextInput 
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
        fontWeight:'bold',
    }
})

//make this component available to the app
export default TitleComponent;
