import { apiClient } from "../lib/api-client";
import { z } from "zod";
import { updateUserValidator } from "@vido-vala/validators/users";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// API Functions
export const usersApi = {
  getAllUsers: async () => {
    const response = await apiClient.get("/users");
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get("/users/me");
    return response.data;
  },
  getUserById: async (id: string) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },
  updateMe: async (data: z.infer<typeof updateUserValidator>) => {
    const response = await apiClient.patch("/users/me", data);
    return response.data;
  },
  deleteMe: async () => {
    const response = await apiClient.delete("/users/me");
    return response.data;
  },
};

// TanStack Query Hooks
export function useUsersQuery() {
  return useQuery({
    queryKey: ["users"],
    queryFn: usersApi.getAllUsers,
    select: (response) => response.data,
  });
}

export function useMeQuery() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: usersApi.getMe,
    select: (response) => response.data,
  });
}

export function useUserByIdQuery(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => usersApi.getUserById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

export function useUpdateMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.updateMe,
    onSuccess: (response) => {
      toast.success(response.message || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
}

export function useDeleteMeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.deleteMe,
    onSuccess: (response) => {
      toast.success(response.message || "Account deleted successfully!");
      queryClient.clear();
      // Redirect handled by app state or routing
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete account.");
    },
  });
}
