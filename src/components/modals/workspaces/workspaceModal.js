//import liraries
import React, { Component, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { selectLightMode, selectSelectedWorkspace, selectWorkspaces, setSelectedWorkspace } from '../../../../redux/slices/dataSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router, useNavigation } from 'expo-router';
import CustomText from '../../../styles/customNativeComponents/text';
// create a component
const WorkSpaceModal = React.forwardRef((props, ref) => {
    const actionSheetRef = React.useRef()
    const workspaces = useSelector(selectWorkspaces)
    const selectedWorkspace = useSelector(selectSelectedWorkspace)
    const dispatch = useDispatch()
    const lightMode = useSelector(selectLightMode)

    useImperativeHandle(ref, () => ({
        show,
        hide
    }))


    const show = () => {
        actionSheetRef.current.show()
    }


    const hide = () => {
        actionSheetRef.current.hide()
    }

    const goToCreate = () => {
        hide()
        router.push('workspaces/create')
    }


    const renderWorkspaces = ({item}) => {
        const selected = selectedWorkspace?.hash == item.hash 
        console.warn(selectedWorkspace, item)
        const onPress = () => {
            if (!selected){
                dispatch(setSelectedWorkspace(item))
            }
            actionSheetRef.current.hide()
        }

        return <TouchableOpacity style={{backgroundColor:lightMode ? '#9D9D9D' : '#2e2e2e', marginHorizontal:'5%', marginVertical:'3%', paddingVertical:'4%', paddingHorizontal:'3%', borderRadius:10}} activeOpacity={0.7} onPress={onPress}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <CustomText style={{color:'white', fontWeight:'bold'}}>{item.name}</CustomText>
                {selectedWorkspace?.hash == item.hash  ? <MaterialIcons name='check' color={'white'} size={18} /> : null}
            </View>
        </TouchableOpacity>
    }

    return (
       <ActionSheet ref={actionSheetRef} containerStyle={{height:'80%', backgroundColor:lightMode  ? 'white' :'#1e1e1e'}}>
            <View style={{paddingHorizontal:'5%', paddingVertical:'3%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <CustomText style={{fontSize:20, fontWeight:'bold'}}>Workspaces</CustomText>
                <TouchableOpacity onPress={goToCreate}>
                    <MaterialIcons name="add-circle" size={24}  color={lightMode ? 'black' : 'white'}/>
                </TouchableOpacity>
            </View>
            <FlatList data={workspaces} renderItem={renderWorkspaces} />
       </ActionSheet>
    );
});

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default WorkSpaceModal;
