import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',  // The base URL is the API endpoint
});

export default instance;
