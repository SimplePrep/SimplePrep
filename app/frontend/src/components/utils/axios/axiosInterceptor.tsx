import axios from 'axios';
import { getAuth, getIdToken } from 'firebase/auth';

const axiosInstance = axios.create({
  baseURL: 'https://beta-simpleprep.com', // Replace with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const token = await getIdToken(user);
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized error, possibly redirect to login
      console.error('Unauthorized, redirecting to login...');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
