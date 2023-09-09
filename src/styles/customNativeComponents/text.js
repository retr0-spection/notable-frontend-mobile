//import liraries
import React, { Component, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectLightMode } from '../../../redux/slices/dataSlice';
import { styles } from '..';

// create a component
const CustomText =  ({children, ...props}) => {
    const lightMode = useSelector(selectLightMode)

    const color = React.useMemo(() => ({
        color:lightMode ? styles.textLight : styles.textDark
}), [lightMode])



    return (<Text style={[color.color,{...props.style}]}>{children}</Text>);
};



//make this component available to the app
export default CustomText;
