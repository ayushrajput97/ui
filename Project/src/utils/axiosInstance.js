// utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/', // Adjust the base URL as necessary
});

// Add a request interceptor
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default instance;