import { createSlice } from '@reduxjs/toolkit'
import orm from '../orm/schema';

const _ = require('lodash');


// notes are stored with template
// note
// {id(hash),...metaData}
//noteBlocks
//{id(has), fk(note_id), ...content}

// normalize data, DO NOT NEST (try to keep it 1 level deep to object/s)
const initialState = {
    notes:{

    }
}

export const noteSlice = createSlice({
    name: 'notes',
    initialState: initialState,
    reducers: {
        addNoteEntry: (state, action) => {
            // add note to 'note' and 'noteBlock'
            const payload = action.payload
            const { hash } = payload
            console.warn('saving',payload)
            
            if (hash){
                state.notes = {
                    ...state.notes,
                    [hash] : Object.assign({}, payload)
                }
            }
        },
        deleteNoteEntry: (state, action) => {
            const payload = action.payload
            const { hash } = payload
            console.warn('deleting')

            if (hash) {
                const newState =  {}
                Object.entries(state.notes).map(([k, v]) => {
                    if (k !== hash){
                        newState[k] = v
                    }
                })

                // deep copy into state
                state.notes = Object.assign({}, newState)

            }

        },
     
    
    }
})


export const { addNoteEntry, deleteNoteEntry } = noteSlice.actions
export const selectNotes = (state) => state.notes

export default noteSlice.reducer