import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const _ = require('lodash');

import { NOTEAPI } from '../../src/api';
import axios from 'axios';


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

export const uploadNote = createAsyncThunk('notes/upload', async(payload, thunkAPI) => {

    // save locally

    thunkAPI.dispatch(addNoteEntry(payload))

    // continue uploading to server
    
    const profile = thunkAPI.getState().user.profile
    const workspace = payload.workspaceID


    const config = {
        headers : {
            Authorization: 'Bearer ' + profile.token
        }
    }

    const data = {
        note: payload,
        workspaceID: workspace,
    }  

    console.warn(data)


    axios.post(NOTEAPI.UPDATE, data, config).then((res) => {
        console.warn(res.data)
    })

})


export const deleteNote = (payload, otherConfig) => {
    const profile = otherConfig.profile
  


    const config = {
        headers : {
            Authorization: 'Bearer ' + profile.token
        }
    }

    const data = {
        task_hash: payload.hash,
    }  


    axios.post(NOTEAPI.DELETE, data, config).then((res) => {
        console.warn(res.data)
    })

}


export const { addNoteEntry, deleteNoteEntry } = noteSlice.actions
export const selectNotes = (state) => state.notes

// filter
export const getNotesByColumn = (state, payload) => {
    const _notes = Object.values(state.notes.notes)
    let queries = []

    Object.entries(payload).map(([k, v]) => {
        const query = {}
        query.key = k
        query.value = v

        queries.push(query)
    })

    const notes = _notes.filter((v) => {
        const query = queries[0]
        try {
            if (v[query.key] === query.value){
                return v
            }
        }catch(err) {
            console.warn(err)
        }
    })
    

    return notes
}

export default noteSlice.reducer