//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ProgressCircle from 'react-native-progress-circle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles';
import { projects } from '../../data';
import TeamExtractComponent from '../../components/project/team/teamExtract';
import { useSelector } from 'react-redux';
import { selectSelectedProject } from '../../../redux/slices/dataSlice';
import ProjectExtract from './components/projectExtract';

// create a component
const ProjectDetail = (props) => {
    const project = useSelector(selectSelectedProject)


    const data = [0, 0, 0, 0]


    const renderItem = ({ item, index }) => {
        return (
           <ProjectExtract item={item} />
        )
    }
    return (
        <SafeAreaView edges={['left', 'top']} style={[styles.containerDark, { height: '100%', width: '100%' }]}>
            <ScrollView style={[styles.containerDark, { height: '100%', paddingHorizontal: '3%', paddingTop: '3%' }]} contentContainerStyle={{ paddingBottom: 100 }}>
                <View>
                    <Text style={[styles.textDark, { fontWeight: 'bold', fontSize: 24 }]}>{project.title}</Text>
                </View>
                {/* summary */}
                <View style={[{ flexDirection: 'row', paddingVertical: '10%', alignItems: 'center', paddingHorizontal: '3%' }]}>
                    {/* progress bar */}
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
                        <View style={{ backgroundColor: 'rgb(235, 250, 238)', borderColor:'rgb(90, 210, 110)',borderWidth:1,flexDirection: 'row', alignItems: 'center', paddingVertical: '3%', paddingHorizontal: '5%', alignSelf: 'flex-start', marginTop: '5%', borderRadius: 30 }}>
                            <Ionicons name='add' color={'rgb(90, 210, 110)'} size={18} />
                            <Text style={{ color: 'rgb(90, 210, 110)', fontWeight: 'bold' }}>Add Task</Text>
                        </View>

                    </View>
                </View>

                <View>
                    <View>
                        <Text style={{color:'white', fontWeight:'bold', fontSize:20}}>Tasks</Text>
                    </View>
                    {/* data */}

                    {data.map((item, index) => {
                        return renderItem({ item, index })
                    })}

                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


//make this component available to the app
export default ProjectDetail;
