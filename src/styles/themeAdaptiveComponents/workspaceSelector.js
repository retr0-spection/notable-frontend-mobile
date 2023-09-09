//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../customNativeComponents/text';
import { useSelector } from 'react-redux';
import { selectLightMode, selectSelectedWorkspace } from '../../../redux/slices/dataSlice';

// create a component
const WorkSpaceSelector = (props) => {
    const lightMode = useSelector(selectLightMode)
    const selectedWorkspace = useSelector(selectSelectedWorkspace)
    const workspace_ref = props.workspace_ref



    return (
        <TouchableOpacity activeOpacity={0.7} style={{backgroundColor:lightMode ? '#F0F0F0' :'#2f2f2f', paddingHorizontal:'5%',paddingVertical:'3%', borderRadius:30}} onPress={() => {
            if (selectedWorkspace){
                workspace_ref.current.show()
            }else{
                // navigate to create workspace screen
            }
            }}>
            <CustomText style={{ fontSize: 16, fontWeight: 'bold' }}>{selectedWorkspace ? selectedWorkspace.name : 'Add Workspace'}</CustomText>
        </TouchableOpacity>
    );
};



//make this component available to the app
export default WorkSpaceSelector;
