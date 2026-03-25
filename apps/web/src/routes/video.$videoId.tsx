import { createFileRoute } from "@tanstack/react-router";
import { ThumbsUp, ThumbsDown, Share2, Download, MoreHorizontal, UserPlus } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { VideoCard } from "@vido-vala/ui/components/video-card";

export const Route = createFileRoute("/video/$videoId")({
  component: VideoComponent,
});

const RECOMMENDED_VIDEOS = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    title: "Mastering React and TanStack Router in 2024",
    author: "VidoVala Dev",
    views: "1.2M views",
    postedAt: "2 days ago",
    duration: "15:45",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    title: "The Ultimate Guide to Drizzle ORM",
    author: "Code Master",
    views: "450K views",
    postedAt: "1 week ago",
    duration: "22:10",
  },
  // Add more as needed
];

function VideoComponent() {
  const { videoId } = Route.useParams();

  return (
    <div className="flex h-full w-full flex-col lg:flex-row gap-6 p-4 lg:p-6 overflow-y-auto">
      <div className="flex-1">
        {/* Video Player Placeholder */}
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black">
          <div className="flex h-full items-center justify-center text-white">
            Video Player {videoId}
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 flex flex-col gap-4">
          <h1 className="text-xl font-bold line-clamp-2">
            Mastering Full-stack Development with VidoVala Mono-repo
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                <img
                  src="https://github.com/shadcn.png"
                  alt="Channel"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">VidoVala Official</span>
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
              <span>1.2M views</span>
              <span>2 days ago</span>
            </div>
            <p className="mt-1 line-clamp-3">
              This is a comprehensive guide to building a modern video platform from scratch. We'll
              cover everything from mono-repo setup with NX to backend with Drizzle and Express, and
              frontend with TanStack Router and Tailwind CSS.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 mt-1 h-auto font-semibold hover:bg-transparent"
            >
              Show more
            </Button>
          </div>
        </div>

        {/* Comments Section Placeholder */}
        <div className="mt-6">
          <h3 className="text-lg font-bold">1.2K Comments</h3>
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
              />
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm">
                  Cancel
                </Button>
                <Button variant="secondary" size="sm" disabled>
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-96 flex flex-col gap-4">
        {RECOMMENDED_VIDEOS.map((video) => (
          <VideoCard
            key={video.id}
            thumbnail={video.thumbnail}
            title={video.title}
            author={video.author}
            views={video.views}
            postedAt={video.postedAt}
            duration={video.duration}
            variant="vertical" // Still vertical but will be smaller
            className="flex-row gap-2" // Hack for now to make it look like small cards
          />
        ))}
      </div>
    </div>
  );
}
