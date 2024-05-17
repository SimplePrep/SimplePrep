import axios from 'axios';

const API_URL = 'http://localhost:8000/auth/user/signup';


export async function registerUserInBackend(userDetails: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    subscriptionType?: string;
  }) {
    try {
      const response = await axios.post(API_URL, {
        email: userDetails.email,
        first_name: userDetails.firstName,
        last_name: userDetails.lastName,
        password: userDetails.password,
        subscription_type: userDetails.subscriptionType || 'FREEMIUM'
      });
  
      if (response.status === 200 || response.status === 201) {
        console.log('User registered in backend:', response.data);
      } else {
        console.error('Failed to register user in backend:', response.status, response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // AxiosError has additional information like response status code, etc.
        console.error('Error registering user in backend:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        // Generic error handling if it's not an AxiosError
        console.error('Error:', error.message);
      } else {
        // If it's not an AxiosError or a standard Error, log the entire error.
        console.error('An unexpected error occurred:', error);
      }
    }
  }