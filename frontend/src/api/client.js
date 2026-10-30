import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ad_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ad_token');
    }
    return Promise.reject(error);
  }
);

/** Extract a human-readable message from an axios error. */
export function apiError(error, fallback = 'Something went wrong. Please try again.') {
  const data = error?.response?.data;
  if (data?.errors) return Object.values(data.errors).flat()[0];
  if (data?.error && typeof data.error === 'object') return Object.values(data.error).flat()[0];
  return data?.message || fallback;
}

export default api;
