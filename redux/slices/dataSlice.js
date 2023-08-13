import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



// notes are stored with template
// note
// {id(hash),...metaData}
//noteBlocks
//{id(has), fk(note_id), ...content}

// normalize data, DO NOT NEST (try to keep it 1 level deep to object/s)
const initialState = {
    workspaces:[],
    selectedWorkspace: null,
    projects:[],
    selectedProject: null,
}

export const dataSlice = createSlice({
    name: 'data',
    initialState: initialState,
    reducers: {
      setWorkspaces: (state, action) => {
        state.workspaces = action.payload;
      },
      setSelectedWorkspace: (state, action) => {
        state.selectedWorkspace = action.payload;
      },
      setProjects: (state, action) => {
        state.projects = action.payload;
      },
      setSelectedProject: (state, action) => {
        state.selectedProject = action.payload;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(getWorkspaces.fulfilled, (state, action) => {
        state.workspaces = action.payload.data;
        if (state.selectedWorkspace === null && state.workspaces.length) {
          state.selectedWorkspace = state.workspaces[0]
        }
      })
    }
})

export const getWorkspaces = createAsyncThunk('workspace/list', async(dispatch, {getState}) => {
    const state = getState()
      const profile = state.user.profile


      const config = {
        headers : {
          Authorization: 'Bearer ' + profile.token
        }
      }

    return axios.get('http://localhost:3000/api/v1/workspace/list/', config)

})


export const { setWorkspaces, setProjects, setSelectedWorkspace, setSelectedProject } = dataSlice.actions
export const selectWorkspaces = (state) => state.data.workspaces
export const selectSelectedWorkspace = (state) => state.data.selectedWorkspace
export const selectProjects = (state) => state.data.projects
export const selectSelectedProject = (state) => state.data.selectedProject
export default dataSlice.reducer