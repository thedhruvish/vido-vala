# API Guidelines for VidoVala Web

This document outlines the standard procedure for writing API calls and TanStack Query hooks in the web application.

## Directory Structure

All API-related code should reside in `apps/web/src/api/`. Each file should typically contain both the core API functions (using Axios) and the corresponding TanStack Query hooks.

## Axios Client

Always use the pre-configured `apiClient` from `@/lib/api-client`.

- **Base URL**: Set to `${VITE_SERVER_URL}/api`.
- **Authentication**: Uses cookie-based sessions (`withCredentials: true`). No manual token handling is required in most cases.

## Writing an API Module

### 1. Define API Functions

Create a plain object containing your API calls. Use `apiClient` for requests.

```typescript
import { apiClient } from "../lib/api-client";

export const videosApi = {
  getVideos: async () => {
    const response = await apiClient.get("/videos");
    return response.data; // Server returns { success: boolean, message: string, data: any }
  },
  uploadVideo: async (data: any) => {
    const response = await apiClient.post("/videos/upload", data);
    return response.data;
  },
};
```

### 2. Define TanStack Query Hooks

In the same file, export hooks that wrap these API functions.

#### For Data Fetching (`useQuery`)

```typescript
import { useQuery } from "@tanstack/react-query";

export function useVideosQuery() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: videosApi.getVideos,
    select: (response) => response.data, // Access the actual payload
  });
}
```

#### For Data Mutations (`useMutation`)

Include side effects like toast notifications, navigation, or cache invalidation.

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function useUploadVideoMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: videosApi.uploadVideo,
    onSuccess: (response) => {
      toast.success(response.message || "Video uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      navigate({ to: "/my-videos" });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "Upload failed.";
      toast.error(errorMessage);
    },
  });
}
```

## Usage in Components

Hooks provide standard states (`isPending`, `error`, `data`) to handle UI logic cleanly.

```tsx
function VideoList() {
  const { data: videos, isPending, error } = useVideosQuery();

  if (isPending) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
```

## Error Handling

The server follows a specific error structure:

```json
{
  "success": false,
  "message": "Human-readable error message",
  "errors": [],
  "stack": "..." // Only in debug mode
}
```

Always access `error.response.data.message` in `onError` callbacks to display accurate feedback to the user.
