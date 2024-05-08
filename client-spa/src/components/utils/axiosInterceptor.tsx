import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log('Requesting')
  }
  return config;
};

const requestInterceptorError = (error: AxiosError): Promise<InternalAxiosRequestConfig> => {
  console.error('Failed to send request:', error.message);
  return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
    return response;
}

const responseInterceptorError = (error: AxiosError) : Promise<AxiosError> => {
    if (error.response) {
        switch(error.response.status){
            case 401:
                console.error('Something went wrong while fetching')
                break;
            case 500:
                console.error('Server Error: ', error.response.data);
                break;
            default:
                break;
        }
    }
    return Promise.reject(error);
}

axiosInstance.interceptors.request.use(requestInterceptor, requestInterceptorError);
axiosInstance.interceptors.response.use(responseInterceptor, responseInterceptorError);
export default axiosInstance;