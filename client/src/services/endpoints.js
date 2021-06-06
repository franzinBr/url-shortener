import api from './api'

// AUTH ENDPOINTS
export const LOGIN_POST = async (user) => {
    const res = await api.post('/auth/login', user)
    return res
}

export const REGISTER_POST = async (user_new) => {
    const res = await api.post('/auth/register', user_new)
    return res
}

export const VALIDATE_PUT = async (verifyToken) => {
    const res = await api.put(`/auth/verify/${verifyToken}`)
    return res
}

export const REFRESH_POST = async () => {
    const res = await api.post('/auth/refresh')
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

export const URL_POST = async(url, token) => {
    const res = await api.post('/url', {
        headers: {Authorization:  `Bearer ${token}`}
    })
    return res
}

export const URL_GET = async(code) => {
    const res = await api.get(`/url/${code}`)
    return res
}

export const URL_DELETE = async(code) => {
    const res = await api.get('/url', code, {
        headers: {Authorization:  `Bearer ${token}`}
    })
    return res
}