import React, { useEffect, useImperativeHandle } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MathView, { MathText } from 'react-native-math-view';
import { generateRandomUuid } from "../../../utils/generators";
import CustomTextInput from "../../../styles/customNativeComponents/textinput";
import { useSelector } from "react-redux";
import { selectLightMode } from "../../../../redux/slices/dataSlice";

const LatexComponent = React.forwardRef((props, ref) => {
    const [edit, setEdit] = React.useState(false)
    const textInputRef = React.useRef()
    const [text, setText] = React.useState('')
    const lightMode = useSelector(selectLightMode)

    useImperativeHandle(ref, () => ({
        focus,
        isEmpty,
        getValue,
        setPayload
    }), [])

    const focus = () => {
        setEdit(true)
    }

    const isEmpty = () => {
        return text.length === 0;
    }

    const _dumpState = () => {
        return {
            type: 'LatexComponent',
            id: props.item.id,
            payload:{
                content :text,
            }
        }
    }

    const replaceWithParagraph = () => {
        const _newNoteBlockTemplate = {
            type: 'ParagraphComponent',
            id: generateRandomUuid(),
            payload:{
                content :''
            },
            focus:true
         }
         props.signals.signalReplaceComponent(_newNoteBlockTemplate)
    }

    const _signalEditEvent = () => {
        props.signals.signalEditEvent()
    }

    const setPayload = (payload) => {
        console.warn(payload)
        setText(payload.content)
    }
    const clear = () => {
        setText('')
        textInputRef.current.clear()
    }

    const _signalAddBlock = () => {
            const _newNoteBlockTemplate = {
                id: generateRandomUuid(),
                type: 'ParagraphComponent',
                payload:null,
                focus:true
    
            }
            props.signals.signalAddComponent(_newNoteBlockTemplate)
       
    }

    const onEditingDone = () => {
        textInputRef.current.blur();
        setEdit(false)
        _signalAddBlock()
    }

    useEffect(() => {
        if (edit){
            textInputRef.current?.focus()
            
        }
    },[edit])

        // focus on creation
    useEffect(() => {
        if (props.autoFocus){
           setEdit(true)
        }
    },[])


    useEffect(() => {
        if (!isEmpty()){
            props.signals.signalUpdateChildState(_dumpState())
            _signalEditEvent()
        }
    },[text])



    const onEdit = (_text) => {
        setText(_text)
    }

    const getValue = () => {
        return text
    }


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
        <View style={{paddingHorizontal:'3%'}}>
            {!edit ?
                <Pressable onPress={() => setEdit(true)}>
                    <MathView math={text}
                            config={{inline:true}}
                            color={lightMode ? 'black' :'white'}
                            renderError={({ error }) => <Text style={[{ marginVertical: 10, fontWeight: 'bold', backgroundColor: 'red' }]}>{error.name} {error.message}</Text>}
                    /> 
                </Pressable>
            : 
            <CustomTextInput 
                style={styles.text}
                placeholder='latex block'
                placeholderTextColor={'gray'}
                ref={textInputRef}
                onChangeText={onEdit}
                onSubmitEditing={onEditingDone}
                onEndEditing={() => setEdit(false)}
                onFocus={onFocus}
                defaultValue={text}
                onKeyPress={handleKeyPress}
                selectionColor={'white'}
                blurOnSubmit={true}
                autoCapitalize='none'
                autoCorrect={false}
                multiline
         />
            }
        </View>
    )
})

const styles = StyleSheet.create({
    text : {
        fontSize: 16,
        width:'100%',
        flexShrink:1,
        paddingBottom:5,
        backgroundColor:'#202020',
        padding:'2%',
}})

export default LatexComponent