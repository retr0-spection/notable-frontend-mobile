import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    notes: {},
}


export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload
        }
    }
})


export const {setNotes} = dataSlice.actions
export const selectNotes = (state) => state.dataSlice 

export default dataSlice.reducer