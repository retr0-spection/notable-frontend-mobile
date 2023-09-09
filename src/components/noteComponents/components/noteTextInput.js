//import liraries
import React, { Component, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import CustomTextInput from '../../../styles/customNativeComponents/textinput';

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
            // if preceding component exists
            // do preprocessing
      
            


    
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

    const handleKeyPress = (e) => {
        const key = e.nativeEvent.key

        //  focus on previous block
        if (key === 'Backspace' && isEmpty()){
            props.signals.signalRemoveComponent()
            if (props.index == 0){
                // focus on header
                props.titleRef.current.focus()
            }else{
                // focus on preceding block
                props.blockRefs.current[props.blocks[props.index - 1].id].focus()
            }
        }

    }


    const onFocus = () => {
        props.signals.signalFocused(props.item)
    }




    return (
        <View style={{ paddingHorizontal: '3%' }} >
            <CustomTextInput
                style={styles.text}
                placeholder='Text Block'
                placeholderTextColor='gray'
                ref={textInputRef}
                onChangeText={onEdit}
                onFocus={onFocus}
                multiline
                scrollEnabled={false}
                defaultValue={text}
                selectionColor={'white'}
                onEndEditing={_signalEditingDone}
                onKeyPress={handleKeyPress}

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
