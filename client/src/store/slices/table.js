import {createSlice} from '@reduxjs/toolkit'
import { URLALL_GET, URL_DELETE, URL_POST } from '../../services/endpoints'
import getNumberOfPages from '../helper/getNumberOfPages'
import { fetchUrl } from './url'


const initialState = {
    loading: false,
    data: [],
    error: null,
    currentPage: 1,
    numberItensPerPage: 3,
    numberOfPages: null
}

const slice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        changePage: (state, action) => { state.currentPage = action.payload },
        nextPage: (state) => {state.currentPage++},
        previousPage: (state) => {state.currentPage--},
        removeUrlFromList(state, action) {
            state.data = state.data.filter((url) => url.code !== action.payload)
            let oldNumberOfpages = state.numberOfPages
            state.numberOfPages =  getNumberOfPages(state.data.length, state.numberItensPerPage)
            if(state.numberOfPages < oldNumberOfpages && state.currentPage !== 1) state.currentPage--

        },
        addUrlOnList(state, action) {
         //   let oldNumberOfpages = state.numberOfPages
            state.data.push(action.payload)
            state.numberOfPages =  getNumberOfPages(state.data.length, state.numberItensPerPage)
            state.currentPage = state.numberOfPages
        },
        fetchStarted(state) {
            state.loading = true;
        },
        fetchSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            state.numberOfPages =  getNumberOfPages(action.payload.length, state.numberItensPerPage)
        },
        fetchError(state, action) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.data = [];
            state.error = null;
            state.currentPage = 1;
            state.numberItensPerPage = 3;
            state.numberOfPages = null;
        }
    } 
})
const {fetchStarted, fetchSuccess, fetchError, removeUrlFromList, addUrlOnList} = slice.actions;
export const {changePage, previousPage, nextPage, resetState: resetUrlState} = slice.actions;
export default slice.reducer;

// Selectors
export const selectItemsPage = (state) => state.table?.data.slice( (state.table.currentPage*state.table.numberItensPerPage) - state.table.numberItensPerPage  , state.table.currentPage*state.table.numberItensPerPage)

export const fetchUrls = (token) => async (dispatch) => {
    try {
        dispatch(fetchStarted());
        const res = await URLALL_GET(token)
        if(res.success === false) throw new Error(res.error)
        return dispatch(fetchSuccess(res.data.urls))
    } catch (error) {
        return dispatch(fetchError(error.message));
    }
}

export const removeUrl = (code, token) => async (dispatch) => {
    const res = await dispatch(fetchUrl(URL_DELETE, code, token));
    if(res.payload.success === true ) dispatch(removeUrlFromList(code))
}

export const createUrl = (completeUrl, token) => async(dispatch) => {
    const res = await dispatch(fetchUrl(URL_POST, completeUrl, token))
    if(res.payload.success === true) return dispatch(addUrlOnList(res.payload.url))
}