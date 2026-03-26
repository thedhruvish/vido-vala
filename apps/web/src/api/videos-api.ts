import { apiClient } from "../lib/api-client";
import { z } from "zod";
import { createVideoValidator, updateVideoValidator } from "@vido-vala/validators/videos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// API Functions
export const videosApi = {
  getAllVideos: async () => {
    const response = await apiClient.get("/videos");
    return response.data;
  },
  getVideoById: async (id: string) => {
    const response = await apiClient.get(`/videos/${id}`);
    return response.data;
  },
  createVideo: async (data: z.infer<typeof createVideoValidator>) => {
    const response = await apiClient.post("/videos", data);
    return response.data;
  },
  updateVideo: async (id: string, data: z.infer<typeof updateVideoValidator>) => {
    const response = await apiClient.patch(`/videos/${id}`, data);
    return response.data;
  },
  deleteVideo: async (id: string) => {
    const response = await apiClient.delete(`/videos/${id}`);
    return response.data;
  },
};

// TanStack Query Hooks
export function useVideosQuery() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: videosApi.getAllVideos,
    select: (response) => response.data,
  });
}

export function useVideoByIdQuery(id: string) {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => videosApi.getVideoById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
}

export function useCreateVideoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: videosApi.createVideo,
    onSuccess: (response) => {
      toast.success(response.message || "Video created successfully!");
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create video.");
    },
  });
}

export function useUpdateVideoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: z.infer<typeof updateVideoValidator> }) =>
      videosApi.updateVideo(id, data),
    onSuccess: (response, variables) => {
      toast.success(response.message || "Video updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["video", variables.id] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update video.");
    },
  });
}

export function useDeleteVideoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => videosApi.deleteVideo(id),
    onSuccess: (response) => {
      toast.success(response.message || "Video deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete video.");
    },
  });
}
