import React from "react";
import { View } from "react-native";
import { generateRandomUuid } from "../../../utils/generators";
import ComponentManifest from '../components/manifest';



    
const NoteBlock = (props) => {
    const childRef = React.useRef()
    const index = props.index



    const _signalUnFocused = () => {
        console.warn('unfocused')
    }


    const _signalAddParagraphBlock = () => {
        props.parentMethods
        console.warn('addBlock')
    }


    const removeNode = () => {
        props.parentMethods.removeComponent(index)
    }

    const signals = {
        signalUnFocused:_signalUnFocused,
        signalAddComponent: props.parentMethods.addComponent,
        signalRemoveComponent: removeNode,
    }


    const child = React.cloneElement(ComponentManifest[props.type], {ref:childRef, item:props.item, index:index, signals})


    return (
        <View style={{paddingHorizontal:'3%'}}>
            {child}
        </View>
    )

}

export default NoteBlock