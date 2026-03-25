import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { Plus } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { VideoCard } from "@vido-vala/ui/components/video-card";

export const Route = createFileRoute("/my-videos")({
  component: MyVideosComponent,
});

const MY_VIDEOS = [
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
];

function MyVideosComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pb-10">
        <div className="pt-6">
          <div className="flex items-center justify-between px-4 mb-8">
            <h1 className="text-2xl font-bold">Your videos</h1>
            <div className="flex items-center gap-2">
              <Button className="rounded-full gap-2">
                <Plus className="h-5 w-5" />
                <span>Upload</span>
              </Button>
            </div>
          </div>

          <div className="flex gap-4 px-4 mb-6 border-b border-muted overflow-x-auto no-scrollbar">
            <Button
              variant="ghost"
              className="border-b-2 border-foreground rounded-none px-4 pb-4 font-semibold"
            >
              Videos
            </Button>
            <Button variant="ghost" className="rounded-none px-4 pb-4 text-muted-foreground">
              Shorts
            </Button>
            <Button variant="ghost" className="rounded-none px-4 pb-4 text-muted-foreground">
              Live
            </Button>
            <Button variant="ghost" className="rounded-none px-4 pb-4 text-muted-foreground">
              Playlists
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {MY_VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
