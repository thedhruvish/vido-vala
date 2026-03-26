import axios from "axios";
import { env } from "@vido-vala/env/web";

export const apiClient = axios.create({
  baseURL: `${env.VITE_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Optional: Add response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors like 401 Unauthorized
    if (error.response?.status === 401) {
      // Handle logout or redirect to login (e.g., using a state store or redirect)
      console.error("Unauthorized, session may have expired.");
    }
    return Promise.reject(error);
  },
);
