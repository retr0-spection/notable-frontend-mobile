//import liraries
import { router } from 'expo-router';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { styles } from '..';
import CustomText from '../customNativeComponents/text';
import { useSelector } from 'react-redux';
import { selectLightMode } from '../../../redux/slices/dataSlice';

// create a component
const NotePreview = (props) => {
    const item = props.item
    const lightMode = useSelector(selectLightMode)
    const firstBlock = item.blocks
    const preview = firstBlock ? firstBlock[0]?.payload.content : null

    const shadowStyle = {
        shadowColor: '#000',
        shadowOffset: { height: 8, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    }
    
    return (
        <TouchableOpacity
                style={[ lightMode ? styles.subContainerLight : styles.subContainerDark ,{  width: '100%', paddingHorizontal: '3%', borderRadius: 10, paddingVertical: '3%',marginBottom:'5%', ...shadowStyle }]} activeOpacity={0.7}
                onPress={() => {
                    router.push(`notes/${item.hash}`)
                }}
                >
                    {/* title */}
                    <View>
                        <CustomText style={{fontWeight:'bold', fontSize:18}}>{item.title}</CustomText>
                    </View>

                    {/* preview */}
                    {firstBlock ? 
                    <View>
                        <CustomText  numberOfLines={2}>{preview}</CustomText>
                    </View> : null}
             
            </TouchableOpacity>
    );
};


//make this component available to the app
export default NotePreview;
