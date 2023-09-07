//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../styles';
import TextInputComponent from '../../components/formComponents/textInput';
import NameInput from '../../components/workspaces/create/name';
import PagerView from 'react-native-pager-view';
import DescriptionInput from '../../components/workspaces/create/description';
import ContributorsInput from '../../components/workspaces/create/contributors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import { WORKSPACEAPI } from '../../api';
import { useSelector } from 'react-redux';
import { selectProfile } from '../../../redux/slices/userSlice';
// create a component

const SCREEN_HEIGHT = Dimensions.get('screen').height


const CreateWorkspace = (props) => {
    const pagerRef = React.useRef()
    const [index, setIndex] = React.useState(0)
    const screens = [<NameInput />, <DescriptionInput />, <ContributorsInput />]
    const nameRef = React.useRef()
    const descriptionRef = React.useRef()
    const contributorsRef = React.useRef()
    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [submitting, setSubmitting] = React.useState(false)
    const profile = useSelector(selectProfile)



    const submit = () => {
        setSubmitting(true)
        const config = {
            headers : {
                Authorization: 'Bearer ' + profile.token
            }
        }

        const data = {
            name: name,
        }

        axios.post(WORKSPACEAPI.CREATE, data, config).then((res) => {
            router.back()
        }).finally(() => {
            setSubmitting(false)
        })
    }

    const goNext = () => {
        if (index < 1){
            pagerRef.current.scrollToIndex({index:index + 1})
            setIndex(index + 1)
        }else{
            submit()
        }

    }

    const goBack = () => {


        if (index === 0) {
            router.back()
        } else {
            pagerRef.current.scrollToIndex({index:index - 1})
            setIndex(index - 1)


        }


    }

    useEffect(() => {
        if (index === 0) {
            nameRef.current?.focus()
        }else if (index === 1) {
            contributorsRef.current?.focus()
        }

    },[index])

    const renderScreen = ({item, index}) => {
        

        return (
            <>
                {index == 0 ? <NameInput ref={nameRef} onChangeText={setName} /> : null}
                {index == 1 ? <ContributorsInput ref={contributorsRef} /> : null}
            </>
        )
    }


    return (
        <SafeAreaView style={[styles.containerDark, { height: '100%' }]}>
            <View style={{ paddingHorizontal: '3%' }}>
                <View style={{ paddingVertical: '2%' }}>
                    <TouchableOpacity onPress={goBack} disabled={submitting}>
                        <AntDesign name='arrowleft' color={'white'} size={34} />
                    </TouchableOpacity>
                    <FlatList 
                        ref={pagerRef}
                        data={screens}
                        scrollEnabled={false}
                        style={{height:'100%'}}
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderScreen}
                        keyboardDismissMode='never'
                        keyboardShouldPersistTaps={'always'}
                        horizontal
                    />
                </View>
                <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={0}>
                    <View style={{ position: 'absolute', zIndex: 1, bottom: SCREEN_HEIGHT * .15, left: 0, right: 0 }}>
                        <TouchableOpacity 
                            style={{ width: '100%', backgroundColor: 'white', alignItems: 'center', paddingVertical: '3%', borderRadius: 20 }}
                            activeOpacity={0.7}
                            onPress={goNext}
                            disabled={submitting}
                        >
                            {!submitting ? <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Continue</Text> : <ActivityIndicator color={'black'} size={24} />}
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default CreateWorkspace;
