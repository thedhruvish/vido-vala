import { apiClient } from "../lib/api-client";
import { z } from "zod";
import { createCommentValidator, updateCommentValidator } from "@vido-vala/validators/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// API Functions
export const commentsApi = {
  getCommentsByVideoId: async (videoId: string) => {
    const response = await apiClient.get(`/comments/video/${videoId}`);
    return response.data;
  },
  addComment: async (data: z.infer<typeof createCommentValidator>) => {
    const response = await apiClient.post("/comments", data);
    return response.data;
  },
  updateComment: async (id: string, data: z.infer<typeof updateCommentValidator>) => {
    const response = await apiClient.patch(`/comments/${id}`, data);
    return response.data;
  },
  deleteComment: async (id: string) => {
    const response = await apiClient.delete(`/comments/${id}`);
    return response.data;
  },
};

// TanStack Query Hooks
export function useCommentsByVideoIdQuery(videoId: string) {
  return useQuery({
    queryKey: ["comments", videoId],
    queryFn: () => commentsApi.getCommentsByVideoId(videoId),
    select: (response) => response.data,
    enabled: !!videoId,
  });
}

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: commentsApi.addComment,
    onSuccess: (response, variables) => {
      toast.success(response.message || "Comment added!");
      queryClient.invalidateQueries({ queryKey: ["comments", String(variables.videoId)] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to add comment.");
    },
  });
}

export function useUpdateCommentMutation(videoId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: z.infer<typeof updateCommentValidator> }) =>
      commentsApi.updateComment(id, data),
    onSuccess: (response) => {
      toast.success(response.message || "Comment updated!");
      queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update comment.");
    },
  });
}

export function useDeleteCommentMutation(videoId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => commentsApi.deleteComment(id),
    onSuccess: (response) => {
      toast.success(response.message || "Comment deleted!");
      queryClient.invalidateQueries({ queryKey: ["comments", videoId] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete comment.");
    },
  });
}
