import { deleteNoteEntry } from "../../../redux/slices/noteSlice"

export const deleteNote = (dispatch, payload) => {
  

    console.warn('deleting', payload)
    
    dispatch(deleteNoteEntry(payload))
}