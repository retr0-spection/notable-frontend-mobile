import React, { useCallback } from "react";
import { InputAccessoryView, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import NoteBlock from "../models/noteBlock";
import { styles } from "../../screenLayoutComponents/styles";
import { generateRandomUuid } from "../../../utils/generators";
import OptionsComponent from "../../inputComponents/optionsComponent";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import TitleHeader from "../components/titleHeader";
import { useSelector } from "react-redux";


const NoteCanvas = (props) => {
    const { noteBlocks, setNoteBlocks, noteBlocksRef, titleRef, parentMethods, setFocusedBlock } = props


    const addTextComponent = () => {
        //template
        const _newNoteBlockTemplate = {
            id: generateRandomUuid(),
            type: 'ParagraphComponent',
            payload: null,
            focus: true
        }
        // if empty add
        if (noteBlocks.length === 0) {
            parentMethods.addComponent(_newNoteBlockTemplate)

            return
        }

        const lastBlockRef = noteBlocksRef.current[noteBlocks[noteBlocks.length - 1].id]
        if (lastBlockRef.getType() !== 'ParagraphComponent') {
            // if previous block is not paragraph component add new comp
            parentMethods.addComponent(_newNoteBlockTemplate)
        } else {
            // else focus on last paragraph component
            lastBlockRef.focus()
        }

    }

    const focusOnFirstBlock = useCallback(() => {
        if (noteBlocks.length){
            noteBlocksRef.current[noteBlocks[0].id].focus()
        }
    },[noteBlocks])


    const renderItem = ({ item, drag, isActive, getIndex }) => {
        const index = getIndex()
        return (
            <ScaleDecorator>
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                >
                    <NoteBlock
                        ref={(ref) => {
                            noteBlocksRef.current[item.id] = ref;
                        }}
                        key={index}
                        index={index}
                        item={item}
                        type={item.type}
                        autoFocus={item.focus}
                        blocks={noteBlocks}
                        titleRef={titleRef}
                        blockRefs={noteBlocksRef}
                        parentMethods={parentMethods}
                        setFocusedBlock={setFocusedBlock}
                    />
                </TouchableOpacity>
            </ScaleDecorator>
        )
    }

    const header = useCallback(() => {
        return <TitleHeader
                    ref={(ref) => titleRef.current = ref}
                    initial={props.title}
                    parentMethods={parentMethods}
                    blocks={noteBlocks}
                    autoFocus={props.autoFocus && noteBlocks.length == 0}
                    focusOnFirstBlock={focusOnFirstBlock}
                    setFocusedBlock={setFocusedBlock}
        />
    }, [noteBlocks, noteBlocksRef])


    return (
        <Pressable
            onPress={addTextComponent}
        >
            <DraggableFlatList
                data={noteBlocks}
                ListHeaderComponent={
                   <>
                   {header()}
                   </>
                }
          
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={[styles.spanParent, { paddingHorizontal: '3%' }]}
                onDragEnd={({ data }) => setNoteBlocks(data)}

            />

        </Pressable>
    )
}


export default NoteCanvas