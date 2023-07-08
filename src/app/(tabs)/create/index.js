//import liraries
import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { styles } from '../../../components/screenLayoutComponents/styles';
import CreateHeader from '../../../components/screenLayoutComponents/createHeader';
import NoteTextInput from '../../../components/noteComponents/components/noteTextInput';
import NoteCanvas from '../../../components/noteComponents/models/noteCanvas';

import NoteBlock from '../../../components/noteComponents/models/noteBlock';
import { generateRandomUuid } from '../../../utils/generators';
import { useLocalSearchParams } from 'expo-router';
import { cancelAnimation, runOnJS, runOnUI, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTimeout } from '@swyg/corre';
import orm from '../../../../redux/orm/schema';
import { useDispatch } from 'react-redux';
import { addNoteEntry } from '../../../../redux/slices/noteSlice';


// create a component
const CreateView = (props) => {
    const session = orm.session()
    const params = useLocalSearchParams()
    const [noteBlocks, setNoteBlocks] = React.useState([])
    const date = new Date()
    const noteBlocksRef = React.useRef({})
    const [focusedBlock, setFocusedBlock] = React.useState(null)
    const [init, setInit] = React.useState(params.id || null)
    const [triggerSave, setTriggerSave] = React.useState(false)
    const inactivityTimer = useSharedValue(0)
    const title = useSharedValue({length:0, value:''})
    const dispatch = useDispatch()

    const addComponent = (type) => {
        // create new noteBlock
        console.warn('adding component')
        const _newNoteBlockTemplate = {
            id: generateRandomUuid(),
            type: type,
            title:title

        }
        setNoteBlocks([...noteBlocks, _newNoteBlockTemplate])
    }

    const removeComponent = (index) => {
        // remove component by index (index is assigned at render and changes with state update)
        const _tmp = Object.assign([], noteBlocks)
        _tmp.splice(index, 1)
        setNoteBlocks(_tmp)

        console.warn('deleting component')
    }


    const saveNote = () => {
        if (noteBlocks > 2, title.value.length){
            console.warn(title.value.value)
            const data = {
                hash: init,
                title: title.value.value,
            }

            dispatch(addNoteEntry(data))
          
            console.warn('saving note')
        }else{
            // nothing to save, delete from db if exists
            console.warn('saving note failed')
        }
    }

    const startActivityTimeout = () => {
        cancelAnimation(inactivityTimer)
        inactivityTimer.value = 0
        inactivityTimer.value = withTiming(1, {duration: 3000}, (state) => {
            if (state){
                runOnJS(saveNote)()
            }
        })
    }

  


  

    const renderBlocks = (item, index) => {
        const parentMethods = {
            addComponent,
            removeComponent,
            startActivityTimeout
        }

        return (
            <NoteBlock
                ref={(ref) => {
                    noteBlocksRef.current[item.id] = ref;
                }}
                key={index}
                index={index}
                item={item}
                type={item.type}
                parentMethods={parentMethods}
            />
        );
    };

    // on initialization add new/existing noteBlocks
    useEffect(() => {
        if (init === null) {
            if (noteBlocks.length === 0) {
                addComponent('TitleComponent')
                setInit(generateRandomUuid())
            } else {
                // restore  noteBlocks state
            }
        }
    }, [])








    return (
        <SafeAreaView style={styles.container}>
            <CreateHeader />
            <View style={[styles.spanParent, { paddingTop: '5%' }]}>
                {/* canvas body */}
                <ScrollView contentContainerStyle={styles.spanParent}>
                    {
                        noteBlocks.map((item, index) => {
                            return (
                                <>
                                    {renderBlocks(item, index)}
                                </>
                            )
                        })
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};





//make this component available to the app
export default CreateView;
