//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { styles } from '../../../../styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { selectLightMode, setLightMode } from '../../../../../redux/slices/dataSlice';
import CustomSafeAreaView from '../../../../styles/customNativeComponents/safeAreaView';
import CustomText from '../../../../styles/customNativeComponents/text';

// create a component
const Theme = () => {
    const lightMode = useSelector(selectLightMode)
    const dispatch = useDispatch()


    const toggleLightMode = (state) => {
        dispatch(setLightMode(!state))
    }

    return (
        <CustomSafeAreaView>
            <View style={{paddingHorizontal:'3%'}}>
                <CustomText style={{fontSize:24, fontWeight:'bold'}}>Theme</CustomText>
                <View style={{paddingVertical:'10%'}}>
                    <View style={{paddingVertical:'2%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <View>
                            <CustomText style={{fontSize:18, fontWeight:'bold'}}>Dark Mode</CustomText>
                        </View>
                        <Switch
                            value={!lightMode}
                            onChange={(e) => toggleLightMode(e.nativeEvent.value)}
                        >

                        </Switch>
                    </View>
                </View>
            </View>
        </CustomSafeAreaView>
    );
};



//make this component available to the app
export default Theme;
