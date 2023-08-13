//import liraries
import React, { Component, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { getDateAsString, getMonthAsString, getShortMonthAsString, getTimeAsString, getTimeOfDay } from '../../../utils/dateHelpers';
import AntDesign from 'react-native-vector-icons/AntDesign'
import {  router, useNavigation } from 'expo-router';
import ProgressCircle from 'react-native-progress-circle'
import { styles } from '../../../styles';
import StatusComponent from '../../../components/project/status';
import TeamExtractComponent from '../../../components/project/team/teamExtract';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../../../redux/slices/userSlice';
import { getWorkspaces, selectSelectedWorkspace, setProjects, setSelectedProject } from '../../../../redux/slices/dataSlice';
import WorkSpaceModal from '../../../components/modals/workspaces/workspaceModal';



// create a component
const Home = (props) => {
    const navigation = useNavigation()
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()
    const workspace_ref = useRef()
    const selectedWorkspace = useSelector(selectSelectedWorkspace)

    const shadowStyle = {
        shadowColor: '#000',
        shadowOffset: { height: 8, width: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10
    }
    const date = new Date()
    const [projects, setProjectsList] = React.useState([])
    const data = [{
        date: new Date(2023, 6),
        item: [
            {
                date: new Date(2023, 6, 5),
                items: [
                    {
                        title: 'Meeting Hannah',
                        author: 'Jeff',
                        date: new Date(2023, 6, 5, 11, 0),
                    },
                    {
                        title: 'Board Meeting',
                        author: 'Jeff',
                        date: new Date(2023, 6, 5, 13, 0),
                    },
                    {
                        title: 'Finish Boarding Session',
                        author: 'Jeff',
                        date: new Date(2023, 6, 5, 15, 15),
                    },
                ]
            },

        ]
    }]


    const loadWorkSpaces = () => {
        dispatch(getWorkspaces())
    }

    useEffect(() => {
        loadScreen()
    },[selectedWorkspace])


    const loadScreen = () => {
        loadWorkSpaces()
        getProjects()
    }


    const getProjects = () => {
        if (selectedWorkspace){
            const config = {
                headers : {
                    Authorization: 'Bearer ' + profile.token
                }
            }
    
            const data = {
                workspace_id : selectedWorkspace.id
            }

            console.warn(selectedWorkspace)
    
            axios.post('http://localhost:3000/api/v1/project/list/', data, config).then((res) => {
                console.warn(res.data)
                setProjectsList(res.data)
                dispatch(setProjects(res.data));
            })
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


    const renderProject = ({ item, index }) => {


        return (
            <TouchableOpacity 
                style={[ styles.subContainerDark ,{  width: '48%', paddingHorizontal: '3%', marginHorizontal: '1%', borderRadius: 20, paddingVertical: '3%',marginBottom:'5%', ...shadowStyle }]} activeOpacity={0.7}
                onPress={() => {
                    dispatch(setSelectedProject(item))
                    navigation.navigate({name:'projects', params:{'project':item.id}})
                }}
                
                >
                <View style={{ 'flexDirection': 'row' }}>
                    {/* title */}
                    <View style={{ width: '50%' }}>
                        <Text style={[styles.textDark,{ fontWeight: 'bold' }]} numberOfLines={2}>{item.title}</Text>
                    </View>
                    {/* progress summary */}
                    <View style={{ width: '50%' }}>
                        <ProgressCircle
                            percent={item.progress*100}
                            radius={30}
                            borderWidth={5}
                            color={item.progressColor}
                            shadowColor="rgb(238,240,241)"
                            bgColor={styles.progressCircle.bg.dark}
                        >
                            <Text style={{ fontSize: 16, fontWeight:'bold', color:styles.progressCircle.text.dark}}>{`${Math.floor(item.progress*100)}%`}</Text>
                        </ProgressCircle>
                    </View>
                </View>

                {/* status */}
                {/* <View>
                    <StatusComponent type={item.status} />
                </View> */}


                {/* team */}
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TeamExtractComponent team={item.assignees} />
                     </View>
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
                                <Text style={[styles.textDark, { fontSize: 16, fontWeight: 'bold' }]}>[Notable.]</Text>
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
                        ListHeaderComponent={
                            <View>
                                <View>
                                    {renderItem({ item: data[0], index: 0 })}
                                </View>
                                <View style={[styles.searchDark, { paddingVertical:'3%', paddingHorizontal:'3%', flexDirection:'row', alignItems:'center', borderRadius:20, marginTop:'2%', marginBottom:'4%'}]}>
                                    <View style={{marginRight:'3%'}}>
                                        <AntDesign name='search1' size={20} color={'rgb(136, 146, 153)'} />
                                    </View>
                                    <TextInput selectionColor={'black'} placeholder='Search for projects, labels, people' placeholderTextColor={'rgb(136, 146, 153)'} />
                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '2%' }}>
                                    <Text style={[styles.textDark,{ fontSize: 20, fontWeight: 'bold' }]}>Projects</Text>
                                </View>
                            </View>
                        }

                        contentContainerStyle={{ paddingTop: '0%', paddingHorizontal: '3%' }}
                        style={{ height: '100%' }}
                        data={projects}
                        numColumns={2}
                        renderItem={renderProject}

                    />
                </View>
            </SafeAreaView>
            <WorkSpaceModal ref={workspace_ref} />
        </>

    );
};

//make this component available to the app
export default Home;
