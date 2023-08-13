//import liraries
import { useRouter } from 'expo-router';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'

// create a component
const CreateHeader = (props) => {
    const router = useRouter()

    return (
        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: '3%', alignItems:'center', justifyContent:'space-between'}}>
            <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', height: '100%', padding: '1%' }}
                onPress={() => {
                    router.back();
                }}
            >
                <MaterialIcons name="arrow-back-ios" size={25} />
            </TouchableOpacity>


            {/*  note buttons/settings  */}
          <View style={{flexDirection:'row'}}>
                {/* quick options and more */}
                <TouchableOpacity  onPress={props.options}>
                    <Feather name="more-horizontal" size={24} color="black" style={{paddingHorizontal:'2%'}} />
                </TouchableOpacity>
          </View>
        </View>
    );
};



//make this component available to the app
export default CreateHeader;
