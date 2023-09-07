//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setProfile } from '../../../redux/slices/userSlice';
import { router } from 'expo-router';
import axios from 'axios';
import { AUTHAPI } from '../../api';
import { styles } from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// create a component
const LoginComponent = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState(false)
    const [errorMessage, setErrorMessage] = React.useState('')


    const validateEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };


    const formCheck = () => {
        
        if (email && email.length > 0) {
            if(!validateEmail(email)){
                Alert.alert("Invalid Email",'Please enter a valid email', [{text:"Ok", onPress:()=> null, style: "cancel"}])
                return false;
            }
        } else {
            setErrorMessage("Enter your email")
            setError(true)
            return false

        }

        if (password && password.length > 0) {
            ;
        } else {
            setErrorMessage("Enter your password")
            setError(true)
            return false
        }

        return true;
    };



    const signIn = async () => {

        if (formCheck()) {
            const data = {
                username:email,
                password
            }

            axios.post(AUTHAPI.AUTH.LOGIN, data).then((response) => {
                dispatch(setProfile(response.data))
                dispatch(setLoggedIn(true))
                router.replace('/home')
            }).catch(() => {
                setError(true)
                setErrorMessage('Invalid credentials, please try again')
            })
        }



    }

    return (
        <SafeAreaView style={{ height: '100%', width: '100%', ...styles.containerDark }}>
            <View>
                <View>
                    <View>
                        <TouchableOpacity style={{paddingHorizontal:'3%', paddingVertical:'1%'}} onPress={router.back}>
                            <MaterialIcons name="arrow-back-ios" color={'white'} size={25} />
                        </TouchableOpacity>
                    </View>
                    {/* <Image source={LoginIllustration} style={{ height: '35%', width: '100%' }} resizeMode='cover' /> */}
                    <View style={{ paddingHorizontal: '5%', paddingVertical: '2%' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Welcome Back</Text>
                    </View>
                    
                    {/* error meesage */}
                    {error ? <View style={{backgroundColor:'#FAE0E0', paddingVertical:'2%', width:'90%', paddingHorizontal:'3%', alignSelf:'center', borderRadius:8, marginVertical:'1%'}}>
                        <Text style={{color:'#EB475C'}}>{errorMessage}</Text>
                    </View> : <View style={{ paddingHorizontal: '5%' }}>
                        <Text style={{color:'silver'}}>Log back in to continue</Text>
                    </View>}
                    {/* forms */}
                    <View style={{ paddingHorizontal: '3%' }}>
                        {/* email */}
                        <View style={{ paddingVertical: '3%' }}>
                            <TextInput value={email} selectionColor={'white'} placeholder='Email' placeholderTextColor={'gray'} autoCapitalize='none' style={{ paddingHorizontal: '3%', fontSize: 18, backgroundColor: '#2e2e2e', paddingVertical: '3%', borderRadius: 10, color:'white'  }} onChangeText={(text) => setEmail(text.trim())} autoComplete={'email'} autoCorrect={false} />
                        </View>
                        <View style={{ paddingVertical: '3%' }}>
                            <TextInput value={password} selectionColor={'white'} placeholder='Password' placeholderTextColor={'gray'} secureTextEntry style={{ paddingHorizontal: '3%', fontSize: 18, backgroundColor: '#2e2e2e', paddingVertical: '3%', borderRadius: 10, color:'white' }} onChangeText={setPassword} />
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={{ width: '90%', alignSelf: 'center', paddingVertical: '4%', backgroundColor: '#ffefcd', borderRadius: 10, marginVertical: '3%' }} onPress={signIn}>
                            <Text style={{ textAlign: 'center', color: 'black', fontWeight:'bold' }}>Log In</Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        </SafeAreaView>
    );
};


//make this component available to the app
export default LoginComponent;
