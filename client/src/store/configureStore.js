import {combineReducers, configureStore} from '@reduxjs/toolkit'
import table from './slices/table'

const reducer = combineReducers({ table})
const store = configureStore({reducer})

export default store;