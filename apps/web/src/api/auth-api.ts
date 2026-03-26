import { apiClient } from "../lib/api-client";
import { z } from "zod";
import {
  loginValidator,
  registerValidator,
  otpResendValidator,
  otpVerifyValidator,
  googleLoginValidator,
} from "@vido-vala/validators/auth";
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
  googleLogin: async (data: z.infer<typeof googleLoginValidator>) => {
    const response = await apiClient.post("/auth/google", data);
    return response.data;
  },
  otpResend: async (data: z.infer<typeof otpResendValidator>) => {
    const response = await apiClient.post("/auth/otp-resend", data);
    return response.data;
  },
  otpVerify: async (data: z.infer<typeof otpVerifyValidator>) => {
    const response = await apiClient.post("/auth/otp-verify", data);
    return response.data;
  },
  logout: async () => {
    const response = await apiClient.post("/auth/logout");
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
    },
  });
}

export function useOtpResendMutation() {
  return useMutation({
    mutationFn: authApi.otpResend,
    onSuccess: (response) => {
      toast.success(response.message || "OTP sent successfully!");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to resend OTP.");
    },
  });
}

export function useOtpVerifyMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.otpVerify,
    onSuccess: (response) => {
      toast.success(response.message || "OTP verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Invalid OTP.");
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: (response) => {
      toast.success(response.message || "Logged out successfully!");
      queryClient.clear();
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to logout.");
    },
  });
}
