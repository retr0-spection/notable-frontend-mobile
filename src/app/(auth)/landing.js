//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LandingImage from '../../../assets/illustrations/landing.png'
import GoogleSso from '../../../assets/google-sso.png'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Link } from 'expo-router';
import { styles } from '../../styles';

// create a component
const LandingComponent = () => {

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
                <Link href='/login' asChild>
                <TouchableOpacity activeOpacity={0.7} style={{width:'90%', alignSelf:'center', paddingVertical:'4%', backgroundColor:'#ffefcd', borderRadius:20, marginVertical:'5%'}}>
                    <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:16}}>Sign In</Text>
                </TouchableOpacity>
                </Link>
                {/* or */}
                    <View style={{width:'100%'}}>
                        <Text style={{textAlign:'center', color:'gray', fontSize:16}}>or</Text>
                    </View>
                    {/* sso */}
                <View>
                <TouchableOpacity activeOpacity={0.7} style={{width:'90%', alignSelf:'center', paddingVertical:'4%', backgroundColor:'white', borderRadius:20, marginVertical:'5%',alignItems:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={{marginHorizontal:'3%', height:'100%'}}>
                            <Image source={GoogleSso} style={{height:27, width:27 }}  resizeMode='contain' />
                        </View>
                        <Text style={{textAlign:'center', color:'black', fontWeight:'bold', fontSize:16}}>Continue with Google</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={{width:'90%', alignSelf:'center', paddingVertical:'4%', backgroundColor:'white', borderRadius:20, alignItems:'center'}}>
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
