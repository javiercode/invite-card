// import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import AuthReducer from "./login/reducer";

const rootReducer = combineReducers({ 
  AuthReducer: AuthReducer,
  // MovReducer: MovReducer,
  // stateReconciler: hardSet
})


export const store = configureStore({
  reducer: rootReducer,
})
