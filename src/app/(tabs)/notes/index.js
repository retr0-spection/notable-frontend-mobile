//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import MasonryList from 'reanimated-masonry-list';
import { TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { styles } from '../../../components/screenLayoutComponents/styles';

// create a component
const NotesListView = () => {
    const [selectedHeader, setSelectedHeader] = React.useState(0)
    const router = useRouter()



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

                hash:'rqwtqenv',
                title: 'AGM Meetings',
                content: 'Lorem Ipsum is simply dummy text',
                backgroundColor: '#dccdbc',
                textColor: 'black',
                authors: [
                    {
                        name: 'John Doe',
                        profile: 'https://i.pravatar.cc',
                    },
                    {
                        name: 'Jane Doe',
                        profile: 'https://i.pravatar.cc',
                    },
                    {
                        name: 'Sam',
                        profile: 'https://i.pravatar.cc',
                    }
                ]
            },
            {
                hash:'ewfkljwelkwe',
                title: 'Circle',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ewfew',
                backgroundColor: '#1e1e1e',
                textColor: 'white',
                authors: [
                    {
                        name: 'John Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Jane Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Sam',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    }
                ]
            },
            {
                hash:'kwefnwek',
                title: 'Some Text',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ewfew',
                backgroundColor: '#882afa',
                textColor: 'white',
                authors: [
                    {
                        name: 'John Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Jane Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Sam',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    }
                ]
            },
            {
                hash:'qklglqrqek',
                title: 'Examples',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ewfew',
                backgroundColor: '#505457',
                textColor: 'white',
                authors: [
                    {
                        name: 'John Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Jane Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Sam',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    }
                ]
            },
            {
                hash:'qwfnqknq',
                title: 'AGM Meetings',
                content: 'Lorem Ipsum is simply dummy text',
                backgroundColor: '#dccdbc',
                textColor: 'black',
                authors: [
                    {
                        name: 'John Doe',
                        profile: 'https://i.pravatar.cc',
                    },
                    {
                        name: 'Jane Doe',
                        profile: 'https://i.pravatar.cc',
                    },
                    {
                        name: 'Sam',
                        profile: 'https://i.pravatar.cc',
                    }
                ]
            },
            {
                title: 'Circle',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ewfew',
                backgroundColor: '#1e1e1e',
                textColor: 'white',
                authors: [
                    {
                        name: 'John Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Jane Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Sam',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    }
                ]
            },
            {
                title: 'Some Text',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ewfew',
                backgroundColor: '#882afa',
                textColor: 'white',
                authors: [
                    {
                        name: 'John Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Jane Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Sam',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    }
                ]
            },
            {
                title: 'Examples',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ewfew',
                backgroundColor: '#505457',
                textColor: 'white',
                authors: [
                    {
                        name: 'John Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Jane Doe',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    },
                    {
                        name: 'Sam',
                        profile: `https://unsplash.it/400/400?image=${Math.floor(Math.random() * 100)}`,
                    }
                ]
            },


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
        const transparent = `rgba(${item.backgroundColor.substring(1, 3)},${item.backgroundColor.substring(3, 5)},${item.backgroundColor.substring(5, 7)},0.0000001)`

        return (
           
                <TouchableOpacity key={`notePreview-${index}`} style={{ width: '48%', backgroundColor: item.backgroundColor, padding: 10, paddingBottom: 40, borderRadius: 15, marginVertical: '1%', marginHorizontal: '1%' }}
                    onPress={() => {
                        router.push(`/notes/${item.hash}`)
                    }}
                
                >
                    {/* title */}
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: item.textColor }} numberOfLines={2} ellipsizeMode='tail'>{item.title}</Text>
                    </View>
                    {/* body-preview */}
                    <View>
                        <View style={{ paddingBottom: 5, }}>
                            <Text style={{ fontSize: 16, color: item.textColor }} numberOfLines={4} ellipsizeMode='tail'>{item.content}</Text>
                        </View>
                    </View>

                    {/* authors */}
                    <View style={{ flexDirection: 'row', paddingTop: 15, position: 'absolute', bottom: 10, left: 10, right: 0 }}>
                        {item.authors.map((author, index) => {
                            return (
                                <View key={index} style={{ marginRight: 5 }}>
                                    <FastImage style={{ height: 20, width: 20, borderRadius: 10 }} source={{ uri: author.profile }} />
                                </View>
                            )
                        })}
                    </View>

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
                    data={data.notesPreview}
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
