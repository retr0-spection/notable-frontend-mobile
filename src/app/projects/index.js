//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProgressCircle from 'react-native-progress-circle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles';
import { projects } from '../../data';
import TeamExtractComponent from '../../components/project/team/teamExtract';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, selectSelectedProject, selectTasks } from '../../../redux/slices/dataSlice';
import ProjectExtract from './components/projectExtract';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { router, useNavigation } from 'expo-router';

// create a component
const ProjectDetail = (props) => {
    const project = useSelector(selectSelectedProject)
    const tasks = useSelector(selectTasks)
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const loadScreen = () => {
        dispatch(getTasks(project.id))
    }

    useEffect(() => {
        const listener = navigation.addListener('focus', loadScreen)

        return listener
    }, [])

    const renderItem = ({ item, index }) => {
        return (
            <ProjectExtract item={item} />
        )
    }
    return (
        <SafeAreaView edges={['left', 'top']} style={[styles.containerDark, { height: '100%', width: '100%' }]}>
            <ScrollView style={[styles.containerDark, { height: '100%', paddingHorizontal: '3%', paddingTop: '3%' }]} contentContainerStyle={{ paddingBottom: 100 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={{ paddingRight: '2%' }} onPress={navigation.goBack}>
                        <MaterialIcons name='arrow-back-ios' color={'white'} size={24} />
                    </TouchableOpacity>
                    <Text style={[styles.textDark, { fontWeight: 'bold', fontSize: 18 }]}>{project.title}</Text>
                </View>
                {/* summary */}
                <View>
                    <View style={[{ paddingVertical: '4%',  paddingHorizontal: '3%', borderRadius: 12, marginVertical: '3%', ...styles.subContainerDark }]}>
                        {/* progress bar */}
                        <View style={{paddingBottom:'5%'}}>
                            <Text style={[styles.textDark,]}>{project.description}</Text>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={{ width: '50%' }}>
                                <ProgressCircle
                                    percent={project.progress * 100}
                                    radius={60}
                                    borderWidth={10}
                                    color={project.progressColor}
                                    shadowColor="rgb(238,240,241)"
                                    bgColor={styles.progressCircle.bg.dark}
                                >
                                    <Text style={{ fontSize: 16, color: styles.progressCircle.text.dark, fontWeight: 'bold' }}>{`${project.progress * 100}%`}</Text>
                                </ProgressCircle>
                            </View>
                            {/* info */}
                            <View>
                                {/* team info */}
                                <View>
                                    <TeamExtractComponent team={project.assignees} />
                                </View>


                                {/* add task button */}
                                <TouchableOpacity style={{ backgroundColor: 'rgb(235, 250, 238)', borderColor: 'rgb(90, 210, 110)', borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: '3%', paddingHorizontal: '5%', alignSelf: 'flex-start', marginTop: '5%', borderRadius: 30 }} onPress={() => {
                                    router.push('/canvas')
                                }}>
                                    <Ionicons name='add' color={'rgb(90, 210, 110)'} size={18} />
                                    <Text style={{ color: 'rgb(90, 210, 110)', fontWeight: 'bold' }}>Add Task</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </View>

                <View>
                    <View>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Tasks</Text>
                    </View>
                    {/* data */}

                    {tasks.map((item, index) => {
                        return renderItem({ item, index })
                    })}

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


//make this component available to the app
export default ProjectDetail;
