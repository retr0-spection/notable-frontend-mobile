import React, { useEffect, useImperativeHandle } from "react";
import { View } from "react-native";
import { generateRandomUuid } from "../../../utils/generators";
import ComponentManifest from '../components/manifest';
import { cancelAnimation, runOnJS, useSharedValue, withTiming } from "react-native-reanimated";



    
const NoteBlock = React.forwardRef((props, ref) => {
    const childRef = React.useRef()
    const index = props.index
    const hash = props.item.id
    const [childState, setChildState] = React.useState()

    useImperativeHandle(ref, () => ({
        isEmpty:isEmpty,
        getValue,
        ready,
        getType,
        focus
    }),[childState])


    // repopulate content


    useEffect(() => {
        if (props.item.payload){
            _setPayload(props.item.payload)
            setChildState(props.item)
        }
    },[])


    const ready = () => {
        return true
    }

    const handleEventEdit = (payload) => {
        setChildState(payload)
    }

    const getType = () => {
        console.warn(childState)
        return childState.type
    }

    const focus = () => {
        childRef.current.focus()
    }

    const _signalUnFocused = () => {
        console.warn('unfocused')
    }


    const _setPayload = (payload) => {
        childRef.current.setPayload(payload)

    }


    const isEmpty = () => {
        return childRef.current.isEmpty()
    }


    const removeNode = () => {
        props.parentMethods.removeComponent(index)
    }

    const getValue = () => {
        console.warn(childState)
        return childState
    }


    const signals = {
        signalUnFocused:_signalUnFocused,
        signalAddComponent: props.parentMethods.addComponent,
        signalRemoveComponent: removeNode,
        signalEditEvent:props.parentMethods.startActivityTimeout,
        signalUpdateChildState:handleEventEdit,
    }


    const child = React.cloneElement(ComponentManifest[props.item.type], {ref:childRef, item:props.item, index:index, signals, autoFocus:props.autoFocus, blocks:props.blocks, blockRefs:props.blockRefs})


    return (
        <View>
            {child}
        </View>
    )

})

export default NoteBlock