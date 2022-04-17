import { combineReducers, configureStore } from "@reduxjs/toolkit";
import toolkitSlice from "./toolkitSlice";

const rootReducer = combineReducers({
    notes: toolkitSlice
})


export const store = configureStore({
    reducer: rootReducer
})