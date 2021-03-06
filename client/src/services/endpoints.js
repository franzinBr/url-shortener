import api from './api'

const options = {
    headers: {"content-type": "application/json"},
}

// AUTH ENDPOINTS
export const LOGIN_POST = async (user) => {
    const res = await api.post('/auth/login', user, options)
    return res
}

export const REGISTER_POST = async (user_new) => {
    const res = await api.post('/auth/register', user_new, options)
    return res
}

export const VALIDATE_PUT = async (verifyToken) => {
    const res = await api.put(`/auth/verify/${verifyToken}`)
    return res
}

export const FORGOTPASSWORD_POST = async (email) => {
    const res = await api.post('/auth/forgotpassword', email, options)
    return res
}

export const RESETPASSWORD_PUT = async (tokenReset, password) => {
    const res = await api.put(`/auth/resetpassword/${tokenReset}`, password)
    return res
}

export const REFRESH_POST = async () => {
    const res = await api.post('/auth/refresh')
    return res
}

export const LOGOUT_POST = async () => {
    api.defaults.withCredentials = true;
    const res = await api.post('/auth/logout')
    return res
}

// USER ENDPOINTS

export const URLALL_GET = async (token) => {
    const res = await api.get('/user', {
        headers: {Authorization: `Bearer ${token}`}
    })
    return res
}

// URL ENDPOINTS

export const URL_POST = async(completeUrl, token) => {
    const res = await api.post('/url', {completeUrl}, {
        headers: {Authorization:  `Bearer ${token}`}
    })
    return res
}

export const URL_GET = async(code) => {
    const res = await api.get(`/url/${code}`)
    return res
}

export const URL_DELETE = async(code, token) => {
    const res = await api.delete('/url', {
        headers: { Authorization: `Bearer ${token}`},
        data: {code}
        });

    return res
}