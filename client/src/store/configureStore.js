import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import table from './slices/table'
import auth from './slices/auth'

const reducer = combineReducers({ table, auth})
const middleware = getDefaultMiddleware();
const store = configureStore({reducer, middleware})

export default store;