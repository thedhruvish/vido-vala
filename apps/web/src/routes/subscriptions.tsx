import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Grid, List } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/subscriptions")({
  component: SubscriptionsComponent,
});

const SUB_VIDEOS = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    title: "Mastering React and TanStack Router in 2024",
    author: "VidoVala Dev",
    views: "1.2M views",
    postedAt: "2 days ago",
    duration: "15:45",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function SubscriptionsComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pb-10">
        <div className="pt-6">
          <div className="flex items-center justify-between px-4 mb-8">
            <h1 className="text-xl font-bold">Latest</h1>
            <div className="flex items-center gap-4 text-blue-500 font-semibold">
              <span>Manage</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Grid className="h-5 w-5 text-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-5 w-5 text-foreground" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-4 gap-y-8 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {SUB_VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
