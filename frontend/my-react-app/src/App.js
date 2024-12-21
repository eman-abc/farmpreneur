import React, { useEffect } from 'react';
import axios from './api/axios';  // Import the configured axios instance

const App = () => {
    useEffect(() => {
        // Making an API GET request to the backend
        axios.get('/').then((response) => console.log(response.data));
    }, []);

    return <div>App is running!</div>;
};

export default App;
