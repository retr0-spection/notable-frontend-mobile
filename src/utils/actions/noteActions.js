import { deleteNoteEntry } from "../../../redux/slices/noteSlice"

export const deleteNote = (dispatch, payload) => {
    const data = {
        hash: payload.hash
    }

    console.warn('deleting', data.hash)
    
    dispatch(deleteNoteEntry(data))
}