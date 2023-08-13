import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createReducer } from "redux-orm";
import orm from "./orm/schema";
import notesReducer from "./slices/noteSlice";
import userReducer from "./slices/userSlice";
import dataReducer from "./slices/dataSlice";
import logger from 'redux-logger'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";

const persistTasksConfig = {
    key: 'notes',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
}

const persistDataConfig = {
  key: 'data',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
}



const persistedTasksReducer = persistReducer(persistTasksConfig, notesReducer)
const persistedDataReducer = persistReducer(persistDataConfig, dataReducer)
const persistedUserReducer = persistReducer(persistUserConfig, userReducer)

const store = configureStore({
    reducer:combineReducers({
      notes: persistedTasksReducer,
      user: persistedUserReducer,
      data: persistedDataReducer
    }),
    middleware:[logger, thunk]
})

const persistor = persistStore(store)

export  {store, persistor};