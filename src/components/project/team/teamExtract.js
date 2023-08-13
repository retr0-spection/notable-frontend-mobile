//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import genericProfile from '../../../../assets/profile/profile.png'
// create a component
const TeamExtractComponent = (props) => {
    const data = props.team
    const renderExtract = ({item, index}) => {
        return (
                <View style={{marginLeft:index ?-12 : 0}}>
                {item.profilePicture ?    
                <Image
                    source={{uri:item.profilePicture}}
                    style={{width:35, height:35, borderRadius:17.5}}
                /> : 
                <Image
                    source={genericProfile}
                    style={{width:35, height:35, borderRadius:17.5}}
                />}
            </View>
        )
    }
    return (
        <View style={{paddingVertical:'5%'}}>
                    <View style={{paddingBottom:'10%'}}>
                        <Text style={{color:'rgb(150, 150, 150)'}}>Team</Text>
                    </View>
                    {/* accounts */}
                    <View style={{flexDirection:'row', alignItems:'center'}}></View>
        <FlatList horizontal data={data} renderItem={renderExtract} scrollEnabled={false} />
        {data.length > 4 ?
        <View style={{paddingLeft:'5%'}}>
            <Text style={{color:'rgb(150, 150, 150)'}}>+{`${data.length - 4}`}</Text>
        </View> : null}
        </View>
    );
};


//make this component available to the app
export default TeamExtractComponent;
