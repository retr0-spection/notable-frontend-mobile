//import liraries
import React, { Component, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { getDateAsString, getMonthAsString, getShortMonthAsString, getTimeAsString, getTimeOfDay } from '../../../utils/dateHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {  router, useNavigation } from 'expo-router';
import ProgressCircle from 'react-native-progress-circle'
import { styles } from '../../../styles';
import StatusComponent from '../../../components/project/status';
import TeamExtractComponent from '../../../components/project/team/teamExtract';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../../../redux/slices/userSlice';
import { getWorkspaces, selectSelectedWorkspace } from '../../../../redux/slices/dataSlice';
import WorkSpaceModal from '../../../components/modals/workspaces/workspaceModal';
import { NOTEAPI, PROJECTAPI } from '../../../api';
import { getNotesByColumn, selectNotes, uploadAllNotes } from '../../../../redux/slices/noteSlice';
import { first } from 'lodash';
import CustomSafeAreaView from '../../../styles/customNativeComponents/safeAreaView';
import CustomText from '../../../styles/customNativeComponents/text';
import NotePreview from '../../../styles/themeAdaptiveComponents/notePreview';
import WorkSpaceSelector from '../../../styles/themeAdaptiveComponents/workspaceSelector';



// create a component
const Home = (props) => {
    const navigation = useNavigation()
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()
    const workspace_ref = useRef()
    const selectedWorkspace = useSelector(selectSelectedWorkspace)
    const [refreshing, setRefreshing] = React.useState(false)
    const notesList = useSelector((state) => getNotesByColumn(state, {workspaceID:selectedWorkspace?.hash}))
    console.warn(notesList)
    const loadWorkSpaces = () => {
        dispatch(getWorkspaces())
        dispatch(uploadAllNotes())
    }

    useEffect(() => {
        const listener = navigation.addListener('focus', loadScreen)


        return listener
    },[selectedWorkspace])

    useEffect(() => {
       loadScreen()
    },[selectedWorkspace])


    const loadScreen = () => {
        loadWorkSpaces()
    }

    const onRefresh = () => {
        setRefreshing(true)
        loadScreen()

        setTimeout(() => {
            setRefreshing(false)
        },2000)

    }


    const getNotes = () => {
        if (selectedWorkspace){
            const config = {
                headers : {
                    Authorization: 'Bearer ' + profile.token
                }
            }
    
            const data = {
                workspace_id : selectedWorkspace.hash
            }

    
            axios.post(NOTEAPI.LIST, data, config).then((res) => {
                // dispatch(setNotes(res.data));
            })
        }
    }




    const renderNotePreview = ({ item, index }) => {
        return (
            <NotePreview item={item} />
        )
    }



    return (
        <>
            <CustomSafeAreaView>
                <View>
                    {/* Header */}
                    <View style={{
                        // height: '10%',
                        paddingBottom:'3%',
                        width: '100%',
                        paddingHorizontal: '5%',
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <View>
                                <CustomText style={{ fontSize: 16, fontWeight: 'bold' }}>[notable.]</CustomText>
                            </View>
                            <WorkSpaceSelector selectedWorkspace={selectedWorkspace} workspace_ref={workspace_ref} />
                        </View>

                    </View>


                    {/* contents */}

                    <FlatList
                        refreshControl={<RefreshControl  tintColor={'white'} refreshing={refreshing} onRefresh={onRefresh}  />}
                        ListHeaderComponent={
                            <View>
                                {/* <View style={[styles.searchDark, { paddingVertical:'3%', paddingHorizontal:'3%', flexDirection:'row', alignItems:'center', borderRadius:20, marginTop:'2%', marginBottom:'4%'}]}>
                                    <View style={{marginRight:'3%'}}>
                                        <AntDesign name='search1' size={20} color={'rgb(136, 146, 153)'} />
                                    </View>
                                    <TextInput selectionColor={'white'} style={{color:'white'}} placeholder='Search for notes, labels, people' placeholderTextColor={'rgb(136, 146, 153)'} />
                                </View> */}
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '2%' }}>
                                    <CustomText style={{ fontSize: 20, fontWeight: 'bold' }}>Notes</CustomText>
                                    <TouchableOpacity onPress={() => navigation.navigate('notes', {id:null})}>
                                        <MaterialIcons name="add-circle" size={24}  color={'white'}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        contentContainerStyle={{ paddingTop: '0%', paddingHorizontal: '3%' }}
                        style={{ height: '100%' }}
                        data={notesList}
                        renderItem={renderNotePreview}

                    />
                </View>
            </CustomSafeAreaView>
            <WorkSpaceModal ref={workspace_ref} />
        </>

    );
};

//make this component available to the app
export default Home;
