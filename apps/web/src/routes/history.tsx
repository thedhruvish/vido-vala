import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Trash2, Pause, Settings } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/history")({
  component: HistoryComponent,
});

const HISTORY_VIDEOS = [
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
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    title: "The Ultimate Guide to Drizzle ORM",
    author: "Code Master",
    views: "450K views",
    postedAt: "1 week ago",
    duration: "22:10",
    description: "Deep dive into Drizzle ORM and how it compares to other ORMs.",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function HistoryComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pb-10">
        <div className="flex flex-col lg:flex-row gap-8 pt-6 max-w-6xl mx-auto">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-3xl font-bold px-4">Watch history</h1>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold px-4 mt-4">Today</h2>
              {HISTORY_VIDEOS.map((video) => (
                <VideoCard key={video.id} {...video} variant="horizontal" className="px-4" />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-80 flex flex-col gap-4 px-4">
            <div className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start gap-4 rounded-full px-4 h-11">
                <Trash2 className="h-5 w-5" />
                <span>Clear all watch history</span>
              </Button>
              <Button variant="ghost" className="justify-start gap-4 rounded-full px-4 h-11">
                <Pause className="h-5 w-5" />
                <span>Pause watch history</span>
              </Button>
              <Button variant="ghost" className="justify-start gap-4 rounded-full px-4 h-11">
                <Settings className="h-5 w-5" />
                <span>Manage all history</span>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
