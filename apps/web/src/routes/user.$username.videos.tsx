import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@vido-vala/ui/components/button";
import { VideoCard } from "@vido-vala/ui/components/video-card";

export const Route = createFileRoute("/user/$username/videos")({
  component: UserVideosComponent,
});

const USER_VIDEOS = [
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
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    title: "Why You Should Use Tailwind CSS",
    author: "Design Pros",
    views: "890K views",
    postedAt: "3 weeks ago",
    duration: "10:30",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    title: "Building a Full-stack YouTube Clone",
    author: "Web Wizards",
    views: "2.1M views",
    postedAt: "1 month ago",
    duration: "1:45:20",
  },
];

function UserVideosComponent() {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="secondary" size="sm" className="rounded-full">
          Latest
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          Popular
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full">
          Oldest
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {USER_VIDEOS.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
        {/* Duplicate for demo */}
        {USER_VIDEOS.map((video) => (
          <VideoCard key={video.id + "-v2"} {...video} />
        ))}
      </div>
    </div>
  );
}
