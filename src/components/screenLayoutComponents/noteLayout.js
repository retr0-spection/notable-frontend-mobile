//import liraries
import React, { useCallback, useEffect, useMemo } from 'react';
import { View, ScrollView, SafeAreaView, InputAccessoryView, KeyboardAvoidingView, Text, Keyboard } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { cancelAnimation, runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import { styles } from './styles';
import NoteBlock from '../noteComponents/models/noteBlock';
import CreateHeader from './createHeader';
import { addNoteEntry, deleteNoteEntry } from '../../../redux/slices/noteSlice';
import { generateRandomUuid } from '../../utils/generators';
import NoteCanvas from '../noteComponents/canvas/noteCanvas';
import OptionsComponent from '../inputComponents/optionsComponent';
import ActionSheet, { SheetManager, SheetProvider, registerSheet } from "react-native-actions-sheet";
import OptionsModal from '../modals/note/optionsModal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { deleteNote } from '../../utils/actions/noteActions';



// create a component
const NoteLayout = (props) => {
    const params = useLocalSearchParams()
    const [noteBlocks, setNoteBlocks] = React.useState([])
    const date = new Date()
    const noteBlocksRef = React.useRef({})
    const navigation = useNavigation()
    const router = useRouter()
    const init = React.useRef(params.id || null)
    const [refresh, setRefresh] = React.useState(false)
    const [title, setTitle] = React.useState('')
    const titleRef = React.useRef()
    const inactivityTimer = useSharedValue(0)
    const dispatch = useDispatch()
    const [notes, setNotes] = React.useState(useSelector(state => state.notes[params.id]))
    const [focusedBlock, setFocusedBlock] = React.useState(null)


    const addComponent = (template) => {
        // create new noteBlock
        console.warn('adding component')
        setNoteBlocks([...noteBlocks, template])
    }

    const removeNote = () => {
        navigation.goBack()
        deleteNote(dispatch, {hash:init.current})
    }


    const options = useMemo(() => [
        {
            icon : <Ionicons name="trash" size={25} color="red" />,
            title : 'Delete Note',
            titleColor: 'red',
            action: removeNote
        }
    ],[init.current])

    useEffect(() => {
        // register sheets
        const captureModal =  <OptionsModal id={'optionsModal'} options={options} />
        registerSheet('optionsModal',() => captureModal,'global', 'optionsSheet')
      },
      [])
    
      const openOptions = () => {
       SheetManager.show("optionsModal", {payload:{init}, context:'optionsSheet'})
      }





    const removeComponent = (index) => {
        // remove component by index (index is assigned at render and changes with state update)
        console.warn('deleting component')
        const _tmp = Object.assign([], noteBlocks)
        _tmp.splice(index, 1)
        setNoteBlocks(_tmp)

    }


    const saveNote = () => {
        cancelAnimation(inactivityTimer)
        inactivityTimer.value = 0
        const data = { hash: init.current, blocks: [] }
        // add title
        const _title = titleRef.current.getValue()

        if (_title !== null){
            data['title'] = _title 
        }else{
            data['title'] = title 

        }


        // check if body exists
        
        if (noteBlocks.length) {
            // do blocks exist
            noteBlocks.map((item, index) => {
                console.warn(tmp)
                const tmp = noteBlocksRef.current[item.id]?.getValue()
                const content = tmp?.payload.content
                if (content) {
                    data['blocks'].push(tmp)
                }
            })
            dispatch(addNoteEntry(data))
            console.warn('saving note')
        } else {
            // check if title exists
            if (data['title'].length) {
                console.warn('hit', data['title'])
                dispatch(addNoteEntry(data))
            } else {
                // delete if none
                deleteNote(dispatch, data)

            }
        }
    }

    // save on blur

    useEffect(() => {
        const listener = navigation.addListener('blur', () => {
            saveNote()
            init.current = null
            if (props.new){
                titleRef.current.clear()
            }
            setNoteBlocks([])
        })

        return listener
    }, [noteBlocks])

    // save on beforeRemove

    useEffect(() => {
        const listener = navigation.addListener('beforeRemove', () => {
            saveNote()
            init.current = null

            if (props.new){
                titleRef.current.clear()
            }
            setNoteBlocks([])
        })

        return listener
    }, [noteBlocks])


    // check state 







    const startActivityTimeout = () => {
        cancelAnimation(inactivityTimer)
        inactivityTimer.value = 0
        inactivityTimer.value = withTiming(1, { duration: 3000 }, (state) => {
            if (state) {
                runOnJS(saveNote)()
            }
        })
    }


    const parentMethods = {
        addComponent,
        removeComponent,
        startActivityTimeout,
        setNoteBlocks
    }







    // on initialization add new/existing noteBlocks
    // listen for screen changes too
    useEffect(() => {
        
        const setup = () => {
            if (props.new) {
                const id = generateRandomUuid()
                init.current = id

            // })
            // return listener
        } else {
            // const listener = navigation.addListener('focus', () => {
                // set title
                setTitle(notes.title)
                // set blocks
                const blocks = []
                notes.blocks.map((item, index) => {
                    const _newNoteBlockTemplate = item
                    blocks.push(_newNoteBlockTemplate)
                })
                setNoteBlocks(blocks)
                console.warn('restoring data', notes.blocks)
            // })
        }
        }


        const listener = navigation.addListener('focus',setup)
        return listener

    }, [])











    return (
        <SafeAreaView style={styles.container}>
            <CreateHeader save={saveNote} options={openOptions} />
            <View style={[styles.spanParent, { paddingTop: '5%' }]}>
                {/* canvas body */}
                <NoteCanvas
                    noteBlocks={noteBlocks}
                    setNoteBlocks={setNoteBlocks}
                    title={title}
                    titleRef={titleRef}
                    noteBlocksRef={noteBlocksRef}
                    parentMethods={parentMethods}
                    autoFocus={props.new}
                    setFocusedBlock={setFocusedBlock}
                />
            </View>

            <OptionsComponent  noteBlocksRef={noteBlocksRef} focusedBlock={focusedBlock}  addComponent={addComponent} />
            <SheetProvider context="optionsSheet">
            </SheetProvider>
        </SafeAreaView>

    );
};





//make this component available to the app
export default NoteLayout;
