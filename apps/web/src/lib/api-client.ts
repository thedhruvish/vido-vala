import axios from "axios";
import { env } from "@vido-vala/env/web";
import { useAuthStore } from "../hooks/use-auth-store";

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
    // Handle global errors like 401 Unauthorized or 403 Forbidden
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Clear auth store
      useAuthStore.getState().logout();
      console.error("Unauthorized or Forbidden, session may have expired.");
    }
    return Promise.reject(error);
  },
);
