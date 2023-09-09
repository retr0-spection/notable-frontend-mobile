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
export const initialState = {
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

        }
       
    
    },
    extraReducers:(builder) => {
        builder.addCase(uploadAllNotes.fulfilled, (state, action) => {
            const notes = action.payload.data 
            const payload = {}
            notes.map((note) => {
                payload[note.hash] = note
            })
            console.warn(payload)
            state.notes = payload
        })
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


export const deleteNote = createAsyncThunk('note/delete', async(payload, thunkAPI) => {

    // delete locally

    thunkAPI.dispatch(deleteNoteEntry(payload))


    // delete on server
    
    const profile = thunkAPI.getState().user.profile
    const config = {
        headers : {
            Authorization: 'Bearer ' + profile.token
        }
    }

    const data = {
        hash: payload.hash,
    }  

    axios.post(NOTEAPI.DELETE, data, config).then((res) => {
        console.warn(res.data)
    })

})


export const uploadAllNotes = createAsyncThunk('allNotes/upload', async(payload, thunkAPI) => {
    const profile = thunkAPI.getState().user.profile
    notes = Object.values(thunkAPI.getState().notes.notes)

    const config = {
        headers : {
            Authorization: 'Bearer ' + profile.token
        }
    }

    const data = {
        notes,
    }

    return axios.post(NOTEAPI.SYNC, data, config)
    


})

export const { addNoteEntry, deleteNoteEntry } = noteSlice.actions
export const selectNotes = (state) => state.notes

// filter
export const getNotesByColumn = (state, payload) => {
    const _notes = Object.values(state.notes?.notes)
    let queries = []
    var notes = []
    if (_notes.length){
        Object.entries(payload).map(([k, v]) => {
            const query = {}
            query.key = k
            query.value = v
    
            queries.push(query)
        })

    
        notes = _notes.filter((v) => {
            const query = queries[0]
            try {
                if (v[query.key] === query.value){
                    return v
                }
            }catch(err) {
                console.warn(err)
            }
        })
    }

    console.warn(notes)

    return notes
}

export default noteSlice.reducer