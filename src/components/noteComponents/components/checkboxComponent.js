//import liraries
import React, { useEffect, useImperativeHandle } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CheckBox } from '@rneui/themed';
import { generateRandomUuid } from '../../../utils/generators';

// create a component
const CheckBoxComponent = React.forwardRef((props, ref) => {
    const textInputRef = React.useRef();
    const [text, setText] = React.useState('');
    const [checked, setChecked] = React.useState(false);

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
        console.warn(payload)
        setText(payload.content)
        setChecked(payload.checked)
    }

    const _dumpState = () => {
        return {
            type: 'CheckBoxComponent',
            id: props.item.id,
            payload:{
                content :text,
                checked: checked
            }
        }
    }

    const _signalAddBlock = () => {
        console.warn(props.blocks.length)
        if (props.blocks.length -1 == props.index){
             const _newNoteBlockTemplate = {
                type: 'CheckBoxComponent',
                id: generateRandomUuid(),
                payload:{
                    content :'',
                    checked: false
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

    const toggleCheckbox = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        if (!isEmpty()){
            props.signals.signalUpdateChildState(_dumpState())
            _signalEditEvent()
        }
    },[text, checked])


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
                    <CheckBox
                        checked={checked}
                        onPress={toggleCheckbox}
                        // Use ThemeProvider to make change for all checkbox
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor="#23344D" 
                        containerStyle={{padding:0}}
                />
            </View>
            <TextInput
                style={styles.text}
                placeholder=''
                ref={textInputRef}
                onChangeText={onEdit}
                onSubmitEditing={onEditingDone}
                onFocus={onFocus}
                blurOnSubmit={true}
                multiline
                defaultValue={text}
                selectionColor={'black'}
                onEndEditing={_signalEditingDone}
                onKeyPress={handleKeyPress}

            />
        </View>
    );
})



const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        width:'100%',
        flexShrink:1,
        flex:1,
        paddingBottom:5
    }
})


//make this component available to the app
export default CheckBoxComponent;
