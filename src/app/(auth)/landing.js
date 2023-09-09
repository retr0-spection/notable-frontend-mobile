//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LandingImage from '../../../assets/illustrations/landing.png'
import GoogleSso from '../../../assets/google-sso.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Link, router } from 'expo-router';
import { styles } from '../../styles';
import appleAuth from '@invertase/react-native-apple-authentication';
import {GoogleSignin,statusCodes} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { AUTHAPI } from '../../api';
import jwt_decode from 'jwt-decode';
import { setLoggedIn, setProfile } from '../../../redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import { persistor } from '../../../redux/store';
import { LOGOUT } from '../../../redux/slices/dataSlice';

// create a component
const LandingComponent = () => {
    const dispatch = useDispatch()


   
    const googleAuthentication = async = () => {
        GoogleSignin.configure({
            androidClientId: 'ADD_YOUR_ANDROID_CLIENT_ID_HERE',
            iosClientId: '592819723040-6d5i9mb90rubunpqif3sf725lr13ai51.apps.googleusercontent.com',
        });

        GoogleSignin.hasPlayServices().then((hasPlayService) => {
            if (hasPlayService) {
                 GoogleSignin.signIn().then((userInfo) => {
                            const {idToken, scopes, user} = userInfo
                            const payload = {
                                token :idToken,
                                user:user
                            }
                            axios.post(AUTHAPI.AUTH.GOOGLE, payload).then((response) => {
                                console.warn(response.data)
                                // dispatch(setProfile(response.data))
                                // dispatch(setLoggedIn(true))
                                // router.replace('/home')
                            })
                 }).catch((e) => {
                 console.log("ERROR IS: " + JSON.stringify(e));
                 })
            }
        }).catch((e) => {
        console.log("ERROR IS: " + JSON.stringify(e));
        })
    }

    const appleAuthentication = async () => {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            // Note: it appears putting FULL_NAME first is important, see issue #293
            requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
          });
        
          // get current authentication state for user
          // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
          const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
          // use credentialState response to ensure the user is authenticated
          console.warn(credentialState)
          if (credentialState === appleAuth.State.AUTHORIZED) {
            // user is authenticated


            const payload = {
                token : appleAuthRequestResponse.authorizationCode,
                identityToken : appleAuthRequestResponse.identityToken,
            }

            axios.post(AUTHAPI.AUTH.APPLE, payload).then((response) => {
                dispatch(setProfile(response.data))
                dispatch(setLoggedIn(true))
                router.replace('/home')
            })
          }
    }

    return (
        <View style={{height:'100%', width:'100%',...styles.containerDark}}>
            <View style={{height:'50%', paddingTop:'10%'}}>
                <Image source={LandingImage} style={{height:'100%', width:'100%'}} resizeMode='contain' />
            </View>
            <View style={{paddingHorizontal:'5%'}}>
                {/* call to action */}
                <View>
                    <Text style={{color:'silver', fontSize:30, fontWeight:'bold'}}>The app that helps you get things done</Text>
                </View>
                {/* sign in */}
                {/* <Link href='/login' asChild>
                <TouchableOpacity activeOpacity={0.7} style={{width:'90%', alignSelf:'center', paddingVertical:'4%', backgroundColor:'#ffefcd', borderRadius:20, marginVertical:'5%'}}>
                    <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:16}}>Sign In</Text>
                </TouchableOpacity>
                </Link> */}
                {/* or */}
                    {/* <View style={{width:'100%'}}>
                        <Text style={{textAlign:'center', color:'gray', fontSize:16}}>or</Text>
                    </View> */}
                    {/* sso */}
                <View>
                <TouchableOpacity activeOpacity={0.7} style={{width:'90%', alignSelf:'center', paddingVertical:'4%', backgroundColor:'white', borderRadius:20, marginVertical:'5%',alignItems:'center'}} onPress={googleAuthentication}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{marginHorizontal:'3%', height:'100%'}}>
                            <Image source={GoogleSso} style={{height:27, width:27 }}  resizeMode='contain' />
                        </View>
                        <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:16}}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{width:'90%', alignSelf:'center', paddingVertical:'4%', backgroundColor:'white', borderRadius:20, alignItems:'center'}} onPress={appleAuthentication}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{marginHorizontal:'3%'}}>
                            <AntDesign name='apple1' size={20} />
                        </View>
                        <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:16}}>Continue with Apple</Text>
                    </View>
                </TouchableOpacity>
                <View style={{width:'100%', paddingVertical:'5%', alignItems:'center'}}>
                    <Link href='/signup' asChild>
                    <TouchableOpacity activeOpacity={0.7}>
                    <Text style={{textAlignVertical:'center', color:'gray'}}>Don't have an account? <Text style={{textAlignVertical:'center', fontWeight:'bold', color:'white'}}>Register</Text></Text>
                        </TouchableOpacity> 
                    </Link>
                </View>

                </View>
            </View>
        </View>
    );
};

// define your styles

//make this component available to the app
export default LandingComponent;
