import axios, { type AxiosInstance } from 'axios';

// --- Config

// Common
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:5173';
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

// --- Instances

// API
const Api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {

  }
  // timeout: 30000,
});

// --- Export
export default Api;