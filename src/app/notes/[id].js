//import liraries
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { cancelAnimation, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import NoteLayout from '../../components/screenLayoutComponents/noteLayout';


// create a component
const CreateView = (props) => {

    return (
        <NoteLayout />
    )

}





//make this component available to the app
export default CreateView;
