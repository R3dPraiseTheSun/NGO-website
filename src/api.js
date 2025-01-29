import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api' 
    : 'https://ngo-backend-wh0k.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});