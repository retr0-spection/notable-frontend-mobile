import React, { useEffect } from 'react'
import { Dimensions, InputAccessoryView, Keyboard, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import OptionContainer from './components/optionContainer'
import { generateRandomUuid } from '../../utils/generators'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import _ from 'lodash'


const OptionsComponent = (props) => {
    const [keyboardVisible, setKeyboardVisible] = React.useState(false)
    const t = useSharedValue(0)



    const addToDoComponent = () => {
        const _newNoteBlockTemplate = {
            id: generateRandomUuid(),
            type: 'CheckBoxComponent',
            payload:null,
            focus:true
        }


        const _oldPayload = props.noteBlocksRef.current[props.focusedBlock.id].getValue()
        if (_oldPayload === undefined || _oldPayload.type === 'CheckBoxComponent'){
            props.addComponent(_newNoteBlockTemplate)
        }else{
            _newNoteBlockTemplate['payload'] = {
                    content : _oldPayload.payload.content,
                    checked: false
            }  
            props.noteBlocksRef.current[props.focusedBlock.id].replaceComponent(_newNoteBlockTemplate)
        }
    }

    const showImageOptions = () => {
       console.warn('show image options')
    }

    const addLatex = () => {
        const _newNoteBlockTemplate = {
            id: generateRandomUuid(),
            type: 'LatexComponent',
            payload: null,
            focus:true
        }
        const _oldPayload = props.noteBlocksRef.current[props.focusedBlock.id].getValue()
        if (_oldPayload === undefined || _oldPayload.type === 'LatexComponent'){
            props.addComponent(_newNoteBlockTemplate)
        }else{
            props.noteBlocksRef.current[props.focusedBlock.id].replaceComponent(_newNoteBlockTemplate)
        }
    }

   

    const containerStyle = useAnimatedStyle(() => {
        const height = interpolate(t.value,
                [0,1],
                [0, 50],
                Extrapolate.CLAMP
        )
        const paddingVertical = interpolate(t.value,
            [0,1],
            [0, 4],
            Extrapolate.CLAMP
    )
        const borderWidth = interpolate(t.value,
                [0,1],
                [0,0.3],
                Extrapolate.CLAMP)

        return {
            borderTopWidth: borderWidth,
            // paddingVertical: `${paddingVertical}%`,
            borderColor: 'gray',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height:height
        }
    })


    // listen for open keyboard

    useEffect(() => {
        const listener1 = Keyboard.addListener('keyboardWillShow', () => {
            setKeyboardVisible(true)
        })

        const listener2 = Keyboard.addListener('keyboardWillHide', () => {
            setKeyboardVisible(false)
        })

        return () => {
            listener1.remove()
            listener2.remove()
        }
    },[])


    // on keyboard state change
    useEffect(() => {
        if (keyboardVisible){
            t.value = withTiming(1)
        }else{
            t.value = withTiming(0)
        }
    },[keyboardVisible])

    return (
        <KeyboardAvoidingView
            behavior='position'
            focusable
        >
            <Animated.View 
            style={containerStyle}
            >

                <ScrollView keyboardShouldPersistTaps={'always'} horizontal contentContainerStyle={{paddingHorizontal:'5%', alignItems:'center'}}>
                    <OptionContainer action={addToDoComponent}>
                        <MaterialCommunityIcons name='checkbox-blank-outline' size={20} />
                    </OptionContainer>
                    <OptionContainer>
                        <MaterialCommunityIcons name='format-letter-case' size={24} />
                    </OptionContainer>
                    <OptionContainer action={showImageOptions}>
                        <EvilIcons name='image' size={28} />
                    </OptionContainer>
                    <OptionContainer action={addLatex}>
                        <MaterialCommunityIcons name='less-than-or-equal' size={20} />
                    </OptionContainer>
                    <OptionContainer>
                        <Text>
                            Other options
                        </Text>
                    </OptionContainer>
                </ScrollView>
            </Animated.View >
        </KeyboardAvoidingView >
    )
}


export default OptionsComponent