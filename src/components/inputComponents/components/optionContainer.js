import React from "react";
import { TouchableOpacity, View } from "react-native";


const OptionContainer = ({ children, ...props }) => {


    return (
        <TouchableOpacity 
            style={{ paddingHorizontal: '10%',}} 
            activeOpacity={0.7}
            onPress={props.action}
            >
            {children}
        </TouchableOpacity>
    )
}


export default OptionContainer