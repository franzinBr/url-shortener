import {createSlice} from '@reduxjs/toolkit'
import getNumberOfPages from '../helper/getNumberOfPages'

const items = [
    {
        shortener: 'askld',
        complete: 'www.google.com.br',
        clicks: 4,
    },
    {
        shortener: 'asd23',
        complete: 'www.yotube.com.br/dasdas/asfad/as/d/wqehjkashdjkawyuqihajshdiquweyuiq',
        clicks: 90,
    },
    {
        shortener: 'tititk',
        complete: 'www.tiktok.com',
        clicks: 50,
    },
    {
        shortener: 'tranquilo',
        complete: 'www.sim.com',
        clicks: 50,
    },


]


const initialState = {
    currentPage: 1,
    numberItensPerPage: 3,
    items,
    numberOfPages: getNumberOfPages(items.length, 3)
}

const slice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        changePage: (state, action) => { state.currentPage = action.payload },
        nextPage: (state) => {state.currentPage++},
        previousPage: (state) => {state.currentPage--}

    } 
})

export const {changePage, previousPage, nextPage} = slice.actions;
export default slice.reducer;

// Selectors
export const selectItemsPage = (state) => state.table?.items.slice( (state.table.currentPage*state.table.numberItensPerPage) - state.table.numberItensPerPage  , state.table.currentPage*state.table.numberItensPerPage)