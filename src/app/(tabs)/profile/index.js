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
import CustomSafeAreaView from '../../../styles/customNativeComponents/safeAreaView';
import CustomText from '../../../styles/customNativeComponents/text';
import { LOGOUT } from '../../../../redux/slices/dataSlice';
// create a component
const ProfileView = () => {
    const profile = useSelector(selectProfile)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(LOGOUT())

        router.replace('/landing')
    }
    return (
        <CustomSafeAreaView>
            {/* header */}
            <View style={{ paddingHorizontal: '3%' }}>
                <CustomText style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Settings</CustomText>
            </View>
            <ScrollView>
                {/* profile info */}
               
                <View style={{paddingHorizontal:'3%'}}>
                    <TouchableOpacity style={{paddingVertical:'3%'}} activeOpacity={0.7} onPress={() => router.push('profile/theme')}>
                        <CustomText style={{ fontWeight:'bold'}}>
                            Theme
                        </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={{paddingVertical:'3%'}} activeOpacity={0.7} onPress={logOut}>
                        <CustomText style={{fontWeight:'bold'}}>
                            Log Out
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </CustomSafeAreaView>
    );
};



//make this component available to the app
export default ProfileView;
