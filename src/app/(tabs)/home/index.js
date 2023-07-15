//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { getDateAsString, getMonthAsString, getShortMonthAsString, getTimeAsString, getTimeOfDay } from '../../../utils/dateHelpers';
import { styles } from '../../../components/screenLayoutComponents/styles';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router';


// create a component
const Home = (props) => {
    const date = new Date()
    const data = [{
        date: new Date(2023, 6),
        item: [
            {
                date: new Date(2023, 6, 5),
                items: [
                    {
                        title: 'Meeting Hannah',
                        author: 'Jeff',
                        date: new Date(2023, 6, 5, 11, 0),
                    },
                    {
                        title: 'Board Meeting',
                        author: 'Jeff',
                        date: new Date(2023, 6, 5, 13, 0),
                    },
                    {
                        title: 'Finish Boarding Session',
                        author: 'Jeff',
                        date: new Date(2023, 6, 5, 15, 15),
                    },
                ]
            },
            {
                date: new Date(2023, 6, 6),
                items: [
                    {
                        title: 'London Flight',
                        author: 'Jeff',
                        date: new Date(2023, 6, 6, 9, 0),
                    },
                    {
                        title: 'Cannes',
                        author: 'Jeff',
                        date: new Date(2023, 6, 6, 12, 0),
                    },
                    {
                        title: 'Team meeting',
                        author: 'Jeff',
                        date: new Date(2023, 6, 6, 16, 0),
                    },
                ]
            }
        ]
    },
    {
        date: new Date(2023, 7),
        item: [
            {
                date: new Date(2023, 7, 5),
                items: [
                    {
                        title: 'Meet With Rati',
                        author: 'Jeff',
                        date: new Date(2023, 7, 5, 11, 0),
                    },
                    {
                        title: 'Saint Tropez Flight',
                        author: 'Jeff',
                        date: new Date(2023, 7, 17, 22, 0),
                    }
                ]
            },
        ]
    }]


    const renderItem = ({ item, index }) => {
        const monthName = getMonthAsString(item.date)
        return (
            <View style={{ width: '100%', paddingTop:'2%' }} key={`item-${index}`}>
                <Text style={{ fontWeight: 'bold', color: 'gray', fontSize: 18 }}>{monthName}</Text>
                <FlatList
                    data={item.item}
                    renderItem={renderMonthDetails}
                />
            </View>
        )
    }


    const renderMonthDetails = ({ item, index }) => {
        const date = getDateAsString(item.date)
        const monthName = getShortMonthAsString(item.date)

        return (
            <View key={`monthDetail-${index}`} style={{ flexDirection: 'row', width: '100%', marginVertical: '2%', backgroundColor: '#000', borderRadius: 15, padding: '5%' }}>
                {/* date_info */}
                <View style={{ width: '30%', alignItems: 'flex-start' }}>
                    <View style={{ alignItems: 'center' }}>
                        {/* date */}
                        <View>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{date}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white' }}>{monthName}</Text>
                        </View>
                    </View>
                </View>


                {/* details */}
                <View style={{ width: '85%' }}>
                    <View>
                        {item.items.map((summary, index) => {
                            const time = getTimeAsString(summary.date)
                            return (
                                <View key={`summary-${index}`} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical:'1%' }}>
                                    <View style={{width:'20%'}}>
                                        <Text style={{ color: 'white', paddingRight: '1%' }}>{time}</Text>
                                    </View>
                                    <View style={{width:'80%', paddingRight:'15%'}}>
                                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }} numberOfLines={1} ellipsizeMode='tail'>{summary.title}</Text>
                                    </View>
                                </View>)
                        })}

                    </View>
                </View>
            </View>
        )
    }







    return (
        <SafeAreaView style={styles.container}>
            <View>
                {/* Header */}
                <View style={{
                    height: '10%',
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: '5%',
                    alignItems: 'center',
                    justifyContent:'space-between'
                }}>
                    <View>
                        <Text style={{fontSize:16, fontWeight:'bold'}}>Good {getTimeOfDay(date)},</Text>
                        <Text style={{fontSize:16, fontWeight:'bold'}}>Jessica</Text>
                    </View>
                    <FastImage
                        source={require('../../../../assets/mock/profilePictures/jessica.jpg')}
                        style={{ height: 35, width: 35, borderRadius: 17.5 }}
                        resizeMode="cover"
                    />

                </View>


                {/* contents */}

                <FlatList
                    ListHeaderComponent={
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '2%' }}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Nearing</Text>
                            <EvilIcons name="calendar" size={26} />
                        </View>
                    }

                    contentContainerStyle={{ paddingTop: '5%', paddingHorizontal: '5%'}}
                    style={{ height:'100%'}}
                    data={data}
                    renderItem={renderItem}

                />
            </View>
           
        </SafeAreaView>
    );
};

//make this component available to the app
export default Home;
