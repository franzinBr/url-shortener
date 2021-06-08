import { createSlice } from '@reduxjs/toolkit';
import { LOGIN_POST, REFRESH_POST, REGISTER_POST } from '../../services/endpoints';

const slice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        data: null,
        error: null,
    },

    reducers: {
        fetchStarted(state) {
            state.loading = true;
        },
        fetchSucces(state, action) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
        },
        fetchError(state, action) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
        },
        resetState(state) {
            state.loading = false;
            state.data = null;
            state.error = null;
        }
    },
});


export default slice.reducer;

const {fetchStarted, fetchSucces, fetchError, resetState} = slice.actions;

const fetchUser = (request, data = []) => async (dispatch) => {
    try {
        dispatch(fetchStarted());
        const res = await request(...data)
        console.log(res)
        if(res.success === false) throw new Error(res.error)

        return dispatch(fetchSucces(res.data))
    } catch (error) {
        return dispatch(fetchError(error.message));
    }
}

export const login = (user) => async(dispatch) => {
    const res = await dispatch(fetchUser(LOGIN_POST, [user]))
}

export const register = (user_new) => async(dispatch) => {
    const res = await dispatch(fetchUser(REGISTER_POST, [user_new]))
}

export const refresh = () => async(dispatch) => {
    const res = await dispatch(fetchUser(REFRESH_POST))

}