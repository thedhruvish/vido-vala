import { apiClient } from "../lib/api-client";
import { z } from "zod";
import {
  createWatchHistoryValidator,
  updateWatchHistoryValidator,
} from "@vido-vala/validators/watch-histories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// API Functions
export const watchHistoriesApi = {
  getMyWatchHistory: async () => {
    const response = await apiClient.get("/watch-histories/me");
    return response.data;
  },
  addWatchHistory: async (data: z.infer<typeof createWatchHistoryValidator>) => {
    const response = await apiClient.post("/watch-histories", data);
    return response.data;
  },
  updateWatchHistory: async (id: string, data: z.infer<typeof updateWatchHistoryValidator>) => {
    const response = await apiClient.patch(`/watch-histories/${id}`, data);
    return response.data;
  },
  deleteWatchHistory: async (id: string) => {
    const response = await apiClient.delete(`/watch-histories/${id}`);
    return response.data;
  },
};

// TanStack Query Hooks
export function useMyWatchHistoryQuery() {
  return useQuery({
    queryKey: ["watch-history", "me"],
    queryFn: watchHistoriesApi.getMyWatchHistory,
    select: (response) => response.data,
  });
}

export function useAddWatchHistoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: watchHistoriesApi.addWatchHistory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch-history", "me"] });
    },
    onError: (error: any) => {
      console.error("Failed to add watch history:", error);
    },
  });
}

export function useUpdateWatchHistoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: z.infer<typeof updateWatchHistoryValidator> }) =>
      watchHistoriesApi.updateWatchHistory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watch-history", "me"] });
    },
    onError: (error: any) => {
      console.error("Failed to update watch history:", error);
    },
  });
}

export function useDeleteWatchHistoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => watchHistoriesApi.deleteWatchHistory(id),
    onSuccess: (response) => {
      toast.success(response.message || "History entry removed!");
      queryClient.invalidateQueries({ queryKey: ["watch-history", "me"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to remove history entry.");
    },
  });
}
