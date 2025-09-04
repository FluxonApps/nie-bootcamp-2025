const API_URL = 'http://localhost:8002/api'; // Use the port from your vars.js

// A helper function to manage fetch requests
const fetchApi = async (endpoint, options = {}) => {
    // Get the token from local storage
    const token = localStorage.getItem('token');
    
    // Set up default headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // If a token exists, add it to the Authorization header
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Build the full request options object
    const config = {
        ...options,
        headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Handle non-successful responses
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    // If the response is successful, parse and return the JSON
    return response.json();
};

// Create an object with convenient methods like 'get' and 'post'
const api = {
    get: (endpoint) => fetchApi(endpoint),
    post: (endpoint, body) => fetchApi(endpoint, {
        method: 'POST',
        body: JSON.stringify(body),
    }),
    // You can add put, patch, delete methods here as well
};

export default api;