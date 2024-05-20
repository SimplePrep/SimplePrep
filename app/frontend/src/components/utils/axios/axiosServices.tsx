import axiosInstance from './axiosInterceptor';

// Example function to get tests
export const getTests = async () => {
  try {
    const response = await axiosInstance.get('api/core/tests');
    return response.data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw error;
  }
};
