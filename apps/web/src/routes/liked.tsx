import { createFileRoute } from "@tanstack/react-router";
import { ThumbsUp } from "lucide-react";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/liked")({
  component: LikedComponent,
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

const LIKED_VIDEOS = [
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    title: "Why You Should Use Tailwind CSS for Everything",
    author: "Design Pros",
    views: "890K views",
    postedAt: "3 weeks ago",
    duration: "10:30",
    description: "Tailwind CSS makes building modern websites faster and easier.",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    title: "Building a Full-stack YouTube Clone with Mono-repo",
    author: "Web Wizards",
    views: "2.1M views",
    postedAt: "1 month ago",
    duration: "1:45:20",
    description: "Learn how to architect a large-scale application using a mono-repo.",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function LikedComponent() {
  const isEmpty = LIKED_VIDEOS.length === 0;

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
            <ThumbsUp className="h-8 w-8" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Liked videos</h1>
            <p className="text-muted-foreground text-sm">
              {LIKED_VIDEOS.length} videos • Updated today
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
              <ThumbsUp className="h-20 w-20 text-muted-foreground" />
              <h2 className="text-2xl font-bold">You haven't liked any videos yet.</h2>
            </div>
          ) : (
            LIKED_VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} variant="horizontal" className="px-4" />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
