import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createReducer } from "redux-orm";
import orm from "./orm/schema";
import notesReducer from "./slices/noteSlice";
import logger from 'redux-logger'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const persistConfig = {
    key: 'notes',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
  }

const persistedReducer = persistReducer(persistConfig, notesReducer)


const store = configureStore({
    reducer:persistedReducer,
    middleware:[logger]
})

const persistor = persistStore(store)

export  {store, persistor};