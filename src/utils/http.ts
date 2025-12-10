import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

// Request interceptors that inject token into header

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Clear token and move to login page if token not valid

http.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      localStorage.setItem('token', '');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);

export default http;
