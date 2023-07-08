//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MasonryList from 'reanimated-masonry-list';
import { TouchableOpacity } from 'react-native';
import { Link, useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import { styles } from '../../../components/screenLayoutComponents/styles';
import orm from '../../../../redux/orm/schema';
import { useSelector } from 'react-redux';
import { selectNotes } from '../../../../redux/slices/noteSlice';

// create a component
const NotesListView = () => {
    const [selectedHeader, setSelectedHeader] = React.useState(0)
    const router = useRouter()
    const navigation = useNavigation()
    const [notes, setNotes] = React.useState([])
    const noteState = useSelector(selectNotes)

    
    const getAllNotes = () => {
        let _tmp = Object.values(noteState)
        setNotes(_tmp)
        console.warn('')
    }

    useEffect(() => {
        const listener = navigation.addListener('focus', () => {
            getAllNotes()
        })

        return listener
    },[])


    const data = {
        headerItems: [
            {
                title: 'All Notes',
            },
            {
                title: 'Work',
            },
            {
                title: 'Home',
            },
            {
                title: 'School',
            },
        ],
        notesPreview: [
            {   

                id:'rqwtqenv',
                title: 'AGM Meetings',
                content: 'Lorem Ipsum is simply dummy text',
                backgroundColor: '#dccdbc',
                textColor: 'black',
                // authors: [
                //     {
                //         name: 'John Doe',
                //         profile: 'https://i.pravatar.cc',
                //     }
                // ]
            }
        
        ],
    }

    const renderHeaderItems = ({ item, index }) => {
        return (
            <>
                {index == selectedHeader ?
                    <View key={`header-${index}`} style={{ borderBottomWidth: 2, borderBottomColor: 'black', alignSelf: 'flex-start', padding: 2, }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                    </View> : null}
            </>
        )
    }


    const renderNotePreview = ({ item, index }) => {

        return (
           
                <TouchableOpacity key={`notePreview-${index}`} style={{ width: '48%', backgroundColor: 'yellow', padding: 10, paddingBottom: 40, borderRadius: 15, marginVertical: '1%', marginHorizontal: '1%' }}
                    onPress={() => {
                        router.push(`/notes/${item.hash}`)
                    }}
                
                >
                    {/* title */}
                   {item.title ? <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: item.textColor }} numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
                    </View> : null}
                    {/* body-preview */}
                    {item.content ?<View>
                        <View style={{ paddingBottom: 5, }}>
                            <Text style={{ fontSize: 16, color: item.textColor }} numberOfLines={4} ellipsizeMode='tail'>{item.content}</Text>
                        </View>
                    </View> : null}

                    {/* authors */}
                   {item.authors ? <View style={{ flexDirection: 'row', paddingTop: 15, position: 'absolute', bottom: 10, left: 10, right: 0 }}>
                        {item.authors.map((author, index) => {
                            return (
                                <View key={index} style={{ marginRight: 5 }}>
                                    <FastImage style={{ height: 20, width: 20, borderRadius: 10 }} source={{ uri: author.profile }} />
                                </View>
                            )
                        })}
                    </View> : null}

                </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <FlatList data={data.headerItems} horizontal renderItem={renderHeaderItems} contentContainerStyle={{ paddingHorizontal: '3%' }} />
                </View>

                <FlatList
                    data={notes}
                    numColumns={2}
                    renderItem={renderNotePreview}
                    contentContainerStyle={{ paddingHorizontal: '3%', paddingTop: '5%', paddingBottom:50 }}
                    style={{ height: '100%' }}
                />
            </View>
        </SafeAreaView>
    );
};



//make this component available to the app
export default NotesListView;
