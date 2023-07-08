import React, { useImperativeHandle } from "react";
import { View } from "react-native";
import { generateRandomUuid } from "../../../utils/generators";
import ComponentManifest from '../components/manifest';



    
const NoteBlock = React.forwardRef((props, ref) => {
    const childRef = React.useRef()
    const index = props.index
    

    useImperativeHandle(ref, () => ({
        isEmpty:isEmpty,
        getValue
    }),[])



    const _signalUnFocused = () => {
        console.warn('unfocused')
    }


    const isEmpty = () => {
        console.warn('isEmpty', childRef.current.isEmpty())
        return childRef.current.isEmpty()
    }


    const removeNode = () => {
        props.parentMethods.removeComponent(index)
    }

    const getValue = () => {
        return childRef.current.getValue()
    }

    const signals = {
        signalUnFocused:_signalUnFocused,
        signalAddComponent: props.parentMethods.addComponent,
        signalRemoveComponent: removeNode,
        signalEditEvent: props.parentMethods.startActivityTimeout,
    }


    const child = React.cloneElement(ComponentManifest[props.type], {ref:childRef, item:props.item, index:index, signals})


    return (
        <View style={{paddingHorizontal:'3%'}}>
            {child}
        </View>
    )

})

export default NoteBlock