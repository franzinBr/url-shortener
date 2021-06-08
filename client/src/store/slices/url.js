import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'url',
    initialState: {
        loading: false,
        data: null,
        error: null,
    },
    reducers: {
        fetchStarted(state) {
            state.loading = true;
          },
          fetchSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
          },
          fetchError(state, action) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
          },
    },
});

export default slice.reducer;

const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

export const fetchUrl = (request, body, token) => async (dispatch) => {
    try {
        dispatch(fetchStarted());
        const res = await request(body, token)
        if(res.success === false) throw new Error(res.error)
        return dispatch(fetchSuccess(res.data))
    } catch (error) {
        return dispatch(fetchError(error.message));
    }
} 