import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // Your API base URL
  timeout: 100000, // Timeout duration in milliseconds
  headers: {
    'Content-Type': 'application/json',
    // Add any default headers you need
  },
});



// Define your API methods
const api = {
  getUsers: () => instance.get('/api/users'),
  // Add more methods as needed
  createUser: (userData) => instance.post('/api/users', userData),
  getPins: (params) => instance.get('/api/pins',{ params }),
  verifySavedPin: (params) => instance.post('api/pins/verifySavedPins',{params})
};



export default api;
