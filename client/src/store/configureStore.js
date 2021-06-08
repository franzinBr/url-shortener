import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import table from './slices/table'
import auth from './slices/auth'
import url from './slices/url'

const reducer = combineReducers({ table, auth, url})
const middleware = getDefaultMiddleware();
const store = configureStore({reducer, middleware})

export default store;