//import liraries
import React, { useEffect } from 'react';
import { View, ScrollView , SafeAreaView} from 'react-native';
import { styles } from '../../../components/screenLayoutComponents/styles';
import CreateHeader from '../../../components/screenLayoutComponents/createHeader';
import NoteTextInput from '../../../components/noteComponents/components/noteTextInput';
import NoteCanvas from '../../../components/noteComponents/models/noteCanvas';

import NoteBlock from '../../../components/noteComponents/models/noteBlock';
import { generateRandomUuid } from '../../../utils/generators';

// create a component
const CreateView = (props) => {
    const [noteBlocks, setNoteBlocks] = React.useState([])
    const noteBlocksRef = React.useRef({})
    const [focusedBlock, setFocusedBlock] = React.useState(null)
    const [init, setInit] = React.useState(true)

    const addComponent = (type) => {
        // create new noteBlock
        console.warn('adding component')
        const _newNoteBlockTemplate = {
            id : generateRandomUuid(),
            type : type,
            
        }
        setNoteBlocks([...noteBlocks, _newNoteBlockTemplate])
    }

    const removeComponent = (index) => {
        // remove component by index (index is assigned at render and changes with state update)
        const _tmp = Object.assign([],noteBlocks)
        _tmp.splice(index, 1)
        setNoteBlocks(_tmp)

        console.warn('deleting component')
    }

    const renderBlocks = (item, index) => {
        const parentMethods  = {
            addComponent,
            removeComponent
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
        if (init){
            if (noteBlocks.length === 0) {
                addComponent('TitleComponent')
            }else {
                // restore  noteBlocks state
            }
            setInit(false)
        }
    },[])






    

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.spanParent}>
                <CreateHeader />
                {/* canvas body */}
                <ScrollView  contentContainerStyle={styles.spanParent}>
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
