import axios from 'axios';
import { API_URL } from '../utils/consts';

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$api.interceptors.response.use(config => {
    return config;
}, (async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(`${API_URL}/users/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (error) {
            console.log('Не авторизован');
        }
    }
    throw error;
}))

export default $api;