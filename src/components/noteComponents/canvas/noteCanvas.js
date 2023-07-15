import React, { useCallback } from "react";
import { InputAccessoryView, Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import NoteBlock from "../models/noteBlock";
import { styles } from "../../screenLayoutComponents/styles";
import { generateRandomUuid } from "../../../utils/generators";
import OptionsComponent from "../../inputComponents/optionsComponent";
import DraggableFlatList, { ScaleDecorator } from "react-native-draggable-flatlist";
import TitleHeader from "../components/titleHeader";


const NoteCanvas = (props) => {
    const { noteBlocks, setNoteBlocks, noteBlocksRef, titleRef, parentMethods } = props
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
                        blockRefs={noteBlocksRef}
                        parentMethods={parentMethods}
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