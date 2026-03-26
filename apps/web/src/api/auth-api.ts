import { apiClient } from "../lib/api-client";
import { z } from "zod";
import { loginValidator, registerValidator } from "@vido-vala/validators/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

// API Functions
export const authApi = {
  login: async (data: z.infer<typeof loginValidator>) => {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  },
  register: async (data: z.infer<typeof registerValidator>) => {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },
  googleLogin: async (idToken: string) => {
    const response = await apiClient.post("/auth/google", { idToken });
    return response.data;
  },
};

// TanStack Query Hooks
export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (response) => {
      toast.success(response.message || "Login successful!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      console.error(error);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: (response) => {
      toast.success(response.message || "Account created successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error(error);
    },
  });
}

export function useGoogleLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.googleLogin,
    onSuccess: (response) => {
      toast.success(response.message || "Google Login successful!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Google Login failed.";
      toast.error(errorMessage);
      console.error(error);
    },
  });
}
