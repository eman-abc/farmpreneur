// axiosInstance.js
import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',  // Set the base URL for your API
  withCredentials: true  // Automatically include credentials (cookies) with each request
});

export default axiosInstance;
