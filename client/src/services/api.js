import axios from 'axios'


const api = axios.create({
    baseURL: 'http://localhost:3080/api/v1',

})

api.defaults.withCredentials = true;


api.interceptors.response.use(undefined, err => {

    return err.response.data
});


export default api;