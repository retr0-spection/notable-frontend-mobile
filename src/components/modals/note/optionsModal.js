//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import OptionItem from './optionItem';
import { styles } from '../../../styles';
import ActionSheet from 'react-native-actions-sheet';

// create a component
const OptionsModal = (props) => {
    const actionRef = React.useRef()


    const renderItem = ({item}) => {
        return <OptionItem parentRef={actionRef} {...item} />
    }


    return (
        <View>

            <ActionSheet
                ref={actionRef}
                containerStyle={[{
                    height: '40%',
                    paddingHorizontal:'7%',
                    ...styles.containerDark,
                }]}
                
                gestureEnabled
            >
                <View style={[{paddingTop:'5%'}]}>
                <FlatList renderItem={renderItem}  data={props.options}  />
                </View>

            </ActionSheet>
        </View>
    );
    
};



//make this component available to the app
export default OptionsModal;
