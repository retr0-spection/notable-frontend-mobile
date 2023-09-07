import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { AUTHAPI } from '../../src/api';


// normalize data, DO NOT NEST (try to keep it 1 level deep to object/s)
const initialState = {
    profile:null,
    loggedIn:false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
      setProfile: (state, action) => {
        state.profile = action.payload;
      },
      setLoggedIn: (state, action) => {
        state.loggedIn = action.payload;
      },
    },
    extraReducers:(builder) => {
      builder.addCase(login.fulfilled, (state, action) => {
        const data = action.payload.data;
        state.profile = data
        state.loggedIn = true
      }),
      builder.addCase(refreshProfile.fulfilled, (state, action) => {
        state.profile = {...action.payload.data}
      })
    }
})

export const login = createAsyncThunk('user/login', async (dispatch, getState) => {
  const payload = dispatch

  return axios.post(AUTHAPI.AUTH.LOGIN, payload)
})


export const refreshProfile = createAsyncThunk('user/profile/refresh', async (dispatch, ThunkAPI) => {
  const state = ThunkAPI.getState()
  const profile = state.user.profile
  if (profile){
    const config = {
      headers : {
        Authorization : 'Bearer ' + profile.token
      }
    }
  
    return axios.get(AUTHAPI.PROFILE.GET, config)

  }
})


export const { setProfile, setLoggedIn } = userSlice.actions
export const selectProfile = (state) => state.user.profile
export const selectLoggedIn = (state) => state.user.loggedIn

export default userSlice.reducer