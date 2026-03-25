import { createFileRoute } from "@tanstack/react-router";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Flame } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/trending")({
  component: TrendingComponent,
});

const TRENDING_VIDEOS = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    title: "Mastering React and TanStack Router in 2024",
    author: "VidoVala Dev",
    views: "1.2M views",
    postedAt: "2 days ago",
    duration: "15:45",
    description: "Learn how to build powerful applications with React and TanStack Router.",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function TrendingComponent() {
  return (
    <div className="px-4 pb-10">
      <div className="max-w-6xl mx-auto pt-6">
        <div className="flex items-center gap-4 px-4 mb-8">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-red-600 text-white">
            <Flame className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold">Trending</h1>
        </div>

        <div className="flex gap-4 px-4 mb-6 border-b border-muted overflow-x-auto no-scrollbar">
          <Button variant="ghost" className="border-b-2 border-foreground rounded-none px-4 pb-4">
            Now
          </Button>
          <Button variant="ghost" className="rounded-none px-4 pb-4 text-muted-foreground">
            Music
          </Button>
          <Button variant="ghost" className="rounded-none px-4 pb-4 text-muted-foreground">
            Gaming
          </Button>
          <Button variant="ghost" className="rounded-none px-4 pb-4 text-muted-foreground">
            Movies
          </Button>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {TRENDING_VIDEOS.map((video) => (
            <VideoCard key={video.id} {...video} variant="horizontal" className="px-4" />
          ))}
        </div>
      </div>
    </div>
  );
}
