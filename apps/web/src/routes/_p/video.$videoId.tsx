import { createFileRoute } from "@tanstack/react-router";
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { useVideoByIdQuery, useVideosQuery } from "@/api/videos-api";
import { useCommentsByVideoIdQuery, useAddCommentMutation } from "@/api/comments-api";
import Loader from "@/components/loader";
import { useState } from "react";

export const Route = createFileRoute("/_p/video/$videoId")({
  component: VideoComponent,
});

function VideoComponent() {
  const { videoId } = Route.useParams();
  const { data: video, isPending: isVideoPending, error: videoError } = useVideoByIdQuery(videoId);
  const { data: comments, isPending: isCommentsPending } = useCommentsByVideoIdQuery(videoId);
  const { data: recommendedVideos } = useVideosQuery();
  const addCommentMutation = useAddCommentMutation();
  const [commentText, setCommentText] = useState("");

  if (isVideoPending) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (videoError || !video) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-destructive">
        <p className="font-medium text-lg text-foreground">Video not found.</p>
        <p>This video might have been removed or is unavailable.</p>
      </div>
    );
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    addCommentMutation.mutate(
      {
        videoId: Number(videoId),
        content: commentText,
      },
      {
        onSuccess: () => setCommentText(""),
      },
    );
  };

  return (
    <div className="flex h-full w-full flex-col lg:flex-row gap-6 p-4 lg:p-6 overflow-y-auto">
      <div className="flex-1">
        {/* Video Player Placeholder */}
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover opacity-50"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white">
              Video Player {videoId}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="text-xl font-bold line-clamp-2">{video.title}</h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                <img
                  src={video.user?.picture || "https://github.com/shadcn.png"}
                  alt={video.user?.name || "Channel"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{video.user?.name || "Anonymous"}</span>
                <span className="text-xs text-muted-foreground">1.2M subscribers</span>
              </div>
              <Button variant="default" size="sm" className="ml-2 rounded-full px-4">
                Subscribe
              </Button>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              <div className="flex items-center bg-muted rounded-full">
                <Button variant="ghost" size="sm" className="rounded-l-full gap-2 px-3 border-r">
                  <ThumbsUp className="h-4 w-4" />
                  <span>124K</span>
                </Button>
                <Button variant="ghost" size="sm" className="rounded-r-full px-3">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="secondary" size="sm" className="rounded-full gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full gap-2 hidden sm:flex">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full px-2">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-muted p-3 text-sm">
            <div className="flex gap-2 font-semibold">
              <span>0 views</span>
              <span>Just now</span>
            </div>
            <p className="mt-1 whitespace-pre-wrap">
              {video.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">{comments?.length || 0} Comments</h3>
          <div className="mt-4 flex gap-4">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
              <img
                src="https://github.com/shadcn.png"
                alt="User"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <input
                placeholder="Add a comment..."
                className="w-full bg-transparent border-b border-muted py-1 focus:outline-none focus:border-foreground"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setCommentText("")}>
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={!commentText.trim() || addCommentMutation.isPending}
                  onClick={handleCommentSubmit}
                >
                  Comment
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {isCommentsPending ? (
              <div className="flex justify-center py-4">
                <Loader />
              </div>
            ) : (
              comments?.map((comment: any) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                    <img
                      src={comment.user?.picture || "https://github.com/shadcn.png"}
                      alt={comment.user?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{comment.user?.name}</span>
                      <span className="text-xs text-muted-foreground">Just now</span>
                    </div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span className="text-xs">0</span>
                      </div>
                      <ThumbsDown className="h-3.5 w-3.5" />
                      <span className="text-xs font-bold cursor-pointer">Reply</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 flex flex-col gap-4 overflow-y-auto">
        {recommendedVideos
          ?.filter((v: any) => String(v.id) !== videoId)
          .map((v: any) => (
            <VideoCard
              key={v.id}
              id={String(v.id)}
              thumbnail={
                v.thumbnail ||
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
              }
              title={v.title}
              author={v.user?.name || "Anonymous"}
              views="0 views"
              postedAt="Recently"
              duration={
                v.seconds
                  ? `${Math.floor(v.seconds / 60)}:${String(v.seconds % 60).padStart(2, "0")}`
                  : "00:00"
              }
              variant="vertical"
              className="flex-row gap-2"
            />
          ))}
      </div>
    </div>
  );
}
