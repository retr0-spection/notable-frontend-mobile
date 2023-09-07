//import liraries
import React, { Component, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import { getWorkspaces, selectSelectedWorkspace, setnotes, setSelectedProject } from '../../../../redux/slices/dataSlice';
import WorkSpaceModal from '../../../components/modals/workspaces/workspaceModal';
import { PROJECTAPI } from '../../../api';
import {  getNotesByColumn, selectNotes } from '../../../../redux/slices/noteSlice';
import { first } from 'lodash';



// create a component
const Home = (props) => {
    const navigation = useNavigation()
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()
    const workspace_ref = useRef()
    const selectedWorkspace = useSelector(selectSelectedWorkspace)
    const [refreshing, setRefreshing] = React.useState(false)
    const shadowStyle = {
        shadowColor: '#000',
        shadowOffset: { height: 8, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    }
    const notesList = useSelector((state) => getNotesByColumn(state, {workspaceID:selectedWorkspace.hash}))

    const loadWorkSpaces = () => {
        dispatch(getWorkspaces())
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
        getNotes()
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
                workspace_id : selectedWorkspace.id
            }

    
            // axios.post(.LIST, data, config).then((res) => {
            //     dispatch(setnotes(res.data));
            // })
        }
    }


    const renderItem = ({ item, index }) => {
        const monthName = getMonthAsString(item.date)
        return (
            <View style={{ width: '100%', paddingTop: '2%' }} key={`item-${index}`}>
                <FlatList
                    data={item.item}
                    renderItem={renderMonthDetails}
                />
            </View>
        )
    }


    const renderNotePreview = ({ item, index }) => {
        const firstBlock = item.blocks
        const preview = firstBlock ? firstBlock[0]?.payload.content : null


        return (
            <TouchableOpacity 
                style={[ styles.subContainerDark ,{  width: '100%', paddingHorizontal: '3%', borderRadius: 10, paddingVertical: '3%',marginBottom:'5%', ...shadowStyle }]} activeOpacity={0.7}
                onPress={() => {
                    console.warn(item.hash)
                    router.push(`notes/${item.hash}`)
                }}
                >
                    {/* title */}
                    <View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:18}}>{item.title}</Text>
                    </View>

                    {/* preview */}
                    {firstBlock ? 
                    <View>
                        <Text style={{color:'white'}} numberOfLines={2}>{preview}</Text>
                    </View> : null}
             
            </TouchableOpacity>
        )
    }

    const renderMonthDetails = ({ item, index }) => {
        const date = getDateAsString(item.date)
        const monthName = getMonthAsString(item.date)

        return (
            <View key={`monthDetail-${index}`} style={[styles.subContainerDark,{ flexDirection: 'row', width: '100%', marginVertical: '2%', borderRadius: 15, padding: '5%', ...shadowStyle }]}>
                {/* date_info */}
                <View style={{ width: '30%', alignItems: 'flex-start', justifyContent:'center' }}>
                    <View style={{ alignItems: 'center' }}>
                        {/* date */}
                        <View>
                            <Text style={[styles.textDark, { fontSize: 34, fontWeight: 'bold'}]}>{date}</Text>
                        </View>
                        <View>
                            <Text style={[styles.textDark, { fontSize: 16, fontWeight: 'bold' }]}>{monthName}</Text>
                        </View>
                    </View>
                </View>


                {/* details */}
                <View style={{ width: '85%' }}>
                    <View>
                        {item.items.map((summary, index) => {
                            const time = getTimeAsString(summary.date)
                            return (
                                <View key={`summary-${index}`} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: '1%' }}>
                                    <View style={{ width: '2%' , backgroundColor:'orange', height:'100%', borderRadius:5}} />
                                    <View style={{ width: '80%', paddingRight: '15%', paddingHorizontal:'3%' }}>
                                        <Text style={[styles.textDark,{ fontSize: 16, fontWeight: 'bold', }]} numberOfLines={1} ellipsizeMode='tail'>{summary.title}</Text>
                                    </View>
                                </View>)
                        })}

                    </View>
                </View>
            </View>
        )
    }







    return (
        <>
            <SafeAreaView style={styles.containerDark}>
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
                                <Text style={[styles.textDark, { fontSize: 16, fontWeight: 'bold' }]}>[notable.]</Text>
                            </View>
                            <TouchableOpacity activeOpacity={0.7} style={{backgroundColor:'#2f2f2f', paddingHorizontal:'5%',paddingVertical:'3%', borderRadius:30}} onPress={() => {
                                if (selectedWorkspace){
                                    workspace_ref.current.show()
                                }else{
                                    // navigate to create workspace screen

                                }
                                }}>
                                <Text style={[styles.textDark, { fontSize: 16, fontWeight: 'bold' }]}>{selectedWorkspace ? selectedWorkspace.name : 'Add Workspace'}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                    {/* contents */}

                    <FlatList
                        refreshControl={<RefreshControl  tintColor={'white'} refreshing={refreshing} onRefresh={onRefresh}  />}
                        ListHeaderComponent={
                            <View>
                                <View style={[styles.searchDark, { paddingVertical:'3%', paddingHorizontal:'3%', flexDirection:'row', alignItems:'center', borderRadius:20, marginTop:'2%', marginBottom:'4%'}]}>
                                    <View style={{marginRight:'3%'}}>
                                        <AntDesign name='search1' size={20} color={'rgb(136, 146, 153)'} />
                                    </View>
                                    <TextInput selectionColor={'white'} style={{color:'white'}} placeholder='Search for notes, labels, people' placeholderTextColor={'rgb(136, 146, 153)'} />
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '2%' }}>
                                    <Text style={[styles.textDark,{ fontSize: 20, fontWeight: 'bold' }]}>Notes</Text>
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
            </SafeAreaView>
            <WorkSpaceModal ref={workspace_ref} />
        </>

    );
};

//make this component available to the app
export default Home;
