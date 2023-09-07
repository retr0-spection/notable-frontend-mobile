//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../../../styles';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile, setLoggedIn } from '../../../../redux/slices/userSlice';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router';
// create a component
const ProfileView = () => {
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(setLoggedIn(false))
        router.replace('/landing')
    }
    return (
        <SafeAreaView style={{ ...styles.containerDark, height: '100%', width: '100%' }}>
            {/* header */}
            <View style={{ paddingHorizontal: '3%' }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Settings</Text>
            </View>
            <ScrollView>
                {/* profile info */}
                <View style={{paddingHorizontal:'3%', paddingVertical:'5%',flexDirection:'row', alignItems:'center', justifyContent:'space-between',width:'100%'}}>
                    <View style={{flexDirection:'row', alignItems:'center', }}>
                        <View>
                            <FastImage
                                source={require('../../../../assets/mock/profilePictures/jessica.jpg')}
                                style={{ height: 45, width: 45, borderRadius:45/2, }}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={{paddingHorizontal:'5%'}}>
                            <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>{profile.name.firstName} {profile.name.lastName}</Text>
                        </View>

                    </View>
                    <TouchableOpacity style={{justifyContent:'flex-start', alignSelf:'center', backgroundColor:'#1e1e1e', paddingHorizontal:10, paddingVertical:10, borderRadius:20, borderWidth:1, borderColor:'gray' }} activeOpacity={0.7}>
                        <AntDesign name='edit' size={14} color='white' />
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal:'3%'}}>
                    <TouchableOpacity style={{paddingVertical:'3%'}} activeOpacity={0.7} onPress={logOut}>
                        <Text style={{color:'white', fontWeight:'bold'}}>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};



//make this component available to the app
export default ProfileView;
