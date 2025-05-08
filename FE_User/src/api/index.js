import axios from 'axios';
import userService from "../services/userService"
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

api.interceptors.request.use((config) => {

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {

    return response;
}, (error) => {

    if (error.response?.status === 401) {
        userService.logout().then(() => {
            location.href = '/login';
        })
    }

    const originalRequest = error.config;

    if (error.response?.status === 410 && !originalRequest._retry) {
        originalRequest._retry = true;

        return userService.refresh_token()
            .then((res) => {

                return api(originalRequest);
            })
            .catch((err) => {
                userService.logout().then(() => {
                    location.href = '/login';
                })

                return Promise.reject(err);
            })
    }


    if (error.response?.status !== 410) {
        toast.error(error.response?.data?.message || error?.message);
    }
    return Promise.reject(error);
});

export default api;