import axios from "axios";
import { REACT_BASE_URL } from "../config/constant";

// Create an Axios instance
const axiosInstance = axios.create();

// Set the base URL for all requests
axiosInstance.defaults.baseURL = REACT_BASE_URL;

// Add a request interceptor to include the Authorization header with the token
axiosInstance.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem("auth_token"); // Retrieve the auth token from localStorage

    if (authToken) {
      // Set the Authorization header if the token exists
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }

    return config; // Return the modified config object
  },
  (error) => {
    // Handle errors if necessary
    return Promise.reject(error);
  }
);

export default axiosInstance;
