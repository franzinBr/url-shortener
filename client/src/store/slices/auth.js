import { createSlice } from '@reduxjs/toolkit';
import { LOGIN_POST, LOGOUT_POST, REFRESH_POST, REGISTER_POST } from '../../services/endpoints';
import {resetUrlState} from './table'

const slice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        data: null,
        error: null,
        logged: false,
    },

    reducers: {
        fetchStarted(state) {
            state.loading = true;
        },
        fetchSuccess(state, action) {
            state.loading = false;
            state.data = action.payload;
            state.error = null;
            if(state.data.authToken) state.logged = true;
        },
        fetchError(state, action) {
            state.loading = false;
            state.data = null;
            state.error = action.payload;
            state.logged = false;
        },
        resetState(state) {
            state.loading = false;
            state.data = null;
            state.error = null;
            state.logged = false;
        }
    },
});


export default slice.reducer;

const {fetchStarted, fetchSuccess, fetchError, resetState: resetAuthState} = slice.actions;

export {resetAuthState};

const fetchUser = (request, data = []) => async (dispatch) => {
    try {
        dispatch(fetchStarted());
        const res = await request(...data)
        if(res.success === false) throw new Error(res.error)

        return dispatch(fetchSuccess(res.data))
    } catch (error) {
        return dispatch(fetchError(error.message));
    }
}

const resetAll = () => (dispatch) => {
    dispatch(resetAuthState())
    dispatch(resetUrlState())
}

export const login = (user) => async(dispatch) => {
    const res = await dispatch(fetchUser(LOGIN_POST, [user]))
    return res
}

export const register = (user_new) => async(dispatch) => {
    const res = await dispatch(fetchUser(REGISTER_POST, [user_new]))
    return res
}

export const logout = () => async(dispatch) => {
    const res = await dispatch(fetchUser(LOGOUT_POST))
    dispatch(resetAll())
    return res
}

export const refresh = () => async(dispatch) => {
    
    var cookie = document.cookie.split(';');
    cookie.filter((c) => c.split('=')[0] === 'aux' && c.split('=')[1] === true)
    if(cookie[0] === "aux=true")
    {
        const res = await dispatch(fetchUser(REFRESH_POST))
        if(res.type === 'auth/fetchError') dispatch(resetAll())
        return res.payload
    }
    return null

}