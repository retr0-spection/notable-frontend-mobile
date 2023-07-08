import { createSlice } from '@reduxjs/toolkit'
import orm from '../orm/schema';

const _ = require('lodash');


// notes are stored with template
// noteCanvas
// {id:{user, ud}} 
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
            
            state.notes = {
                ...state.notes,
                [hash] : Object.assign({}, payload)
            }
        }
    }
})


export const { addNoteEntry } = noteSlice.actions
export const selectNotes = (state) => state.notes

export default noteSlice.reducer