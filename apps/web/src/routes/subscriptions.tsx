import { createFileRoute } from "@tanstack/react-router";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Grid, List } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/subscriptions")({
  component: SubscriptionsComponent,
});

const SUB_CHANNELS = [
  { id: "1", name: "VidoVala Dev", avatar: "https://github.com/shadcn.png" },
  { id: "2", name: "Code Master", avatar: "https://github.com/shadcn.png" },
  { id: "3", name: "Design Pros", avatar: "https://github.com/shadcn.png" },
  { id: "4", name: "Web Wizards", avatar: "https://github.com/shadcn.png" },
  { id: "5", name: "Tech Insider", avatar: "https://github.com/shadcn.png" },
  { id: "6", name: "Dev Tools", avatar: "https://github.com/shadcn.png" },
  { id: "7", name: "React Tips", avatar: "https://github.com/shadcn.png" },
  { id: "8", name: "TS Hero", avatar: "https://github.com/shadcn.png" },
];

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
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    title: "The Ultimate Guide to Drizzle ORM with PostgreSQL",
    author: "Code Master",
    views: "450K views",
    postedAt: "1 week ago",
    duration: "22:10",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    title: "Why You Should Use Tailwind CSS for Everything",
    author: "Design Pros",
    views: "890K views",
    postedAt: "3 weeks ago",
    duration: "10:30",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function SubscriptionsComponent() {
  return (
    <div className="px-4 pb-10">
      <div className="pt-6">
        <div className="flex items-center gap-6 overflow-x-auto pb-6 mb-4 no-scrollbar px-4 border-b border-muted">
          {SUB_CHANNELS.map((channel) => (
            <div
              key={channel.id}
              className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group"
            >
              <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-transparent group-hover:border-primary transition-colors">
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xs text-center truncate w-full font-medium text-muted-foreground group-hover:text-foreground">
                {channel.name}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between px-4 mb-8">
          <h1 className="text-xl font-bold">Latest</h1>
          <div className="flex items-center gap-4 text-blue-500 font-semibold">
            <span className="cursor-pointer">Manage</span>
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
          {/* Duplicate to show a full grid */}
          {SUB_VIDEOS.map((video) => (
            <VideoCard key={video.id + "-copy"} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}
