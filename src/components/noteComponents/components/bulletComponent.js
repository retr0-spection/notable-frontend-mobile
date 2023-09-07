//import liraries
import React, { useEffect, useImperativeHandle } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { generateRandomUuid } from '../../../utils/generators';
import { styles } from '../../../styles';
import Entypo from 'react-native-vector-icons/Entypo'
// create a component
const BulletComponent = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef();
    const [text, setText] = React.useState('');

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty,
        getValue,
        setPayload
    }), []);


    const focus = () => {
        textInputRef.current.focus();
    }

    const isEmpty = () => {
        return text.length === 0;
    }

    const _signalEditingDone = () => {
        // if (isEmpty()){
        //     props.signals.signalRemoveComponent();
        // }
    }

    const _signalEditEvent = () => {
        props.signals.signalEditEvent()
    }

    const setPayload = (payload) => {
        setText(payload.content)
    }

    const _dumpState = () => {
        return {
            type: 'BulletComponent',
            id: props.item.id,
            payload:{
                content :text
            }
        }
    }

    const _signalAddBlock = () => {
        console.warn(props.blocks.length)
        if (props.blocks.length -1 == props.index){
             const _newNoteBlockTemplate = {
                type: 'BulletComponent',
                id: generateRandomUuid(),
                payload:{
                    content :''
                },
                focus:true
             }
             props.signals.signalAddComponent(_newNoteBlockTemplate)
         }else{
             // focus on next block
             props.blockRefs.current[props.blocks[1].id].focus()
         }
     }


    const replaceWithParagraph = () => {
        const _newNoteBlockTemplate = {
            type: 'ParagraphComponent',
            id: generateRandomUuid(),
            payload:{
                content :text
            },
            focus:true
         }
         props.signals.signalReplaceComponent(_newNoteBlockTemplate)
    }
 



    const onEditingDone = () => {
        if (isEmpty()){
            replaceWithParagraph()
        }else{
            _signalAddBlock()
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
    }

  

    useEffect(() => {
        if (!isEmpty()){
            props.signals.signalUpdateChildState(_dumpState())
            _signalEditEvent()
        }
    },[text])


    const handleKeyPress = (e) => {
        const key = e.nativeEvent.key

        //  focus on previous block
        if (key === 'Backspace' && isEmpty()){
            replaceWithParagraph()
        }

    }

    const onFocus = () => {
        props.signals.signalFocused(props.item)
    }





    return (
        <View style={{flexDirection:'row', alignItems:'center' }}>
            <View>
                <Entypo name='dot-single' color={'white'} size={24} />
            </View>
            <TextInput
                style={[styles.textDark, style.text]}
                placeholder='bullet item'
                placeholderTextColor={'gray'}
                ref={textInputRef}
                onChangeText={onEdit}
                onSubmitEditing={onEditingDone}
                onFocus={onFocus}
                blurOnSubmit={true}
                multiline
                defaultValue={text}
                selectionColor={'white'}
                onEndEditing={_signalEditingDone}
                onKeyPress={handleKeyPress}

            />
        </View>
    );
})



const style = StyleSheet.create({
    text: {
        fontSize: 18,
        width:'100%',
        flexShrink:1,
        flex:1,
        paddingBottom:5
    }
})


//make this component available to the app
export default BulletComponent;
