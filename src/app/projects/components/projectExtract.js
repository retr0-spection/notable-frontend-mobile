//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import TeamExtractComponent from '../../../components/project/team/teamExtract';
import * as Progress from 'react-native-progress';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router, useNavigation } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setSelectedTask } from '../../../../redux/slices/dataSlice';
// create a component
const ProjectExtract = (props) => {
    const data = props.item
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const colors = {
        muted : 'rgb(107, 70, 93)',
        normal : 'rgb(148, 98, 126)'
    }

    const blocks = Array(3).fill(0)


    const renderExtract = ({item}) => {
        return (
        <View style={{flexDirection:'row', paddingVertical:'3%', alignItems:'center'}} >
            <View style={{width:'10%', paddingHorizontal:'3%'}}>
                <Ionicons name="checkmark" color={'white'} size={20} />
            </View>
            <View>
                <Text style={{fontSize:18, color:'white'}}>{item.payload.content}</Text>
            </View>
        </View>)
    }


    const openTask = () => {
        dispatch(setSelectedTask(data))
        navigation.navigate('notes', {id: data.hash})
    }

    return (
        <TouchableOpacity style={{backgroundColor:colors.muted,paddingVertical:'2%',marginVertical:'3%',paddingHorizontal:'2%', borderRadius:12}} activeOpacity={0.7} onPress={openTask}>
            <View style={{flexDirection:'row'}}>
                <View style={{width:'55%',backgroundColor:colors.normal,paddingHorizontal:'5%', paddingVertical:'3%', borderRadius:12}} >
                    <Text style={{color:'white', fontWeight:'bold'}}>{data.title}</Text>
                    <View>
                        <Text style={{color:'white'}}>April 2- 18</Text>
                    </View>
                    <View style={{paddingTop:'5%', flexDirection:'row'}}>
                        <Progress.Bar progress={0.3} color='white' style={{alignSelf:'center', width:'80%'}}   />
                        <View style={{paddingHorizontal:'5%'}}>
                            <Text style={{color:'white'}}>30%</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* details (expanded) */}
            <View>
                <FlatList data={data.blocks} renderItem={renderExtract}  />


            </View>




        </TouchableOpacity>
    )
};



//make this component available to the app
export default ProjectExtract;
