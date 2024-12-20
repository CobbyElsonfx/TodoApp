import axios from 'axios';

const API_BASE_URL = 'https://your-laravel-api-url.com/api'; // Replace with your API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
