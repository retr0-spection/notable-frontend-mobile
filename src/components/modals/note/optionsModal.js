//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import OptionItem from './optionItem';

// create a component
const OptionsModal = (props) => {
    const actionRef = React.useRef()


    const renderItem = ({item}) => {
        return <OptionItem parentRef={actionRef} {...item} />
    }


    return (
        <ActionSheet
            ref={actionRef}
            containerStyle={{
                height: '40%',
                paddingHorizontal:'7%',
            }}
            gestureEnabled
        >
            <View style={{paddingTop:'5%'}}>
               <FlatList renderItem={renderItem} data={props.options}  />
            </View>

        </ActionSheet>
    );
    
};



//make this component available to the app
export default OptionsModal;
