import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/watch-later")({
  component: WatchLaterComponent,
});

const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "React",
  "Typescript",
  "Tailwind CSS",
  "Drizzle ORM",
  "Next.js",
  "TanStack Router",
  "Programming",
  "Live",
  "Podcasts",
  "Mixes",
  "News",
];

const WATCH_LATER_VIDEOS = [
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
    title: "The Ultimate Guide to Drizzle ORM with PostgreSQL",
    author: "Code Master",
    views: "450K views",
    postedAt: "1 week ago",
    duration: "22:10",
    description: "Master database migrations and queries with Drizzle ORM.",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function WatchLaterComponent() {
  const isEmpty = WATCH_LATER_VIDEOS.length === 0;

  return (
    <div className="px-4 pb-10">
      <div className="sticky top-0 z-40 bg-background py-3">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar px-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              size="sm"
              className="whitespace-nowrap rounded-lg px-3 py-1 font-medium"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6">
        <div className="flex items-center gap-4 px-4 mb-8">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Clock className="h-8 w-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Watch Later</h1>
            <p className="text-muted-foreground text-sm">
              {WATCH_LATER_VIDEOS.length} videos • Updated today
            </p>
          </div>
        </div>

        <div className="flex gap-2 px-4 mb-6">
          <Button className="rounded-full px-6">Play all</Button>
          <Button variant="secondary" className="rounded-full px-6">
            Shuffle
          </Button>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Clock className="h-20 w-20 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Your watch later list is empty.</h2>
            </div>
          ) : (
            WATCH_LATER_VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} variant="horizontal" className="px-4" />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
