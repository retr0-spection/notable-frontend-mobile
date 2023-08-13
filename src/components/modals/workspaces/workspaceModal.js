//import liraries
import React, { Component, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedWorkspace, selectWorkspaces, setSelectedWorkspace } from '../../../../redux/slices/dataSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
// create a component
const WorkSpaceModal = React.forwardRef((props, ref) => {
    const actionSheetRef = React.useRef()
    const workspaces = useSelector(selectWorkspaces)
    const selectedWorkspace = useSelector(selectSelectedWorkspace)
    const dispatch = useDispatch()

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


    const renderWorkspaces = ({item}) => {
        const onPress = () => {
            dispatch(setSelectedWorkspace(item))
        }

        return <TouchableOpacity style={{backgroundColor:'#2e2e2e', marginHorizontal:'5%', marginVertical:'3%', paddingVertical:'4%', paddingHorizontal:'3%', borderRadius:10}} activeOpacity={0.7} onPress={onPress}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{color:'white', fontWeight:'bold'}}>{item.name}</Text>
                {selectedWorkspace?.id == item.id ? <MaterialIcons name='check' color='white' size={18} /> : null}
            </View>
        </TouchableOpacity>
    }

    return (
       <ActionSheet ref={actionSheetRef} containerStyle={{height:'80%', backgroundColor:'#1e1e1e'}}>
            <View style={{paddingHorizontal:'5%', paddingVertical:'3%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>Workspaces</Text>
                <TouchableOpacity>
                    <MaterialIcons name="add-circle" size={24}  color={'white'}/>
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
