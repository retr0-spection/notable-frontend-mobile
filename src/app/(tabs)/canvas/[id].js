//import liraries
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { styles } from '../../../components/screenLayoutComponents/styles';
import CreateHeader from '../../../components/screenLayoutComponents/createHeader';
import NoteBlock from '../../../components/noteComponents/models/noteBlock';
import { generateRandomUuid } from '../../../utils/generators';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { cancelAnimation, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { addNoteEntry, deleteNoteEntry, selectNotes } from '../../../../redux/slices/noteSlice';
import NoteLayout from '../../../components/screenLayoutComponents/noteLayout';


// create a component
const CreateView = (props) => {

    return (
        <NoteLayout new />
    )

}





//make this component available to the app
export default CreateView;
