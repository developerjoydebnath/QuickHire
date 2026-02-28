import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || '';
      // Don't redirect for auth-check requests or if already on login page
      const isAuthCheck = requestUrl.includes('/auth/me');
      const isOnLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';

      if (!isAuthCheck && !isOnLoginPage) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
