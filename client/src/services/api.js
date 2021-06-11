import axios from 'axios'


const api = axios.create({
    baseURL: 'https://shturl.herokuapp.com/api/v1',

})

api.defaults.withCredentials = true;


api.interceptors.response.use(undefined, err => {

    return err.response.data
});


export default api;